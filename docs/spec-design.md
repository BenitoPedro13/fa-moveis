# F&A Móveis — Design Spec

> Companion to `docs/spec-architecture.md`. Written in English; every string that reaches a
> customer is quoted in **pt-BR** exactly as it should ship.
>
> **This brand is not new.** It has a name, a mark, a colour, a serif, a tagline, a voice and
> a painted storefront. The job is to bring an existing identity onto the web with better
> craft — not to redesign F&A Móveis. Every token below is traced to something Fátima already
> owns, and where it isn't, that is stated.

---

## 1. Brand audit — what already exists

All evidence from `videos/F&A-Moveis-Facebook.mov`, extracted frame by frame.

### 1.1 The mark

A circular badge, sampled at four points across the field: **`#A47878`, `#A87E7E`, `#A9807F`,
`#B59293`** — consistently a **dusty rose-taupe, ≈ `#A87C7C`**. Inside it:

- a **hairline ring** inset from the circle's edge, in pale rose
- **`F&A`** set in a **high-contrast Didone serif** — hairline crossbars, sharp thin/thick
  modulation, generously letterspaced
- **`MÓVEIS`** beneath, same face, wider tracking
- a small **solid house glyph** at the foot

This is a better mark than most small shops have. The concept is right; only the execution is
weak — it exists as a low-resolution raster, and it has been scaled and re-saved until the
serifs have gone soft.

### 1.2 The other assets

| Asset | Reading |
|---|---|
| Storefront paint | A louder violet-pink, sampled **`#B772A6`** — signage, not a web colour |
| Secondary stamp | A black/gold `A F Móveis` wordmark burned into product photos — a *second, conflicting* identity |
| Her own graphic | A **thin rose rectangle frame** + oversized rose quote marks over a bedroom render |
| Tagline | "Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação." |
| Voice | "Lindo balcão para deixar sua cozinha ainda mais bonita e aconchegante!" — warm, exclamatory, second person |

### 1.3 The find

Three pieces of her material, made at different times for different reasons, all resolve to
the same device: **the hairline rose rule.** The ring inside her badge, the rectangle frame in
her graphic, and — everywhere, in every single product photo — the **dimension drawings** her
suppliers ship: thin lines with tick ends, an arrow, a number. `2.30 m`. `0.55 m`. `107 CM`.
`22,50 Kg`.

That is not a motif I brought to this brand. It was already here, three times over. It becomes
the design system.

---

## 2. Keep / refine / retire

| | Decision |
|---|---|
| **Keep** | The name. The rose. The circular badge concept. The Didone. The house glyph. The hairline ring. Her tagline. Her voice. |
| **Refine** | Redraw the badge as clean SVG at the same proportions (§13). Anchor the rose to a defined, tested value instead of a JPEG average. Give the badge a horizontal lockup for the header. |
| **Retire** | The black/gold `A F Móveis` stamp — a brand cannot have two marks, and the gold belongs to neither the rose nor the wood. The storefront magenta as a *screen* colour: it stays on the building, where it works. |
| **Add** | Only what the brand lacked because it never had a website: a type system, a dark tone, and the measurement language (§6). |

---

## 3. Design thesis

> **Furniture here is sold by the centimetre.**

Every lead Fátima gets ends in the same message: *qual a medida?* Every customer's real
question is *cabe naquela parede entre a porta e a janela?* Her catalogue has carried the
answer in every image for six years, and nowhere on the internet can a customer ask it.

So the measurement is not metadata on this site. It is the typography, the ornament, the
divider, the frame, and the one tool nobody else in her market has (`/cabe-na-minha-casa`).

**Signature:** *a régua* — the measurement rule. A rose hairline, tick-ended, carrying a real
number in mono. It divides sections, underlines every product card, frames every product
image, and drives the fit tool. It is the one thing this site will be remembered by, and it is
made of the two things F&A already owned: her rose, and her suppliers' drawings.

Everything else stays quiet so that device can carry the page.

### 3.1 Calibration — what this deliberately is not

