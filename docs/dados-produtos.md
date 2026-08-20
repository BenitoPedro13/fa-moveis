# Product data — transcribed from the Facebook capture

Source: `videos/F&A-Moveis-Facebook.mov`, frames read at 980 px wide.
**This file is the only place these measurements exist outside the video.** Everything below
marked ✅ was read directly off a supplier spec sheet in the capture. Everything marked
`[VERIFY]` was **not** legible and must not be guessed — CLAUDE.md §0.

Feeds `content/produtos.ts` (TASK-scaffold-catalogo.md §2.4). Store all values as **numbers in
cm**; format at the edge via `lib/format.ts`.

---

## Confirmed

### Roupeiro Mônaco ✅
| Field | Value |
|---|---|
| Categoria | `roupeiros` |
| Ambiente | `quarto` |
| Largura | **240 cm** (`2.40 m` on the drawing) |
| Altura | **230 cm** (`2.30 m`) |
| Profundidade | **55 cm** (`0.55 m`) |
| Cores | `[VERIFY]` — render is a dark walnut, colour name not printed |
| Her caption | "Roupeiro de casal deslumbrante, isso e muito mais você encontra na F&A Móveis!" |
| Posted | 22 Feb 2022 |

### Fruteira ✅
| Field | Value |
|---|---|
| Categoria | `fruteiras` |
| Ambiente | `cozinha` |
| Largura | **107 cm** |
| Altura | **88 cm** |
| Profundidade | **39 cm** |
| Cores | **Branca** (post says `Cor: Branca`) |
| Notes | 2 doors + 3 pull-out wire baskets, on castors |
| Posted | 23 Apr 2020, album `Fruteiras` (4 photos) |

### Armário Aéreo Max ✅
| Field | Value |
|---|---|
| Categoria | `armarios-aereos` |
| Ambiente | `cozinha` |
| Largura | **120 cm** (`1200 mm`; also captioned `ARMÁRIO AÉREO MAX 120 CM`) |
| Altura | **58 cm** (`580 mm`) |
| Profundidade | **32 cm** (`320 mm`) |
| Peso suportado | **22,50 kg** — populates `Medidas.pesoSuportadoKg` |
| Cores | `[VERIFY]` — white and a light woodgrain both shown, names not printed |
| Posted | 18 Apr 2020, album `Armários Aéreos` (6 photos) |

> The `I / H / Z` glyphs on these sheets are the supplier's height / width / depth icons.
> Mapping above assumes `580 mm` = height, `1200 mm` = width — consistent with the render's
> proportions and the `120 CM` caption. `[VERIFY: confirm with Fátima or a second sheet.]`

---

## Partially legible

### Balcão Max
| Field | Value |
|---|---|
| Categoria | `balcoes` |
| Ambiente | `cozinha` |
| Cores | **Ipê**, **Off White** ✅ (`CORES DISPONÍVEIS: IPE; OFF WHITE`) |
| Medidas | `[VERIFY]` — a `120 CM` and a second figure appear on the sheet but were not readable at capture resolution |
| Her caption | "Lindo balcão para deixar sua cozinha ainda mais bonita e aconchegante!" |
| Posted | 7 Feb 2022, album `Balcões Utilitários` |

### Armário Aéreo Plus
| Field | Value |
|---|---|
| Categoria | `armarios-aereos` |
| Medidas | `[VERIFY]` — same sheet layout as Max, figures not readable |
| Notes | Appears alongside `Armário Aéreo Life 3 Portas` in the same album |

### Kit Sampaio 8 Pts
| Field | Value |
|---|---|
| Categoria | `cozinhas` |
| Medidas | `[VERIFY]` — none printed on the visible frame |
| Notes | 8-piece kitchen kit. Good hero candidate: the only styled room render in the set |

---

## How to resolve the gaps

Re-read the source at full resolution rather than guessing. The spec sheets sit in the
right-hand post column of a 1930×2062 capture:

```sh
ffmpeg -ss <seconds> -i "videos/F&A-Moveis-Facebook.mov" -frames:v 1 \
  -vf "crop=1010:1900:900:300" frame.png
```

Timestamps with spec sheets: **4–5 s** (Balcão Max), **13–14 s** (Fruteira),
**19–20 s** (Armários Aéreos). Total runtime 26,7 s.

Better: ask Fátima for the originals. `spec-architecture.md` §14 already flags that the
capture-quality images cannot survive launch, so the request has to happen anyway — fold the
measurements into it.

---

## Fornecedores reais — catálogo impresso (QR codes, 2026-08-17)

`docs/tasks/TASK-importar-catalogo-fabrica.md`. Fátima's printed catalogue has a QR code per
item; the 12 she sent resolve to two named suppliers, confirmed by her directly. All are now in
`content/produtos.ts` (13 entries — Cama Verona ended up split into two, see below). Her own 3
confirmed products are currently pulled from the site (bad Facebook-capture photos, not deleted —
see `content/produtos.ts` top comment), so these 13 are the entire live catalogue for now.

**Pricing resolved 2026-08-20** (`docs/tasks/TASK-precificar-catalogo.md`) for 10 of 13: Fátima
sent D'Doro prices directly over WhatsApp, Benito sent Novo Horizonte prices from the supplier
sheet. Two different markup formulas, same 2× shape as the Benetil precedent
(`content/produtos.ts` line 344–346):
- **Novo Horizonte**: `preço com frete e IPI × 2`.
- **D'Doro**: `(preço × 1,0325) × 2` — the 1,0325 adds Fátima's stated 3,25% IPI, since her
  quoted prices don't include it yet.

