"use client";
import { I18N } from "@/lib/i18n";
import Credentials from "./Credentials";

export default function Hero({ navTo }) {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="hero-card">
          <span className="ornaments-tl" />
          <span className="ornaments-tr" />
          <span className="ornaments-bl" />
          <span className="ornaments-br" />
          <div className="hero-eyebrow">
            <span className="lang-en">{I18N.hero.eyebrow.en}</span>
            <span className="lang-zh">{I18N.hero.eyebrow.zh}</span>
          </div>
          <div className="hero-grid">
            <div className="hero-corner">大埠</div>
            <div className="hero-center">
              <div className="hero-zh">{I18N.hero.nameZh}</div>
              <div className="hero-rule"><span className="l" /><span className="dot" /><span className="r" /></div>
              <div className="hero-en">{I18N.hero.nameEn}</div>
            </div>
            <div className="hero-corner">金山</div>
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <span className="hero-tagline">
              <span className="lang-en">{I18N.hero.tagline.en}</span>
              <span className="lang-zh">{I18N.hero.tagline.zh}</span>
            </span>
          </div>
          <p className="hero-blurb">
            <span className="lang-en">{I18N.hero.blurb.en}</span>
            <span className="lang-zh">{I18N.hero.blurb.zh}</span>
          </p>
          <div className="hero-cta">
            <button className="btn solid" onClick={() => navTo("products")}>
              <span className="lang-en">{I18N.hero.ctaShop.en}</span>
              <span className="lang-zh">{I18N.hero.ctaShop.zh}</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn" onClick={() => navTo("story")}>
              <span className="lang-en">{I18N.hero.ctaStory.en}</span>
              <span className="lang-zh">{I18N.hero.ctaStory.zh}</span>
            </button>
          </div>
          <div style={{ marginTop: 28 }}><Credentials /></div>
          <div className="hero-stamp">
            <span className="lang-en">App. Estab. 1853 · S.F.H.D.</span>
            <span className="lang-zh">衛生局批准 · 美國加省</span>
          </div>
        </div>
      </div>
    </section>
  );
}
