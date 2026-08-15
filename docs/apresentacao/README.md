# Apresentação para a Fátima

The client-facing pitch deck. 13 slides, pt-BR, in her voice — shown alongside the live demo,
not instead of it.

**Published (private artifact):** https://claude.ai/code/artifact/29276b44-d3bb-4022-8b0c-4e3509f3f989

## Files

| File | What it is |
|---|---|
| `deck-fatima.html` | The source: `<title>`, `<style>`, and the 13 `<section class="slide">` blocks. Fonts and the QR code are **not** in here — they are injected at build time. |
| `build.py` | Injects the three woff2 faces as data URIs and the QR as an inline SVG path, then writes `deck.html` plus one isolated `slideN.html` per slide for screenshotting. |

## Rebuilding

`build.py` expects four woff2 files and `qr_path.txt` beside it, in a scratch directory:

```sh
# fonts — latin subset only (covers á ã ç é í ó ô õ ú); Bodoni Moda and DM Sans are variable
curl -A "Mozilla/5.0" "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=DM+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" -o fonts.css
# → pull the `latin` @font-face URLs out of fonts.css into:
#   bodoni.woff2  dmsans.woff2  mono400.woff2  mono500.woff2

# QR
python3 -c "
import segno
q=segno.make('https://fa-moveis.vercel.app', error='m'); m=q.matrix; n=len(m); p=[]
for y,row in enumerate(m):
    x=0
    while x<n:
        if row[x]:
            x0=x
            while x<n and row[x]: x+=1
            p.append(f'M{x0} {y}h{x-x0}v1h-{x-x0}z')
        else: x+=1
open('qr_path.txt','w').write(f'{n}|{\"\".join(p)}')"

python3 build.py
```

Then republish `deck.html` **to the same artifact URL** so the link the client has keeps working.

## Design notes

The deck inherits `spec-design.md` wholesale — it is presenting her own site back to her, so a
separate visual identity would defeat the point.

- **Palette** is §4 verbatim. All seven contrast pairs were recomputed, not estimated, and match
  the spec's own figures: 14.11 / 5.69 / 4.71 / 3.19 / 5.77 / 8.01, including §4.1's binding
  WhatsApp correction (dark text on green — white on green is 1.98:1 and fails).
- **`--rosa` never sets text**, only borders and hairlines (§4's "non-text only" rule).
- **Every régua carries a real number** (§3.1, §6.1) — `30 móveis no site`,
  `Facebook parado desde fev. 2022`, `230 cm`, `240 cm`, `Passo 1 · R$ 300 · R$ 50 pra começar`.
  The slide counter is itself a number, not an ornament.
- **Fonts are inlined as data URIs**: the artifact CSP blocks font CDNs, and a silent fallback
  would render the deck in a different typeface than the site it is presenting.
- **Single committed light world, no dark-mode swap.** The site has one visual world; a deck
  that flipped to dark would stop looking like it. The two jacaranda slides (04, 11, 13) are
  composition per §4.2's 70/20/10 distribution, not a theme.
- **One orchestrated motion moment** (§6.3): the measurement frame drawing itself on slide 06.
  Suppressed under `prefers-reduced-motion`.

## Content rules honoured

Per CLAUDE.md §0, nothing in the deck asserts a fact about her business that isn't traceable:

- The three real products quote measurements straight from `content/produtos.ts`
  (240 × 230 × 55, 107 × 88 × 39, 120 × 58 × 32 / 22,5 kg).
- Slide 05 reproduces the **actual** string `lib/whatsapp.ts` emits — verified against the live
  site. Note it carries no colour line: `Roupeiro Mônaco` has no confirmed colour in the data,
  so the deck does not claim one (`spec-design.md` §14 imagines "cor Ipê"; the data doesn't
  support it).
- Slide 07 states plainly that 27 of 30 products are illustrative and that her three show
  `Consultar` rather than an invented price.
- Slide 11's factory-direct shipping is written **conditionally** — "se a sua fábrica aceita
  mandar direto pro cliente" — because no evidence exists that this arrangement is available.
  Tracked as `[VERIFY]` #9 in `spec-architecture.md` §14.
- No `.com.br` price and no Shopify plan price appear anywhere. Both are third-party costs
  nobody has checked; the deck says the figure will be confirmed instead of inventing one.

## Figures on slide 08

Supplied by the developer, not derived by the project:

| Phase | Her cost as presented |
|---|---|
| 0 — Demonstração | `R$ 0` |
| 1 — Lançamento | `R$ 300`, `R$ 50` up front, remainder on delivery; domain billed separately, value to be confirmed |
| 2 — Cuidar | monthly, "a combinar" — deliberately no number |
| 3 — Loja online | up to `R$ 1.000`, negotiable, plus the platform's own monthly fee (hers) |
