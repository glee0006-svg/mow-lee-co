"use client";

import { useEffect, useState } from "react";
import { I18N, CATEGORIES } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import Credentials from "./Credentials";
import ImageSlot from "./ImageSlot";

const PROD_DETAIL = {
  s2:  { en: "All lean shoulder. No visible fat. The drier, firmer cousin to our standard link — preferred by customers who want sausage character without the richness.",
         zh: "全瘦豬肩肉，不見肥膏。較招牌腸更乾爽結實。喜其香而不膩者首選。" },
  p1:  { en: "Whole pork belly cut into broad slabs, marinated for 48 hours, hung on bamboo and oven-dried six days. Steam, then slice paper-thin to fan over rice or stir into clay-pot rice.",
         zh: "五花腩切大件，醃四十八小時，懸於竹竿，慢焙六日。蒸後切薄片，鋪於飯面，或入煲仔飯同炊。" },
  p2:  { en: "Lean cured pork — same cure, no fat. Firmer texture, cleaner finish. Good for soups and stir-fries where richness isn't wanted.",
         zh: "全瘦腊肉，配方相同，盡去肥膏。質感結實，味淨清香。煲湯、小炒尤佳。" },
  d05: { en: "Whole duck, pressed flat, salt-cured and oven-dried over five to seven days. A centerpiece for winter banquets — steam whole, or pair with taro and clay-pot rice.",
         zh: "整鴨拍扁，鹽醃慢焙五至七日。冬令大宴之主菜。整蒸或配芋頭、煲仔飯皆宜。" },
  d09: { en: "Whole cured duck liver — buttery, dense, deeply savory. Slice over warm rice or steam with sausage in the classic Cantonese way.",
         zh: "整顆腊鴨肝，質地綿密，鹹香濃郁。切片鋪於熱飯，或與腊腸同蒸，最得傳統粵法。" },
  g1: {
  en: "Naturally dried to preserve their sweet, briny flavor and intense umami depth for authentic Chinese cooking.",
  zh: "天然日曬金蝦。本號專選小巧鮮甜之品，緩緩烘乾。湯水清鮮與否，繫於此。",
},
  g2:  { en: "Salt-cured fish — a Cantonese pantry essential. Steam with pork patty, fold into fried rice, or use sparingly to deepen any savoury braise.",
         zh: "鹹魚——粵廚必備。蒸豬肉餅、炒飯、或入紅燒鹵汁少許，皆能添香。" },
d04: {
  en: "Marinated in a savory soy-based blend and slow-cooked to deliver tender meat with deep, aromatic flavor.",
  zh: "醬油醃製，慢火烹調，肉質嫩滑，醬香濃郁。",
},
  d13: {
  en: "A beloved delicacy with a satisfyingly tender texture, infused with deep, savory flavors through traditional preparation.",
  zh: "傳統腊鴨腳鴨翼，經細心醃製及慢火風乾，鹹香濃郁，口感富有嚼勁。",
},

  d11: {
  en: "Slow-cured to enhance its naturally rich flavor, offering a tender, savory bite enjoyed as a classic delicacy.",
  zh: "慢火風乾，提升天然濃郁風味，肉質嫩滑，鹹香可口，是經典美味。",
},

  d12: {
  en: "A flavorful specialty known for its rich, succulent texture and deep, savory taste, prepared using traditional methods.",
  zh: "風味濃郁，肉質鮮嫩多汁，依循傳統工藝製作，鹹香可口。",
},

  d07: {
  en: "Lean yet remarkably succulent, offering a refined balance of tenderness and bold, savory flavor.",
  zh: "肉質精瘦而鮮嫩，鹹香濃郁，口感細緻，風味均衡。",
},
  
  s1: {
  en: "A timeless Chinese favorite, expertly seasoned and naturally cured to achieve its signature sweet-savory flavor.",
  zh: "傳統中式臘腸，精心調味，天然風乾，甜鹹均衡，風味經典。",
},

  s3: {
  en: "Smooth, savory, and delicately seasoned, offering a distinctive taste that reflects generations of craftsmanship.",
  zh: "口感細膩，鹹香濃郁，傳承世代工藝，展現經典風味。",
},
};

const PRODUCT_IMAGES = {
  d08: "/Duck Gizzard.jpg",
  d03: "/Salt Duck Leg.jpg",

  s1: [
  "/Pork Sausage 1.png",
  "/Pork Sausage 2.png",
  "/Pork Sausage 3.png",
],
  
  d04: [
    "/Soy Duck Leg 1.png",
    "/Soy Duck Leg 2.png",
    "/Soy Duck Leg 3.png",
    "/Soy Duck Leg 4.png",
  ],

  d05: "/whole-cured-duck.jpg",

  d07: [
  "/Duck Breast 1.png",
  "/Duck Breast 2.png",
  "/Duck Breast 3.png",
],
  
  d13: [
  "/Duck Feet n Wing 1.png",
  "/Duck Feet n Wing 2.png",
  "/Duck Feet n Wing 3.png",
],

  g1: [
  "/Dried Shrimp 1.png",
  "/Dried Shrimp 2.png",
  "/Dried Shrimp 3.png",
],

  d11: [
  "/Duck Neck 1.png",
  "/Duck Neck 2.png",
  "/Duck Neck 3.png",
],

  d12: [
  "/Duck Tail 1.png",
  "/Duck Tail A.png",
  "/Duck Tail B.png",
],

  s3: [
  "/Duck Liver Sausage 1.png",
  "/Duck Liver Sausage 2.png",
  "/Duck Liver Sausage 3.png",
],
  
};

