# F&A Móveis

Catalogue site for **F&A Móveis**, a furniture shop in Rio de Janeiro. Real products, real
measurements, no cart — every product page ends in a pre-filled WhatsApp message to Fátima.
See `CLAUDE.md` for the full brief and `docs/spec-architecture.md` / `docs/spec-design.md` for
the design system.

**Status:** live at **https://fa-moveis.vercel.app**. `/produtos` (category filter), the product
page (gallery, breadcrumb, related products) and the home page (hero, category icon rail,
products preview) all work. 30 products — 3 hers with real transcribed measurements, 27
illustrative and disclosed as such on the page.

The fit tool (`/cabe-na-minha-casa`), the orçamento drawer, `/sobre` and `/contato` are not
built yet. Sequence and reasoning: `docs/tasks/TASK-roteiro-pitch.md`. The client pitch deck
lives in `docs/apresentacao/`.

## Quickstart

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

- `pnpm build` / `pnpm typecheck` / `pnpm lint` — same checks CI would run.
- `pnpm normalizar-imagens` — re-run the image pipeline (`scripts/normalizar-imagens.ts`) against
  raw frames in `RAW_FRAMES_DIR`. Not needed for normal development; the normalised output is
  already committed under `public/produtos/`.

## Stack

Next.js (App Router) + TypeScript, Tailwind v4 (CSS-first, tokens in `app/globals.css`), Radix
primitives, no CMS — the catalogue is typed TS in `content/`. Full rationale in
`docs/spec-architecture.md` §4.

## Environment

`NEXT_PUBLIC_SITE_URL` sets the origin for WhatsApp deep links, canonicals, OG images, the
sitemap and robots.txt. It falls back to Vercel's own host vars and finally to localhost, and an
**empty** value counts as unset at every step — see `content/loja.ts` and `.env.example`. A
Vercel production build that would still resolve to localhost fails the build on purpose:
that exact misconfiguration once shipped `http://localhost:3000` inside every WhatsApp message
the live site produced (`docs/tasks/TASK-verificacao-dispositivo.md` §1.1).

## Verified against a production build (2026-08-15)

- `pnpm build` and `pnpm typecheck`: clean.
- Lighthouse mobile (`/produtos`, `next start`, local): **Performance 93, Accessibility 100**,
  CLS 0, LCP 3.2 s. LCP is over the 2.5 s budget in `spec-architecture.md` §13 on a local
  machine with no CDN — **still to be re-measured against the deployed URL**, along with
  first-load JS and the real-device WhatsApp flow
  (`docs/tasks/TASK-verificacao-dispositivo.md` §2.4).
- Product images: all under 32 KB (budget: 180 KB).
- `grep -r "gid://shopify\|@shopify" app components lib content`: no matches outside
  `lib/catalog/source.shopify.ts` (which doesn't exist yet — phase 3).
- First-load JS: not directly reported by Next 16's Turbopack build output in this repo; the
  app ships zero client components, so it should be well under the 120 KB budget, but this
  wants a real number post-deploy rather than an estimate.
