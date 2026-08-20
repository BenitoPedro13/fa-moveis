# Workflow Guidelines — F&A Móveis (Catalogue Site)

> Ported from the `reelcast` / `plexus` workflow (plan before you touch anything, lean on
> existing tooling while you work, treat documentation as part of the deliverable when you
> finish), trimmed to this project's smaller scope. F&A Móveis is a client site for a real,
> existing business — it reuses that process, not that code.

---

## 0. Project context

The design lives in **`docs/spec-architecture.md`** and **`docs/spec-design.md`**. Read both
before writing anything.

**F&A Móveis** is a neighbourhood furniture shop in Rio de Janeiro (DDD 21), run by **Fátima**,
in business for years with no website — only a Facebook page, dormant since February 2022. She
resells factory furniture (`móveis de fábrica`), delivers and assembles it, and sells over
WhatsApp at `(21) 97002-1791`.

**This is a paid client project on a tight budget, and the demo comes before the money.** Phase
0 is a working site built on her real brand and real products, shown to her on her phone, to
win the job. See `spec-architecture.md` §3 for the phase/cost ladder.

**The brand already exists.** Name, mark, rose (`#A87C7C`), Didone serif, house glyph, tagline
and voice are all hers, evidenced in `videos/F&A-Moveis-Facebook.mov`. The job is to bring an
existing identity onto the web with better craft. **Never redesign F&A Móveis from zero** —
`spec-design.md` §2 sets exactly what is kept, refined and retired.

**Status:** Deployed (2026-08-15) at **`https://fa-moveis.vercel.app`**. Scaffold done
(`TASK-scaffold-catalogo.md` steps 1–4). Catalogue is **13 products, all real, no demo/
illustrative filler** (the 27-product demo catalogue from `TASK-catalogo-demo.md` was removed
2026-08-17 once real stock made it redundant — see `TASK-importar-catalogo-fabrica.md` §6). All
13 are real supplier stock from her printed catalogue's QR codes
(`TASK-importar-catalogo-fabrica.md`) — 3 D'Doro roupeiros (specs scraped from the
manufacturer's site) and 10 Novo Horizonte items (guarda-roupas, cabeceiras, 2 camas, cômodas —
specs dictated by Benito from the physical catalogue). **10 of 13 have a confirmed price**
(resolved 2026-08-20, `TASK-precificar-catalogo.md` — Fátima's D'Doro prices via WhatsApp,
Benito's Novo Horizonte prices from the supplier sheet, 2× markup on frete+IPI, same shape as
the Benetil precedent). Cama Verona (both sizes) and Cabeceira Box Himalaia still show "Consulte
o preço". Her own 3 confirmed products (`Roupeiro Mônaco`,
`Fruteira`, `Armário Aéreo Max`) are pulled from the site for now, not deleted — their only
photos are unusable stills from the old Facebook video capture (`content/produtos.ts` top
comment, `docs/dados-produtos.md`). `/produtos` (category filter), the PDP (gallery, breadcrumb,
related) and the home page (hero, category icon rail, preview) are live. Product-grid images
bleed to the card edge (`object-cover`, no visible border — `ProdutoCard`); studio product shots
on white get their background swapped to `--papel` in `scripts/normalizar-imagens.ts`.

The client pitch deck is built and published — `docs/apresentacao/`.

**Ordering for what's left is in `docs/tasks/TASK-roteiro-pitch.md`.** In short: finish the
real-device checklist (`TASK-verificacao-dispositivo.md` §2.4) before building anything new —
that task already caught two production-only defects invisible from localhost (every WhatsApp
message shipping a `localhost` URL; `/produtos` unfurling with no OG card). Then
`/cabe-na-minha-casa`, orçamento drawer, `/contato` + `/sobre`. Local SEO/schema waits for
phase 1, since it is blocked on her real address.

### Stack (per `spec-architecture.md` §4 — full rationale there)

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router) + TypeScript** — explicitly *not* Hydrogen in v1: Hydrogen needs a paid Shopify store to exist, which inverts the sale (§2.2) |
| Styling | Tailwind + CSS variables mapped 1:1 to `spec-design.md` §4 tokens |
| Components | Radix primitives; component *shapes* ported from `sua-mesa-fit`, never its Shopify types |
| Catalogue data | Typed TS modules in `content/` — no CMS, no DB, no monthly bill |
| Conversion | `wa.me` deep links with pre-filled product messages. **No cart, no checkout in v1.** |
| Hosting | Vercel free tier |
| Backend | **None.** Everything terminates in WhatsApp. |

Version numbers and any "current" claims in these docs are a snapshot, not a pin — verify
against the framework's own docs before scaffolding (§2.0).

### How to write in this repo

- **Never invent an API, a price, a measurement, or a fact about her business.** Write
  `[VERIFY: what to check and where]` inline instead. `spec-architecture.md` §14 already
  carries eight of these — her street address, whether the WhatsApp number is current, whether
  the 2022 catalogue matches 2026 stock. Resolve them before the work that depends on them
  ships, not after.
- **Her data is not yours to guess.** A wrong measurement or an invented price shown to Fátima
  loses the room. `Consultar` beats a plausible number. See `spec-architecture.md` §11.
