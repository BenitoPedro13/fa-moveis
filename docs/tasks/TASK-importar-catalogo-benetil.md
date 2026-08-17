# TASK — Importar produtos Benetil (novo fornecedor)

Slug: `importar-catalogo-benetil`

---

## 1. Current scenario

`content/produtos.ts` has 13 real products, all from two suppliers already integrated (D'Doro via dedoromoveis.com.br; Novo Horizonte via qrcodefacil.com).

Benito provided 8 new products from a third supplier, **Benetil** (benetil.com.br — a furniture distributor), on 2026-08-17. Supplier data includes:
- A table with product references, descriptions, quantities in stock, and wholesale unit prices (`P.unit`).
- Three partial URLs to product pages on `benetil.com.br` where detailed specs + images can be scraped.

Products in the batch:

| Ref | Descrição | P.unit (wholesale) | Quant |
|---|---|---|---|
| 10104 | Cômoda Califórnia 8 Gavetas Cinamomo | R$ 557,40 | 1 |
| 8079 | Cômoda Milão Cinamomo / Off Arenas | R$ 456,60 | 2 |
| 7479 | Multiuso Sparta Cinamomo / Off Arenas | R$ 223,40 | 2 |
| 7479 | Multiuso Sparta Cinamomo | R$ 223,40 | 2 |
| 7479 | Multiuso Sparta Castanho | R$ 223,40 | 2 |
| 11925 | Balcão Flora Cinamomo | R$ 335,00 | 2 |
| 11925 | Balcão Flora Cinamomo / Off Arenas | R$ 335,00 | 1 |
| 11934 | Aéreo Central 1,20 Flora Refleta Cinamomo | R$ 365,00 | 2 |

**Links provided** (partial, product pages on benetil.com.br):
1. https://benetil.com.br/index.php?produto&cod=317 (Cômoda Califórnia)
2. https://benetil.com.br/index.php?produto&cod=292 (Cômoda Milão)
3. https://benetil.com.br/index.php?produto&cod=285 (Multiuso Sparta)
4. https://benetil.com.br/index.php?produto&cod=342 (Cozinha Modulada Flora — contains multiple related products)

**Price markup note**: Benito indicated prices shown are wholesale costs, and retail markup should be 2× (`P.unit × 2`). **However, per CLAUDE.md §0, no price is confirmed with Fátima yet.** `[VERIFY: confirm with Fátima whether 2× markup applies, and whether these products should display a calculated retail price or "Consulte o preço".`

**Categories**: Products span `comodas`, `multiusos`, `balcoes`, and `armarios-aereos` — all categories already in `content/categorias.ts`.

**Supplier status**: Benetil is a new third-party distributor, not a manufacturer. Unlike D'Doro and Novo Horizonte, this is a reseller relationship (Benito is sourcing for Fátima through Benetil's wholesale programme). Add `fabricante` field set to `"Benetil"` (or leave null if only the reseller matters, not the manufacturer behind these specific models).

## 2. Planned changes

### 2.1 `scripts/importar-catalogo-benetil.ts` (new)

A one-off scraper script (same pattern as `scripts/importar-catalogo-fabrica.ts`), not part of the app. Fetches the 4 Benetil product pages via browser automation (the site is JS-heavy), parses structured data, downloads images.

- **Input**: static list of 4 URLs, tagged with Benetil reference codes (10104, 8079, 7479, 11925, 11934).
- **Output**: `scratchpad/catalogo-benetil.json` with:
  - `nome`, `descricao`, `medidas` (larguraCm, alturaCm, profundidadeCm)
  - `cores` (array of color names found on the product page)
  - `imagens` (array of product photos from the listing page, downloaded locally)
  - `fonte` (source URL), `ref` (supplier reference code), `fornecedor: "Benetil"`
  - Explicit `null` for any field not found (no guesses).
- **Images**: downloaded to `scratchpad/frames/benetil/<slug>/`, fed through the existing `scripts/normalizar-imagens.ts` pipeline.

### 2.2 Handling variant confusion on repeated refs

Ref `7479` appears 3 times (Multiuso Sparta in three colour combos: Cinamomo/Off Arenas, Cinamomo, Castanho). These are **one product, three colour options** — not three separate SKUs. Same for Balcão Flora (ref 11925, 2 rows — likely 2 units in stock of the same model in one color).

The scraper will fetch ref `285` once (one product page), extract all color variants from that page, and output a single `Produto` entry with multiple `cores`. If Benetil's own product page doesn't list all variants, `[VERIFY: ask Benetil for complete color list for ref 7479 and 11925]`.

### 2.3 Manual merge into `content/produtos.ts`

Same as `TASK-importar-catalogo-fabrica.md` §2.5: hand-curated merge of JSON output into typed `Produto` entries. New entries:

