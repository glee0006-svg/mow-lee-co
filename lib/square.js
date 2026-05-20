"use client";

/**
 * Square Web Payments SDK loader.
 *
 * Loads the Square JS over CDN once per page, instantiates a Payments
 * object with the public App ID + Location ID, and returns a memoized
 * promise. Use `loadSquare()` from any client component to ensure the
 * SDK is ready before constructing a Card form.
 *
 * Sandbox CDN: https://sandbox.web.squarecdn.com/v1/square.js
 * Production:  https://web.squarecdn.com/v1/square.js
 *
 * Which one we load is decided by reading NEXT_PUBLIC_SQUARE_APP_ID —
 * sandbox app IDs are prefixed "sandbox-". This keeps client + server in
 * sync without a second env var.
 */

const APP_ID      = process.env.NEXT_PUBLIC_SQUARE_APP_ID || "";
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "";

let scriptPromise = null;
let paymentsPromise = null;

function loadScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Square SDK requires a browser"));
    if (window.Square) return resolve(window.Square);

    const isSandbox = APP_ID.startsWith("sandbox-");
    const src = isSandbox
      ? "https://sandbox.web.squarecdn.com/v1/square.js"
      : "https://web.squarecdn.com/v1/square.js";

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Square));
      existing.addEventListener("error", reject);
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve(window.Square);
    s.onerror = () => reject(new Error("Failed to load Square SDK"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export async function loadSquare() {
  if (!APP_ID || !LOCATION_ID) {
    throw new Error(
      "Square not configured — set NEXT_PUBLIC_SQUARE_APP_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID in your env."
    );
  }
  if (paymentsPromise) return paymentsPromise;
  paymentsPromise = loadScript().then((Square) => {
    if (!Square) throw new Error("Square SDK did not initialize");
    return Square.payments(APP_ID, LOCATION_ID);
  });
  return paymentsPromise;
}

export function isSquareConfigured() {
  return !!(APP_ID && LOCATION_ID);
}

// Brand-matched Card form styling — passed to payments.card({ style }).
export const SQUARE_CARD_STYLE = {
  input: {
    fontFamily: "Cormorant Garamond, Georgia, serif",
    fontSize: "17px",
    color: "#7a1338",
    backgroundColor: "transparent",
  },
  ".input-container": {
    borderColor: "rgba(122,19,56,0.3)",
    borderRadius: "0px",
  },
  ".input-container.is-focus": {
    borderColor: "#b71b56",
  },
  ".input-container.is-error": {
    borderColor: "#a01e1e",
  },
  ".message-text": {
    color: "#7a1338",
    fontFamily: "Cormorant Garamond, Georgia, serif",
    fontSize: "13px",
  },
  ".message-icon": {
    color: "#b71b56",
  },
  ".message-text.is-error": {
    color: "#a01e1e",
  },
  ".input-container.is-error .message-text": {
    color: "#a01e1e",
  },
};