Cama Verona (solteiro/casal) and Cabeceira Box Himalaia still have no price — not in either
pricing message, still show "Consulte o preço".

`[VERIFY: "Colibri 4 portas" — R$ 749,00 base (Fátima's WhatsApp), a 4-door variant of
roupeiro-colibri-6-portas — has no measurements, colours, or images. Not added to
content/produtos.ts (Produto.medidas/.cores/.imagens are required fields, CLAUDE.md §0 forbids
guessing them). Needs a supplier page or physical-catalogue dictation before it can ship.]`

- **D'Doro** (`dedoromoveis.com.br`) — 3 roupeiros, full specs (measurements, colours,
  construction) scraped straight from the manufacturer's page: `roupeiro-monaco-plus-6-portas`,
  `roupeiro-colibri-6-portas`, `roupeiro-meridian-plus-3-portas`.
- **Novo Horizonte** (`qrcodefacil.com` → `api.qrfacil.me`, manufacturer site
  `moveisnovohorizonte.com.br`) — 9 catalogue items → 10 products (guarda-roupas, cabeceiras,
  camas, cômodas). The qrcodefacil source itself only carries name + one photo + manual/video
  links, no measurements or colours — those came instead from Benito reading the physical
  printed catalogue directly (2026-08-17, same day), dictated product by product in chat. That
  catalogue is the most authoritative source available (it's what Fátima herself uses), more so
  than the assembly-manual PDFs (Google Drive, linked from each qrcodefacil button) that were
  considered as a fallback — those do have a dimensions page (confirmed on the Cômoda Áustria
  manual: Altura 1025mm / Largura 693mm / Profundidade 450mm) but weren't needed once the
  physical catalogue was on hand.
  Products: `comoda-austria-5-gavetas`, `comoda-space-5-gavetas-2-portas`,
  `comoda-deca-10-gavetas`, `cabeceira-box-himalaia`, `cabeceira-everest`,
  `roupeiro-buriti-3-portas-9-gavetas`, `roupeiro-encant-6-portas-6-gavetas`,
  `roupeiro-paradizzo`, `cama-verona-solteiro`, `cama-verona-casal`.

  **Resolved**: the "Cama Verona Casal e Solteiro" catalogue listing (one QR code, one photo)
  turned out to be two different bed *designs*, not one frame in two widths — first dictated
  measurement round gave identical numbers for both sizes (113 × 151 × 207 cm), which Benito
  then caught himself and corrected: the original qrcodefacil photo is actually the casal
  (kept as `cama-verona-casal`, largura corrected to 151 cm — the rest of that first round's
  numbers were right, they were casal's all along), and a separate photo was supplied for
  solteiro (`cama-verona-solteiro`, largura 101 cm, altura/profundidade unverified — carried
  over from the original dictation, not independently confirmed for the solteiro-specific
  frame).

  `[VERIFY: both cabeceiras (Himalaia, Everest) list two widths, 2405mm and 2605mm — read as
  panel-only vs. total-width-with-the-2-built-in-nightstands and recorded as 260.5 cm (the total,
  since the product ships as a 3-piece set). Not confirmed with Benito directly — check if wrong.]`

  Colour names: `neve` (white), `cumaru`/`camaru` and their `X Fendi` compounds (same wood-tone
  hex as the base colour — `content/cores.ts`). `camaru` vs `cumaru` — both spellings appear
  across different products as dictated; kept as separate but identically-mapped entries rather
  than silently "correcting" one to the other.

**Observation, not yet resolved:** the D'Doro "Roupeiro Mônaco Plus 6 Portas 12 Gavetas"
(240 × 230 × 55 cm) has the exact same width/height/depth as her own `roupeiro-monaco` above
(also 240 × 230 × 55 cm, from the Facebook capture — 6 portas, but 9 gavetas, not 12).
`[VERIFY: ask Fátima whether this is the same wardrobe under two names/generations, or a
different-but-same-size model — 240×230×55 may just be a standard size across this supplier's
line, given roupeiro-colibri and roupeiro-meridian-plus are each a different size. Do not merge
the two catalogue entries without her confirmation.]`

## Taxonomy, from her own album names

`roupeiros` · `cozinhas` · `balcoes` (`Balcões Utilitários`) · `armarios-aereos` ·
`aparador-bar` (`Aparador/Bar`) · `fruteiras` · `multiusos` · `tabuas-de-passar`

Ambientes: `cozinha` · `quarto` · `sala` · `area-de-servico`

Model names seen in full: `Roupeiro Mônaco`, `Balcão Max`, `Armário Aéreo Max`,
`Armário Aéreo Plus`, `Armário Aéreo Life 3 Portas`, `Kit Sampaio 8 Pts`, `Fruteira`.

Colour names seen in full: `Ipê`, `Off White`, `Branca`.

---

## Store data (`content/loja.ts`)

| Field | Value |
|---|---|
| Nome | `F&A Móveis` |
| WhatsApp | `5521970021791` — from `(21) 97002-1791` ✅ |
| E-mail | `fatimaeamoveis@gmail.com` ✅ |
| Responsável | `Fátima` ✅ |
| Tagline | "Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação." ✅ |
| Serviços | `montagem e entrega` ✅ |
| Pagamento | "parcelamos no cartão em 12x ou um super desconto para pagamento à vista" ✅ |
| Endereço | `[VERIFY]` — never shown on the page. Blocks Google Business Profile, schema and `/contato` |
| Horário | `[VERIFY]` — Facebook showed only "Open now" |
