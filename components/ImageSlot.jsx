"use client";

import { useState } from "react";
/**
 * Production ImageSlot.
 *
 * Server-friendly placeholder. If `src` is provided (e.g. /products/lap-cheong.jpg
 * from /public), renders the image at object-fit:cover. Otherwise renders a
 * dark editorial holder with the placeholder caption — this matches the
 * prototype's aesthetic and is intentionally polished, not "missing asset".
 *
 * To use real photography: drop a JPG/WebP into /public and pass src.
 */
export default function ImageSlot({
  id,
  src,
  alt = "",
  shape = "rect",
  radius = 12,
  placeholder = "",
  style,
  gallery = false,
}) {
  const borderRadius =
    shape === "circle" ? "50%" :
    shape === "pill"   ? 9999 :
    shape === "rounded" ? radius :
    0;

  const images = Array.isArray(src) ? src : src ? [src] : [];
const [current, setCurrent] = useState(0);
  if (images.length) {
    return (
      <div
  className="image-slot filled"
  style={{
    ...style,
    borderRadius,
    overflow: "hidden",
    position: "absolute",
    inset: 0,
  }}
>
        <img
          src={images[current]}
          alt={alt || placeholder}
          loading={gallery ? "eager" : "lazy"}
          decoding="sync"
          style={{
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
  userSelect: "none",
}}
        />
     {gallery && images.length > 1 && (
  <button
    type="button"
style={{
  position: "absolute",
  left: 16,
  top: "50%",
  transform: "translate(0, -50%)",
  zIndex: 2,
  cursor: "pointer",
}}
    onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setCurrent((current - 1 + images.length) % images.length);
}}
  >
    ◀
  </button>
)}
{gallery && images.length > 1 && (
  <button
  type="button"
  style={{
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translate(0, -50%)",
    zIndex: 2,
    cursor: "pointer",
  }}
  onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setCurrent((current + 1) % images.length);
}}
>
    ▶
</button>
)}
</div>
    );
  }
  return (
    <div
      className="image-slot empty"
      data-slot-id={id}
      style={{ ...style, borderRadius, position: "absolute", inset: 0 }}
      aria-label={placeholder}
    />
  );
}
