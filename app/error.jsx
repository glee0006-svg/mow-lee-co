"use client";

export default function Error({ reset }) {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 32,
      background: "#f4c5d8",
      color: "#7a1338",
      fontFamily: "Cormorant Garamond, serif",
      textAlign: "center",
    }}>
      <div>
        <div style={{ fontFamily: "Noto Serif TC, serif", fontSize: 56, fontWeight: 700 }}>
          失誤
        </div>
        <h1 style={{ fontFamily: "Abril Fatface, serif", fontSize: 40, margin: "12px 0 8px" }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 17, opacity: 0.7, marginBottom: 24, maxWidth: 480 }}>
          Even the oldest shops have an off day. Please try again.
        </p>
        <button
          onClick={() => reset()}
          style={{
            fontFamily: "IM Fell English SC, serif",
            letterSpacing: "0.24em",
            fontSize: 13,
            border: "1px solid #7a1338",
            padding: "14px 26px",
            background: "transparent",
            color: "#7a1338",
            cursor: "pointer",
          }}
        >
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}
