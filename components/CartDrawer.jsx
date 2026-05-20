"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import { I18N } from "@/lib/i18n";

export default function CartDrawer() {
  const { cart, cartOpen, closeCart, setQty, removeLine, subtotal } = useApp();
  const empty = cart.length === 0;

  return (
    <>
      <div className={"cart-drawer-bg " + (cartOpen ? "on" : "")} onClick={closeCart} />
      <aside className={"cart-drawer " + (cartOpen ? "on" : "")} aria-hidden={!cartOpen}>
        <header>
          <h3>
            <span className="lang-en">{I18N.shop.cart.en}</span>
            <span className="lang-zh">{I18N.shop.cart.zh}</span>
          </h3>
          <button className="x-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </header>
        <div className="cart-list">
          {empty ? (
            <div className="cart-empty">
              <div className="glyph">空</div>
              <div>
                <span className="lang-en">{I18N.shop.empty.en}</span>
                <span className="lang-zh">{I18N.shop.empty.zh}</span>
              </div>
            </div>
          ) : (
            cart.map((l) => (
              <div className="cart-line" key={l.id}>
                <div>
                  <div className="ln-zh">{l.zh}</div>
                  <div className="ln-en">{l.en}</div>
                  <div className="qty">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                    <span className="n">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span className="price">${(l.price * l.qty).toFixed(2)}</span>
                  <span className="unit" style={{ fontFamily: "var(--sc)", fontSize: 10, letterSpacing: ".18em", color: "var(--ink)", opacity: 0.75 }}>
                    ${l.price.toFixed(2)} {l.unit === "lb" ? "/ lb" : "/ ea"}
                  </span>
                  <button className="remove" onClick={() => removeLine(l.id)}>
                    <span className="lang-en">REMOVE</span>
                    <span className="lang-zh">移除</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="row">
            <span style={{ fontFamily: "var(--sc)", letterSpacing: ".18em", fontSize: 12 }}>
              <span className="lang-en">{I18N.shop.subtotal.en}</span>
              <span className="lang-zh">{I18N.shop.subtotal.zh}</span>
            </span>
          </div>
          <div className="row total">
            <span><span className="lang-en">Total</span><span className="lang-zh">總計</span></span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="note">
            <span className="lang-en">{I18N.shop.shippingNote.en}</span>
            <span className="lang-zh">{I18N.shop.shippingNote.zh}</span>
          </div>
          {empty ? (
            <button className="btn solid" disabled style={{ width: "100%", justifyContent: "center", opacity: 0.4, cursor: "not-allowed" }}>
              <span className="lang-en">{I18N.shop.checkout.en}</span>
              <span className="lang-zh">{I18N.shop.checkout.zh}</span>
            </button>
          ) : (
            <Link
              href="/checkout"
              className="btn solid"
              onClick={closeCart}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span className="lang-en">{I18N.shop.checkout.en}</span>
              <span className="lang-zh">{I18N.shop.checkout.zh}</span>
              <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
