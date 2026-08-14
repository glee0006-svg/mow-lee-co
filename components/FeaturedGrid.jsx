"use client";

import { CATEGORIES, FEATURED } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import ImageSlot from "./ImageSlot";


export default function FeaturedGrid({ navTo, onProductClick }) {
  const { addToCart } = useApp();
  const lookup = {};
  CATEGORIES.forEach((c) => c.items.forEach((it) => (lookup[it.id] = it)));
  const items = FEATURED.map((id) => lookup[id]).filter(Boolean);
  const phrases = ["猪肉腸", "腊肉", "腊鴨", "鴨肝腸", "鴨肝", "蝦米"];
const PRODUCT_IMAGES = {
  s1: [
    "/Pork Sausage 1.png",
    "/Pork Sausage 2.png",
    "/Pork Sausage 3.png",
  ],

  p1: [
  "/Pork Belly 1.png",
  "/Pork Belly 2.png",
  "/Pork Belly 3.png",
],

  d05: [
    "/whole-cured-duck.jpg",
    "/Whole Cured Duck 2.png",
    "/Whole Cured Duck 3.png",
  ],

  g1: [
    "/Dried Shrimp 1.png",
    "/Dried Shrimp 2.png",
    "/Dried Shrimp 3.png",
  ],

  s3: [
    "/Duck Liver Sausage 1.png",
    "/Duck Liver Sausage 2.png",
    "/Duck Liver Sausage 3.png",
  ],
};
  return (
    <section style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-eyebrow">
          <span className="rule" />
          <span className="label">
            <span className="lang-en">Featured Selections</span>
            <span className="lang-zh">本號精選</span>
          </span>
          <span className="rule" />
        </div>
        <div className="feat-grid">
          {items.map((it, i) => (
            <div
  className="feat-card"
  key={it.id}
  onClick={() => {
    if (onProductClick) {
      onProductClick(it);
    } else if (navTo) {
      navTo("products");
    }
  }}
>
              <div className="image-ph" onClick={(e) => e.stopPropagation()}>
                <ImageSlot
  id={`feat-${it.id}`}
  src={PRODUCT_IMAGES[it.id]}
  placeholder={`${it.en} photo`}
                  gallery
/>
                <span className="ph-zh" aria-hidden="true">{phrases[i] || it.zh}</span>
                <span className="ph-en" aria-hidden="true">{it.en}</span>
              </div>
              <div className="name-zh">{it.zh}</div>
              <div className="name-en">{it.en}</div>
              <div className="row">
                <span className="price">${it.price.toFixed(2)}</span>
                <span className="unit">
                  <span className="lang-en">{it.unit === "lb" ? "PER LB" : "EACH"}</span>
                  <span className="lang-zh">{it.unit === "lb" ? "每磅" : "每隻"}</span>
                </span>
              </div>
              <button
                className="btn ghost"
                style={{ marginTop: 10, justifyContent: "center" }}
                onClick={(e) => { e.stopPropagation(); addToCart(it); }}
              >
                <span className="lang-en">+ Add to Cart</span>
                <span className="lang-zh">+ 加入購物車</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
