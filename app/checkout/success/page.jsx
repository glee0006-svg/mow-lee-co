"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

/**
 * Renders the receipt saved by /checkout. If sessionStorage is empty
 * (direct nav, refresh in a new tab), shows a friendly "no order to
 * display" fallback rather than 404'ing.
 */
export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("mowlee-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  return (
    <div className="app" id="top">
      <TopBar navTo={null} />
      <section className="checkout-page checkout-success" data-screen-label="Order Confirmation">
        <div className="wrap">
          {!ready ? null : !order ? (
            <NoOrderFallback />
          ) : (
            <Confirmation order={order} />
          )}
        </div>
      </section>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function Confirmation({ order }) {
  return (
    <>
      <div className="section-eyebrow">
        <span className="rule" />
        <span className="label">
          <span className="lang-en">Order Confirmed · 訂單已確認</span>
          <span className="lang-zh">訂單已確認</span>
        </span>
        <span className="rule" />
      </div>

      <div className="success-hero">
        <div className="success-glyph" aria-hidden="true">謝</div>
        <h2 className="section-title">
          <span className="lang-en">Thank you</span>
          <span className="lang-zh hanzi">多謝惠顧</span>
        </h2>
        <p className="section-subtitle">
          <span className="lang-en">
            Your payment has been received. A confirmation has been emailed to <strong>{order.customer.email}</strong>.
          </span>
          <span className="lang-zh">
            您的付款已收。訂單確認已寄至 <strong>{order.customer.email}</strong>。
          </span>
        </p>
      </div>

      <div className="success-grid">
        <div className="success-card pickup-card">
          <div className="success-card-eyebrow">
            <span className="lang-en">Delivery Details</span>
            <span className="lang-zh">送貨資訊</span>
          </div>
          <div className="pickup-when">
            <div className="pickup-date">{order.pickup.date}</div>
            <div className="pickup-time">{order.pickup.time}</div>
          </div>
          <div className="pickup-where">
            <strong>{order.pickup.street}</strong><br />
{order.pickup.city}, {order.pickup.state} {order.pickup.zip}
          </div>
          {order.pickup.notes && (
            <div className="pickup-notes">
              <span className="lang-en">Notes:</span>
              <span className="lang-zh">備註：</span>{" "}
              {order.pickup.notes}
            </div>
          )}
          <a className="btn ghost" href="https://maps.google.com/?q=774+Commercial+Street+San+Francisco" target="_blank" rel="noreferrer">
            <span className="lang-en">Get Directions</span>
            <span className="lang-zh">查看地圖</span>
            <span className="arrow">→</span>
          </a>
        </div>

        <div className="success-card">
          <div className="success-card-eyebrow">
            <span className="lang-en">Order Summary · 訂單明細</span>
            <span className="lang-zh">訂單明細</span>
          </div>
          <div className="success-orderno">
            <span className="lang-en">Order reference</span>
            <span className="lang-zh">訂單編號</span>
            <strong>{order.orderNo}</strong>
          </div>
          <ul className="success-lines">
            {order.items.map((l) => (
              <li key={l.id} className="success-line">
                <div>
                  <div className="ln-zh">{l.zh}</div>
                  <div className="ln-en">{l.en} · {l.qty}× ${l.price.toFixed(2)}{l.unit === "lb" ? "/lb" : ""}</div>
                </div>
                <div className="ln-sub">${(l.price * l.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="success-totals">
            <div className="success-row">
              <span><span className="lang-en">Subtotal</span><span className="lang-zh">小計</span></span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="success-row">
              <span><span className="lang-en">Tax</span><span className="lang-zh">稅項</span></span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="success-row total">
              <span><span className="lang-en">Total paid</span><span className="lang-zh">總付款</span></span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          {order.receiptUrl && (
            <a className="btn ghost" href={order.receiptUrl} target="_blank" rel="noreferrer">
              <span className="lang-en">View Square Receipt</span>
              <span className="lang-zh">查看 Square 收據</span>
              <span className="arrow">→</span>
            </a>
          )}
        </div>
      </div>

      <div className="success-cta">
        <Link className="btn solid" href="/">
          <span className="lang-en">Return Home</span>
          <span className="lang-zh">返回首頁</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}

function NoOrderFallback() {
  return (
    <div className="checkout-empty">
      <div className="checkout-empty-glyph" aria-hidden="true">空</div>
      <h3>
        <span className="lang-en">No order to display</span>
        <span className="lang-zh">無訂單可顯示</span>
      </h3>
      <p>
        <span className="lang-en">Looks like you arrived here directly. Browse the catalog and place an order to see this page.</span>
        <span className="lang-zh">看來您是直接到達此頁。請瀏覽商品下單，便會顯示確認頁面。</span>
      </p>
      <Link href="/#products" className="btn solid">
        <span className="lang-en">Shop the catalog</span>
        <span className="lang-zh">瀏覽商品</span>
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
