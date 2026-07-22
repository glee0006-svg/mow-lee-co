"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OrderSummary from "@/components/OrderSummary";
import CheckoutStepper from "@/components/CheckoutStepper";
import SquarePayment from "@/components/SquarePayment";

const TAX_RATE = 0.0875;

const todayISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1); // earliest pickup = tomorrow
  return d.toISOString().slice(0, 10);
};

const PICKUP_TIMES = [
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM",
  "1:30 PM",  "2:00 PM",  "2:30 PM",  "3:00 PM",  "3:30 PM",  "4:00 PM",
  "4:30 PM",  "5:00 PM",  "5:30 PM",
];

export default function CheckoutPage() {
  const router = useRouter();
  // Read directly from the SAME provider as every other consumer.
  // `mounted` flips true once localStorage has been read; until then we
  // show the Loading state instead of mistakenly flashing "empty".
  const { cart, mounted, hydrated, subtotal, clearCart } = useApp();
  const isReady = mounted ?? hydrated; // alias-safe

  const [step, setStep] = useState("info");
  const [maxReached, setMaxReached] = useState(0);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [pickup, setPickup] = useState({
  street: "",
  city: "",
  state: "",
  zip: "",
  date: todayISO(),
  time: PICKUP_TIMES[2],
  notes: ""
});

  const [paying,   setPaying]   = useState(false);
  const [payError, setPayError] = useState(null);

  const tax   = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // If the user removes every item mid-flow, bounce back to step 1.
  // Gated by `isReady` so we don't trigger this during the loading frame.
  useEffect(() => {
    if (isReady && cart.length === 0 && step !== "info") setStep("info");
  }, [cart.length, isReady, step]);

  const advance = (next) => {
    const order = ["info", "delivery", "review"];
    const ni = order.indexOf(next);
    setStep(next);
    setMaxReached((m) => Math.max(m, ni));
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    advance("delivery");
  };
  const handlePickupSubmit = (e) => {
    e.preventDefault();
    advance("review");
  };

  const handlePay = async (sourceId) => {
    setPayError(null);
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId, amount: total, customer, pickup, items: cart }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setPayError(data.error || "Payment could not be processed");
        return;
      }
      try {
        sessionStorage.setItem("mowlee-last-order", JSON.stringify({
          orderNo: data.orderNo,
          paymentId: data.paymentId,
          receiptUrl: data.receiptUrl,
          customer, pickup,
          items: cart,
          subtotal, tax, total,
          when: new Date().toISOString(),
        }));
      } catch {}
      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setPayError(err?.message || "Network error — please try again");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="app" id="top">
      <TopBar navTo={null} />

      <section className="checkout-page" data-screen-label="Checkout">
        <div className="wrap">
          <div className="section-eyebrow">
            <span className="rule" />
            <span className="label">
              <span className="lang-en">Checkout · Place your order</span>
              <span className="lang-zh">結帳 · 下單</span>
            </span>
            <span className="rule" />
          </div>
          <h2 className="section-title">
            <span className="lang-en">Your order</span>
            <span className="lang-zh hanzi">您的訂單</span>
          </h2>

          {/* Loading → empty → form. The order matters: only show "empty"
              once we've actually read localStorage. */}
          {!isReady ? (
            <div className="checkout-loading">
              <span className="lang-en">Loading your cart…</span>
              <span className="lang-zh">載入購物車中…</span>
            </div>
          ) : cart.length === 0 ? (
            <EmptyView />
          ) : (
            <>
              <CheckoutStepper current={step} onStep={setStep} maxReached={maxReached} />
              <div className="checkout-grid">
                <div className="checkout-step">
                  {step === "info"    && <StepInfo    value={customer} onChange={setCustomer} onSubmit={handleInfoSubmit} />}
                  {step === "payment" && <StepPayment customer={customer} pickup={pickup} total={total} paying={paying} setPaying={setPaying} payError={payError} setPayError={setPayError} onPay={handlePay} onBack={() => setStep("info")} />}
                  
                </div>
                <OrderSummary editable={step === "info"} taxRate={TAX_RATE} />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
}

/* ─── Step 1: customer information ───────────────────────────────── */
function StepInfo({ value, onChange, onSubmit }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <form className="checkout-step-card" onSubmit={onSubmit} noValidate>
      <header className="step-head">
        <h3>
          <span className="lang-en">Customer Information</span>
          <span className="lang-zh">客戶資料</span>
        </h3>
        <p>
          <span className="lang-en">We'll use this to send your order confirmation and reach you about your pickup.</span>
          <span className="lang-zh">我們會以此資料寄送訂單確認，並就自取事宜與您聯絡。</span>
        </p>
      </header>
      <div className="form-grid">
        <FieldText label={{ en: "Full Name", zh: "姓名" }} required value={value.name} onChange={(v) => set("name", v)} autoComplete="name" />
        <FieldText label={{ en: "Email", zh: "電郵" }} required type="email" value={value.email} onChange={(v) => set("email", v)} autoComplete="email" inputMode="email" />
        <FieldText label={{ en: "Phone Number", zh: "聯絡電話" }} required type="tel" value={value.phone} onChange={(v) => set("phone", v)} autoComplete="tel" inputMode="tel" placeholder="(415) 555-0100" />
      </div>
      <footer className="step-foot">
        <Link href="/" className="btn ghost step-back">
          <span className="arrow back">←</span>
          <span className="lang-en">Continue Shopping</span>
          <span className="lang-zh">繼續選購</span>
        </Link>
        <button type="submit" className="btn solid">
          <span className="lang-en">Continue to Payment</span>
          <span className="lang-zh">下一步 · 付款</span>
          <span className="arrow">→</span>
        </button>
      </footer>
    </form>
  );
}

