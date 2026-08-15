// /produtos is the link the pitch is built around — "você manda um link" (spec-architecture.md
// §2.3) — so it gets its own card rather than inheriting the generic one. Carries the régua
// (spec-design.md §6.1) with the real catalogue count, which is the site's signature and a
// number that is actually true.
import { ImageResponse } from "next/og";
import { loja } from "@/content/loja";
import { catalog } from "@/lib/catalog/source";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${loja.nome} — nossos móveis`;

// Serif fallback rather than a fetched Bodoni Moda file, matching app/opengraph-image.tsx:
// keeps card generation dependency-free at build time.
export default async function Image() {
  const produtos = await catalog.listarProdutos();

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
          gap: 28,
          backgroundColor: "#F7F0EE",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 7,
            color: "#8E5F62",
            fontFamily: "Georgia, serif",
          }}
        >
          F&amp;A MÓVEIS
        </div>

        <div style={{ fontSize: 68, fontFamily: "Georgia, serif", color: "#2B1F22" }}>
          Nossos móveis
        </div>

        {/* The mesurement rule: hairline with tick ends, carrying a real number. */}
        <div style={{ display: "flex", alignItems: "center", width: 720, height: 40 }}>
          <div style={{ width: 1, height: 20, backgroundColor: "#A87C7C" }} />
          <div style={{ flex: 1, height: 1, backgroundColor: "#A87C7C" }} />
          <div
            style={{
              fontSize: 26,
              color: "#8E5F62",
              padding: "0 22px",
              letterSpacing: 3,
            }}
          >
            {`${produtos.length} MÓVEIS`}
          </div>
          <div style={{ flex: 1, height: 1, backgroundColor: "#A87C7C" }} />
          <div style={{ width: 1, height: 20, backgroundColor: "#A87C7C" }} />
        </div>

        <div
          style={{
            fontSize: 27,
            color: "#6B5B5D",
            maxWidth: 800,
            textAlign: "center",
            lineHeight: 1.45,
          }}
        >
          Móveis de fábrica com medida certa para sua casa. Entrega e montagem.
        </div>
      </div>
    ),
    { ...size },
  );
}
