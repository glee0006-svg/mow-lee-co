export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32, fontFamily: "Cormorant Garamond, serif", textAlign: "center", color: "#7a1338" }}>
      <div>
        <div style={{ fontFamily: "Noto Serif TC, serif", fontSize: 64, fontWeight: 700 }}>四〇四</div>
        <h1 style={{ fontFamily: "Abril Fatface, serif", fontSize: 48, margin: "12px 0 4px" }}>Page not found</h1>
        <p style={{ fontSize: 18, opacity: 0.7, marginBottom: 24 }}>The page you're looking for has been hand-hung elsewhere.</p>
        <a href="/" style={{ fontFamily: "IM Fell English SC, serif", letterSpacing: "0.24em", fontSize: 13, border: "1px solid #7a1338", padding: "14px 26px", textDecoration: "none", color: "#7a1338" }}>
          RETURN HOME
        </a>
      </div>
    </main>
  );
}
