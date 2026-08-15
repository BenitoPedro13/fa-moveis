# TASK — Road map from demo to pitch

Slug: `roteiro-pitch` · Umbrella plan covering steps 7–10 of `spec-architecture.md` §15.
Individual pieces get their own task docs as they start; this is the sequence and the reasoning
behind it, so a reviewer can push back on the ordering before the work happens.

---

## 1. Current scenario

Live at `https://fa-moveis.vercel.app`. Built: domain layer, `/produtos` with category filter,
PDP with gallery/breadcrumb/related, home with hero + category rail + preview, 30 products
(3 hers, 27 illustrative), sitemap/robots/OG images, `Product` JSON-LD.

Two live defects were found and fixed while writing this plan
(`TASK-verificacao-dispositivo.md`): production was emitting `localhost` URLs in every WhatsApp
message, and `/produtos` had no OG card.

Not built: the fit tool, the orçamento drawer, `/sobre`, `/contato`, `/categorias/[slug]`,
`/ambientes/[slug]`, `LocalBusiness` schema.

The pitch deck is done and published — `docs/apresentacao/`.

## 2. The sequence, and why this order

### P0 — Verify on a real phone · `TASK-verificacao-dispositivo.md`

**Ahead of everything, including the fit tool.** `spec-design.md` §14 makes the decisive demo
moment the WhatsApp message landing on her phone; that path had never been tested as an actual
send, and testing it immediately turned up two production-only defects. The remaining §2.4
checklist (real handset, mobile data, Lighthouse against the CDN, first-load JS) is unfinished
and gates everything else — features built on an unverified demo are features built on sand.

### P1 — `/cabe-na-minha-casa` · fit tool

Best remaining effort-to-value ratio. It is a filter over data that already exists
(`spec-architecture.md` §10 ships the `cabe()` implementation), both specs name it the
signature, and it is demo moment #5. Scope:

- `lib/fit.ts` — `cabe()` per §10, plus nearest-fits ranking for near-misses.
- `components/produto/CabeNaSuaCasa.tsx` — client component; labelled `<input type="number">`
  with `inputmode="numeric"`, **never a slider** (`spec-design.md` §12).
- The route, **and** the home-page widget — §7.1 is explicit that the tool sits on the home
  page, not buried in nav.
- Copy is already written verbatim in §10: `Sobra 12 cm de folga`,
  `Faltam 8 cm — mas esse aqui cabe:`, and the empty state
  `Nada com essa medida por enquanto — chama a Fátima, ela consegue encomendar.`

The deck (slide 06) presents this as *próximo a entrar no site*, not as working. Shipping it
before the pitch upgrades that slide from a promise to a demo.

### P2 — Orçamento drawer

`@radix-ui/react-dialog` is already a dependency for it and `linkLista()` already exists,
unused. `localStorage`, no backend, no account.

Deliberately after P1: it reinforces "feels like a real store" rather than being the moment;
it introduces the app's first persisted client state, the likeliest thing to misbehave on her
phone; and it is the biggest single hit to the 120 KB JS budget — which is why P0 must first
produce a real baseline number.

### P3 — `/contato`, then `/sobre`

Cheap, but **blocked on facts** (§14 items 1 and 6). Build `/contato` rendering only confirmed
data — WhatsApp, email, `Entrega e montagem inclusos.`,
`Parcelamos no cartão em 12x ou um super desconto para pagamento à vista.` — and **omit the
address block entirely** until she confirms it, rather than shipping a `[VERIFY]` string or a
plausible street. A missing address is quieter than a wrong one is loud.

`/sobre` gets a minimal version in her voice with a deliberate slot for the storefront photo.
Per `spec-design.md` §9 the best image on this site is not a supplier render — it is her, in
her shop. That is an ask at the pitch (deck slide 12), so the page is designed around the gap
on purpose.

### P4 — Local SEO, deferred to phase 1

`LocalBusiness`/`FurnitureStore` JSON-LD, `/categorias/[slug]`, `/ambientes/[slug]`, Google
Business Profile. Blocked on the address: a `FurnitureStore` schema with no `address` or `geo`
does not earn the local reach the deck promises. **The deck is honest about this** — local SEO
is presented as what phase 1 buys, never as something the demo already does.

## 3. Why this order and not the spec's

`spec-architecture.md` §15 lists fit tool → drawer → pages → deploy. Deployment has already
happened, which inverted the risk: the highest-value work is no longer the next feature but
confirming that what is already live actually works in the one interaction the pitch turns on.
P0 justified itself immediately by surfacing two defects that were invisible from localhost.

## 4. Affected files

Per-phase task docs carry the file tables. This document is planning only and changes no code.

| File | Change | Notes |
|---|---|---|
| `docs/tasks/TASK-verificacao-dispositivo.md` | new | P0, written and partly executed |
| `docs/apresentacao/**` | new | The client deck (P0-adjacent; done) |
| `docs/spec-architecture.md` | edit | §14 — add `[VERIFY]` #9, factory direct shipping |
| `CLAUDE.md`, `README.md` | edit | Status lines |

## 5. Done when

- [x] P0's root-cause fixes shipped and verified live.
- [x] Deck built, reviewed at 1440/390/320, contrast recomputed, published.
- [ ] P0's real-device checklist run on an actual phone.
- [ ] P1 shipped and deck slide 06 updated from "próximo" to a live demo.
- [ ] P2, P3 shipped.
