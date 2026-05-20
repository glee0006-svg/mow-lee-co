"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { I18N } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export default function TopBar({ navTo }) {
  const pathname = usePathname();
  const { lang, setLang, cartCount, openCart } = useApp();
  const isOnHome = pathname === "/";

  // On the homepage these are smooth-scroll anchors. On any other route
  // they are real navigations to "/" with a hash, so the browser jumps.
  const anchor = (key) => (e) => {
    if (isOnHome && navTo) {
      e.preventDefault();
      navTo(key);
    }
  };

  return (
    <>
      <div className="announce">
        <span className="lang-en">SHIPPING AVAILABLE NATIONWIDE · INSPECTED & PASSED · S.F.H.D. CA 94108 · APP. ESTAB. 53</span>
        <span className="lang-zh">可郵寄全美 · 衛生局員查驗批准 · 美國加省 · 七天營業</span>
      </div>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-stack" style={{ justifySelf: "start" }}>
            <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span className="hanzi">茂利號</span>
              <span style={{ fontFamily: "var(--display)" }}>Mow Lee &amp; Co.</span>
              <span className="est">EST. 1856</span>
            </Link>
          </div>
          <nav className="nav" aria-label="primary">
            <a href="/#story" onClick={anchor("story")}>
              <span className="lang-en">{I18N.nav.story.en}</span>
              <span className="lang-zh">{I18N.nav.story.zh}</span>
            </a>
            <Link href="/lineage">
              <span className="lang-en">Lineage</span>
              <span className="lang-zh">家族傳承</span>
            </Link>
            <a href="/#products" onClick={anchor("products")}>
              <span className="lang-en">{I18N.nav.products.en}</span>
              <span className="lang-zh">{I18N.nav.products.zh}</span>
            </a>
            <a href="/#craft" onClick={anchor("craft")}>
              <span className="lang-en">{I18N.nav.craft.en}</span>
              <span className="lang-zh">{I18N.nav.craft.zh}</span>
            </a>
            <a href="/#visit" onClick={anchor("visit")}>
              <span className="lang-en">{I18N.nav.visit.en}</span>
              <span className="lang-zh">{I18N.nav.visit.zh}</span>
            </a>
          </nav>
          <div className="right-tools">
            <div className="lang-pill" role="group" aria-label="language">
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>ENG</button>
              <button className={"zh-btn " + (lang === "zh" ? "on" : "")} onClick={() => setLang("zh")}>中文</button>
            </div>
            <button className="cart-btn" onClick={openCart} aria-label="Open cart">
              <span className="lang-en">CART</span>
              <span className="lang-zh">購物車</span>
              <span className="count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
