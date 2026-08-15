import { ImageResponse } from "next/og";
import { catalog } from "@/lib/catalog/source";
import { formatMedidas } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const produtos = await catalog.listarProdutos();
  return produtos.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const produto = await catalog.obterProduto(params.slug);
  const nome = produto?.nome ?? "F&A Móveis";
  const medida = produto ? formatMedidas(produto.medidas) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 96,
          backgroundColor: "#F7F0EE",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 4, color: "#8E5F62" }}>F&amp;A MÓVEIS</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontFamily: "Georgia, serif",
            color: "#2B1F22",
            maxWidth: 900,
          }}
        >
          {nome}
        </div>
        {medida && (
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 30,
              color: "#8E5F62",
            }}
          >
            <div style={{ width: 64, height: 1, backgroundColor: "#A87C7C" }} />
            {medida}
            <div style={{ width: 64, height: 1, backgroundColor: "#A87C7C" }} />
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
