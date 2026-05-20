"use client";

import { useEffect, useRef, useState } from "react";
import { loadSquare, isSquareConfigured, SQUARE_CARD_STYLE } from "@/lib/square";

/**
 * Square Card form wrapper.
 *
 * - Initializes the Square Web Payments SDK once.
 * - Renders the card form into our brand-matched container.
 * - Exposes a `pay()` method via ref so the parent can tokenize on form submit.
 *
 * The SDK loads asynchronously — we render a placeholder skeleton until the
 * card form is attached, and surface any init error in-place. If Square env
 * vars aren't configured, we show a "demo mode" message and provide a
 * mock-token submit path so the rest of the flow can be exercised.
 */
export default function SquarePayment({
  amount,
  onPaying,        // (boolean) — toggled around the tokenize call
  onSuccess,       // (sourceId) — passed up to the parent for /api/checkout
  onError,         // (errorMessage)
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | unconfigured | failed
  const [initError, setInitError] = useState(null);
  const configured = isSquareConfigured();

  useEffect(() => {
    if (!configured) {
      setStatus("unconfigured");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const payments = await loadSquare();
        if (cancelled) return;
        const card = await payments.card({ style: SQUARE_CARD_STYLE });
        if (cancelled) return;
        await card.attach(containerRef.current);
        cardRef.current = card;
        if (!cancelled) setStatus("ready");
      } catch (err) {
        console.error("[Square] init failed:", err);
        if (!cancelled) {
          setInitError(err?.message || String(err));
          setStatus("failed");
        }
      }
    })();
    return () => {
      cancelled = true;
      if (cardRef.current?.destroy) {
        try { cardRef.current.destroy(); } catch {}
      }
      cardRef.current = null;
    };
  }, [configured]);

  // Parent triggers payment via form submit; we tokenize the card and hand
  // the token back. Errors at the tokenize layer (declined card, missing
  // field, network) come back here as `errors[]`.
  const submit = async () => {
    if (status === "unconfigured") {
      // Demo path — bypass tokenization so non-prod environments can
      // still walk through to the success page.
      onPaying?.(true);
      setTimeout(() => {
        onSuccess?.("cnon:demo-mock-source-id");
        onPaying?.(false);
      }, 800);
      return;
    }
    if (!cardRef.current) {
      onError?.("Card form not ready");
      return;
    }
    onPaying?.(true);
    try {
      const result = await cardRef.current.tokenize();
      if (result.status === "OK") {
        onSuccess?.(result.token);
      } else {
        const msg = result.errors?.[0]?.message || "Payment could not be processed";
        onError?.(msg);
      }
    } catch (err) {
      onError?.(err?.message || "Payment failed");
    } finally {
      onPaying?.(false);
    }
  };

  return (
    <div className="square-card">
      <div className="square-card-eyebrow">
        <span className="lang-en">Card details · Secured by Square</span>
        <span className="lang-zh">信用卡資料 · Square 安全處理</span>
      </div>

      {status === "unconfigured" && (
        <div className="square-card-demo">
          <strong>
            <span className="lang-en">Demo mode</span>
            <span className="lang-zh">示範模式</span>
          </strong>
          <p>
            <span className="lang-en">Square credentials aren't configured in this environment. "Place Order" will simulate a successful payment so you can preview the success screen.</span>
            <span className="lang-zh">此環境未配置 Square 憑證。「下單」將模擬成功付款，以便預覽成功畫面。</span>
          </p>
        </div>
      )}

      {status === "failed" && (
        <div className="square-card-error" role="alert">
          <span className="lang-en">Could not load the payment form: {initError}</span>
          <span className="lang-zh">無法載入付款表單：{initError}</span>
        </div>
      )}

      <div
        ref={containerRef}
        className={"square-card-container " + (status === "ready" ? "is-ready" : "")}
        aria-busy={status === "loading"}
      />

      {status === "loading" && (
        <div className="square-card-skeleton" aria-hidden="true">
          <div /><div /><div />
        </div>
      )}

      <button
        type="button"
        className="btn solid square-card-submit"
        onClick={submit}
        disabled={status === "loading" || status === "failed"}
      >
        <span className="lang-en">Pay ${amount.toFixed(2)}</span>
        <span className="lang-zh">付款 ${amount.toFixed(2)}</span>
        <span className="arrow">→</span>
      </button>

      <p className="square-card-trust">
        <span className="lang-en">Card data is encrypted and tokenized by Square. We never see or store your full card number.</span>
        <span className="lang-zh">卡片資料由 Square 加密處理，本店絕不會接觸或儲存完整卡號。</span>
      </p>
    </div>
  );
}
