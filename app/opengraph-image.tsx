import { ImageResponse } from "next/og";
import { loja } from "@/content/loja";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${loja.nome} — ${loja.tagline}`;

// Serif fallback, not a fetched Bodoni Moda file — keeps generation dependency-free at build
// time. Close enough for a social-card thumbnail; the real site uses next/font/google.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          backgroundColor: "#F7F0EE",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #A87C7C",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#A87C7C",
          }}
        >
          <div style={{ fontSize: 34, fontFamily: "Georgia, serif", letterSpacing: 2 }}>F&amp;A</div>
          <div style={{ fontSize: 14, letterSpacing: 4, marginTop: 4 }}>MÓVEIS</div>
        </div>
        <div style={{ fontSize: 56, fontFamily: "Georgia, serif", color: "#2B1F22" }}>
          F&amp;A Móveis
        </div>
        <div style={{ fontSize: 26, color: "#6B5B5D", maxWidth: 820, textAlign: "center" }}>
          {loja.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
