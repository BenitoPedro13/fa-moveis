# TASK — Expand the catalogue for the pitch demo

Slug: `catalogo-demo` · Written retroactively as the work happened fast in response to direct
client-facing feedback mid-session; still recording it per CLAUDE.md §1 so there's a document a
reviewer can check the decisions against. Builds on `TASK-scaffold-catalogo.md`.

---

## 1. Current scenario (before this task)

`content/produtos.ts` had 3 products, all hers, fully transcribed. `/produtos` and the PDP
worked but looked thin for a first-look pitch — 3 cards doesn't read as "a real store," the PDP
was a single static image with a flat spec list, and the home page's products preview was
either empty-feeling or (briefly, mid-task) dumping all products with no cap.

## 2. Planned changes

### 2.1 27 demo-filler products

Real dimensions sourced from live Brazilian retail listings (mostly madeiramadeira.com.br),
via parallel research agents — one per pair of categories, each required to cite a source URL
per product and forbidden from estimating. Generic model names (e.g. "Roupeiro Verona 6
Portas") that don't match any name Fátima has used, specifically so nothing here reads as a
claim about her actual inventory. `content/produtos.ts` now documents this rule inline at the
top of the file.

Pricing (`precoIlustrativo()` in `content/produtos.ts`) applies her own real, confirmed payment
terms (`content/loja.ts`: 12x sem juros, desconto à vista) to the sourced market price — not a
copied installment plan from the source retailer, which would be a different store's terms.

### 2.2 Images

Two rounds, because the first one didn't land:

- **Round 1**: line-icon illustrations per category (`public/icons/categorias/*.svg`), 1px rose
  strokes matching `spec-design.md` §7.1's own drawn-icon treatment. Zero licensing risk, on
  brand. Used as the primary grid image for all 27 demo products.
- **Round 2** (after direct feedback that this undershot "grab the images"): sourced real,
  freely-licensed photos (Unsplash License — free commercial use, no attribution required) for
  the 3 categories where a genuinely good match existed (`cozinhas`, `balcoes`,
  `armarios-aereos` — real cabinetry, on-brand neutral tones). Wired in as a **secondary**
  `ambiente`-type image (PDP thumbnail strip only), never the grid cutout — a whole-kitchen
  lifestyle photo standing in for one specific SKU would violate `spec-design.md` §9's own rule
  that room photos are `ambiente`, never the grid image. 5 categories stayed icon-only: no
  decent stock exists for `aparador-bar`/`fruteiras`/`tabuas-de-passar` (too Brazilian-specific
  for Western stock libraries), and the candidates found for `roupeiros` (bare empty room) and
  `multiusos` (red shelving, clashes with the palette) weren't good enough to use.
  Attribution: `public/produtos/_categoria/ATTRIBUTION.md`.

**Explicitly rejected**: scraping/rehosting the retailers' own product photos. Once this site is
on a public URL, that's a specific competitor's copyrighted product photography presented as
F&A's — real exposure, not a style choice.

### 2.3 UI fixes found along the way

- `ProdutoCard` root needed `h-full` — CSS Grid's `align-items: stretch` doesn't propagate
  through a flex child that isn't told to fill it, so cards in the same row went uneven height.
- Product name clamped to a fixed 2-line box (`line-clamp-2 min-h-[2lh]`) so a long name
  doesn't push one card taller than its row-mates.
- `ProdutosRelacionados` was dumping all 29 other products into a wrapping grid — capped to 8
  (same category first), horizontal scroll strip instead.
- Home page's "Nossos móveis" preview was mapping the *entire* catalogue — capped to 8
  (`PREVIEW_COUNT`).
- Category filter pills on `/produtos` (`?categoria=`) — added because the PDP breadcrumb now
  links to one and it needed to actually work.
- `AvisoIlustrativo` — the sanctioned illustrative-pricing disclaimer (`spec-architecture.md`
  §11) extended to also cover the demo-filler products, shown on `/produtos` and the home page.
- Active filter pill used `bg-rosa text-papel`, which is exactly the contrast failure
  `spec-design.md` §4 documents (`--rosa` on `--papel` is 3.19:1, non-text only) — caught by a
  Lighthouse accessibility regression (100 → 96), fixed to `bg-rosa-forte` (4.71:1, AA).
- `scripts/normalizar-imagens.ts` bug: chaining `.resize()` directly after `.composite()` on a
  `create()` canvas makes libvips reorder the pipeline and reject inputs larger than the resize
  target, even though the canvas itself is big enough. Fixed by materializing the composited
  buffer first, then resizing in a separate `sharp()` call.
- `GaleriaProduto` was defaulting to the category icon (`tipo: 'produto'`) over the real
  `ambiente` photo when a product carries both — backwards, since the icon is a fallback for
  when no photo exists, not something to prefer over a real one. Now defaults to the first
  non-icon image (path not under `/icons/`); grid cards (`ProdutoCard`) are unaffected and keep
  using the icon on purpose (spec-design.md §9 — a room photo is never the grid cutout).
- Added `components/layout/NavCategorias.tsx` — the category icon rail spec-design.md §7.1
  actually calls for on the home page. The icons already existed (built for the demo products);
  this is the second, originally-intended use, linking into the `/produtos?categoria=` filter.

## 3. Why

The client wants the demo to look like a real, browsable store before showing Fátima — 3
products doesn't clear that bar, and the images-are-swappable-later call already made means the
data-integrity line (never invent a measurement) is the one that actually matters here, not
image polish. Sourcing real market data and disclosing the illustration keeps that line intact
while still filling the grid.

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `content/produtos.ts` | edit | 3 → 30 products |
| `content/cores.ts` | new | colour name → hex for swatches |
| `public/icons/categorias/*.svg` | new | 8 category line-icons |
| `public/produtos/_categoria/**` | new | 3 shared stock photos (normalised) + attribution |
| `components/produto/AvisoIlustrativo.tsx` | new | illustrative-pricing/catalogue disclaimer |
| `components/produto/ProdutosRelacionados.tsx` | edit | capped, horizontal scroll, same-category-first |
| `components/produto/ProdutoCard.tsx` | edit | `h-full`, title clamp |
| `app/produtos/page.tsx` | edit | category filter, disclaimer |
| `app/page.tsx` | edit | capped preview, disclaimer, count divider |
| `scripts/normalizar-imagens.ts` | edit | composite/resize pipeline bug fix |
| `CLAUDE.md` | edit | status line |

## 5. Done when

- [x] `pnpm build` / `pnpm typecheck` / `pnpm lint` clean with 30 products.
- [x] Lighthouse mobile on `/produtos` (production build, local): Performance 93,
  Accessibility 100.
- [x] No product image over 180 KB (stock photos ~17–23 KB, icons are SVG).
- [x] Every new product's measurements trace to a cited source URL (in the research agents'
  reports; not re-copied into the repo, but every number in `content/produtos.ts` came from
  one).
- [ ] Not done: real product-count verification against what she'd actually recognize — this
  is demo filler by design, flagged as such on-page.
