# TASK — Scaffold the catalogue site

Slug: `scaffold-catalogo` · Covers steps 1–4 of `spec-architecture.md` §15.

---

## 1. Current scenario

The repo holds documentation and source material only:

```
CLAUDE.md                        workflow rules, rewritten for this project
docs/spec-architecture.md        stack, domain model, phases, open questions
docs/spec-design.md              tokens, type, signature system, components
videos/F&A-Moveis-Facebook.mov   brand evidence (26 s)
videos/{get.ru,minimauk,primalinea,skylinefurnituremfg,ting-shop}.mov   design references
```

Missing / blocked:

- **No code at all.** No `package.json`, no Next.js app, no git repository.
- **No product data.** The catalogue exists only inside the Facebook capture and Fátima's
  albums. Nothing has been transcribed into `content/produtos.ts`.
- **No image assets.** No file in `public/produtos/` yet; supplier renders still live inside
  the `.mov` and on Facebook.
- **Blocked on Fátima** for four of the eight `[VERIFY]` items in `spec-architecture.md` §14 —
  street address, current WhatsApp number, current stock vs the 2022 catalogue, original logo
  file. **None of these block this task**; they block launch, not the scaffold.

---

## 2. Planned changes

### 2.1 Repository and toolchain

| Step | Detail |
|---|---|
| `git init` | **Needs explicit confirmation first** (CLAUDE.md §4.1) |
| Scaffold | `pnpm create next-app@latest` — TypeScript, App Router, Tailwind, ESLint, `src/` off, import alias `@/*`. Check current Next docs first per CLAUDE.md §2.0 |
| Fonts | `next/font/google` self-hosted: Bodoni Moda, DM Sans, IBM Plex Mono. `[VERIFY: Latin-Extended subset covers `ó ã ç ô` in all three]` |
| Deps | `@radix-ui/react-dialog` (orçamento drawer), `clsx`, `tailwind-merge`. Nothing else yet — the JS budget is 120 KB (`spec-architecture.md` §13) |

### 2.2 Design tokens

**Verified 2026-08-15: `create-next-app@16.3.1` ships Tailwind v4.3.3, which is CSS-first.**
There is no `tailwind.config.ts` to generate — `postcss.config.mjs` loads
`@tailwindcss/postcss` and everything lives in `app/globals.css`: `@import "tailwindcss";`,
the eight CSS variables from `spec-design.md` §4 verbatim on `:root`, plus focus ring, radius
(4 px) and the 8 px spacing base, then an `@theme inline` block mapping them to Tailwind
colour/font utilities and carrying the §5.1 type scale under the `sua-mesa-fit` token names
(`title-h1…h3`, `body`, `eyebrow`, `medida`, `parcela`). Original plan assumed a JS config;
adapted here rather than fighting the generator.

### 2.3 Domain layer — no UI depends on anything else

| File | Contents |
|---|---|
| `lib/catalog/types.ts` | `Medidas`, `Cor`, `Preco`, `Produto`, `Categoria`, `Ambiente` — copied exactly from `spec-architecture.md` §5 |
| `lib/catalog/source.ts` | `CatalogSource` interface + the `CATALOG_SOURCE` env switch (§6) |
| `lib/catalog/source.local.ts` | Reads `content/` |
| `lib/catalog/source.shopify.ts` | **Not written in this task.** Phase 3 |
| `lib/whatsapp.ts` | `linkProduto()`, `linkLista()`, `linkGeral()` per §8 |
| `lib/format.ts` | pt-BR formatting — `1,80 m`, `R$ 1.590`, `12x de R$ 149`. Everything stored in cm, formatted here only |

### 2.4 Content

| File | Contents |
|---|---|
| `content/loja.ts` | Name, WhatsApp `5521970021791`, email, hours, address. Address is `[VERIFY]` — ships as a placeholder constant, never rendered as fact until confirmed |
| `content/categorias.ts` | Her eight Facebook album categories (`spec-architecture.md` §1.1) |
| `content/ambientes.ts` | `cozinha`, `quarto`, `sala`, `area-de-servico` |
| `content/produtos.ts` | **Three products, fully transcribed**, all measurements real, from `docs/dados-produtos.md`: `Roupeiro Mônaco`, `Fruteira`, `Armário Aéreo Max` |

