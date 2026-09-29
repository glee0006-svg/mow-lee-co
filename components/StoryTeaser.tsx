import { I18N } from "@/lib/i18n";

export default function StoryTeaser() {
  return (
    <section id="story-teaser" className="story-teaser">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">Our Story</span>
            <span className="lang-zh">我們的故事</span>
          </span>
          <span className="rule" />
        </div>

        <h2 className="section-title">
          <span className="lang-en">
            A Tradition Passed Down Through Generations
          </span>
          <span className="lang-zh hanzi">
            世代相傳的傳統
          </span>
        </h2>

        <p className="section-subtitle">
          <span className="lang-en">
            Discover the story, heritage, and craftsmanship behind
            Mow Lee Shing Kee &amp; Co.
          </span>
          <span className="lang-zh hanzi">
            探索茂利號的故事、傳承與世代相傳的手藝。
          </span>
        </p>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a className="btn solid" href="/our-history">
            <span className="lang-en">Read Our Story</span>
            <span className="lang-zh">閱讀我們的故事</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