The default direction for "warm furniture brand" is cream `#F4F1EA`, a high-contrast serif and
a terracotta accent. Her own reference (**Prima Linea**) is exactly that, and drifting there
would be a template answer, not a choice.

What survives the critique and why:

- **The serif stays** — because it is *her* serif. Her badge is a Didone. This is derivation,
  not default. But it is set as **Bodoni Moda**, an actual Didone with her letterforms, not
  Playfair Display, which is what everyone reaches for.
- **The cream is rejected.** The ground is a **blush-tinted paper** with a visible pink cast,
  and the dark tone is a **deep rosewood**, not near-black. Both grounds are her rose driven
  to its extremes, so the whole surface descends from one brand colour.
- **The terracotta accent is rejected outright.** Her accent is rose, and rose is the rarest
  colour in furniture retail — every competitor is beige, wood and black. This is the brand's
  single biggest visual advantage and it was sitting unused.
- **The hairline rules survive the "broadsheet" objection** on one condition, which is binding:
  a rule must carry information — a measurement, a count, a category. A rule used purely to
  decorate is out of spec.

**The risk taken:** committing a furniture site to rose as its dominant ink, and making
dimensional data the ornamental system. Justified because both are hers already.

---

## 4. Colour

Values verified with a WCAG contrast calculation, not estimated. Ratios are against the
adjacent ground unless stated.

```css
:root {
  --papel:       #F7F0EE;  /* blush paper — the ground                        */
  --jacaranda:   #2B1F22;  /* deep rosewood — dark ground + body text on papel */
  --rosa:        #A87C7C;  /* THE brand rose, sampled from her badge           */
  --rosa-forte:  #8E5F62;  /* rose that passes AA at body size on papel        */
  --rosa-claro:  #C09090;  /* rose that passes AA at body size on jacaranda    */
  --imbuia:      #6B4A34;  /* warm wood, from the Roupeiro Mônaco              */
  --tinta-suave: #6B5B5D;  /* secondary text                                   */
  --zap:         #25D366;  /* WhatsApp — functional only, never decorative     */
}
```

| Pair | Ratio | Permitted use |
|---|---|---|
| `--jacaranda` on `--papel` | **14.11** | Body text, headings — the default |
| `--imbuia` on `--papel` | **7.03** | Body text, wood-world accents |
| `--tinta-suave` on `--papel` | **5.69** | Secondary text, captions |
| `--rosa-forte` on `--papel` | **4.71** | Body-size links, small labels, eyebrows |
| `--rosa` on `--papel` | **3.19** | **Large text (≥24 px) and non-text only** — rules, ticks, borders, icons. Never body copy. |
| `--rosa-claro` on `--jacaranda` | **5.77** | Body text inside dark sections |
| `--rosa` on `--jacaranda` | 4.42 | Large text only |

### 4.1 The WhatsApp button — a binding correction

The conventional WhatsApp CTA is white text on `#25D366`. **That combination is 1.98:1 and
fails WCAG outright.** The architecture spec sets Lighthouse Accessibility at 100, so it
cannot ship.

**`--jacaranda` on `--zap` is 8.01:1.** Every WhatsApp CTA on this site uses **dark text on the
green**, with the mark in `--jacaranda` too. It also simply looks better next to the rose.

### 4.2 Distribution

Roughly 70 % `--papel`, 20 % `--jacaranda` (footer, one or two full-bleed sections, the fit
tool), 10 % rose. The rose is **ink, not wash** — it appears as hairlines, ticks, small-caps
labels and the badge. There is no large flat rose panel anywhere on this site; that is what
makes the rose read as considered rather than as a theme colour.

---

## 5. Typography

Three roles, each with a job. The third exists because it *is* the signature.

