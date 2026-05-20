import { I18N } from "@/lib/i18n";

export default function Visit() {
  return (
    <section id="visit" className="visit-block" data-screen-label="05 Visit">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">{I18N.nav.visit.en}</span>
            <span className="lang-zh">{I18N.nav.visit.zh}</span>
          </span>
          <span className="rule" />
        </div>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          <span className="lang-en">{I18N.visit.title.en}</span>
          <span className="lang-zh hanzi">{I18N.visit.title.zh}</span>
        </h2>
        <div className="visit-grid">
          <div className="visit-info">
            <div className="row">
              <span className="label"><span className="lang-en">Address</span><span className="lang-zh">地址</span></span>
              <span className="value big">{I18N.visit.address}</span>
            </div>
            <div className="row">
              <span className="label"><span className="lang-en">Phone</span><span className="lang-zh">電話</span></span>
              <a className="value mono" style={{ fontFamily: "var(--mono)" }} href={`tel:${I18N.visit.phone.replace(/[^\d+]/g, "")}`}>{I18N.visit.phone}</a>
            </div>
            <div className="row">
              <span className="label"><span className="lang-en">Hours</span><span className="lang-zh">營業時間</span></span>
              <span className="value">
                <div>
                  <span className="lang-en">{I18N.visit.hoursLabel.en}</span>
                  <span className="lang-zh">{I18N.visit.hoursLabel.zh}</span>
                </div>
                <div className="mono" style={{ fontFamily: "var(--mono)", fontSize: 18, marginTop: 4, color: "var(--ink)" }}>{I18N.visit.hours}</div>
              </span>
            </div>
            <div className="row">
              <span className="label"><span className="lang-en">Service</span><span className="lang-zh">服務</span></span>
              <span className="value">
                <div>
                  <span className="lang-en">{I18N.visit.wr.en}</span>
                  <span className="lang-zh">{I18N.visit.wr.zh}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 14, opacity: 0.8 }}>
                  <span className="lang-en">{I18N.visit.ship.en}</span>
                  <span className="lang-zh">{I18N.visit.ship.zh}</span>
                </div>
              </span>
            </div>
            <div style={{ marginTop: 28 }}>
              <a className="btn solid" href="https://maps.google.com/?q=774+Commercial+Street+San+Francisco" target="_blank" rel="noreferrer">
                <span className="lang-en">{I18N.visit.direction.en}</span>
                <span className="lang-zh">{I18N.visit.direction.zh}</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="map-card" aria-label="Map of 774 Commercial Street">
            <div className="x" style={{ top: 30, left: 30 }}>N ↑</div>
            <div className="x" style={{ top: 80, right: 30, transform: "rotate(-90deg)", transformOrigin: "right" }}>KEARNY ST</div>
            <div className="x" style={{ bottom: 80, left: 30, transform: "rotate(90deg)", transformOrigin: "left" }}>GRANT AVE</div>
            <div className="pin">
              <span className="lbl">茂利號 · 774 COMMERCIAL</span>
              <span className="dot" />
            </div>
            <div className="street">
              <span>↤ MONTGOMERY</span>
              <span>COMMERCIAL ST</span>
              <span>STOCKTON ↦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
