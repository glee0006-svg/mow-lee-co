"use client";
import { I18N } from "@/lib/i18n";

export default function Ticker({ lang }) {
  const items = I18N.ticker[lang];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}<span className="sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}
