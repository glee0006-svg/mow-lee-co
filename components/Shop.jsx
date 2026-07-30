"use client";

import { useEffect, useState } from "react";
import { I18N, CATEGORIES } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import Credentials from "./Credentials";
import ImageSlot from "./ImageSlot";

const PROD_DETAIL = {
  s1:  { en: "Our house standard since the 1850s — pork shoulder hand-cut, marinated in head-grade soy and Shaoxing wine, tied in pairs and oven-dried for four days. Sweet, smoky, marbled. Steam over rice or slice into clay-pot dishes.",
         zh: "本號招牌，自一八五零年代相傳。豬肩肉手工切粒，以頭抽、紹興酒醃製，雙條紥起，慢焙四日。甜香微煙，肥瘦相間。蒸飯、煲仔皆宜。" },
  s2:  { en: "All lean shoulder. No visible fat. The drier, firmer cousin to our standard link — preferred by customers who want sausage character without the richness.",
         zh: "全瘦豬肩肉，不見肥膏。較招牌腸更乾爽結實。喜其香而不膩者首選。" },
  s3:  { en: "A house specialty: pork sausage threaded with whole pieces of duck liver. Earthier, deeper, richer. The link our regulars come back for around the holidays.",
         zh: "本號特色腸：豬肉腸內鑲整塊鴨肝。風味深厚、口感豐潤。佳節時分，老主顧必訪之選。" },
  p1:  { en: "Whole pork belly cut into broad slabs, marinated for 48 hours, hung on bamboo and oven-dried six days. Steam, then slice paper-thin to fan over rice or stir into clay-pot rice.",
         zh: "五花腩切大件，醃四十八小時，懸於竹竿，慢焙六日。蒸後切薄片，鋪於飯面，或入煲仔飯同炊。" },
  p2:  { en: "Lean cured pork — same cure, no fat. Firmer texture, cleaner finish. Good for soups and stir-fries where richness isn't wanted.",
         zh: "全瘦腊肉，配方相同，盡去肥膏。質感結實，味淨清香。煲湯、小炒尤佳。" },
  d05: { en: "Whole duck, pressed flat, salt-cured and oven-dried over five to seven days. A centerpiece for winter banquets — steam whole, or pair with taro and clay-pot rice.",
         zh: "整鴨拍扁，鹽醃慢焙五至七日。冬令大宴之主菜。整蒸或配芋頭、煲仔飯皆宜。" },
  d09: { en: "Whole cured duck liver — buttery, dense, deeply savory. Slice over warm rice or steam with sausage in the classic Cantonese way.",
         zh: "整顆腊鴨肝，質地綿密，鹹香濃郁。切片鋪於熱飯，或與腊腸同蒸，最得傳統粵法。" },
  g1:  { en: "Sun-dried whole shrimp. We source small, sweet specimens and dry them slowly — the difference between a soup that hums and one that sings.",
         zh: "天然日曬全蝦。本號專選小巧鮮甜之品，緩緩烘乾。湯水清鮮與否，繫於此。" },
  g2:  { en: "Salt-cured fish — a Cantonese pantry essential. Steam with pork patty, fold into fried rice, or use sparingly to deepen any savoury braise.",
         zh: "鹹魚——粵廚必備。蒸豬肉餅、炒飯、或入紅燒鹵汁少許，皆能添香。" },
};
const PRODUCT_IMAGES = {
  d08: "/Duck Gizzard.jpg",
  d03: "/Salt Duck Leg.jpg",

  d04: [
    "/Soy Duck Leg 1.png",
    "/Soy Duck Leg 2.png",
    "/Soy Duck Leg 3.png",
    "/Soy Duck Leg 4.png",
  ],

  d05: "/whole-cured-duck.jpg",
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
  id={`modal-${detail.id}`}
  src={PRODUCT_IMAGES[detail.id]}
  placeholder={detail.en}
  gallery={true}
/>                  </div>
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
