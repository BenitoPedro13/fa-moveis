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
