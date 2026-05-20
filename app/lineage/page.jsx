"use client";

import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const CHAPTERS = [
  { yr: "1856", enTitle: "A shop on Sacramento Street", zhTitle: "沙加緬度街上的老舖",
    en: "Mow Lee Shing Kee & Co. was founded in 1856 by members of the Pon family — early Chinese merchants who had crossed the Pacific to a Chinatown still finding its shape. The shop opened at 745 Sacramento Street, then the spine of the neighborhood. Its first customers were laborers, traders, and miners of Gum Saan — the Gold Mountain — who came seeking cured pork and dried provisions that tasted of home.",
    zh: "茂利號腊味創立於一八五六年，由番氏家族草創。番氏為早期渡洋華商，落腳於尚在草創之三藩市唐人街。本號開設於沙加緬度街七四五號，乃當時華埠之主動脈。最初來客，皆為「金山」勞工、商賈、礦夫，求一口腊味乾貨，以慰鄉愁。" },
  { yr: "1906", enTitle: "Fire, and rebuilding", zhTitle: "大火與重建",
    en: "On April 18, 1906, an earthquake and the fires that followed levelled Chinatown. The Sacramento Street shop was destroyed. Like every other merchant in the neighborhood, the Pon family chose to rebuild. By the late 1940s the business had moved to 730 Grant Avenue — recorded in a 1949 Chinese telephone directory — and was again serving the same community it had served for two generations.",
    zh: "一九零六年四月十八日，地震及隨之而來之大火，盡焚唐人街。沙加緬度街老舖夷為平地。番氏與街坊眾商人一樣，毅然重建。至四零年代末，本號已遷址都板街七三零號（據一九四九年華僑電話簿載），再為兩代相熟之老主顧服務。" },
  { yr: "1949–1953", enTitle: "Settling at 774 Commercial", zhTitle: "落戶 Commercial 街七七四號",
    en: "Between 1949 and 1953 Mow Lee moved into 774 Commercial Street — a post-quake building dating to 1907, inside the Chinese Six Companies' rebuilt block. The shop has not moved since. The bamboo-hung curing room, the small front counter, the order in which packages are wrapped: all of it has stayed within these walls for over seventy years.",
    zh: "一九四九至一九五三年間，本號遷入 Commercial 街七七四號。樓宇建於一九零七年，乃中華六大公司災後重建之物業。自此再未遷址。竹竿懸臘之烘焙室、前店之小櫃枱、包貨之秩序——皆於此牆內七十餘載，未曾改易。" },
  { yr: "今", enTitle: "The sixth generation", zhTitle: "第六代",
    en: "In 2016 leadership passed to the current generation: George Lee, Gerald Lee, Warren Lee, and Lien Lee. Jian Lian Cheng — of the fifth — still works the counter beside them. Recipes have not changed. Hours have not changed. The building has not changed. One hundred and seventy years on, what Mow Lee sells is what Mow Lee has always sold.",
    zh: "二零一六年，事業傳予今代：李哲、李傑勞、李偉倫、李蓮。第五代之鄭健聯，仍與諸位並肩於櫃枱前。配方未改，營業時間未改，店舖未改。一百七十年來，茂利所售，仍是茂利一向所售。" },
];

const OWNERSHIP = [
  { yrs: "1856 — 1900", who: "Pon Dai Guen",                                          whoZh: "番大根" },
  { yrs: "1900 — 1930", who: "Pon Get",                                               whoZh: "番杰" },
  { yrs: "1930 — 1950", who: "(records lost, trade continued)",                       whoZh: "（戰時記載散佚，營業未斷）" },
  { yrs: "1950 — 1975", who: "Pon Yee Zhong",                                         whoZh: "番義忠" },
  { yrs: "1975 — 1999", who: "Yee Dor Lam · Tina Jew",                                whoZh: "余多林 · 周婷" },
  { yrs: "1999 — 2015", who: "Jian Lian Cheng · Pun Wun Lee",                         whoZh: "鄭健聯 · 李潘穩" },
  { yrs: "2015 — 今",    who: "George Lee · Gerald Lee · Warren Lee · Lien Lee",       whoZh: "李哲 · 李傑勞 · 李偉倫 · 李蓮" },
];

const ADDRESSES = [
  { yrs: "1856 — 1906",         addr: "745 Sacramento Street",   note: { en: "Founding location. Destroyed in the 1906 earthquake and fire.",         zh: "創立之址。一九零六年大火夷平。" } },
  { yrs: "1906 — c.1949",       addr: "730 Grant Avenue",        note: { en: "Post-earthquake rebuild. Listed in a 1949 Chinese telephone directory.", zh: "震後重建之址。一九四九年華僑電話簿有載。" } },
  { yrs: "1949–1953 — present", addr: "774 Commercial Street",   note: { en: "Inside the 1907 Six Companies Building. Same shop, same room, same craft.", zh: "中華六大公司一九零七年重建樓宇之內。同一店舖，同一焙房，同一手藝。" } },
];