- `comoda-california-8-gavetas` (ref 10104, categoria: `comodas`)
- `comoda-milao` (ref 8079, categoria: `comodas`)
- `multiuso-sparta` (ref 7479, categoria: `multiusos`)
- `balcao-flora` (ref 11925, categoria: `balcoes`)
- `aereo-central-flora` (ref 11934, categoria: `armarios-aereos`)

All new colours from Benetil must be added to `content/cores.ts` if not already present. So far, the supplied table mentions: `cinamomo`, `castanho`, `off arenas` (or "off white"). Verify against existing hex map.

### 2.4 Price handling — decision needed

Three options for the `.preco` field:

**A. Use marked-up wholesale prices as retail price** (`P.unit × 2`):
- Cômoda Califórnia: `R$ 1.114,80`
- Cômoda Milão: `R$ 913,20`
- Multiuso Sparta: `R$ 446,80`
- Balcão Flora: `R$ 670,00`
- Aéreo Central Flora: `R$ 730,00`

Requires `Preco` object with only `aVista` field populated (no parcel data on Benetil supplier link). `[VERIFY: confirm Fátima approves 2× markup and these prices before shipping.]`

**B. Leave price absent** (display "Consulte o preço"):
- Safe, consistent with current state for all 13 existing products.
- Defers pricing to Fátima's final decision.

**C. Store only wholesale cost, markup applied at display time**:
- Add optional `custoFornecedorCm` field to `Produto` or keep markup ratio as a rule in the code.
- More flexible but introduces new data model; not recommended yet.

**Recommendation**: Option B (leave price absent for now) — matches the existing pattern for all real supplier-sourced products, and avoids a guess about what Fátima actually wants to charge. Benito can confirm prices in a follow-up.

### 2.5 Dependencies & scripts

- Browser automation: use `mcp__claude-in-chrome__*` tools to fetch & screenshot pages (Benetil site is JS-rendered, unlike D'Doro/Novo Horizonte).
- No new npm dependencies.
- Add `importar-catalogo-benetil` entry to `package.json` `scripts` once the script exists (optional, for later re-runs).

### 2.6 Docs

- `docs/dados-produtos.md` — new section for Benetil-sourced products, source URLs, supplier note.
- `CLAUDE.md` — update status line to reflect 13 → 18 products (all real, now three suppliers).

## 3. Why

Benetil is a working source with current inventory, confirmed by Benito in stock on 2026-08-17. Adding real products increases the catalogue's scope without increasing the demo/filler ratio — keeps the pattern of "every product is real".

The three supplier sources (D'Doro, Novo Horizonte, Benetil) each have different data structures and hosting patterns, but the same workflow (scrape → JSON → human-reviewed merge) de-risks transcription errors while leaving Fátima in control of final decisions (price, live/offline status).

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `scripts/importar-catalogo-benetil.ts` | new | browser-based scraper → `scratchpad/catalogo-benetil.json`, downloads images |
| `content/produtos.ts` | edit | 5 new Benetil entries merged (18 products total) |
| `content/cores.ts` | edit | add `"off arenas"` color if not present |
| `docs/dados-produtos.md` | edit | new Benetil-sourced section with source URLs & notes |
| `CLAUDE.md` | edit | update status line (13 → 18 products) |
| `scripts/normalizar-imagens.ts` | (no change) | existing job list picks up `scratchpad/frames/benetil/` images |
| `public/produtos/comoda-california-8-gavetas/`, `comoda-milao/`, etc. | new dirs | AVIF product images after normalization |

## 5. Done when

- [ ] Browser scraper fetches all 4 Benetil URLs, parses product name/dims/colors/images correctly.
- [ ] Images normalized through existing pipeline, under 180 KB per image budget.
- [ ] `scratchpad/catalogo-benetil.json` generated and reviewed for accuracy.
- [ ] 5 new `Produto` entries merged into `content/produtos.ts`; `pnpm typecheck` passes.
- [ ] All new colors added to `content/cores.ts` with correct hex values.
- [ ] 18-product catalogue live at `/produtos` with new Benetil items; category filter includes them.
- [ ] Docs updated (`dados-produtos.md`, `CLAUDE.md`).
- [ ] `[VERIFY]` tags resolved or flagged in `CLAUDE.md` if deferred.

## 6. Open questions

- **Price markup confirmation**: Does Fátima want 2× markup on Benetil wholesale prices, or "Consulte o preço" for now?
- **Multiuso Sparta colors**: Are all three color variants listed on the Benetil product page (Cinamomo, Cinamomo/Off Arenas, Castanho), or do we need to verify separately?
- **Balcão Flora dimensions**: The product table doesn't include height/width — must be scraped from the Benetil page or flagged as missing.
- **Fabricante field**: Is "Benetil" (reseller) the right value, or should this be null/left blank since Benetil is the distributor, not the furniture maker?

---

**Next step**: Align on price handling (B recommended) and manufacturer attribution, then proceed with scraping.
