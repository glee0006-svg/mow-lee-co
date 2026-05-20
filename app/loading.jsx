export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#f4c5d8",
      color: "#7a1338",
      fontFamily: "Noto Serif TC, serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "0.08em" }}>茂利號</div>
        <div style={{
          fontFamily: "IM Fell English SC, serif",
          fontSize: 11,
          letterSpacing: "0.32em",
          marginTop: 12,
          opacity: 0.7,
        }}>
          EST. 1856
        </div>
      </div>
    </div>
  );
}