export default function LineagePage() {
  return (
    <div className="app" id="top">
      <TopBar navTo={null} />

      <section className="hero" style={{ paddingTop: 48, paddingBottom: 60 }}>
        <div className="wrap hero-inner">
          <div className="hero-card">
            <span className="ornaments-tl" />
            <span className="ornaments-tr" />
            <span className="ornaments-bl" />
            <span className="ornaments-br" />
            <div className="hero-eyebrow">
              <span className="lang-en">One Hundred & Seventy Years</span>
              <span className="lang-zh">一百七十年 · 六代相傳</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="hero-zh" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>家族傳承</div>
              <div className="hero-rule"><span className="l" /><span className="dot" /><span className="r" /></div>
              <div className="hero-en" style={{ fontSize: "clamp(34px, 5vw, 72px)" }}>Lineage</div>
            </div>
            <p className="hero-blurb">
              <span className="lang-en">Six generations of one family. Three addresses, one Chinatown, one craft — uninterrupted since the year before the American Civil War.</span>
              <span className="lang-zh">一家六代，三易其址，皆於三藩市唐人街，皆為腊味一門。自美國南北戰爭前一年至今，未曾間斷。</span>
            </p>
          </div>
        </div>
      </section>

      <section className="story-block">
        <div className="wrap">
          <div className="section-eyebrow">
            <span className="rule" />
            <span className="label">
              <span className="lang-en">Chapters</span>
              <span className="lang-zh">章節</span>
            </span>
            <span className="rule" />
          </div>
          <h2 className="section-title">
            <span className="lang-en">The history, in four scenes</span>
            <span className="lang-zh hanzi">四幕之間，百年舊事</span>
          </h2>
          <div className="lineage-chapters">
            {CHAPTERS.map((ch, i) => (
              <article className="lineage-chapter" key={i}>
                <div className="lineage-year">{ch.yr}</div>
                <div className="lineage-body">
                  <h3>
                    <span className="lang-en">{ch.enTitle}</span>
                    <span className="lang-zh">{ch.zhTitle}</span>
                  </h3>
                  <p>
                    <span className="lang-en">{ch.en}</span>
                    <span className="lang-zh">{ch.zh}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-fiber">
        <div className="wrap">
          <div className="section-eyebrow">
            <span className="rule" />
            <span className="label">
              <span className="lang-en">Ownership · 1856 to today</span>
              <span className="lang-zh">歷代東主 · 一八五六至今</span>
            </span>
            <span className="rule" />
          </div>
          <h2 className="section-title">
            <span className="lang-en">Six generations</span>
            <span className="lang-zh hanzi">六代之譜</span>
          </h2>
          <p className="section-subtitle">
            <span className="lang-en">Every name that has stood behind this counter.</span>
            <span className="lang-zh hanzi">凡曾守此櫃枱者，俱錄於此。</span>
          </p>
          <div className="lineage-table">
            {OWNERSHIP.map((row, i) => (
              <div className="lineage-row" key={i}>
                <div className="lineage-row-yrs">{row.yrs}</div>
                <div className="lineage-row-who">
                  <span className="lang-en">{row.who}</span>
                  <span className="lang-zh">{row.whoZh}</span>
                </div>
                <div className="lineage-row-gen">
                  <span className="lang-en">{"Generation " + (i + 1)}</span>
                  <span className="lang-zh">{"第" + ["一","二","三","四","五","六","六"][i] + "代"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-block">
        <div className="wrap">
          <div className="section-eyebrow">
            <span className="rule" />
            <span className="label">
              <span className="lang-en">Addresses</span>
              <span className="lang-zh">店址沿革</span>
            </span>
            <span className="rule" />
          </div>
          <h2 className="section-title">
            <span className="lang-en">Three doors, one block</span>
            <span className="lang-zh hanzi">三易其址 · 同居一坊</span>
          </h2>
          <div className="lineage-addresses">
            {ADDRESSES.map((a, i) => (
              <div className="lineage-addr" key={i}>
                <div className="lineage-addr-yrs">{a.yrs}</div>
                <div className="lineage-addr-line">{a.addr}</div>
                <div className="lineage-addr-note">
                  <span className="lang-en">{a.note.en}</span>
                  <span className="lang-zh">{a.note.zh}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a className="btn solid" href="/#visit">
              <span className="lang-en">Visit Us at 774 Commercial</span>
              <span className="lang-zh">親臨 Commercial 街七七四號</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
}