| Role | Face | Why this one |
|---|---|---|
| **Display** | **Bodoni Moda** (variable, optical size axis) | A true Didone — her badge's letterforms. Not Playfair, which is the reflex substitute. Full Latin-Extended, so `Móveis`, `Roupeiro`, `Aéreo`, `Mônaco` set correctly. |
| **Body / UI** | **DM Sans** | Geometric-humanist, warm rather than corporate, and genuinely legible at 14–16 px on the mid-range Androids her customers browse on. Not Inter — Inter is the default and it reads as software. |
| **Data** | **IBM Plex Mono** | Measurements, weight, colour codes, installment figures, SKUs. Tabular figures so numbers align in a column. Its drafting-table flavour is the drawing vernacular, contained to exactly one job. |

`[VERIFY: all three are on Google Fonts with the Latin-Extended subset — confirm at build
time and self-host via next/font to avoid a third-party request in the performance budget.]`

### 5.1 Scale

Fluid via `clamp()`. Names mirror `sua-mesa-fit`'s `tailwind.config.ts` so the tokens transfer.

| Token | Size | Face | Treatment |
|---|---|---|---|
| `display-xl` | `clamp(2.75rem, 7vw, 5rem)` | Bodoni Moda | `-0.02em`, line-height 1.02 — hero only |
| `title-h1` | `clamp(2rem, 4.5vw, 3.25rem)` | Bodoni Moda | `-0.015em`, 1.08 |
| `title-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | Bodoni Moda | `-0.01em`, 1.15 |
| `title-h3` | `1.25rem` | DM Sans 500 | product names in grids |
| `body` | `1rem` / `1.0625rem` | DM Sans 400 | 1.6 |
| `body-sm` | `0.875rem` | DM Sans 400 | 1.55 |
| `eyebrow` | `0.6875rem` | DM Sans 500 | **uppercase, `0.18em` tracking**, `--rosa-forte` |
| `medida` | `0.8125rem` | Plex Mono 400 | `0.04em`, tabular — **the measurement voice** |
| `parcela` | `clamp(1.25rem, 2.2vw, 1.75rem)` | Plex Mono 500 | tabular — the installment figure |

### 5.2 Rules

- Bodoni Moda has hairline serifs: **never below 20 px**, and never at weight 400 under 32 px.
  Below that it disintegrates on Android. Product names in grids are DM Sans, not Bodoni.
- Numbers are **always** Plex Mono. A measurement never appears in DM Sans anywhere on the site.
- Eyebrows label content, they do not decorate: `CATEGORIA`, `MEDIDAS`, `CORES DISPONÍVEIS`,
  `ENTREGA E MONTAGEM` — all terms already in her vocabulary.
- Brazilian formatting throughout: `1,80 m`, `R$ 1.590`, `12x de R$ 149`. Decimal comma,
  thousands point. Non-negotiable — it is the fastest tell of a site built for the wrong market.

---

## 6. The measurement language — the signature system

One device, four applications. Everything here is drawn in CSS/SVG; no images.

### 6.1 `<MedidaLinha>` — the rule

A rose hairline with tick ends and a mono number sitting above it, exactly like the supplier
drawings.

```
   ├──────────────── 240 cm ────────────────┤
```

- Line: `1px solid var(--rosa)`. Ticks: 8 px verticals at each end, same colour.
- Number: `medida` token, Plex Mono, `--rosa-forte`, centred on the line with a `--papel` gap.
- **Binding rule: it must carry a real number.** A `MedidaLinha` with no measurement is a
  decorative hairline, and decorative hairlines are out of spec (§3.1).

### 6.2 Under every product card

Each card carries its footprint. This is the detail that makes a browsing grid useful instead
of pretty, and it costs one line of data she already has.

```
┌───────────────────────────┐
│                           │
│      [ cut-out on         │
│        blush paper ]      │
│                           │
├───────────────────────────┤
│ ROUPEIROS                 │  eyebrow, rosa-forte
│ Roupeiro Mônaco           │  title-h3, DM Sans 500
│ ├────── 240 × 230 ──────┤ │  MedidaLinha, mono
│ 12x de R$ 149             │  parcela, mono
│ ● ● ●  Ipê · Off White    │  colour swatches
└───────────────────────────┘
```

### 6.3 The product page frame — the one motion moment

On the PDP the product image sits inside a **rose measurement frame**: width ruled beneath,
height ruled at the right, depth noted at the corner. On scroll-in the three rules **draw
themselves** — width left-to-right, height bottom-to-top, then the numbers fade up — over
~700 ms, once. It is the supplier's technical drawing, rebuilt as her brand.

```
        ┌─────────────────────────────┐  ┐
        │                             │  │
        │     [ Roupeiro Mônaco ]     │  ├ 230 cm
        │                             │  │
        └─────────────────────────────┘  ┘
        ├────────── 240 cm ───────────┤     prof. 55 cm
