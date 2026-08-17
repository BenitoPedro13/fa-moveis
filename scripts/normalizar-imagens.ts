// Every product image is normalized to a 1:1 square on --papel before export (AVIF primary,
// WebP fallback; budget spec-architecture.md §13: largest product image < 180 KB). Padding is
// intentionally thin (3%, just enough to avoid resize/compression edge artifacts) — the grid
// (`ProdutoCard`) bleeds the photo to the card's own edges with `object-cover`, so any more
// padding than that would just get cropped away invisibly. The PDP (`GaleriaProduto`) still
// uses `object-contain` and shows the same square, papel included, next to its measurement
// frame — spec-design.md §6.3.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PAPEL = { r: 0xf7, g: 0xf0, b: 0xee };
const SIZE = 1000;
const PADDING_PCT = 0.03;

// Fractional crop box (0–1 of the source image), applied before trim/pad — for lifestyle
// photos where the furniture only fills part of the frame, so "produto" grid crops in tighter
// on the piece instead of showing the whole room. Fractions instead of hardcoded pixels so this
// doesn't depend on getting screen-viewer scaling exactly right.
type Crop = { left: number; top: number; width: number; height: number };
type Job = {
  src: string;
  slug: string;
  nome: string;
  crop?: Crop;
  /** Studio product shots on a plain white background — thresholds near-white pixels to
   * transparent so --papel shows through instead of a visible white rectangle behind the
   * furniture (white ≠ papel; the two read as a border once trim() gets close to the piece). */
  removerFundoBranco?: boolean;
};

const jobs: Job[] = [
  {
    src: "roupeiro_monaco_produto2.png",
    slug: "roupeiro-monaco",
    nome: "produto",
    removerFundoBranco: true,
  },
  { src: "roupeiro_monaco_tecnico_clean.png", slug: "roupeiro-monaco", nome: "tecnico" },
  { src: "fruteira_ambiente_tight.png", slug: "fruteira", nome: "ambiente" },
  { src: "fruteira_tecnico3.png", slug: "fruteira", nome: "tecnico" },
  {
    src: "aereo_max_cutout_tight.png",
    slug: "armario-aereo-max",
    nome: "produto-branco",
    removerFundoBranco: true,
  },
  {
    src: "aereo_max_labeled_tight.png",
    slug: "armario-aereo-max",
    nome: "produto-carvalho",
    removerFundoBranco: true,
  },
  { src: "aereo_max_medidas.png", slug: "armario-aereo-max", nome: "tecnico" },
  // D'Doro (fabricante) product photography, downloaded by
  // scripts/importar-catalogo-fabrica.ts — docs/tasks/TASK-importar-catalogo-fabrica.md.
  // Real supplier renders for real stock, not the demo-filler illustrations above.
  {
    src: "roupeiro-monaco-plus-6pts/0.jpg",
    slug: "roupeiro-monaco-plus-6-portas",
    nome: "produto",
    removerFundoBranco: true,
  },
  {
    src: "roupeiro-monaco-plus-6pts/3.jpg",
    slug: "roupeiro-monaco-plus-6-portas",
    nome: "produto-branco",
    removerFundoBranco: true,
  },
  {
    src: "roupeiro-colibri-6pts/0.jpg",
    slug: "roupeiro-colibri-6-portas",
    nome: "produto",
    removerFundoBranco: true,
  },
  {
    src: "roupeiro-colibri-6pts/5.jpg",
    slug: "roupeiro-colibri-6-portas",
    nome: "produto-castanho",
    removerFundoBranco: true,
  },
  {
    src: "roupeiro-meridian-plus-3pts/0.jpg",
    slug: "roupeiro-meridian-plus-3-portas",
    nome: "produto",
    removerFundoBranco: true,
  },
  {
    src: "roupeiro-meridian-plus-3pts/2.jpg",
    slug: "roupeiro-meridian-plus-3-portas",
    nome: "produto-branco",
    removerFundoBranco: true,
  },
  // Novo Horizonte (fabricante) — qrcodefacil only has one lifestyle-styled render per item, no
  // plain cutout. Cropped tight on the piece (client call, 2026-08-17 — real photo beats a
  // generic category icon, even zoomed into a room shot) and typed "produto" so it's the grid
  // image directly, no icon fallback needed.
  {
    src: "comoda-austria-5-gavetas/0.jpg",
    slug: "comoda-austria-5-gavetas",
    nome: "produto",
    crop: { left: 0.2, top: 0.08, width: 0.45, height: 0.85 },
  },
  {
    src: "comoda-space/0.jpg",
    slug: "comoda-space-5-gavetas-2-portas",
    nome: "produto",
    crop: { left: 0.1, top: 0.08, width: 0.52, height: 0.85 },
  },
  {
    src: "comoda-deca-10-gavetas/0.jpg",
    slug: "comoda-deca-10-gavetas",
    nome: "produto",
    crop: { left: 0.18, top: 0.18, width: 0.6, height: 0.75 },
  },
  {
    src: "cabeceira-box-himalaia/0.jpg",
    slug: "cabeceira-box-himalaia",
    nome: "produto",
    removerFundoBranco: true,
  },
  {
    src: "cabeceira-everest/0.jpeg",
    slug: "cabeceira-everest",
    nome: "produto",
    crop: { left: 0.12, top: 0.3, width: 0.76, height: 0.58 },
  },
  {
    src: "guarda-roupa-buriti-3-portas-9-gavetas/0.jpg",
    slug: "roupeiro-buriti-3-portas-9-gavetas",
    nome: "produto",
    crop: { left: 0.2, top: 0.05, width: 0.6, height: 0.95 },
  },
  {
    src: "guarda-roupa-encant-6-portas/0.png",
    slug: "roupeiro-encant-6-portas-6-gavetas",
    nome: "produto",
    crop: { left: 0.2, top: 0.08, width: 0.72, height: 0.9 },
  },
  {
    src: "guarda-roupa-paradizzo/0.jpg",
    slug: "roupeiro-paradizzo",
    nome: "produto",
    crop: { left: 0.18, top: 0.02, width: 0.66, height: 0.8 },
  },
  {
    src: "cama-verona-solteiro/0.png",
    slug: "cama-verona-solteiro",
    nome: "produto",
    crop: { left: 0.0, top: 0.05, width: 0.95, height: 0.85 },
  },
  {
    src: "cama-verona-casal/0.jpg",
    slug: "cama-verona-casal",
    nome: "produto",
    crop: { left: 0.18, top: 0.3, width: 0.65, height: 0.68 },
  },
];

