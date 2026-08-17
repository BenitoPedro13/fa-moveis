# TASK — Importar produtos reais do catálogo impresso (QR codes da fábrica)

Slug: `importar-catalogo-fabrica`

---

## 1. Current scenario

`content/produtos.ts` has 30 products: 3 real and fully transcribed from Fátima's own Facebook
capture (`docs/dados-produtos.md`), and 27 disclosed demo filler with generic names and
measurements sourced from unrelated public retail listings (`TASK-catalogo-demo.md`).

Fátima has never had a digital catalogue — only a printed one, with a QR code per item. After
seeing the demo, she asked Benito to add real data for items from that printed catalogue. He
sent 12 URLs from the QR codes over WhatsApp (2026-08-17), landing on two different third-party
systems:

**`qrcodefacil.com/{code}` — 9 links.** Looks like a plain image-and-two-buttons page (see
screenshot: `Cômoda Áustria 5 Gavetas`), and looked JS-rendered (React SPA, CRA build — no data
in the initial HTML). Investigated the bundle: the public page reads from an **unauthenticated
JSON endpoint**, `GET https://api.qrfacil.me/qrcode/{code}/content` — confirmed working via
plain `curl` for all 9 codes, no headless browser needed. Returns: product `name`, one product
`files.image` (S3 URL), and 1–3 `buttons` (manual PDF / assembly video, mostly Google Drive
links — several buttons are byte-identical across products, e.g. the "Corrediça telescópica"
video). **No measurements, colors, materials, or price anywhere in this source.**

