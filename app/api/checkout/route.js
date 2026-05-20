/**
 * POST /api/checkout
 *
 * Body: {
 *   sourceId:   string,             // tokenized card from Square Web SDK
 *   amount:     number,             // total in dollars (we convert to cents)
 *   customer:   { name, email, phone },
 *   pickup:     { date, time, notes },
 *   items:      [{ id, en, zh, price, qty, unit }]
 * }
 *
 * Returns: { ok: true, orderNo, paymentId } or { ok: false, error }
 *
 * Uses the official `square` Node SDK. Sandbox vs production is chosen by
 * SQUARE_ENVIRONMENT. Idempotency key is a fresh UUID per request — Square
 * rejects duplicates within 24h, so a network retry of the same token
 * won't double-charge.
 */

import { randomUUID } from "node:crypto";
import { Client, Environment } from "square";

export const runtime = "nodejs"; // square SDK uses node APIs; force Node runtime on Vercel
export const dynamic = "force-dynamic";

// BigInt isn't JSON-serializable; coerce in any response that bubbles SDK objects.
const safe = (v) => JSON.parse(JSON.stringify(v, (_, x) => (typeof x === "bigint" ? x.toString() : x)));

function getClient() {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) throw new Error("SQUARE_ACCESS_TOKEN is not set");
  return new Client({
    accessToken: token,
    environment: process.env.SQUARE_ENVIRONMENT === "production" ? Environment.Production : Environment.Sandbox,
  });
}

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 }); }

  const { sourceId, amount, customer, pickup, items } = body || {};

  // ── Validation ──────────────────────────────────────────────────────
  if (!sourceId)                     return Response.json({ ok: false, error: "Missing payment source" }, { status: 400 });
  if (typeof amount !== "number" || !(amount > 0)) return Response.json({ ok: false, error: "Invalid amount" }, { status: 400 });
  if (!customer?.name || !customer?.email || !customer?.phone) return Response.json({ ok: false, error: "Missing customer info" }, { status: 400 });
  if (!pickup?.date || !pickup?.time) return Response.json({ ok: false, error: "Missing pickup details" }, { status: 400 });
  if (!Array.isArray(items) || items.length === 0) return Response.json({ ok: false, error: "Cart is empty" }, { status: 400 });

  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!locationId) return Response.json({ ok: false, error: "SQUARE_LOCATION_ID is not configured" }, { status: 500 });

  // Cents — Square expects integer minor units. Round to avoid float drift.
  const amountCents = BigInt(Math.round(amount * 100));

  // Order reference number (also used as our internal order number)
  const orderNo = "ML-" + Date.now().toString(36).toUpperCase().slice(-6);

  // Human-readable note attached to the Square payment — appears in the
  // Square dashboard so the kitchen knows pickup details without our DB.
  const itemSummary = items.map((i) => `${i.qty}× ${i.en} ($${(i.price * i.qty).toFixed(2)})`).join("\n");
  const note = [
    `Order ${orderNo}`,
    `Customer: ${customer.name} · ${customer.email} · ${customer.phone}`,
    `Pickup: ${pickup.date} at ${pickup.time}` + (pickup.notes ? ` — ${pickup.notes}` : ""),
    "",
    itemSummary,
  ].join("\n").slice(0, 500); // Square caps notes around 500 chars

  try {
    const client = getClient();
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: { amount: amountCents, currency: "USD" },
      locationId,
      note,
      buyerEmailAddress: customer.email,
      referenceId: orderNo,
    });

    const payment = safe(result.payment);
    return Response.json({
      ok: true,
      orderNo,
      paymentId: payment?.id,
      status: payment?.status,
      receiptUrl: payment?.receiptUrl,
    });
  } catch (err) {
    // Square SDK errors have a `.errors` array of {category, code, detail}
    const errs = err?.errors || err?.result?.errors || [];
    const message = errs[0]?.detail || err?.message || "Payment failed";
    console.error("[square] checkout error:", errs.length ? errs : err);
    return Response.json({ ok: false, error: message, code: errs[0]?.code }, { status: 502 });
  }
}