const RAW_DIR =
  process.env.RAW_FRAMES_DIR ??
  path.join(process.cwd(), "..", "..", "..", "scratchpad", "frames");
const OUT_ROOT = path.join(process.cwd(), "public", "produtos");

// Thresholds near-white pixels to fully transparent, so compositing onto the papel canvas
// below shows papel instead of a visible white rectangle. Simple global RGB threshold — works
// for a flat studio-photography background, not for anything with shadows/gradients baked in
// near the edges (those keep a faint white halo, acceptable trade-off over the current
// white-vs-papel border).
async function removerFundoBranco(input: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

async function normalizar(job: Job) {
  const inputPath = path.join(RAW_DIR, job.src);
  const outDir = path.join(OUT_ROOT, job.slug);
  await mkdir(outDir, { recursive: true });

  // Lifestyle ("ambiente") sources have no white margin to trim — the furniture itself only
  // fills part of a full-room frame, so job.crop zooms in on it first (fractional, not
  // hardcoded pixels, computed against this file's own dimensions).
  let source: Buffer = await sharp(inputPath).toBuffer();
  if (job.crop) {
    const srcMeta = await sharp(source).metadata();
    const fullW = srcMeta.width ?? SIZE;
    const fullH = srcMeta.height ?? SIZE;
    source = await sharp(source)
      .extract({
        left: Math.round(job.crop.left * fullW),
        top: Math.round(job.crop.top * fullH),
        width: Math.round(job.crop.width * fullW),
        height: Math.round(job.crop.height * fullH),
      })
      .toBuffer();
  }

  // Supplier renders already carry their own generous white margin around the furniture
  // (product photography convention, not our 12% padding). Trimming that off first means the
  // 12% below is measured against the actual silhouette, not the silhouette-plus-margin the
  // photographer left — otherwise the two margins stack and the piece reads as tiny inside its
  // grid square. Lifestyle sources (cropped above, or with no uniform border) make trim() a
  // no-op — safe to run unconditionally.
  let trimmed: Buffer;
  try {
    trimmed = await sharp(source).trim({ background: "#ffffff", threshold: 15 }).toBuffer();
  } catch {
    trimmed = source;
  }

  if (job.removerFundoBranco) {
    trimmed = await removerFundoBranco(trimmed);
  }

  const meta = await sharp(trimmed).metadata();
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
    .composite([{ input: trimmed, gravity: "center" }])
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