```

This is the only orchestrated animation on the site. Everything else is hover and focus.
Fully suppressed under `prefers-reduced-motion` — the frame and numbers render immediately,
static.

### 6.4 Section dividers

Rules between sections carry a real count, in her language:

```
────────────────── 6 CATEGORIAS ──────────────────
──────────────── 28 MÓVEIS NA LOJA ───────────────
```

---

## 7. Layout

**The organising metaphor is the *ficha técnica*** — the spec sheet. Her supplier images are
already spec sheets; the site sets them properly instead of replacing them.

- Grid: 12 columns desktop, 6 tablet, 4 mobile. Gutter 24 px, max width 1280 px.
- **Product grid is 2-up on mobile**, 3-up tablet, 4-up desktop. Not 1-up: furniture browsing
  is comparison, and a 25-item catalogue looks like a real shop at 2-up and a thin one at 1-up.
- Vertical rhythm on an 8 px base. Section padding `clamp(4rem, 9vw, 7.5rem)`.
- **Asymmetry on the PDP**: image column 7/12, technical column 5/12, technical column sticky
  on desktop. It reads as a drawing with its annotations, not as a fashion PDP.
- Radius: **4 px**, everywhere, or none. No soft cards — the drawing vernacular is orthogonal.
  The badge's circle is the only round thing on the site, which is what keeps it the mark.

### 7.1 Home page

The hero is a thesis, and the thesis is measurement. Not a stock interior with a headline
over it.

```
┌──────────────────────────────────────────────────────────┐
│  (F&A)  MÓVEIS        Produtos  Ambientes  Sobre   [zap]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  MÓVEIS DE FÁBRICA          ┌──────────────────┐  ┐      │
│                             │                  │  │      │
│  Da fábrica                 │  [ Roupeiro      │  ├ 230  │
│  para a sua casa.           │    Mônaco ]      │  │      │
│                             │                  │  │      │
│  Entrega e montagem         └──────────────────┘  ┘      │
│  no seu bairro.             ├────── 240 cm ─────┤        │
│                                                          │
│  [ Ver os móveis ]  [ Falar com a Fátima ]               │
├──────────────────────────────────────────────────────────┤
│  ─────────────────── 6 CATEGORIAS ──────────────────     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │ ⌸  │ │ ▤  │ │ ▥  │ │ ◫  │ │ ▦  │ │ ▧  │               │
│  Roupeiros Cozinhas Balcões Aéreos Fruteiras Multiusos    │
├──────────────────────────────────────────────────────────┤
│  CABE NA SUA CASA?                                       │
│  Me diga quantos centímetros você tem.                   │
│  [ largura em cm ]  [ ver o que cabe ]                   │
└──────────────────────────────────────────────────────────┘
```

The line-icon category rail is lifted from **Skyline Furniture Mfg** — and it earns its place
here for a reason beyond taste: her product photography is inconsistent supplier output, so
drawn icons give the category rail a uniformity photographs cannot. Icons are 1 px rose
strokes, matching the rules.

The fit tool sits **on the home page**, not buried in a nav item. It is the reason to stay.

---

## 8. Components

| Component | Notes |
|---|---|
| `ProdutoCard` | §6.2. Whole card is the link; the WhatsApp button inside it is a nested action — implement as sibling anchors, not a nested `<a>`. |
| `MedidaLinha` | §6.1. Props `{ valor: number; unidade?: 'cm'\|'m'; orientacao: 'h'\|'v' }`. |
| `FichaTecnica` | Definition list: medidas, peso suportado, cores, material, montagem inclusa. Plex Mono values, DM Sans labels, hairline rules between rows. |
| `PrecoParcelado` | `12x de R$ 149` large in mono; `R$ 1.590 à vista` beneath in `--tinta-suave`. Both strings are hers (§10). Renders `Consulte o preço` when `preco` is absent. |
| `BotaoWhatsApp` | `--zap` fill, `--jacaranda` text and icon (§4.1). Label is always the action: **`Pedir pelo WhatsApp`**. |
| `SeletorCor` | Circular swatches from `Cor.hex`, name on hover/focus. Selecting one updates the pre-filled WhatsApp message. |
| `OrcamentoDrawer` | The cart-shaped thing. `localStorage`. Footer button: **`Enviar lista para a Fátima`**. |
| `CabeNaSuaCasa` | Number input in cm → filtered grid, each result showing `Sobra 12 cm` or `Faltam 8 cm`. |
| `NavCategorias` | The icon rail; sticky secondary bar on `/produtos`. |

---

## 9. Photography

The real design problem. Her source images are three incompatible things, shot by suppliers
with no shared standard, and a grid of them raw will look like a marketplace listing.

**The normalising rule — one frame, always:** every grid image is **1:1**, on `--papel`, with
**12 % internal padding** and a **1 px `--rosa` border**. Consistent padding and a consistent
frame make wildly different source renders read as one set. This single rule does more for
perceived quality than any other decision in this document.

| Source type | `tipo` | Treatment |
|---|---|---|
| Cut-out on white | `produto` | Knock out residual white to `--papel`, centre, 12 % padding. **The grid uses only these.** |
| Styled room render | `ambiente` | 4:3. Hero, category and ambiente headers, PDP secondary. **Never in the product grid** — mixed lighting destroys a grid. |
| Technical drawing | `tecnico` | Inside `FichaTecnica`. Where the source is a clean line drawing on white, recolour to `--rosa` on `--papel`. Where it is noisy, keep as-is at reduced size. |

Additional rules:

- Every image gets a real `alt` in pt-BR: `"Roupeiro Mônaco de 6 portas na cor Ipê"`. Not
  `"produto"`. This is both accessibility and the local SEO in `spec-architecture.md` §12.
- The supplier's burned-in `A F Móveis` gold stamp is cropped out wherever possible (§2).
- **The best image on this site is not a supplier render.** Photograph the actual storefront
  and Fátima in it, for `/sobre` and the Google Business Profile. It is the only genuinely
  unique image the brand has, and **t.i.n.g.** does exactly this — `Vores butik / Kig indenfor`,
  real photos of a real shop. A small local store's advantage over a marketplace is that it is
  a real place with a real person; hiding that is throwing away the only thing she has that
  Magalu doesn't.

---

## 10. Voice

She already has one, and it is better than anything a furniture-brand style guide would
produce. From her own posts:

> "Lindo balcão para deixar sua cozinha ainda mais bonita e aconchegante!"
> "Roupeiro de casal deslumbrante, isso e muito mais você encontra na F&A Móveis!"
> "Lindos Multiusos para decorar e organizar sua casa!"
> "Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação."

Warm, second person, exclamatory, product-first. **Write the site in that voice.** It costs
nothing and it is the thing that will make her say *"parece que fui eu que escrevi"* — which
is the sentence that closes this sale.

| Do | Don't |
|---|---|
| `Da fábrica para a sua casa.` | `Excelência em mobiliário residencial` |
| `Cabe na sua casa?` | `Simulador de compatibilidade dimensional` |
| `Pedir pelo WhatsApp` | `Solicitar informações` |
| `A gente entrega e monta pra você.` | `Serviços de logística e montagem inclusos` |
| `Sobra 12 cm de folga.` | `Compatível` |
| `Faltam 8 cm — mas esse aqui cabe:` | `Nenhum resultado encontrado` |

Interface rules, per the architecture spec's quality floor:

- The action keeps its name through the flow. `Pedir pelo WhatsApp` → opens WhatsApp. Never
  `Enviar` on the button and `Solicitação` in the confirmation.
- Empty states are invitations, not apologies. The fit tool with no matches says
  **`Nada com essa medida por enquanto — chama a Fátima, ela consegue encomendar.`** and shows
  the nearest fits.
- Errors say what happened and what to do, in the interface's voice, without apologising.

---

## 11. Motion

- **One orchestrated moment**: the PDP measurement frame drawing itself (§6.3). Nothing else
  competes with it.
- Hover on `ProdutoCard`: border `--rosa` at 40 % → 100 %, image scale `1.02`, 180 ms ease-out.
  No lift, no shadow bloom.
- The `MedidaLinha` in a card animates on hover only where it is already visible — it never
  animates in a grid on scroll. Twenty rules drawing themselves at once is noise.
- Page transitions: none.
- `@media (prefers-reduced-motion: reduce)` — all of the above becomes instant final state.

---

## 12. Quality floor

Not features; acceptance criteria. Lighthouse Accessibility must be **100**
(`spec-architecture.md` §13).

- Every contrast pair in §4 is respected, including §4.1's WhatsApp correction.
- Visible keyboard focus: `2px solid var(--rosa-forte)`, `2px` offset. Never `outline: none`.
- Tap targets ≥ 44 × 44 px. She and her customers are on phones.
- The fit tool is a labelled `<input type="number">` with `inputmode="numeric"`, not a slider.
- `alt` on every image (§9). Decorative rules are `aria-hidden`.
- Semantic headings in order; the product grid is a list.
- Renders correctly at 320 px wide.
- `lang="pt-BR"` on `<html>`.

---

## 13. Logo

The mark is right. The file is not.

1. **Redraw as SVG** at the badge's existing proportions: circle, inset hairline ring, `F&A`
   over `MÓVEIS`, house glyph at the foot. Set in **Bodoni Moda** and converted to outlines,
   which is as close to her existing Didone as a licensed face gets. `[VERIFY: ask Fátima for
   the original file first — if a vector exists, use it and only clean it up.]`
2. **Fix the colour** to `--rosa` `#A87C7C` so the mark and the site are the same rose. The
   current raster drifts across the range `#A47878`–`#B59293` depending on which export you look at.