- Be specific to the point of discomfort: exact hex values, exact contrast ratios, exact
  dimensions in cm, exact pt-BR strings — no acceptance criterion may rely on "works", "fast"
  or "looks good". `spec-architecture.md` §13 and `spec-design.md` §4 set the pattern
  (measured LCP budget, measured WCAG ratios).
- **All customer-facing copy is pt-BR, written in Fátima's voice** — `spec-design.md` §10 has
  her actual sentences. Brazilian number formatting everywhere: `1,80 m`, `R$ 1.590`,
  `12x de R$ 149`.

### The two rules that are never broken

1. **Nothing outside `lib/catalog/source.*.ts` may import a Shopify type.** Components are
   written against the `Produto` domain type. This is what makes the phase-3 Shopify upsell a
   one-module swap instead of a rewrite (`spec-architecture.md` §5–§6).
2. **A hairline rule must carry a real number.** The measurement rule is the design signature;
   a rule used as decoration is out of spec (`spec-design.md` §3.1, §6.1).

---

## 1. Plan before executing — write a task document first

**Rule:** Before editing or creating **any** code file, write a task document at
`docs/tasks/TASK-<slug>.md`. This applies from the first scaffold commit onward — no code
exists yet, so the initial scaffold gets a task doc before any file is created.

### 1.1 Required sections

1. **Current scenario** — what exists today, what's missing/blocked, concrete file/module
   names where applicable.
2. **Planned changes** — file by file, what's added/modified/removed and how it connects.
   Note alternatives considered and rejected if any.
3. **Why** — the justification, so a reviewer can agree or push back before code exists.
4. **Affected files** — a table: file, change type (new/edit/removal), notes.

### 1.2 How to apply it

- Write the document, then summarize in 2–3 lines and wait for alignment on anything
  non-trivial before writing code.
- One document per task, short kebab-case slug: `TASK-scaffold-catalogo.md`,
  `TASK-ficha-tecnica.md`, `TASK-cabe-na-minha-casa.md`.
- Keep it in sync if the plan changes mid-task — it's a living record, not write-once.

---

## 2. Use CLIs, generators, and SDKs — don't write everything by hand

### 2.0 Check current docs before scaffolding anything

Before scaffolding or adding a dependency for **any** part of this stack — Next.js, Tailwind,
Radix, `next/font`, Vercel Analytics — check the tool's own current docs first, then use its
official CLI/generator (`pnpm create next-app@latest`, the shadcn CLI). Hand-authoring what a
generator produces correctly is the wrong default.

### 2.1 In practice

- Image processing (normalising supplier renders per `spec-design.md` §9) goes through
  `sharp` or `ffmpeg` — never hand-edited one file at a time.
- Fonts via `next/font` self-hosted, never a third-party stylesheet request — it breaks the
  performance budget in `spec-architecture.md` §13.
- Prefer the agent's dedicated file tools over `cat`/`sed`/`awk` for reads and edits.

---

## 3. Update documentation after executing

**Rule:** Before considering a task done, update every doc the change affects.

- **`CLAUDE.md`** (this file) — if the change alters stack, architecture, or conventions.
- **`docs/spec-architecture.md`** — if the change resolves an open question (§14) or changes
  scope; update the specific section, don't just append.
- **`docs/spec-design.md`** — if a token, component or rule changes. Contrast ratios are
  recomputed, not estimated.
- **`.env.example`** (once code exists) — every env var the code reads must be listed here.
- **`README.md`** — status line, quickstart, once there's something to run.
- Grep `docs/*.md` for names of things you changed (route, token, component, `[VERIFY]` item)
  to catch stale references.

---

## 4. Project conventions

Layout is specified in `spec-architecture.md` §4.1. Summary:

```
app/           Next.js App Router — routes per spec-architecture.md §9
content/       produtos.ts, categorias.ts, ambientes.ts, loja.ts — the catalogue
lib/catalog/   types.ts (domain), source.ts (boundary), source.local.ts, source.shopify.ts
lib/           whatsapp.ts, fit.ts
components/    produto/, orcamento/, layout/
public/produtos/<slug>/
docs/          specs, task docs
videos/        source captures — brand evidence + design references, not shipped
```

- `content/` is the single source of truth for the catalogue. No product data inline in a
  component, ever.
- `content/loja.ts` owns the phone number, address, hours and socials. Nothing else hardcodes
  the WhatsApp number.
- All measurements are stored as **numbers in cm** and formatted at the edge (§7.3 of the
  content pipeline). Never store `"2,30 m"`.

### 4.1 Commit conventions

- Commit automatically once a task doc's work is complete and verified (build/lint/typecheck
  passing per its own scope) — don't wait to be asked for each one. Standing authorization
  scoped to work that followed the task-doc process in §1; not blanket permission for
  destructive git operations, which still need explicit confirmation.
- **Never add a `Co-Authored-By` trailer to commits in this repo.**

---

## TL;DR

Plan (`docs/tasks/TASK-<slug>.md`) → align → build with framework CLIs/generators → update
`docs/spec-*.md`/`README.md`/`.env.example` → commit (no `Co-Authored-By`) → done. Never
broken: no cart in v1, no Shopify types outside `lib/catalog/source.*.ts`, no invented facts
about her business (`[VERIFY: ...]` instead), no rule without a number on it, every string in
Fátima's pt-BR.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
