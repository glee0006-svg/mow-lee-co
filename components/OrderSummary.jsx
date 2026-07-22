"use client";

import { useApp } from "@/lib/store";
import ImageSlot from "./ImageSlot";
const PRODUCT_IMAGES = {
  d08: "/Duck Gizzard.jpg",
  d03: "/Salt Duck Leg.jpg",
  d04: "/soy-test.jpg",
  d05: "/whole-cured-duck.jpg",
};

/**
 * Order summary sidebar — used by every checkout step. Sticky on desktop,
 * collapses to top-of-page on mobile. Reads cart from the store; allows
 * inline qty edits + remove only on the first step (controlled via
 * `editable` prop) so customers can't change the cart mid-payment.
 */
export default function OrderSummary({ editable = false, shipping = 0, taxRate = 0.0875 }) {
  const { cart, setQty, removeLine, subtotal } = useApp();
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <aside className="order-summary order-summary-empty">
        <div className="os-empty-glyph" aria-hidden="true">空</div>
        <div>
          <span className="lang-en">Your cart is empty</span>
          <span className="lang-zh">您的購物車是空的</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="order-summary">
      <h3>
        <span className="lang-en">Your Order</span>
        <span className="lang-zh">您的訂單</span>
      </h3>

      <ul className="os-lines">
        {cart.map((l) => (
          <li key={l.id} className="os-line">
            <div className="os-line-img">
              <ImageSlot
  id={`os-${l.id}`}
  src={PRODUCT_IMAGES[l.id]}
  placeholder={l.en}
/>
            </div>
            <div className="os-line-info">
              <div className="os-line-zh">{l.zh}</div>
              <div className="os-line-en">{l.en}</div>
              <div className="os-line-unit">
                ${l.price.toFixed(2)} {l.unit === "lb" ? "/ lb" : "/ each"}
              </div>
              {editable ? (
                <div className="os-line-controls">
                  <div className="qty-stepper" aria-label="Quantity">
                    <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                    <span className="n">{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <button type="button" className="os-line-remove" onClick={() => removeLine(l.id)}>
                    <span className="lang-en">REMOVE</span>
                    <span className="lang-zh">移除</span>
                  </button>
                </div>
              ) : (
                <div className="os-line-qty">
                  <span className="lang-en">Qty {l.qty}</span>
                  <span className="lang-zh">數量 {l.qty}</span>
                </div>
              )}
            </div>
            <div className="os-line-subtotal">${(l.price * l.qty).toFixed(2)}</div>
          </li>
        ))}
      </ul>

      <div className="os-totals">
        <div className="os-row">
          <span><span className="lang-en">Subtotal</span><span className="lang-zh">小計</span></span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="os-row">
          <span><span className="lang-en">Shipping</span><span className="lang-zh">郵寄</span></span>
          <span>TBD</span>
        </div>
        <div className="os-row">
          <span><span className="lang-en">Estimated tax</span><span className="lang-zh">預估稅項</span></span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="os-row total">
          <span><span className="lang-en">Total</span><span className="lang-zh">總計</span></span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
