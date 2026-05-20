import { I18N } from "@/lib/i18n";

export default function Story() {
  return (
    <section id="story" className="story-block" data-screen-label="02 Story">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">{I18N.nav.story.en}</span>
            <span className="lang-zh">{I18N.nav.story.zh}</span>
          </span>
          <span className="rule" />
        </div>
        <h2 className="section-title">
          <span className="lang-en">{I18N.story.title.en}</span>
          <span className="lang-zh hanzi">{I18N.story.title.zh}</span>
        </h2>
        <p className="section-subtitle">
          <span className="lang-en">{I18N.story.subtitle.en}</span>
          <span className="lang-zh hanzi">{I18N.story.subtitle.zh}</span>
        </p>
        <div className="story-grid">
          <div className="story-prose">
            {I18N.story.body.map((p, i) => (
              <p key={i} className={i === 0 ? "first" : ""}>
                <span className="lang-en">{p.en}</span>
                <span className="lang-zh">{p.zh}</span>
              </p>
            ))}
          </div>
          <div>
            <div className="section-eyebrow" style={{ margin: "0 0 14px" }}>
              <span className="label" style={{ marginLeft: 0 }}>
                <span className="lang-en">Six Generations</span>
                <span className="lang-zh">六代相傳</span>
              </span>
              <span className="rule" />
            </div>
            <div className="timeline">
              {I18N.story.timeline.map((row, i) => (
                <div className="tl-row" key={i}>
                  <div className="tl-years">{row.years}</div>
                  <div className="tl-who">
                    <span className="lang-en">{row.who}</span>
                    <span className="lang-zh">{row.whoZh}</span>
                  </div>
                  <div className="tl-note">
                    <span className="lang-en">{row.note}</span>
                    <span className="lang-zh">{row.noteZh}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
