import { I18N } from "@/lib/i18n";

export default function WhyUs() {
  return (
    <section>
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">{I18N.why.title.en}</span>
            <span className="lang-zh">{I18N.why.title.zh}</span>
          </span>
          <span className="rule" />
        </div>
        <div className="why-grid">
          {I18N.why.items.map((it, i) => (
            <div className="why-card" key={i}>
              <span className="ornaments-tl" />
              <span className="ornaments-tr" />
              <span className="ornaments-bl" />
              <span className="ornaments-br" />
              <div className="num">{["無", "製", "年"][i]}</div>
              <h3>
                <span className="lang-en">{it.kEn}</span>
                <span className="lang-zh">{it.kZh}</span>
              </h3>
              <p>
                <span className="lang-en">{it.bEn}</span>
                <span className="lang-zh">{it.bZh}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
