"use client";

/**
 * CartProvider — single centralized cart + lang store for the whole app.
 *
 * Architecture (App Router):
 *   • Mounted ONCE inside <body> in app/layout.jsx, wrapping `{children}`.
 *     App Router never remounts the root layout on client navigation, so
 *     every page (/, /lineage, /checkout, /checkout/success) shares this
 *     exact provider instance.
 *   • Every consumer reads via useApp() — TopBar (count), CartDrawer,
 *     Shop (add/qty), FeaturedGrid (add), OrderSummary, /checkout pages.
 *
 * Hydration model (the fix for "checkout shows empty"):
 *   • Initial render is ALWAYS empty cart + mounted=false. Server and
 *     client agree → zero hydration mismatch risk.
 *   • A single mount-effect reads localStorage and commits both
 *     `cart` and `mounted` in one setState (atomic — no render window
 *     where mounted=true but cart=[]).
 *   • Writes happen in an effect that's gated by `mounted`, so the
 *     initial empty state never overwrites a saved cart.
 *   • A pagehide flush + cross-tab storage listener cover edge cases.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PALETTES } from "@/lib/i18n";

const CartCtx = createContext(null);

const CART_KEY = "mowlee-cart";
const LANG_KEY = "mowlee-lang";
const DEFAULT_PALETTE = "pink";

// Defensive localStorage — iOS Safari Private mode throws, quota errors,
// embedded webviews disable storage. We swallow everything.
function readLS(key) {
  if (typeof window === "undefined") return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function writeLS(key, value) {
  if (typeof window === "undefined") return;
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {}
}

// Drop anything that can't render or contribute to a total.
function normalizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const l of raw) {
    if (!l || typeof l !== "object") continue;
    if (typeof l.id !== "string") continue;
    if (typeof l.price !== "number" || !isFinite(l.price)) continue;
    if (typeof l.qty !== "number" || !isFinite(l.qty)) continue;
    const qty = Math.max(0, Math.floor(l.qty));
    if (qty === 0) continue;
    out.push({ ...l, qty });
  }
  return out;
}

function loadCart() {
  const raw = readLS(CART_KEY);
  if (!raw) return [];
  try { return normalizeCart(JSON.parse(raw)); }
  catch { return []; }
}

function loadLang() {
  const v = readLS(LANG_KEY);
  return v === "zh" || v === "en" ? v : "en";
}

export function AppProvider({ children }) {
  // Single state object: cart + mounted are always updated together.
  // Initial state on BOTH server and client is { cart: [], mounted: false }
  // so SSR markup matches the first client render. No hydration mismatch.
  const [state, setState] = useState({ cart: [], mounted: false });
  const { cart, mounted } = state;

  // Lang is separate because palette/body-class side-effects fan out from it.
  // Initial "en" matches SSR; the pre-paint script in layout.jsx already set
  // the body class before React hydrates, so users with zh saved see Chinese
  // on first paint regardless.
  const [lang, setLangState] = useState("en");
  const [cartOpen, setCartOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState(null);
  const flashTimer = useRef(null);

  /* ── Hydrate (read once) ──────────────────────────────────────────
     Single setState commits both `cart` and `mounted` atomically, so
     consumers never see the transient "mounted=true, cart=[]" frame
     that was making /checkout flash the empty state. */
  useEffect(() => {
    // Apply palette CSS variables.
    const palette = PALETTES[DEFAULT_PALETTE];
    for (const [k, v] of Object.entries(palette)) {
      document.documentElement.style.setProperty(k, v);
    }
    setLangState(loadLang());
    setState({ cart: loadCart(), mounted: true });
  }, []);

  /* ── Persist on every cart change ─────────────────────────────────
     Gated by `mounted` so the initial [] never overwrites a saved cart. */
  useEffect(() => {
    if (!mounted) return;
    if (cart.length === 0) writeLS(CART_KEY, null);
    else writeLS(CART_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  /* ── Flush on tab close / back-forward cache ──────────────────────
     Mobile Safari is aggressive about evicting pages; pagehide is the
     reliable signal. Also catches the rare case where a synchronous
     navigation outruns the effect-based persist. */
  useEffect(() => {
    if (!mounted) return;
    const flush = () => {
      if (cart.length === 0) writeLS(CART_KEY, null);
      else writeLS(CART_KEY, JSON.stringify(cart));
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [cart, mounted]);

  /* ── Cross-tab + visibility resync ────────────────────────────────
     `storage` fires only on OTHER tabs; `visibilitychange` covers our
     own tab returning from background (mobile Safari can pause it
     and drop in-memory state). */
  useEffect(() => {
    const resync = () => {
      const fresh = loadCart();
      setState((s) => {
        if (s.cart.length === fresh.length &&
            s.cart.every((l, i) => l.id === fresh[i].id && l.qty === fresh[i].qty)) {
          return s;
        }
        return { cart: fresh, mounted: true };
      });
    };
    const onStorage = (e) => {
      if (!e || e.storageArea !== window.localStorage) return;
      if (e.key === CART_KEY) resync();
      else if (e.key === LANG_KEY && (e.newValue === "en" || e.newValue === "zh")) {
        setLangState(e.newValue);
      }
    };
    const onVis = () => { if (document.visibilityState === "visible") resync(); };
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* ── Lang → body class (pre-paint script handles first render) ──── */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.remove("zh", "en");
    document.body.classList.add(lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next !== "en" && next !== "zh") return;
    setLangState(next);
    writeLS(LANG_KEY, next);
  }, []);

  /* ── Cart actions ─────────────────────────────────────────────────
     Every mutator goes through setState(s => ...) so we work with the
     freshest state regardless of stale closures. `mounted` is preserved
     in the update so the persistence effect always fires. */
  const addToCart = useCallback((item) => {
    if (!item || typeof item.id !== "string" || typeof item.price !== "number") return;
    setState((s) => {
      const ex = s.cart.find((l) => l.id === item.id);
      const next = ex
        ? s.cart.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...s.cart, { ...item, qty: 1 }];
      return { cart: next, mounted: true };
    });
    setAddedFlash(item.id);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setAddedFlash(null), 1100);
  }, []);

  const setQty = useCallback((id, qty) => {
    const n = Math.max(0, Math.floor(qty));
    setState((s) => ({
      cart: n <= 0
        ? s.cart.filter((l) => l.id !== id)
        : s.cart.map((l) => (l.id === id ? { ...l, qty: n } : l)),
      mounted: true,
    }));
  }, []);

  const removeLine = useCallback((id) => {
    setState((s) => ({ cart: s.cart.filter((l) => l.id !== id), mounted: true }));
  }, []);

  const clearCart = useCallback(() => {
    setState((s) => ({ cart: [], mounted: true }));
  }, []);

  /* ── Derived ──────────────────────────────────────────────────────
     Memoized so consumers that selector-pick (e.g. TopBar reads only
     cartCount) re-render only when that derived value actually changes. */
  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal  = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart]);

  const openCart  = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  /* ── Context value ───────────────────────────────────────────────
     `hydrated` is kept as an alias of `mounted` so existing consumers
     that destructure `hydrated` (checkout page, OrderSummary) keep
     working without any changes. */
  const value = useMemo(() => ({
    lang, setLang,
    cart,
    hydrated: mounted,
    mounted,
    addToCart, setQty, removeLine, clearCart,
    cartCount, subtotal, addedFlash,
    cartOpen, openCart, closeCart,
  }), [
    lang, setLang,
    cart, mounted,
    addToCart, setQty, removeLine, clearCart,
    cartCount, subtotal, addedFlash,
    cartOpen, openCart, closeCart,
  ]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useApp() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("useApp() must be used within <AppProvider>");
  return v;
}

// Alias for clarity — same hook, semantic name. Either is fine to import.
export const useCart = useApp;