/* ─── Step 2: pickup details ─────────────────────────────────────── */
function StepPickup({ value, onChange, onSubmit, onBack, pickupTimes }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <form className="checkout-step-card" onSubmit={onSubmit} noValidate>
      <header className="step-head">
  <h3>
    <span className="lang-en">Delivery Information</span>
    <span className="lang-zh">送貨資料</span>
  </h3>

  <p>
    <span className="lang-en">
      Please enter your delivery address below.
    </span>
    <span className="lang-zh">
      請填寫您的送貨地址。
    </span>
  </p>
</header>

<div className="form-grid">


  <FieldText
    label={{ en: "Street Address", zh: "街道地址" }}
    required
    value={value.street}
    onChange={(v) => set("street", v)}
  />

  <FieldText
    label={{ en: "City", zh: "城市" }}
    required
    value={value.city}
    onChange={(v) => set("city", v)}
  />

  <FieldText
    label={{ en: "State", zh: "州" }}
    required
    value={value.state}
    onChange={(v) => set("state", v)}
  />

  <FieldText
    label={{ en: "ZIP Code", zh: "郵遞區號" }}
    required
    value={value.zip}
    onChange={(v) => set("zip", v)}
  />

  <FieldTextarea
    label={{ en: "Delivery Instructions (optional)", zh: "送貨備註（可選）" }}
    value={value.notes}
    onChange={(v) => set("notes", v)}
  />
</div>
  <footer className="step-foot">
  <button type="button" className="btn ghost step-back" onClick={onBack}>
    <span className="arrow back">←</span>
    <span className="lang-en">Back</span>
    <span className="lang-zh">返回</span>
  </button>

  <button type="submit" className="btn solid">
    <span className="lang-en">Continue to Payment</span>
    <span className="lang-zh">下一步・付款</span>
    <span className="arrow">→</span>
  </button>
</footer>

</form>        
        
        
     
     
  );
}

/* ─── Step 3: payment ────────────────────────────────────────────── */
function StepPayment({ customer, pickup, total, paying, setPaying, payError, setPayError, onPay, onBack }) {
  return (
    <div className="checkout-step-card">
      <header className="step-head">
        <h3>
          <span className="lang-en">Payment</span>
          <span className="lang-zh">付款</span>
        </h3>
        <p>
          <span className="lang-en">Pay securely with any major card. Your order will be prepared for pickup on <strong>{pickup.date}</strong> at <strong>{pickup.time}</strong>.</span>
          <span className="lang-zh">以信用卡安全付款。您的訂單將於 <strong>{pickup.date}</strong> <strong>{pickup.time}</strong> 預備自取。</span>
        </p>
      </header>

      <div className="payment-summary">
        <div>
          <div className="payment-summary-label">
            <span className="lang-en">Customer</span>
            <span className="lang-zh">客戶</span>
          </div>
          <div className="payment-summary-value">{customer.name || "—"}<br />{customer.email}<br />{customer.phone}</div>
        </div>
        <div>
          <div className="payment-summary-label">
            <span className="lang-en">Pickup</span>
            <span className="lang-zh">自取</span>
          </div>
          <div className="payment-summary-value">
            {pickup.date}<br />
            {pickup.time}<br />
            <span style={{ opacity: 0.7 }}>774 Commercial St, SF</span>
          </div>
        </div>
      </div>

      {payError && (
        <div className="payment-error" role="alert">
          <strong>
            <span className="lang-en">Payment failed</span>
            <span className="lang-zh">付款失敗</span>
          </strong>
          <span>{payError}</span>
        </div>
      )}

      <SquarePayment
        amount={total}
        onPaying={setPaying}
        onSuccess={onPay}
        onError={(msg) => setPayError(msg)}
      />

      <footer className="step-foot" style={{ marginTop: 24 }}>
        <button type="button" className="btn ghost step-back" onClick={onBack} disabled={paying}>
          <span className="arrow back">←</span>
          <span className="lang-en">Back</span>
          <span className="lang-zh">返回</span>
        </button>
        {paying && (
          <span className="payment-processing" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <span className="lang-en">Processing your payment…</span>
            <span className="lang-zh">付款處理中…</span>
          </span>
        )}
      </footer>
    </div>
  );
}

/* ─── Field primitives ───────────────────────────────────────────── */
function FieldText({ label, required, value, onChange, type = "text", autoComplete, inputMode, min, placeholder }) {
  return (
    <label className="field">
      <span className="field-label">
        <span className="lang-en">{label.en}{required && " *"}</span>
        <span className="lang-zh">{label.zh}{required && " *"}</span>
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        placeholder={placeholder}
      />
    </label>
  );
}
function FieldSelect({ label, required, value, onChange, options }) {
  return (
    <label className="field">
      <span className="field-label">
        <span className="lang-en">{label.en}{required && " *"}</span>
        <span className="lang-zh">{label.zh}{required && " *"}</span>
      </span>
      <select required={required} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function FieldTextarea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <label className="field field-wide">
      <span className="field-label">
        <span className="lang-en">{label.en}</span>
        <span className="lang-zh">{label.zh}</span>
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function EmptyView() {
  return (
    <div className="checkout-empty">
      <div className="checkout-empty-glyph" aria-hidden="true">空</div>
      <h3>
        <span className="lang-en">Your cart is empty</span>
        <span className="lang-zh">您的購物車是空的</span>
      </h3>
      <p>
        <span className="lang-en">Browse the cured selections — every link, breast, and belly hung by hand at 774 Commercial.</span>
        <span className="lang-zh">請瀏覽腊味精選——每一條皆於 Commercial 街七七四號親手懸掛。</span>
      </p>
      <Link href="/#products" className="btn solid">
        <span className="lang-en">Shop the catalog</span>
        <span className="lang-zh">瀏覽商品</span>
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
