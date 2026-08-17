// docs/tasks/TASK-importar-catalogo-fabrica.md §2.1 — scrapes the two supplier sources behind
// Fátima's printed-catalogue QR codes (Novo Horizonte via qrcodefacil.com's public JSON API,
// D'Doro via dedoromoveis.com.br's server-rendered HTML) and writes a reviewable dump. Never
// writes into content/produtos.ts directly — that's a hand-curated real-client-data file, and a
// script silently filling a gap there would violate CLAUDE.md §0 (never invent a fact).
import * as cheerio from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type FonteQrCodeFacil = { tipo: "qrcodefacil"; codigo: string };
type FonteDedoro = { tipo: "dedoromoveis"; slug: string };
type Fonte = FonteQrCodeFacil | FonteDedoro;

type ProdutoImportado = {
  nome: string;
  fabricante: "Novo Horizonte" | "D'Doro";
  fonte: string;
  medidas: {
    larguraCm: number;
    alturaCm: number;
    profundidadeCm: number;
    alturaComPeCm?: number;
  } | null;
  cores: string[];
  composicao: string[];
  imagens: string[];
  arquivos: { nome: string; url: string }[];
  completo: boolean;
};

// The 12 QR codes from the printed catalogue, sent over WhatsApp 2026-08-17.
const FONTES: Fonte[] = [
  { tipo: "qrcodefacil", codigo: "QLOiE0lz" },
  { tipo: "qrcodefacil", codigo: "Q2Ph2os0" },
  { tipo: "qrcodefacil", codigo: "Qqe63ztb" },
  { tipo: "qrcodefacil", codigo: "Q0sCPkko" },
  { tipo: "qrcodefacil", codigo: "Q9K66DqT" },
  { tipo: "qrcodefacil", codigo: "QAdI4jBL" },
  { tipo: "qrcodefacil", codigo: "QhR47tE6" },
  { tipo: "qrcodefacil", codigo: "Qkf0NJ8t" },
  { tipo: "qrcodefacil", codigo: "QM55VfWF" },
  { tipo: "dedoromoveis", slug: "monaco-plus-6-pts" },
  { tipo: "dedoromoveis", slug: "roupeiro-colibri" },
  { tipo: "dedoromoveis", slug: "roupeiro-meridian-plus-3-pts" },
];

const UA = "Mozilla/5.0 (compatible; fa-moveis-import/1.0)";

