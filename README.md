# F&A Móveis

Catalogue site for **F&A Móveis**, a furniture shop in Rio de Janeiro. Real products, real
measurements, no cart — every product page ends in a pre-filled WhatsApp message to Fátima.
See `CLAUDE.md` for the full brief and `docs/spec-architecture.md` / `docs/spec-design.md` for
the design system.

**Status:** scaffold done (`docs/tasks/TASK-scaffold-catalogo.md`, steps 1–4 of the build order
in `spec-architecture.md` §15). Three products transcribed with real measurements; `/produtos`
and the product page (PDP) are live. Home page has a minimal hero + products preview — the full
version (category rail, fit tool) is later work.

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

## Verified against a production build (2026-08-15)

- `pnpm build` and `pnpm typecheck`: clean.
- Lighthouse mobile (`/produtos`, `next start`, local): **Performance 93, Accessibility 100**,
  CLS 0, LCP 3.2 s. LCP is over the 2.5 s budget in `spec-architecture.md` §13 on a local
  machine with no CDN — re-check once deployed to Vercel.
- Product images: all under 32 KB (budget: 180 KB).
- `grep -r "gid://shopify\|@shopify" app components lib content`: no matches outside
  `lib/catalog/source.shopify.ts` (which doesn't exist yet — phase 3).
- First-load JS: not directly reported by Next 16's Turbopack build output in this repo; the
  app ships zero client components, so it should be well under the 120 KB budget, but this
  wants a real number post-deploy rather than an estimate.
