# F&A Móveis

Catalogue site for **F&A Móveis**, a furniture shop in Rio de Janeiro. Real products, real
measurements, no cart — every product page ends in a pre-filled WhatsApp message to Fátima.

**Live:** [fa-moveis.vercel.app](https://fa-moveis.vercel.app)

Powered by [Blessed Moon Studio](https://blessed-moon.vercel.app)

## Status

`/produtos` (category filter), the product page (gallery, breadcrumb, related products) and
the home page (hero, category icon rail, products preview) are live. 30 products — 3 with
real transcribed measurements, 27 illustrative and disclosed as such on the page.

Not yet built: the fit tool (`/cabe-na-minha-casa`), the orçamento drawer, `/sobre` and
`/contato`. Sequence and reasoning in `docs/tasks/TASK-roteiro-pitch.md`; the client pitch
deck lives in `docs/apresentacao/`.

## Stack

Next.js (App Router) + TypeScript, Tailwind v4 (CSS-first tokens in `app/globals.css`),
Radix primitives, no CMS — the catalogue is typed TS in `content/`. Full rationale in
[`docs/spec-architecture.md`](docs/spec-architecture.md) §4.

## Getting started

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm normalizar-imagens` | Re-run the image pipeline against raw frames in `RAW_FRAMES_DIR` — not needed for normal development, the normalised output is already committed under `public/produtos/` |
| `pnpm importar-catalogo-benetil` | Catalogue import script |

## Environment

`NEXT_PUBLIC_SITE_URL` sets the origin for WhatsApp deep links, canonicals, OG images, the
sitemap and robots.txt. It falls back to Vercel's own host vars and finally to localhost,
and an **empty** value counts as unset at every step — see `content/loja.ts` and
`.env.example`. A Vercel production build that would still resolve to localhost fails the
build on purpose.

## Documentation

- [`CLAUDE.md`](CLAUDE.md) — full project brief
- [`docs/spec-architecture.md`](docs/spec-architecture.md) — platform, catalogue source, phasing
- [`docs/spec-design.md`](docs/spec-design.md) — design tokens, visual system
- [`docs/dados-produtos.md`](docs/dados-produtos.md) — product data
- `docs/tasks/` — task specs, including the pitch roteiro and device-verification tasks