function slugify(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

// "2,30m" / "Altura: 2,30m" -> 230 (cm). Measurements on both sources are always in metres.
function parseMetros(texto: string): number {
  const normalizado = texto.replace(",", ".");
  const match = normalizado.match(/([\d.]+)\s*m\b/);
  if (!match) throw new Error(`Não consegui ler medida em "${texto}"`);
  return Math.round(parseFloat(match[1]) * 100);
}

async function buscarQrCodeFacil(codigo: string): Promise<ProdutoImportado> {
  const res = await fetch(`https://api.qrfacil.me/qrcode/${codigo}/content`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`qrcodefacil ${codigo}: HTTP ${res.status}`);
  const data = (await res.json()) as {
    name: string;
    content: { files?: { image?: string }; buttons?: { name: string; url: string }[] };
  };

  return {
    nome: data.name,
    fabricante: "Novo Horizonte",
    fonte: `https://qrcodefacil.com/${codigo}`,
    // Confirmed absent from this source — never guessed, per CLAUDE.md §0.
    medidas: null,
    cores: [],
    composicao: [],
    imagens: data.content.files?.image ? [data.content.files.image] : [],
    arquivos: (data.content.buttons ?? []).map((b) => ({ nome: b.name, url: b.url })),
    completo: false,
  };
}

async function buscarDedoro(slug: string): Promise<ProdutoImportado> {
  const url = `https://dedoromoveis.com.br/_produtos/${slug}/`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`dedoromoveis ${slug}: HTTP ${res.status}`);
  const $ = cheerio.load(await res.text());

  const nome = $("h1.elementor-heading-title").first().text().trim();

  // The theme gives these <ul> lists no distinguishing class — each one follows a plain text
  // label ("Medidas:", "Cores:", "Descrição do Produto:") as a sibling inside the same
  // Elementor text widget. Walk widget children in order and bucket each <ul> under the last
  // label seen. Verified against all 3 pages before writing this (same 4-line Medidas shape).
  const secoes: Record<string, string[]> = {};
  let rotuloAtual = "";
  $(".elementor-widget-theme-post-content, .elementor-widget-text-editor")
    .find("p, ul, h1, h2, h3, h4")
    .each((_, el) => {
      if (el.tagName.toLowerCase() === "ul") {
        const itens = $(el)
          .find("> li")
          .map((__, li) => $(li).text().trim())
          .get();
        if (rotuloAtual) secoes[rotuloAtual] = [...(secoes[rotuloAtual] ?? []), ...itens];
        return;
      }
      const texto = $(el).text().trim();
      if (texto.endsWith(":")) rotuloAtual = texto.replace(/:$/, "");
    });

  let larguraCm = 0;
  let alturaCm = 0;
  let profundidadeCm = 0;
  let alturaComPeCm: number | undefined;
  for (const linha of secoes["Medidas"] ?? []) {
    if (/^Altura com pé/i.test(linha)) alturaComPeCm = parseMetros(linha);
    else if (/^Altura/i.test(linha)) alturaCm = parseMetros(linha);
    else if (/^Largura/i.test(linha)) larguraCm = parseMetros(linha);
    else if (/^Profundidade/i.test(linha)) profundidadeCm = parseMetros(linha);
  }
  const medidas =
    larguraCm && alturaCm && profundidadeCm
      ? { larguraCm, alturaCm, profundidadeCm, ...(alturaComPeCm ? { alturaComPeCm } : {}) }
      : null;

  const imagens = new Set<string>();
  $("img.swiper-slide-image[data-lazy-src]").each((_, el) => {
    const src = $(el).attr("data-lazy-src");
    if (src) imagens.add(src);
  });

  return {
    nome,
    fabricante: "D'Doro",
    fonte: url,
    medidas,
    cores: secoes["Cores"] ?? [],
    composicao: secoes["Descrição do Produto"] ?? [],
    imagens: [...imagens],
    arquivos: [],
    completo: medidas !== null,
  };
}

async function baixarImagem(url: string, destino: string) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Falha ao baixar ${url}: HTTP ${res.status}`);
  await writeFile(destino, Buffer.from(await res.arrayBuffer()));
}

const OUT_DIR =
  process.env.IMPORT_OUT_DIR ??
  path.join(process.cwd(), "..", "..", "..", "scratchpad", "catalogo-fabrica");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const produtos: ProdutoImportado[] = [];
  for (const fonte of FONTES) {
    console.log(`Buscando ${fonte.tipo === "qrcodefacil" ? fonte.codigo : fonte.slug}...`);
    try {
      const produto =
        fonte.tipo === "qrcodefacil"
          ? await buscarQrCodeFacil(fonte.codigo)
          : await buscarDedoro(fonte.slug);
      produtos.push(produto);

      const slug = slugify(produto.nome);
      const imgDir = path.join(OUT_DIR, "imagens", slug);
      await mkdir(imgDir, { recursive: true });
      await Promise.all(
        produto.imagens.map(async (imgUrl, i) => {
          const ext = path.extname(new URL(imgUrl).pathname).split("?")[0] || ".jpg";
          const destino = path.join(imgDir, `${i}${ext}`);
          try {
            await baixarImagem(imgUrl, destino);
          } catch (err) {
            console.error(`  imagem ${i} falhou: ${(err as Error).message}`);
          }
        }),
      );
    } catch (err) {
      console.error(`  falhou: ${(err as Error).message}`);
    }
  }

  const jsonPath = path.join(OUT_DIR, "catalogo-fabrica.json");
  await writeFile(jsonPath, JSON.stringify(produtos, null, 2), "utf-8");

  const completos = produtos.filter((p) => p.completo).length;
  console.log(
    `\n${produtos.length} produtos processados, ${completos} com medidas completas.\n` +
      `JSON: ${jsonPath}\nImagens: ${path.join(OUT_DIR, "imagens")}`,
  );
}

main();
