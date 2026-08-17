// spec-design.md §9 — the normalising rule: every grid image is 1:1, on --papel, with 12%
// internal padding. Knocks out residual white/near-white to --papel so supplier cut-outs on a
// plain background read as one consistent set. Outputs AVIF (primary) + WebP (fallback),
// budget spec-architecture.md §13: largest product image < 180 KB.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PAPEL = { r: 0xf7, g: 0xf0, b: 0xee };
const SIZE = 1000;
const PADDING_PCT = 0.12;

type Job = { src: string; slug: string; nome: string };

const jobs: Job[] = [
  { src: "roupeiro_monaco_produto2.png", slug: "roupeiro-monaco", nome: "produto" },
  { src: "roupeiro_monaco_tecnico_clean.png", slug: "roupeiro-monaco", nome: "tecnico" },
  { src: "fruteira_ambiente_tight.png", slug: "fruteira", nome: "ambiente" },
  { src: "fruteira_tecnico3.png", slug: "fruteira", nome: "tecnico" },
  { src: "aereo_max_cutout_tight.png", slug: "armario-aereo-max", nome: "produto-branco" },
  { src: "aereo_max_labeled_tight.png", slug: "armario-aereo-max", nome: "produto-carvalho" },
  { src: "aereo_max_medidas.png", slug: "armario-aereo-max", nome: "tecnico" },
  // Freely-licensed (Unsplash License) stock photos, shared per category as a secondary
  // "ambiente" image on demo products — never the primary grid cutout. See stock/ATTRIBUTION.md.
  { src: "stock/cozinhas.jpg", slug: "_categoria/cozinhas", nome: "ambiente" },
  { src: "stock/balcoes.jpg", slug: "_categoria/balcoes", nome: "ambiente" },
  { src: "stock/armarios-aereos.jpg", slug: "_categoria/armarios-aereos", nome: "ambiente" },
  // D'Doro (fabricante) product photography, downloaded by
  // scripts/importar-catalogo-fabrica.ts — docs/tasks/TASK-importar-catalogo-fabrica.md.
  // Real supplier renders for real stock, not the demo-filler illustrations above.
  {
    src: "roupeiro-monaco-plus-6pts/0.jpg",
    slug: "roupeiro-monaco-plus-6-portas",
    nome: "produto",
  },
  {
    src: "roupeiro-monaco-plus-6pts/3.jpg",
    slug: "roupeiro-monaco-plus-6-portas",
    nome: "produto-branco",
  },
  { src: "roupeiro-colibri-6pts/0.jpg", slug: "roupeiro-colibri-6-portas", nome: "produto" },
  {
    src: "roupeiro-colibri-6pts/5.jpg",
    slug: "roupeiro-colibri-6-portas",
    nome: "produto-castanho",
  },
  {
    src: "roupeiro-meridian-plus-3pts/0.jpg",
    slug: "roupeiro-meridian-plus-3-portas",
    nome: "produto",
  },
  {
    src: "roupeiro-meridian-plus-3pts/2.jpg",
    slug: "roupeiro-meridian-plus-3-portas",
    nome: "produto-branco",
  },
];

const RAW_DIR =
  process.env.RAW_FRAMES_DIR ??
  path.join(process.cwd(), "..", "..", "..", "scratchpad", "frames");
const OUT_ROOT = path.join(process.cwd(), "public", "produtos");

async function normalizar(job: Job) {
  const inputPath = path.join(RAW_DIR, job.src);
  const outDir = path.join(OUT_ROOT, job.slug);
  await mkdir(outDir, { recursive: true });

  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? SIZE;
  const h = meta.height ?? SIZE;
  const side = Math.round(Math.max(w, h) / (1 - PADDING_PCT * 2));

  // Composite and resize in separate pipelines — chaining .resize() straight after
  // .composite() on a create() canvas makes libvips reorder the ops and choke once the
  // composited input is larger than the resize target ("Image to composite must have same
  // dimensions or smaller"), even though the canvas itself is already big enough.
  const composited = await sharp({
    create: {
      width: side,
      height: side,
      channels: 3,
      background: PAPEL,
    },
  })
    .composite([{ input: inputPath, gravity: "center" }])
    .png()
    .toBuffer();

  const padded = await sharp(composited).resize(SIZE, SIZE).png().toBuffer();

  const base = path.join(outDir, job.nome);
  await sharp(padded).avif({ quality: 60 }).toFile(`${base}.avif`);
  await sharp(padded).webp({ quality: 70 }).toFile(`${base}.webp`);

  console.log(`  ${job.slug}/${job.nome} ✓`);
}

async function main() {
  console.log(`Reading raw frames from ${RAW_DIR}`);
  for (const job of jobs) {
    await normalizar(job);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