**Revised down from six to three (2026-08-15).** `docs/dados-produtos.md` only has three
products with every measurement read off the supplier sheet (✅). The other three named in the
original plan — `Balcão Max`, `Armário Aéreo Plus`, `Kit Sampaio 8 Pts` — have `[VERIFY]`
against their `medidas`, and `medidas` is a required field on `Produto` (`spec-architecture.md`
§5). Inventing the missing figures to hit six is exactly the rule CLAUDE.md §0 exists to stop.
Three still exercises every field of `Produto` (`pesoSuportadoKg` on the Armário Aéreo Max,
multi-image `tipo`s, `descontoAVistaPct` optionality) and proves the model; the other three
transcribe once their sheets are re-read at full resolution or Fátima confirms the numbers
(`docs/dados-produtos.md` "How to resolve the gaps").

### 2.5 Components and routes

| File | Notes |
|---|---|
| `components/produto/MedidaLinha.tsx` | The signature (`spec-design.md` §6.1). Built first — everything else uses it |
| `components/produto/ProdutoCard.tsx` | §6.2 |
| `components/produto/PrecoParcelado.tsx` | §8 |
| `components/produto/FichaTecnica.tsx` | §8 |
| `components/orcamento/BotaoWhatsApp.tsx` | **`--jacaranda` on `--zap`** — white text fails at 1.98:1 (`spec-design.md` §4.1) |
| `components/layout/{Header,Footer}.tsx` | Header carries the horizontal lockup |
| `app/layout.tsx` | `lang="pt-BR"`, fonts, tokens |
| `app/produtos/page.tsx` | The grid |
| `app/produtos/[slug]/page.tsx` | PDP with the measurement frame |
| `public/logo/famoveis.svg` | Redrawn mark per `spec-design.md` §13 |

`app/page.tsx`, the fit tool, the orçamento drawer, `/sobre`, `/contato` and schema are **out
of scope** — steps 5–9 of the build order, separate task docs.

### 2.6 Images

Extract the six products' renders from `videos/F&A-Moveis-Facebook.mov` at full frame
resolution, then normalise per `spec-design.md` §9 via a `sharp` script: 1:1, `--papel`
ground, 12 % padding, AVIF + WebP, under 180 KB.

**These are capture-quality stand-ins.** Frames pulled from a 1930×2062 screen recording of a
Facebook page will not survive a real launch. Originals must come from Fátima's albums before
phase 1 — `[VERIFY: request full-resolution originals]`.

### 2.7 Alternatives considered and rejected

| Alternative | Why not |
|---|---|
| Hydrogen + Shopify from day one | Needs a paid store before she has said yes; inverts the sale (`spec-architecture.md` §2.2) |
| React Router 7, to maximise reuse from `sua-mesa-fit` | Reuse there is component *shapes*, which port to Next unchanged. Next gives free image optimisation and ISR on the R$ 0 tier |
| A headless CMS so Fátima self-edits | A monthly bill and a login she will not use. Phase 2 is you editing `content/` for her — that is the recurring revenue, not a cost to her |
| Transcribing all ~30 products now | The data model is unproven. Six first; if `Produto` is wrong, it is wrong six times, not thirty |

---

## 3. Why

The build order exists so that **step 3 — the product grid — is demoable on its own.** That is
the first moment the project stops looking like a website and starts looking like her store,
and it is the artefact that wins the job. Everything in this task exists to reach that frame
as directly as possible.

Two structural decisions are locked here rather than later because retrofitting them is
expensive:

- **The `Produto` boundary** (§2.3). If components are written against Shopify types the
  phase-3 upsell becomes a rewrite and the commercial ladder in `spec-architecture.md` §3
  collapses.
- **`MedidaLinha` first** (§2.5). The signature is a shared primitive used by the card, the
  PDP frame, the section dividers and the fit tool. Built once at the start, it stays
  consistent; built per-surface later, it fragments.

Three real products beat six padded with guesses: the demo has to survive Fátima reading it,
and she knows what a `Roupeiro Mônaco` measures — a wrong one is worse than a smaller grid.

