"use client";
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
}) {
  const borderRadius =
    shape === "circle" ? "50%" :
    shape === "pill"   ? 9999 :
    shape === "rounded" ? radius :
    0;

  if (src) {
    return (
      <div className="image-slot filled" style={{ ...style, borderRadius, overflow: "hidden", position: "absolute", inset: 0 }}>
        <img
          src={src}
          alt={alt || placeholder}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
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