export default function Shop() {
  const { addToCart, setQty, cart, addedFlash } = useApp();
  const [active, setActive] = useState("all");
  const [detail, setDetail] = useState(null);
  const cats = active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === active);
  const qtyOf = (id) => {
    const l = cart.find((l) => l.id === id);
    return l ? l.qty : 0;
  };

  useEffect(() => {
    if (!detail) return;
    const onKey = (e) => { if (e.key === "Escape") setDetail(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  const detailText = detail && (PROD_DETAIL[detail.id] || detail.note || {
    en: "A traditional Mow Lee specialty, prepared by hand at 774 Commercial Street.",
    zh: "茂利號傳統製作，於 Commercial 街七七四號手工炮製。",
  });

  return (
    <section id="products" className="shop-block" data-screen-label="03 Shop">
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">{I18N.nav.products.en}</span>
            <span className="lang-zh">{I18N.nav.products.zh}</span>
          </span>
          <span className="rule" />
        </div>
        <h2 className="section-title">
          <span className="lang-en">{I18N.shop.title.en}</span>
          <span className="lang-zh hanzi">{I18N.shop.title.zh}</span>
        </h2>
        <p className="section-subtitle">
          <span className="lang-en">{I18N.shop.subtitle.en}</span>
          <span className="lang-zh hanzi">{I18N.shop.subtitle.zh}</span>
        </p>
        <div style={{ margin: "0 auto 30px", maxWidth: 800 }}>
          <Credentials />
        </div>

        <div className="cat-tabs" role="tablist">
          <button className={"cat-tab " + (active === "all" ? "on" : "")} onClick={() => setActive("all")}>
            <span className="lang-en">All</span>
            <span className="lang-zh">全部</span>
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={"cat-tab " + (active === c.id ? "on" : "")} onClick={() => setActive(c.id)}>
              <span className="lang-en">{c.en}</span>
              <span className="lang-zh">{c.zh}</span>
            </button>
          ))}
        </div>

        {cats.map((cat) => (
          <div className="cat-block" key={cat.id}>
            <div className="cat-head">
              <span className="zh">{cat.zh}</span>
              <span className="en">{cat.en}</span>
            </div>
            <div className="prod-list">
              {cat.items.map((it) => (
                <div
                  className="prod-row"
                  key={it.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetail(it)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDetail(it); } }}
                >
                  <div className="thumb" onClick={(e) => e.stopPropagation()}>
  <ImageSlot
    id={`thumb-${it.id}`}
    src={PRODUCT_IMAGES[it.id]}
    placeholder={it.en}
    gallery={false}
  />
</div>
                  <div className="name">
                    <span className="zh">{it.zh}</span>
                    <span className="en">{it.en}</span>
                    {it.note && (
                      <span className="note">
                        <span className="lang-en">{it.note.en}</span>
                        <span className="lang-zh">{it.note.zh}</span>
                      </span>
                    )}
                  </div>
                  <div className="right">
                    <div style={{ textAlign: "right" }}>
                      <div className="price">${it.price.toFixed(2)}</div>
                      <div className="unit">
                        <span className="lang-en">{it.unit === "lb" ? "/ LB" : "/ EACH"}</span>
                        <span className="lang-zh">{it.unit === "lb" ? "每磅" : "每隻"}</span>
                      </div>
                    </div>
                    {qtyOf(it.id) > 0 ? (
                      <div className="qty-stepper" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setQty(it.id, qtyOf(it.id) - 1)} aria-label="Decrease">−</button>
                        <span className="n">{qtyOf(it.id)}</span>
                        <button onClick={() => setQty(it.id, qtyOf(it.id) + 1)} aria-label="Increase">+</button>
                      </div>
                    ) : (
                      <button
                        className={"add-btn " + (addedFlash === it.id ? "added" : "")}
                        onClick={(e) => { e.stopPropagation(); addToCart(it); }}
                      >
                        <span className="lang-en">+ {I18N.shop.add.en}</span>
                        <span className="lang-zh">+ {I18N.shop.add.zh}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div className="prod-modal-bg" onClick={() => setDetail(null)}>
          <div className="prod-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="prod-modal-x" onClick={() => setDetail(null)} aria-label="Close">✕</button>
            <div className="prod-modal-img">
              <ImageSlot
  id={`modal-${detail.id}`}
  src={PRODUCT_IMAGES[detail.id]}
  placeholder={detail.en}
  gallery
/>
            </div>
            <div className="prod-modal-body">
              <div className="prod-modal-eyebrow">
                <span className="lang-en">{detail.unit === "lb" ? "BY THE POUND" : "EACH"}</span>
                <span className="lang-zh">{detail.unit === "lb" ? "按磅計價" : "按隻計價"}</span>
              </div>
              <div className="prod-modal-zh">{detail.zh}</div>
              <div className="prod-modal-en">{detail.en}</div>
              <div className="prod-modal-rule" />
              <p className="prod-modal-desc">
                <span className="lang-en">{detailText.en}</span>
                <span className="lang-zh">{detailText.zh}</span>
              </p>
              <div className="prod-modal-foot">
                <div>
                  <div className="prod-modal-price">${detail.price.toFixed(2)}</div>
                  <div className="prod-modal-unit">
                    <span className="lang-en">{detail.unit === "lb" ? "/ LB" : "/ EACH"}</span>
                    <span className="lang-zh">{detail.unit === "lb" ? "每磅" : "每隻"}</span>
                  </div>
                </div>
                <button className="btn solid" onClick={() => addToCart(detail)}>
                  <span className="lang-en">+ {I18N.shop.add.en}{qtyOf(detail.id) > 0 ? ` (${qtyOf(detail.id)})` : ""}</span>
                  <span className="lang-zh">+ {I18N.shop.add.zh}{qtyOf(detail.id) > 0 ? `（${qtyOf(detail.id)}）` : ""}</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
