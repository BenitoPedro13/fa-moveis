# F&A Móveis — Architecture Spec

> Written in English (matching this repo's doc convention). Every customer-facing string,
> taxonomy term, and brand word stays in **pt-BR** and is quoted verbatim here — those are
> content, not prose, and they ship as written.
>
> Companion document: `docs/spec-design.md`.

---

## 1. Context

**F&A Móveis** is a neighbourhood furniture shop in Rio de Janeiro (DDD 21), run by
**Fátima**. It has existed for years and already has a brand: a name, a logo, a tagline, a
voice, a painted storefront, and a customer base. It does **not** have a website.

Everything below is derived from evidence in `videos/F&A-Moveis-Facebook.mov`, not assumed:

| Fact | Evidence |
|---|---|
| Name | `F&A Móveis` |
| Owner / contact | `Fátima`, WhatsApp `(21) 97002-1791`, `fatimaeamoveis@gmail.com` |
| Tagline (hers, verbatim) | "Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação." |
| Business model | Resells factory furniture (`móveis de fábrica`) — named supplier models, not bespoke |
| Services | `montagem e entrega` (assembly + delivery) — stated in her own post |
| Payment terms (hers, verbatim) | "parcelamos no cartão em 12x ou um super desconto para pagamento à vista" |
| Current sales channel | WhatsApp, direct with Fátima |
| Current web presence | One Facebook page, **last post Feb 2022**, 3–9 reactions per post |
| Product data she already has | Model name, dimensions in cm/m, weight capacity, colour options |

That last row matters more than it looks. Her Facebook photos are supplier catalogue sheets:
**every product already comes with a technical drawing and exact measurements** —
`Roupeiro Mônaco 2,30 m × 2,40 m × 0,55 m`, `Balcão Max — cores disponíveis: Ipê; Off White`,
`Armário Aéreo Max — 580 mm × 1200 mm × 320 mm, 22,50 Kg`, `Fruteira 107 cm × 88 cm × 39 cm`.
The catalogue is half-built already, and it is built around measurements.

### 1.1 Product taxonomy, taken from her own Facebook albums

She has already categorised her own inventory. Reuse it — do not invent a taxonomy.

`Roupeiros` · `Cozinhas / Kits` · `Balcões Utilitários` · `Armários Aéreos` ·
`Aparador/Bar` · `Fruteiras` · `Multiusos` · `Tábuas de Passar`

Observed model names: `Roupeiro Mônaco`, `Balcão Max`, `Armário Aéreo Max`,
`Armário Aéreo Plus`, `Armário Aéreo Life 3 Portas`, `Kit Sampaio 8 Pts`.
Observed colours: `Ipê`, `Off White`, `Branca`.

`[VERIFY: full album list and any categories not visible in the 26 s capture — ask Fátima
for the complete list, or page through the Facebook photo albums directly.]`

---

## 2. The decision: showcase, or ecommerce?

This is the question the whole project turns on, so it gets answered first and explicitly.

### 2.1 The case against a pure showcase

Correct instinct. A brochure site is a vanity purchase, and Fátima is not a vanity buyer —
she is a small-shop owner who stopped posting to Facebook in 2022 because it wasn't paying
her back. "A nice page about your store" gets a polite no.

### 2.2 The case against full ecommerce **in v1**

Also real, and it's the part that's easy to get wrong when you already know Hydrogen:

- **Shopify is a recurring bill she must justify monthly.** `[VERIFY: current Shopify Basic
  price in BRL — check shopify.com/br/precos at pitch time.]` For a shop with single-digit
  Facebook engagement, a monthly platform fee is the thing she cancels in month three. When
  she cancels, the portfolio piece goes offline too.
- **Hydrogen cannot be demoed without a store.** The Storefront API needs a real Shopify
  store to exist. Building the pitch demo on Hydrogen means she is paying (or you are)
  *before* she has said yes. That inverts the sale.
- **Checkout is not where furniture is sold here.** Nobody puts a R$ 1.800 roupeiro in a
  cart at 11 p.m. and taps pay. They ask: does it fit, what colour, does it come assembled,
  do you deliver to my street, can I do 12x. That is a conversation, and she is good at it.
- **Real ecommerce drags real operations behind it**: stock counts, NF-e, shipping zones,
  returns policy, chargebacks. Handing that to a one-person shop as a surprise is how the
  site becomes a burden instead of an asset.
- Her own reference — **Prima Linea**, a serious Brazilian furniture brand with 12 stores —
  has **no cart**. It has `Solicitar Orçamento` and a WhatsApp button per store. That is the
  Brazilian furniture pattern at every scale.

### 2.3 The recommendation

**Build a catalogue that behaves like a store and converts on WhatsApp.**

It looks like ecommerce — real product grid, filters, product pages, prices, `12x sem juros`,
a running list you add items to. It just terminates in a pre-filled WhatsApp message to
Fátima instead of a checkout. No platform fee, no payment integration, no tax surface, no
abandoned carts, nothing to cancel.

The pitch to her is one sentence, and it is not about design:

> Hoje, quando alguém pergunta "você tem roupeiro?", você manda 20 fotos uma por uma.
> Com o site, você manda **um link** — e a pessoa te chama no WhatsApp já dizendo qual
> modelo, qual cor e qual medida ela quer.

That is a labour saving she feels the same week. Add the free lever that actually brings
strangers in — **Google Business Profile + local SEO**, so "loja de móveis em `<bairro>`"
finds her — and the site pays for itself without her spending anything monthly.

### 2.4 So where does Shopify go?

It becomes **phase 3**, sold later, when there is traffic to justify it. The architecture
below makes that a **swap of one module**, not a rewrite — which is exactly what your
`sua-mesa-fit` experience is for. You are not throwing that work away; you are deferring the
part of it that costs her money until it makes her money.

---

## 3. Phases, and what each one costs

| Phase | What it is | Her cost | Your work |
|---|---|---|---|
| **0 — Demo** | Real catalogue, ~20–30 products, live URL, on her brand. Built before she pays. | R$ 0 | The pitch |
| **1 — Launch** | Domain, Google Business Profile, WhatsApp wired, catalogue complete | Domain only `[VERIFY: .com.br annual price at registro.br]` | One-off fee |
| **2 — Care** | Monthly product updates, seasonal promos, photos, analytics report | Small monthly (optional) | Recurring revenue |
| **3 — Loja online** | Shopify + Hydrogen, real checkout, Pix/cartão | Shopify plan + fees | The upsell |

Hosting for phases 0–2 is **Vercel free tier**. `[VERIFY: current Hobby-tier limits and
whether a client-owned commercial site is permitted under Vercel's Fair Use — if not, the
Pro seat is yours, not hers, or move to Cloudflare Pages.]`

Phase 0 is the whole trick: **she sees her own store, with her own logo and her own products,
on her own phone, before any money is discussed.** That is what converts a "maybe later" into
a yes, and it costs you a weekend.

---

## 4. Stack

| Layer | Choice | Why this and not the obvious alternative |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Not Hydrogen/Remix: v1 has no Shopify store to talk to. Next matches your other current work (`moova`, `prumo`, `ART'hur`) and gives free image optimisation + ISR on the tier that costs R$ 0. |
| Styling | **Tailwind + CSS variables for tokens** | Same as `sua-mesa-fit`; design tokens in `spec-design.md` map 1:1 to CSS vars. |
| Components | **Radix primitives + local components** | Port the shapes from `sua-mesa-fit` (`ProductCard`, `ProductImage`, `PaginatedResourceSection`, `Aside`), not the Shopify types. |
| Catalogue data (v1) | **Typed TS modules in `content/`** | No CMS bill, no DB, git-versioned, type-checked, instantly diffable. 30 products does not need Postgres. |
| Catalogue data (v2) | **Shopify Storefront API** | Behind the same interface — see §6. |
| Images | **Local files → `next/image`** | Supplier renders are the raw material. Normalisation rules in `spec-design.md` §9. |
| Conversion | **`wa.me` deep links** | No API, no Business API approval, no cost, works on her existing phone. |
| Analytics | **Vercel Analytics** (free tier) | So phase 2 has a monthly number to show her. |
| Hosting | **Vercel** | |
| Forms/backend | **None in v1** | Everything terminates in WhatsApp. Adding a backend adds a thing that can break while she is not paying for support. |

### 4.1 Layout

```
app/
  layout.tsx
  page.tsx                      Home
  produtos/page.tsx             All products + filters
  produtos/[slug]/page.tsx      Product page (PDP)
  categorias/[slug]/page.tsx    Roupeiros, Cozinhas, Balcões, …
  ambientes/[slug]/page.tsx     Cozinha, Quarto, Sala, Área de serviço
  cabe-na-minha-casa/page.tsx   Fit tool (§10)
  sobre/page.tsx                Her story, in her voice
  contato/page.tsx              WhatsApp, map, hours
  opengraph-image.tsx
content/
  produtos.ts                   Product[] — the catalogue
  categorias.ts
  ambientes.ts
  loja.ts                       Name, phone, address, hours, socials — single source
lib/
  catalog/
    types.ts                    Domain types. Zero Shopify imports. (§5)
    source.ts                   getProdutos / getProduto / getCategorias  (§6)
    source.local.ts             v1 implementation
    source.shopify.ts           v2 implementation
  whatsapp.ts                   Deep-link + message builders (§8)
  fit.ts                        Dimension matching (§10)
components/
  produto/  ProdutoCard, ProdutoGaleria, FichaTecnica, PrecoParcelado, MedidaLinha
  orcamento/ OrcamentoDrawer, BotaoAdicionar, BotaoWhatsApp
  layout/   Header, Footer, NavCategorias
public/produtos/<slug>/…
```

---

## 5. Domain model

**Rule: nothing outside `lib/catalog/source.*.ts` may import a Shopify type.** Components are
written against `Produto`, never against Shopify's `Product`. This one rule is what makes
phase 3 a swap instead of a rewrite.

```ts
// lib/catalog/types.ts

export type Medidas = {
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
  pesoSuportadoKg?: number;   // she publishes this for shelves/aéreos
};

export type Cor = {
  nome: string;               // 'Ipê' | 'Off White' | 'Branca' — her supplier's names
  hex: string;                // for the swatch
  imagem?: string;            // per-colour render when the supplier provides one
};

export type Preco = {
  aVista: number;             // BRL, cents avoided — use number of reais
  parcelas: number;           // 12
  valorParcela: number;       // derived, but stored so rounding is explicit
  descontoAVistaPct?: number;
};

export type Produto = {
  slug: string;
  nome: string;               // 'Roupeiro Mônaco'
  categoria: string;          // slug -> categorias.ts
  ambientes: string[];        // ['quarto']
  resumo: string;             // one line, her voice
  descricao: string;
  medidas: Medidas;
  cores: Cor[];
  imagens: { src: string; alt: string; tipo: 'ambiente' | 'produto' | 'tecnico' }[];
  preco?: Preco;              // optional — 'Consultar' when absent
  destaque?: boolean;
  disponivel: boolean;
};
```

Notes that are decisions, not details:

- **`medidas` is required.** Every product must carry real dimensions. This is the single
  most valuable field she owns and the whole design leans on it (`spec-design.md` §6).
  A product without measurements does not ship.
- **`tipo` on images** exists because her sources are three different things — a styled room
  photo, a cut-out on white, and a technical drawing — and they are laid out differently.
- **`preco` is optional by design.** See §11 on demo pricing.

---

## 6. The catalogue boundary

```ts
// lib/catalog/source.ts
import type { Produto, Categoria } from './types';

export interface CatalogSource {
  listarProdutos(f?: { categoria?: string; ambiente?: string }): Promise<Produto[]>;
  obterProduto(slug: string): Promise<Produto | null>;
  listarCategorias(): Promise<Categoria[]>;
}

export const catalog: CatalogSource =
  process.env.CATALOG_SOURCE === 'shopify'
    ? shopifySource   // v2 — maps Storefront API -> Produto
    : localSource;    // v1 — reads content/produtos.ts
```

Phase 3 then means: create the Shopify store, write `source.shopify.ts` mapping
`Product`/`ProductVariant` → `Produto`/`Cor`, flip the env var. Pages, components, filters,
the fit tool, and the design system are untouched. Cart and checkout get added on top; the
WhatsApp path stays, because it will keep outconverting checkout for the big-ticket items.

**What carries over from `sua-mesa-fit` at that point** (verified against the repo):

- `app/components/ProductCard.tsx`, `ProductImage.tsx`, `ProductPrice.tsx`, `ProductForm.tsx`
- `app/components/PaginatedResourceSection.tsx`, `Aside.tsx`, `PageLayout.tsx`
- `SearchFormPredictive.tsx` / `SearchResultsPredictive.tsx` — predictive search
- Cart stack: `CartMain`, `CartLineItem`, `CartSummary`, `AddToCartButton`
- **`app/config/delivery.ts` + `app/utils/distance.ts` + `app/routes/api-shipping.tsx`** —
  the distance-banded delivery model (haversine → km band → Shopify shipping variant). This
  is the highest-value carry-over: F&A charges for `entrega` by how far you are, exactly like
  Sua Mesa Fit does. Reuse the model in v1 too, as a static "consulte a taxa de entrega para
  o seu bairro" table.
- The `tailwind.config.ts` type scale (`title-h1…h6`, `label-*`) — the token names transfer;
  the values change per `spec-design.md`.

---

## 7. Content pipeline — getting a catalogue out of Facebook

The hard part of this project is not code. It is that the product data lives in 100+ Facebook
photos. Budget real time here.

1. **Harvest.** Pull the full-resolution images from each album. Keep album name → category.
2. **Read the sheets.** Each supplier image carries name, dimensions, colours, sometimes
   weight. Transcribe into `content/produtos.ts`. Do not guess a measurement — if the drawing
   is unreadable, mark `[VERIFY]` and ask Fátima.
3. **Normalise units.** She mixes `2,30 m`, `107 CM`, `580 mm`. Store everything in **cm**
   as a number. Format for display at the edge, never in the data.
4. **Sort images by `tipo`.** Room photo → `ambiente`, cut-out → `produto`, drawing →
   `tecnico`.
5. **Deduplicate.** `Armário Aéreo Max` and `Armário Aéreo Plus` are different products;
   the same product reposted in 2020 and 2022 is one product.
6. **Write the one-liners** in her voice. Her actual captions are the source material:
   *"Lindo balcão para deixar sua cozinha ainda mais bonita e aconchegante!"* — see
   `spec-design.md` §10.

For phase 0 the target is **20–30 products across 6–8 categories** — enough that the grid
feels like a real store, small enough to build in a weekend. Pick her best-photographed items.

---

## 8. WhatsApp conversion

The whole site is a machine for producing one good WhatsApp message.

```ts
// lib/whatsapp.ts
const TELEFONE = '5521970021791';   // 55 + 21 + 97002-1791

export function linkProduto(p: Produto, cor?: string) {
  const texto = [
    `Olá, Fátima! Vi no site e me interessei:`,
    ``,
    `*${p.nome}*`,
    `Medidas: ${p.medidas.larguraCm} × ${p.medidas.alturaCm} × ${p.medidas.profundidadeCm} cm (L × A × P)`,
    cor ? `Cor: ${cor}` : null,
    ``,
    `${SITE_URL}/produtos/${p.slug}`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${TELEFONE}?text=${encodeURIComponent(texto)}`;
}
```

Three entry points, in order of value:

1. **Per product** — "Pedir pelo WhatsApp" on every card and PDP. Pre-filled as above.
2. **Lista de orçamento** — the cart-shaped thing. Add several items, send **one** message
   listing all of them. `localStorage`, no account, no backend. This is what makes the site
   feel like a store while staying free.
3. **Global** — floating button + header, generic greeting.

**Why pre-filling matters:** it removes the "qual modelo?" round-trip that currently costs
Fátima ten messages per lead. Show her this on her own phone during the pitch. It is the
moment she gets it.

`[VERIFY: confirm (21) 97002-1791 is the WhatsApp number and still hers — the Facebook post
stating it is from April 2020.]`

---

## 9. Routes and what each one is for

| Route | Job | Conversion |
|---|---|---|
| `/` | Prove in one screen that this is a real furniture store with real products | Category rail + featured, WhatsApp in header |
| `/produtos` | Browse everything; filter by categoria, ambiente, cor, **medida** | Card-level WhatsApp + add to orçamento |
| `/produtos/[slug]` | Answer *does it fit, what colour, how much, how do I pay* | Primary CTA |
| `/categorias/[slug]` | SEO landing per category — "roupeiro", "balcão de cozinha" | |
| `/ambientes/[slug]` | Browse by room, the way customers actually think | |
| `/cabe-na-minha-casa` | The signature tool (§10) | Highest-intent traffic on the site |
| `/sobre` | Her, the shop, the years, the assembly-and-delivery promise | Trust |
| `/contato` | Map, hours, WhatsApp, address | Foot traffic |

---

## 10. `Cabe na minha casa?` — the fit tool

The one feature that is specific to this shop and not copied from any reference.

**The problem it solves:** every one of her leads eventually asks "qual a medida?" and every
customer's real question is "cabe naquela parede entre a porta e a janela?" Her catalogue
already has the answer in every image; nothing on the internet lets the customer ask it.

**Interaction:** enter available `largura` in cm (optionally `altura`, `profundidade`) →
results filter to what fits, with the leftover clearance shown per item.

```ts
// lib/fit.ts
export function cabe(p: Produto, vao: { larguraCm: number; alturaCm?: number; profundidadeCm?: number }) {
  const folga = vao.larguraCm - p.medidas.larguraCm;
  return {
    cabe: folga >= 0
      && (vao.alturaCm === undefined || vao.alturaCm >= p.medidas.alturaCm)
      && (vao.profundidadeCm === undefined || vao.profundidadeCm >= p.medidas.profundidadeCm),
    folgaCm: folga,
  };
}
```

Copy when it fits: **`Sobra 12 cm de folga`**. When it doesn't: **`Faltam 8 cm`** — and then
show the nearest model that *does* fit. A near-miss is a sale, not a dead end.

It costs almost nothing to build (it is a filter over data you already have), it is the thing
she will describe to other people, and it is the thing that makes this a portfolio piece
rather than another catalogue site.

---

## 11. Prices in the demo — handle carefully

Showing prices makes the demo feel real and sells much better than `Consultar`. Inventing
Fátima's prices and showing them to Fátima is how you lose the room — she will react to the
wrong number, not to the site.

**Do this:** source plausible prices for her *actual* model names (`Roupeiro Mônaco`,
`Balcão Max`, `Kit Sampaio 8 Pts`) from public Brazilian retail listings, and put one honest
line at the top of the demo:

> Preços ilustrativos, tirados do mercado — no site real, você define os seus.

Display them the way her customer thinks, using her own words:
**`12x de R$ 149 sem juros`** as the large number, **`R$ 1.590 à vista`** secondary. Both
strings come straight from her January 2022 post.

`[VERIFY: whether these supplier model names are still in her current stock — a 2022 catalogue
may not match 2026 inventory. Ask before the pitch; a wrong product is worse than fewer products.]`

---

## 12. Local SEO — the part that actually brings her customers

Free, high-leverage, and the strongest non-design argument in the pitch. A physical shop's
best online asset is not a website; it is the Google Business Profile the website supports.

- **Google Business Profile**: claim/verify, real address, hours, WhatsApp, photos of the
  shop and the products, link to the site. Do this *with* her during onboarding.
- **`LocalBusiness` + `Product` JSON-LD** on every page. `FurnitureStore` type, `openingHours`,
  `telephone`, `geo`, `priceRange`.
- **Category pages target the real queries**: "roupeiro em `<bairro>`", "balcão de cozinha
  `<bairro>`", "loja de móveis perto de mim".
- `/contato` carries the NAP (name, address, phone) as crawlable text, identical to the GBP
  listing, plus an embedded map.
- `sitemap.xml`, `robots.txt`, per-product OG images.

`[VERIFY: her exact street address — not visible in the Facebook capture. Required for GBP,
schema, and the map.]`

---

## 13. Performance budget

Her customers are on mid-range Android phones on mobile data. This is a hard constraint, not
an aspiration, and these are the acceptance criteria:

| Metric | Budget | How measured |
|---|---|---|
| LCP, `/produtos` | **< 2.5 s** | Lighthouse mobile, Moto G Power profile, 4G throttle |
| CLS | **< 0.1** | Every image ships with explicit `width`/`height` |
| First-load JS, any route | **< 120 KB** gzipped | `next build` output |
| Largest product image | **< 180 KB** | AVIF primary, WebP fallback |
| Lighthouse mobile Performance | **≥ 90** | |
| Lighthouse Accessibility | **= 100** | Non-negotiable; see `spec-design.md` §12 |

The fit tool and the orçamento drawer are the only client-side interactive pieces. Everything
else is a Server Component.

---

## 14. Open questions

Resolve before the pitch where marked, before launch otherwise.

1. `[VERIFY: exact street address + opening hours]` — blocks GBP, schema, `/contato`.
2. `[VERIFY: WhatsApp number still current]` — blocks every CTA on the site.
3. `[VERIFY: current inventory vs the 2022 Facebook catalogue]` — blocks product selection.
4. `[VERIFY: does she have the original logo file?]` — if not, it gets redrawn as SVG from
   the raster; see `spec-design.md` §13.
5. `[VERIFY: delivery radius and current delivery pricing]` — feeds the delivery table and
   the eventual `delivery.ts` bands.
6. `[VERIFY: does she have an Instagram?]` — Facebook is dead since 2022; if Instagram is
   live, that is the social link and a photo source.
7. `[VERIFY: domain availability — famoveis.com.br, faemoveis.com.br]` at registro.br.
8. `[VERIFY: Vercel Hobby Fair Use for a client site]` — see §3.

---

## 15. Build order for the demo

Ship in this sequence; each step is demoable on its own, so you can stop anywhere and still
have something to show.

1. Scaffold + design tokens + `Header`/`Footer` with the real logo.
2. `content/produtos.ts` with **6 products, fully transcribed** — proves the data model.
3. `ProdutoCard` + `/produtos` grid. **This is the moment it starts looking like a store.**
4. `/produtos/[slug]` with `FichaTecnica` and the WhatsApp CTA.
5. Home page.
6. Fill the catalogue to 20–30 products.
7. `cabe-na-minha-casa`.
8. Orçamento drawer.
9. `/sobre`, `/contato`, schema, OG images.
10. Deploy to a real URL. **Open it on her phone, not your laptop.**

---

## TL;DR

Catalogue that behaves like a store, converts on WhatsApp, costs her nothing to run. Domain
model (`Produto`) is Shopify-free so phase 3 is a one-module swap that reuses `sua-mesa-fit`
wholesale. The signature is measurements — she already owns that data and it is the question
her customers actually ask. Build the demo before asking for money, and show it to her on
her own phone.