**`dedoromoveis.com.br/_produtos/{slug}/` — 3 links.** A WordPress/Elementor site, plain
server-rendered HTML (confirmed via `curl`, matches what the user's own screenshot shows) —
no JS execution needed either. Each page has: `<h1>` product name, a `Descrição do Produto:`
`<li>` list (materials/construction), a `Medidas:` `<li>` list (`Altura`, `Altura com pé`,
`Largura`, `Profundidade` — same 4-line shape on all 3 pages checked), a `Cores:` `<li>` list,
and a lazy-loaded image gallery (`data-lazy-src` on `.swiper-slide-image`, real URLs present in
the raw HTML, several photos per color variant). Brand shown on the page: **D'Doro**.

Client-confirmed (2026-08-17): the two sources are two separate suppliers behind her printed
catalogue, not the same factory under two names. **Novo Horizonte** is the factory behind the
`qrcodefacil.com` items; **D'Doro** (`dedoromoveis.com.br`) is the separate brand/factory behind
the other 3. Both are stored per-product going forward (`Produto` doesn't have a
manufacturer field today — see §2.5).

Products behind the 12 links, by source:

| Source | Product name (as given) | Measurements/colors available? |
|---|---|---|
| dedoromoveis | Roupeiro Mônaco Plus 6 Portas 12 Gavetas | ✅ full |
| dedoromoveis | Roupeiro Colibri 6pts | ✅ full |
| dedoromoveis | Roupeiro Meridian Plus 3pts | ✅ full |
| qrcodefacil | Guarda-Roupa Encant 6 Portas | ❌ name + photo + manual only |
| qrcodefacil | Guarda-Roupa Buriti 3 Portas 9 Gavetas | ❌ |
| qrcodefacil | Guarda-Roupa Paradizzo | ❌ |
| qrcodefacil | Cabeceira Box Himalaia | ❌ |
| qrcodefacil | Cabeceira Everest | ❌ |
| qrcodefacil | Cama Verona Casal e Solteiro | ❌ |
| qrcodefacil | Cômoda Space | ❌ |
| qrcodefacil | Cômoda Deca 10 Gavetas | ❌ |
| qrcodefacil | Cômoda Áustria 5 Gavetas | ❌ |

None of `camas`, `cabeceiras`, `comodas` exist in `content/categorias.ts` today (current set:
`roupeiros`, `cozinhas`, `balcoes`, `armarios-aereos`, `aparador-bar`, `fruteiras`, `multiusos`,
`tabuas-de-passar` — all sourced from her own Facebook album names per
`spec-architecture.md` §1.1). `content/cores.ts` is also missing `cinamomo`, `castanho`,
`cumaru`, and has no pattern yet for compound names like `"Castanho com off white"`.

No script in `scripts/` does structured content scraping today — only image normalization
(`scripts/normalizar-imagens.ts`).

## 2. Planned changes

### 2.1 `scripts/importar-catalogo-fabrica.ts` (new)

A one-off script, run via `tsx` like `normalizar-imagens.ts`, **not part of the app**. It does
not write into `content/produtos.ts` directly — it writes a reviewable JSON dump to
`scratchpad/` for Benito to check before hand-merging. Reasoning in §3.

- Static list of the 12 source URLs (from this WhatsApp thread), tagged by which fetcher applies.
- **qrcodefacil fetcher**: `GET https://api.qrfacil.me/qrcode/{code}/content` directly (no
  browser). Maps `name` → product name, `files.image` → one photo, `buttons[].url` → manual/
  video links (kept as reference, not shipped as product images).
- **dedoromoveis fetcher**: `GET` the page HTML directly, parse with `cheerio` (new dependency —
  see §2.4) for: `<h1>` name, the `Medidas:` list → `larguraCm`/`alturaCm`/`profundidadeCm`
  (parse `"2,30m"` → `230`), the `Cores:` list, the `Descrição do Produto:` list (kept as
  descriptive notes, not asserted as `Produto.descricao` verbatim — that field is her voice per
  CLAUDE.md, not the supplier's spec-sheet bullet list), and every `data-lazy-src` under
  `.swiper-slide-image` for the gallery.
- Downloads every discovered image into `scratchpad/frames/fabrica/<slug>/` (raw), so the
  **existing** `scripts/normalizar-imagens.ts` job list can pick them up for the resize/pad/AVIF
  pipeline — reusing that tool per CLAUDE.md §2 instead of writing a second image pipeline.
- Output: one JSON object per product in `scratchpad/catalogo-fabrica.json` with every scraped
  field plus a `fonte` (source URL) and `completo: boolean` (true only for the 3 dedoromoveis
  items that have real measurements). Every qrcodefacil-only item gets `medidas: null`,
  `cores: []`, explicitly — not a guess, not silently dropped.

### 2.2 Missing specs on the 9 qrcodefacil items

These 9 have no measurements/colors in their own source. Two options, not mutually exclusive:

1. Ship them as `[VERIFY]` stubs (name + one photo only, no `medidas`/`cores`/`preco`) — safe,
   consistent with how `docs/dados-produtos.md` already handles partially-legible items.
2. Try to find a spec sheet elsewhere by product name (the user's own suggestion) — e.g. some of
   these names ("Cômoda", "Cabeceira", "Cama") might also appear on dedoromoveis.com.br or
   another Novo Horizonte reseller under the same or a near-identical name.

Option 2 is **not** run automatically inside the script — matching "Cômoda Space" found on some
other site to *this specific* Cômoda Space, by name alone, without a shared photo/SKU to confirm
it's the same product, is exactly the kind of guess CLAUDE.md §0 forbids (generic furniture
names collide across Brazilian retailers constantly). If pursued, it has to be a manual
per-product check — same photo, same color list, same construction bullets — before a
measurement gets typed into `content/produtos.ts`, not an automated find-and-fill.

**Recommendation: ship as `[VERIFY]` stubs first** (still a real win — real name, real photo,
real manual link, sourced from her own printed catalogue), and treat "hunt down the missing
specs" as a separate, smaller follow-up per product, only where a confident match exists.

### 2.3 `content/categorias.ts` — new categories

Client-confirmed: use the catalogues' own naming (their product-type words), same rule
`spec-architecture.md` §1.1 already applies to her Facebook albums. Three new categories, one
per product type seen in these 12 items: `camas` (Cama), `cabeceiras` (Cabeceira), `comodas`
(Cômoda). `roupeiros` already exists and covers the 6 wardrobe items.

### 2.4 `content/cores.ts` — new colour entries

Add `cinamomo`, `castanho`, `cumaru` to the `hexPorNome` map. Compound names ("Castanho com off
white") need a decision: split into two `Cor` entries (one swatch per stated colour) vs. one
combined swatch. Leaning toward splitting — matches how `Produto.cores` is already modeled as an
array — but flagging since it changes how the PDP colour picker will render for these 3 items.

### 2.5 `content/produtos.ts` — the actual new entries

Manual, reviewed merge of the script's JSON output (§2.1) into typed `Produto` entries, once
§2.3/§2.4 are resolved. Not automated — this file is hand-curated real client data; a script
writing directly into it risks silently producing a `Produto` that type-checks but asserts a
fact CLAUDE.md forbids guessing.

`lib/catalog/types.ts` needs an optional `fabricante?: string` on `Produto` — today's 3 hers +
27 filler products have no manufacturer field at all, but these 12 are explicitly two named
suppliers (Novo Horizonte / D'Doro) and that's worth surfacing rather than dropping on the
floor.

### 2.6 Dependency: `cheerio`

New `devDependency`. Regex-parsing the WordPress HTML would work for the 3 pages checked but is
fragile against any markup change; `cheerio` is the standard tool for this and used one-off,
like `sharp` already is for images (CLAUDE.md §2).

### 2.7 Docs

- `docs/dados-produtos.md` — new section for the Novo Horizonte / D'Doro sourced items, with the
  `[VERIFY]` on the factory/brand relationship, and the taxonomy gap from §2.3.
- `CLAUDE.md` — status line once real products are merged in.

## 3. Why

Fátima gave this after seeing the demo — it's the next real step toward "more of her real stock
is transcribed" (`CLAUDE.md` status line), not more disclosed filler. But the two sources are
structurally different enough (one clean JSON API with no specs, one full-spec WordPress page)
that hand-transcribing 12 items risks the exact kind of typo CLAUDE.md is trying to prevent —
mistyping `2,30m` as `230` vs `203`, missing a colour, etc. A script that copies the source
strings verbatim into a reviewable JSON file, instead of a human retyping them, is the safer
path — and it still stops short of writing directly into `content/produtos.ts`, so a human makes
every final call on what ships as a real spec vs. what stays `[VERIFY]`.

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `scripts/importar-catalogo-fabrica.ts` | new | scrapes both sources → `scratchpad/catalogo-fabrica.json`, downloads raw images |
| `package.json` | edit | add `cheerio` devDependency, `importar-catalogo-fabrica` script |
| `content/categorias.ts` | not touched | deferred — only needed for the 9 Novo Horizonte items |
| `content/cores.ts` | edit | added `cinamomo`, `castanho`, `cumaru` (+ 3 compound-name entries) |
| `lib/catalog/types.ts` | edit | added optional `Produto.fabricante` |
| `content/produtos.ts` | edit | 3 D'Doro entries merged; 9 Novo Horizonte items deferred |
| `scripts/normalizar-imagens.ts` | edit | 6 new job entries (2 images × 3 D'Doro products) |
| `docs/dados-produtos.md` | edit | new sourced-products section, factory/brand `[VERIFY]` |
| `CLAUDE.md` | edit | status line |

## 5. Done when

- [x] Script fetches all 12 sources and produces `catalogo-fabrica.json` with every field
  populated or explicitly `null`, never a guess.
- [x] Images normalized through the existing pipeline, under the 180 KB budget
  (`spec-architecture.md` §13) — largest output 11 KB.
- [x] `content/produtos.ts` has 33 products (30 + 3 D'Doro); `pnpm build`/`typecheck`/`lint`
  clean; production PDP checked for the new slugs (medidas, cores, "Consulte o preço", images
  all render correctly).
- [x] `docs/dados-produtos.md` and `CLAUDE.md` updated.
- [ ] **Deferred, client decision 2026-08-17**: the 9 Novo Horizonte items are *not* merged —
  only the 3 D'Doro roupeiros are, since Novo Horizonte's own source has no measurements. Benito
  is visiting the store to confirm prices with Fátima in person and will source the other 9
  items' specs from other resellers' sites at the same time — so `camas`/`cabeceiras`/`comodas`
  categories, their colour entries, and their `content/produtos.ts` entries all wait for that.
  `scratchpad/catalogo-fabrica.json` (name/photo/manual links for all 9) survives only for this
  session — re-run `scripts/importar-catalogo-fabrica.ts` to regenerate it.
- [ ] Found the manufacturer's own site, `moveisnovohorizonte.com.br` — same
  `_produtos/{slug}/` WordPress structure as D'Doro's, confirmed `roupeiro-paradizzo` and
  `roupeiro-himalaia-2` respond (name matches 2 of the 9 missing items) after warming a session
  cookie from the homepage first (plain `curl` 403s without one). Started timing out after a
  handful of requests — looked like rate-limiting on their end, not pursued further to avoid
  hammering a third party's production site. Revisit slowly, one request at a time, when doing
  the follow-up.
- [ ] Confirmed better source for the missing 9: the assembly-manual PDFs linked from each
  qrcodefacil button **do** carry a dimensions page (verified on the Cômoda Áustria manual —
  Altura 1025mm / Largura 693mm / Profundidade 450mm). `importar-catalogo-fabrica.ts` doesn't
  fetch/parse PDFs yet — worth adding when picking this back up, since it may be a more reliable
  match than searching other resellers by name (§2.2's own concern about name collisions).