---

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs` | new | `create-next-app` output |
| `tailwind.config.ts` | new | Tokens + type scale, `spec-design.md` §4–5 |
| `app/globals.css` | new | CSS variables, focus ring, radius |
| `app/layout.tsx` | new | `lang="pt-BR"`, fonts, Header/Footer |
| `app/produtos/page.tsx` | new | Grid, 2-up mobile |
| `app/produtos/[slug]/page.tsx` | new | PDP + measurement frame |
| `lib/catalog/types.ts` | new | Domain types — no Shopify imports |
| `lib/catalog/source.ts` | new | Boundary + env switch |
| `lib/catalog/source.local.ts` | new | v1 implementation |
| `lib/whatsapp.ts` | new | Deep links, pre-filled messages |
| `lib/format.ts` | new | pt-BR number/measure formatting |
| `content/loja.ts` | new | Address placeholder is `[VERIFY]` |
| `content/categorias.ts` | new | Her eight albums |
| `content/ambientes.ts` | new | Four rooms |
| `content/produtos.ts` | new | Six transcribed products |
| `components/produto/MedidaLinha.tsx` | new | Signature primitive — build first |
| `components/produto/ProdutoCard.tsx` | new | |
| `components/produto/PrecoParcelado.tsx` | new | |
| `components/produto/FichaTecnica.tsx` | new | |
| `components/produto/GaleriaProduto.tsx` | new | Not in the original plan — thumbnail gallery so the PDP isn't a single static image; swaps the image inside the measurement frame |
| `components/produto/ProdutosRelacionados.tsx` | new | Not in the original plan — "Você também pode gostar", reuses `ProdutoCard` |
| `components/orcamento/BotaoWhatsApp.tsx` | new | Dark text on green |
| `components/layout/Header.tsx` | new | Horizontal lockup |
| `components/layout/Footer.tsx` | new | `--jacaranda` ground |
| `public/logo/famoveis.svg` | new | Redrawn mark |
| `public/produtos/<slug>/*.avif` | new | Three products, normalised |
| `scripts/normalizar-imagens.ts` | new | `sharp` pipeline, §2.6 |
| `.env.example` | new | `CATALOG_SOURCE`, `NEXT_PUBLIC_SITE_URL` |
| `README.md` | new | Status, quickstart |
| `CLAUDE.md` | edit | Status line → "scaffold done" on completion |
| `docs/spec-architecture.md` | edit | Only if a `[VERIFY]` in §14 resolves during the work |

---

## 4.1 Additions during review (2026-08-15)

Not in the original plan; added after visual review surfaced the grid/PDP felt thin:

- **Category filter pills on `/produtos`** (`?categoria=` search param), using
  `CatalogSource.listarProdutos({ categoria })`, which already existed and was unused. Makes
  `/produtos` a `ƒ` (dynamic) route instead of fully static — expected, since it now reads
  `searchParams`.
- **Breadcrumb** (`Produtos / Categoria / Nome`) on the PDP, linking into the category filter
  above.
- **`GaleriaProduto`** — the PDP's only client component (`"use client"`, thumbnail state).
  Every other page/component in this task is a Server Component per
  `spec-architecture.md` §13 ("everything else is a Server Component").
- **`ProdutosRelacionados`** — "Você também pode gostar" at the foot of the PDP, the other
  products in the catalogue.
- Card fixes: `ProdutoCard` root needs `h-full` for CSS Grid's default `align-items: stretch`
  to actually equalize row heights (a bare flex child doesn't inherit the grid cell's height);
  the product name is clamped to a fixed 2-line box (`line-clamp-2 min-h-[2lh]`) so a long name
  doesn't push one card taller than its row-mates.
- Dropped the colour-swatch row from `ProdutoCard` (kept in `FichaTecnica` on the PDP) — with
  only one product having a confirmed colour, the row was either an odd empty gap or a single
  near-invisible white dot on `--papel`, not worth the inconsistency it caused.
- `robots.ts`, `sitemap.ts`, root + per-product `opengraph-image.tsx`, and `Product` JSON-LD on
  the PDP — SEO wasn't in the original step 1–4 scope (schema was step 9) but was requested
  explicitly; scoped to real, confirmed fields only (no `offers`/price, since none exists).

## 5. Done when

- [x] `pnpm build` and `pnpm typecheck` pass clean.
- [x] `/produtos` renders three real products, 2-up at 320 px, 4-up at 1280 px (grid proven at
  three; fills out as more products are transcribed).
- [x] `/produtos/roupeiro-monaco` shows the measurement frame and a WhatsApp CTA with a
  pre-filled message (name, dimensions, colour when known). **Not yet checked on a real
  phone** — verified the `wa.me` link builds correctly and opens in a new tab; the "arrives
  on her phone" part of this criterion needs an actual test send.
- [x] Lighthouse mobile (`next start`, local, 2026-08-15): **Performance 93, Accessibility
  100**. Both clear the ≥ 90 / = 100 bar. LCP 3.2 s is over the 2.5 s budget in
  `spec-architecture.md` §13 on an unthrottled local server with no CDN — re-measure after
  deploying to Vercel before treating this as failing.
- [x] No product image over 180 KB (all under 32 KB). First-load JS budget (< 120 KB gzipped)
  not directly confirmed — Next 16's Turbopack build output doesn't print the classic
  per-route size table in this setup, and the app ships zero client components, so it should
  clear the budget by a wide margin, but get a real number post-deploy rather than trust that.
- [x] `grep -r "gid://shopify\|@shopify" app components lib content` returns nothing.
