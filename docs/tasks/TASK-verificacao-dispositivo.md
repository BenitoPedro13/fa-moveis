# TASK — Verify the deployed demo on a real phone

Slug: `verificacao-dispositivo` · Covers step 10 of `spec-architecture.md` §15 ("Deploy to a
real URL. **Open it on her phone, not your laptop.**") and the unchecked criterion in
`TASK-scaffold-catalogo.md` §5 — the `wa.me` link has never been tested as an actual send.

---

## 1. Current scenario

The site is deployed and reachable:

| | |
|---|---|
| Production alias | `https://fa-moveis.vercel.app` |
| Vercel project | `fa-moveis` (`prj_IIFe6NfACUjxFcFxyhNonJGbeMcB`) |
| Live production deployment | `dpl_J5w4YdWT68PHpFf8nAU5pa2GchWF`, commit `e40ec63`, state `READY` |

Everything to date has been verified on a laptop against `localhost`. Two deployment-only
failure modes were therefore invisible, and **one of them is live right now**.

### 1.1 The live defect — `SITE_URL` resolves to `localhost` in production

`NEXT_PUBLIC_SITE_URL` is **set to an empty string** in the Vercel production environment.
That is what caused the build failure fixed in `e40ec63`; the fix (`??` → `|| `) made the build
pass by falling back to `http://localhost:3000`, which stopped the crash and **silently shipped
the wrong host to every URL-emitting surface**.

Verified against the live site on 2026-08-15:

```
$ curl -s https://fa-moveis.vercel.app/produtos/roupeiro-monaco | grep -o 'https://wa\.me/[^"]*'
…%0Ahttp%3A%2F%2Flocalhost%3A3000%2Fprodutos%2Froupeiro-monaco     ← decoded: http://localhost:3000/…

$ curl -s https://fa-moveis.vercel.app/robots.txt
Sitemap: http://localhost:3000/sitemap.xml

$ curl -s https://fa-moveis.vercel.app/sitemap.xml
<loc>http://localhost:3000</loc> …
```

`<link rel="canonical">`, `og:url`, `og:image` and `twitter:image` on the PDP are all
`http://localhost:3000/…` as well.

All six consumers of `SITE_URL` are affected:

| Consumer | Consequence while broken |
|---|---|
| `lib/whatsapp.ts` → `linkProduto`, `linkLista` | **The pre-filled message Fátima receives contains a dead `localhost` link.** |
| `app/layout.tsx` → `metadataBase` | Every canonical/OG URL site-wide resolves against localhost |
| `app/produtos/[slug]/page.tsx` → `Product` JSON-LD `image` | Structured data points at an unreachable host |
| `app/sitemap.ts` | Sitemap lists 32 unreachable URLs |
| `app/robots.ts` | Points crawlers at a localhost sitemap |
| OG images | No link preview when the URL is shared **on WhatsApp** — her main channel |

**Why this is the highest-priority item in the project.** `spec-design.md` §14 names the
decisive demo moment: *"tap it, let her watch the message arrive on her own phone, already
saying Roupeiro Mônaco, 240 × 230 cm, cor Ipê. **This is the moment she gets it.**"* Right now
that message arrives carrying `http://localhost:3000/produtos/roupeiro-monaco`. If she taps the
link — or worse, forwards the message to a customer — it fails. The single most important
interaction in the pitch is broken in the most visible possible way.

### 1.2 Unverified, pending this task

- LCP against a real CDN. Local was 3.2 s vs the 2.5 s budget (`spec-architecture.md` §13);
  the spec itself defers judgement until measured post-deploy.
- First-load JS — never measured; Turbopack's output doesn't print the route table here.
- `wa.me` behaviour on a real handset: does it open the app or the web fallback, does `*bold*`
  render, does `×` (U+00D7) survive the encode round-trip.
- 320 px layout and tap targets on real hardware rather than a devtools emulation.

---

## 2. Planned changes

### 2.1 Fix the root cause — set the env var

Set in Vercel → Project `fa-moveis` → Settings → Environment Variables, **Production**:

```
NEXT_PUBLIC_SITE_URL = https://fa-moveis.vercel.app
```

Then redeploy (the value is inlined at build time — changing it does not affect the existing
deployment). Set the same value for Preview, or leave Preview unset so it falls through to the
new deployment-URL fallback below.

**This step needs the Vercel dashboard and cannot be done from this repo** — the Vercel CLI is
not installed here and no MCP tool writes env vars.

### 2.2 Make the failure impossible to ship again — `content/loja.ts`

Setting the variable fixes today. It does not stop the same mistake recurring on the next
project, the next environment, or a custom domain migration — and the failure mode is silent,
which is what made it survive a deploy. Two changes:

**A fallback chain**, so a Vercel deployment is correct by default rather than by
configuration:

```
NEXT_PUBLIC_SITE_URL                           explicit, wins when set
  → NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL  the project's stable production host
  → NEXT_PUBLIC_VERCEL_URL                     this specific deployment (preview builds)
  → http://localhost:3000                      local dev only
```

Vercel exposes the `NEXT_PUBLIC_`-prefixed variants for Next.js projects; both are bare hosts,
so they get an `https://` prefix. Each candidate is trimmed and empty-checked, since an empty
string is the exact misconfiguration being defended against.

**A build-time guard**, so the silent case becomes loud:

```ts
if (process.env.VERCEL_ENV === "production" && resolvido.startsWith("http://localhost")) {
  throw new Error(...)
}
```

A production build on Vercel that would emit `localhost` URLs now **fails the build** instead of
deploying a broken WhatsApp link. Scoped to `VERCEL_ENV === "production"` so local `pnpm build`
and preview deployments are unaffected.

Alternative considered and rejected: hardcoding the production URL in `content/loja.ts`. It
would work today and break the moment the `.com.br` domain lands in phase 1, and it puts an
environment concern in the file CLAUDE.md §4 reserves for the store's own facts.

### 2.3 Re-verify the deployment

Re-run the three `curl` assertions in §1.1 against the redeployed site; all three must show the
real host. This is scriptable and is the regression test for §2.2.

### 2.4 The real-device checklist

Run on an actual phone on **mobile data, not wifi** — her customers are on mid-range Androids
on 4G (`spec-architecture.md` §13).

**WhatsApp — the decisive path**

- [ ] `/produtos/roupeiro-monaco` → `Pedir pelo WhatsApp` opens the WhatsApp **app**, not
      `web.whatsapp.com`
- [ ] Draft reads `*Roupeiro Mônaco*` in bold, `Medidas: 240 × 230 × 55 cm (L × A × P)`,
      and a link on `https://fa-moveis.vercel.app`
- [ ] The `×` renders as a multiplication sign, not `Ã—` — encoding survives the round trip
- [ ] **Send it for real** and open the received link from inside WhatsApp
- [ ] The link unfurls with an OG preview (this is the §1.1 `og:image` fix paying off)
- [ ] Header WhatsApp button (`linkGeral`) and a grid-card button both work
- [ ] Back-navigating from WhatsApp returns to the page, not a blank tab
- [ ] Test on iOS Safari too if available — `wa.me` handoff differs from Android Chrome

**Layout and interaction**

- [ ] 320 px: no horizontal scroll on `/`, `/produtos`, a PDP
- [ ] Product grid is 2-up on mobile (`spec-design.md` §7)
- [ ] Category filter pills tappable, ≥ 44 × 44 px (§12)
- [ ] PDP gallery thumbnails switch the main image
- [ ] Category icon rail legible at real screen density — icons are 1 px rose strokes and this
      is their first test on a phone

**Performance, measured not estimated**

- [ ] Lighthouse mobile against `https://fa-moveis.vercel.app/produtos`: Performance ≥ 90,
      Accessibility = 100, LCP < 2.5 s, CLS < 0.1
- [ ] Same for `/` and one PDP
- [ ] First-load JS < 120 KB gzipped — read from the Network panel against the deployed site,
      since the build output doesn't report it
- [ ] Subjective: does the first paint feel acceptable on 4G

---

## 2.5 Found during verification (added mid-task)

Two further defects surfaced while §2.1–§2.4 were being run. Recorded here rather than in a new
task doc — they are the same defect class (a deploy-only URL/metadata problem invisible from
localhost) and were found by this task's own checklist.

### A. Trailing slash produced double-slash URLs

`NEXT_PUBLIC_SITE_URL` was first set to `https://fa-moveis.vercel.app/`. Every consumer
concatenates `${SITE_URL}/algo`, so the live site emitted:

```
https://fa-moveis.vercel.app//produtos/roupeiro-monaco     (308 → the correct URL)
Sitemap: https://fa-moveis.vercel.app//sitemap.xml
```

It resolved — via a 308 — but it put a redirect hop inside the WhatsApp message and a
duplicate-URL signal into the canonicals and sitemap. Fixed at the source: `origem()` now strips
trailing slashes, so the value is normalised regardless of how it is pasted into the dashboard.

### B. `/produtos` shipped with no `og:image`, `og:site_name` or `og:locale`

Caught by testing a real WhatsApp share on a phone: the `/produtos` link unfurled as a bare
title and description with no card image, while `/` unfurled correctly.

**Cause:** Next.js *shallow*-merges `metadata.openGraph`. Both `app/produtos/page.tsx` and
`app/produtos/[slug]/page.tsx` declare their own `openGraph` object, which replaces the root
layout's wholesale and drops `type`, `locale` and `siteName`. The PDP still had an image because
`app/produtos/[slug]/opengraph-image.tsx` exists in its segment; `/produtos` had no such file,
so it lost the image too.

This matters more than a normal SEO nit: the pitch is *"você manda **um link**"*
(`spec-architecture.md` §2.3), that link is `/produtos`, and it is shared **on WhatsApp**, which
renders the OG card. A linkless grey box undercuts the demo at the point of sharing.

**Fix:**
- `lib/seo.ts` — `ogPadrao` carries `type`/`locale`/`siteName`; both routes spread it instead of
  restating the fields, so the next page added can't silently drop them again.
- `app/produtos/opengraph-image.tsx` — a dedicated card rather than inheriting the generic one,
  since this is the most-shared URL on the site. Uses the régua (`spec-design.md` §6.1) carrying
  the real catalogue count.

Verified against a production build served locally: `/produtos` now emits all eleven `og:*` tags
and the image renders (1200 × 630, 43 KB).

**Follow-up, not fixed here:** both OG cards specify `Georgia, serif` for display text, but that
face isn't present in the Satori runtime, so headings fall back to sans instead of a Didone
(`spec-design.md` §5). Fixing it means committing a Bodoni Moda `.woff2` and loading it into
`ImageResponse`. Cosmetic, affects the share card only — worth doing before phase 1.

---

## 3. Why

The demo's job is to survive ten minutes in Fátima's hands. Every hour spent on new features
before this checklist passes is an hour spent on a demo that currently sends her a broken link
at its climax.

The §2.2 guard is included rather than deferred because the defect it prevents already happened
once and was invisible for a full deploy cycle. A demo whose correctness depends on remembering
to set a dashboard field will break again during the phase-1 domain migration, which is exactly
when it is most expensive.

---

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `content/loja.ts` | edit | `SITE_URL` fallback chain + production build guard (§2.2), trailing-slash normalisation (§2.5A) |
| `lib/seo.ts` | new | `ogPadrao` — shared Open Graph identity fields (§2.5B) |
| `app/produtos/opengraph-image.tsx` | new | Dedicated share card for the most-shared route (§2.5B) |
| `app/produtos/page.tsx` | edit | Spread `ogPadrao` into `openGraph` (§2.5B) |
| `app/produtos/[slug]/page.tsx` | edit | Spread `ogPadrao` into `openGraph` (§2.5B) |
| `.env.example` | edit | Document the fallback order and that an empty value is caught |
| `README.md` | edit | Status line; deployed URL; verified-on-device results |
| `docs/spec-architecture.md` | edit | §14 — record the deployed URL against `[VERIFY]` items where relevant |
| Vercel project settings | external | `NEXT_PUBLIC_SITE_URL` in Production (§2.1) — not a repo change |

---

## 5. Done when

- [x] `NEXT_PUBLIC_SITE_URL` set in Vercel Production (done in the dashboard, 2026-08-15).
- [x] Trailing-slash normalisation and the `og:image` fix build clean (§2.5).
- [ ] All three `curl` assertions in §1.1 return `https://fa-moveis.vercel.app`, no `localhost`.
- [ ] `pnpm build` / `pnpm typecheck` / `pnpm lint` clean.
- [ ] A production build with `VERCEL_ENV=production` and no site URL set **fails** with the
      §2.2 error (the guard is tested, not assumed).
- [ ] The §2.4 checklist is run on a real phone and its results recorded in `README.md` —
      including any failures, which become their own task docs.