3. **Add a horizontal lockup** for the header: badge at 32 px + `F&A MÓVEIS` wordmark in
   letterspaced Bodoni Moda. The circular badge alone is too quiet in a 64 px header.
4. **Monochrome variants**: `--papel` on `--jacaranda` for the footer, single-colour for
   stamps, invoices and the shop's own printing.
5. **Favicon / app icon**: the house glyph alone inside the ring. `F&A` is unreadable at 32 px;
   the house survives.
6. This is presented as *"seu logo, redesenhado limpo"* — not a rebrand. She keeps her mark.

---

## 14. What the demo must show

In this order, on her phone, not on a laptop:

1. **The home page.** Her logo, her rose, her tagline. She recognises her own shop.
2. **The product grid.** Her actual products, framed consistently, looking like a store.
3. **A product page.** The measurement frame drawing itself, `12x de R$ 149`, her colours.
4. **The WhatsApp button** — tap it, let her watch the message arrive on her own phone,
   already saying *Roupeiro Mônaco, 240 × 230 cm, cor Ipê*. **This is the moment she gets it.**
5. **`Cabe na sua casa?`** — type 200, watch the catalogue filter. This is the moment she
   starts telling you about a customer who asked exactly that last week.

Everything else is supporting material.

---

## TL;DR

Her brand already had a rose (`#A87C7C`), a Didone, a badge, a house, a tagline and a voice —
keep all six, redraw the mark, and reject the cream-and-terracotta default her own reference
site would have pulled us toward. The system is built from the dimension drawings that were
already in every one of her product photos: a rose hairline with tick ends and a mono number,
used as divider, card footer, image frame and fit tool. Rose is ink, never wash. WhatsApp CTAs
use dark text on green, because white on green fails at 1.98:1. Write every word in Fátima's
voice.
