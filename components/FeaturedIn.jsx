// Press / "As Featured In" data + component. Typographic wordmarks — no
// raster logos — render in an editorial 4x2 grid on desktop.
const PRESS = [
  { name: "NBC Bay Area", note: { en: "Television",  zh: "電視台" },  url: "" },
  { name: "KTVU Fox 2",   note: { en: "Television",  zh: "電視台" },  url: "" },
  { name: "SF Examiner",  note: { en: "Newspaper",   zh: "報章" },    url: "" },
  { name: "SFGATE",       note: { en: "Web",         zh: "網媒" },    url: "" },
  { name: "Hungry Ones",  note: { en: "Documentary", zh: "紀錄片" },  url: "" },
  { name: "Mister Jiu's", note: { en: "On the menu", zh: "餐廳供應" }, url: "" },
  { name: "China Live",   note: { en: "On the menu", zh: "餐廳供應" }, url: "" },
  { name: "R&G Lounge",   note: { en: "On the menu", zh: "餐廳供應" }, url: "" },
];

export default function FeaturedIn() {
  return (
    <section className="featured-in" data-screen-label="Press · Featured In">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">Press · As Featured In</span>
            <span className="lang-zh">媒體報導 · 供應於</span>
          </span>
          <span className="rule" />
        </div>
        <h2 className="section-title">
          <span className="lang-en">The shop, in their words</span>
          <span className="lang-zh hanzi">他者所言</span>
        </h2>
        <p className="section-subtitle">
          <span className="lang-en">Television crews, food writers, and the chefs of San Francisco — a quiet record kept by others.</span>
          <span className="lang-zh hanzi">電視團隊、飲食作家、三藩市諸位廚師——皆為他人所記。</span>
        </p>
        <div className="press-wall">
          {PRESS.map((p, i) => {
            const Inner = (
              <>
                <span className="press-name">{p.name}</span>
                <span className="press-divide" aria-hidden="true"><span className="glyph" /></span>
                <span className="press-note">
                  <span className="lang-en">{p.note.en}</span>
                  <span className="lang-zh">{p.note.zh}</span>
                </span>
              </>
            );
            return p.url ? (
              <a className="press-cell" key={i} href={p.url} target="_blank" rel="noreferrer noopener">{Inner}</a>
            ) : (
              <div className="press-cell" key={i}>{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
