"use client";

/**
 * Bilingual stepper rail for the checkout flow.
 *
 * Steps are linear — you can click backwards to revisit a completed step
 * but not skip ahead. The current step is the magenta-filled node; past
 * steps are outlined; future steps are muted.
 */

const STEPS = [
  { key: "info",    en: "Information", zh: "客戶資料" },
  { key: "pickup",  en: "Pickup",      zh: "自取詳情" },
  { key: "payment", en: "Payment",     zh: "付款" },
  { key: "done",    en: "Confirmed",   zh: "已確認" },
];

export default function CheckoutStepper({ current, onStep, maxReached = 0 }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <ol className="checkout-stepper" aria-label="Checkout progress">
      {STEPS.map((s, i) => {
        const state = i < idx ? "done" : i === idx ? "current" : "future";
        const reachable = i <= maxReached;
        return (
          <li key={s.key} className={`step step-${state} ${reachable ? "reachable" : ""}`}>
            <button
              type="button"
              className="step-node"
              disabled={!reachable || i === idx}
              onClick={() => reachable && onStep && onStep(s.key)}
              aria-current={i === idx ? "step" : undefined}
            >
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
            <span className="step-label">
              <span className="lang-en">{s.en}</span>
              <span className="lang-zh">{s.zh}</span>
            </span>
            {i < STEPS.length - 1 && <span className="step-bar" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
