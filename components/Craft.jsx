import { I18N } from "@/lib/i18n";

export default function Craft() {
  return (
    <section id="craft" className="craft-block" data-screen-label="04 Craft">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">{I18N.nav.craft.en}</span>
            <span className="lang-zh">{I18N.nav.craft.zh}</span>
          </span>
          <span className="rule" />
        </div>
        <h2 className="section-title">
          <span className="lang-en">{I18N.craft.title.en}</span>
          <span className="lang-zh hanzi">{I18N.craft.title.zh}</span>
        </h2>
        <p className="section-subtitle" style={{ color: "var(--cream)" }}>
          <span className="lang-en">{I18N.craft.subtitle.en}</span>
          <span className="lang-zh hanzi">{I18N.craft.subtitle.zh}</span>
        </p>
        <div className="craft-grid">
          {I18N.craft.steps.map((s, i) => (
            <div className="craft-step" key={i}>
              <div className="num">{s.n}</div>
              <div className="step-zh">{s.zh}</div>
              <div className="step-en">{s.en}</div>
              <div className="step-body">
                <span className="lang-en">{s.body}</span>
                <span className="lang-zh">{s.bodyZh}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
