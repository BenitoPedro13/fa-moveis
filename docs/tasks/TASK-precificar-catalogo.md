# TASK — Precificar catálogo (D'Doro + Novo Horizonte)

Slug: `precificar-catalogo`

---

## 1. Current scenario

All 13 products in `content/produtos.ts` ship with no `preco` field (shows "Consulte o preço"),
per `docs/dados-produtos.md` line 108–109: "Prices for all of them are `[VERIFY]` — pending
Fátima confirming in person."

Two pricing messages arrived today (2026-08-20):

**Benito, direct** — 7 Novo Horizonte lines, each with a base price and a "com frete e ipi"
price. Rule given: **final price = (preço com frete e ipi) × 2.**

| Supplier line | Frete+IPI | × 2 | Matches existing slug |
|---|---|---|---|
| GUARDA-ROUPA PARADIZZO GOLD 3PTS/6GAV C/ESP | 1.581,71 | 3.163,42 | `roupeiro-paradizzo` |
| GUARDA-ROUPA BURITI 3PTS/9GAV C/ESP | 917,70 | 1.835,40 | `roupeiro-buriti-3-portas-9-gavetas` |
| GUARDA-ROUPA ENCANT 6 PTS 6GAV E 6 PES | 832,56 | 1.665,12 | `roupeiro-encant-6-portas-6-gavetas` |
| CABECEIRA BOX CASAL EVEREST PLUS C/ 2 CRIADOS E LED | 502,26 | 1.004,52 | `cabeceira-everest` |
| COMODA DECA 10GAV | 620,60 | 1.241,20 | `comoda-deca-10-gavetas` |
| COMODA AUSTRIA 5GAV | 383,94 | 767,88 | `comoda-austria-5-gavetas` |
| COMODA SPACE PLUS 5GAV/2PTS | 541,38 | 1.082,76 | `comoda-space-5-gavetas-2-portas` |

Supplier lines carry extra spec words not yet reflected in the catalogue entries: "GOLD" on
Paradizzo, "PLUS" on Space and Everest, "6 PES" on Encant, "C/ESP" (com espelho) on Paradizzo.
Buriti and Encant already mention espelho in their `descricao`; Paradizzo does not.

**Fátima, via WhatsApp (relayed by Benito)** — 4 D'Doro lines, base prices without IPI:

```
Monaco 12 gav. - 1.488,00
Colibri 6 portas - 1.081,00
Colibri 4 portas - 749,00
Meridian 9 gav. - 1.241,00
Favor acrescentar o IPI de 3.25% no preço dos produtos
```

Benito's formula: **final price = (preço × 1,0325) × 2.**

| Supplier line | + 3.25% IPI | × 2 | Matches existing slug |
|---|---|---|---|
| Monaco 12 gav. | 1.536,36 | 3.072,72 | `roupeiro-monaco-plus-6-portas` |
| Colibri 6 portas | 1.116,13 | 2.232,26 | `roupeiro-colibri-6-portas` |
| Meridian 9 gav. | 1.281,33 | 2.562,66 | `roupeiro-meridian-plus-3-portas` |
| Colibri 4 portas | 773,34 | 1.546,68 | **no match — new SKU** |

"Colibri 4 portas" is a door-count variant of the existing 6-portas model, same pattern as how
Buriti/Encant/Paradizzo are kept as separate entries from each other despite being similar
roupeiros. It cannot be merged into `roupeiro-colibri-6-portas`.

This markup pattern (wholesale/frete+IPI × 2) mirrors the precedent already shipped for Benetil
(`docs/tasks/TASK-importar-catalogo-benetil.md` §2.4, `content/produtos.ts` line 344–346) — the
only supplier-priced products currently live all use a confirmed 2× markup.

## 2. Planned changes

### 2.1 `content/produtos.ts`

Add `preco: { aVista: <valor> }` to the 10 matched entries above (7 Novo Horizonte + 3 D'Doro),
using the computed values in the tables. Also fold real supplier detail into `nome`/`descricao`
where it isn't already captured, since it's straight off the same price sheet Fátima uses, not a
guess:

- `roupeiro-paradizzo`: rename to "Roupeiro Paradizzo Gold"; add "espelho central e 6 gavetas" to
  `descricao` (currently only mentions 3 portas).
- `comoda-space-5-gavetas-2-portas`: rename to "Cômoda Space Plus 5 Gavetas 2 Portas" — matches
  supplier's own model name, consistent with "Plus" already used for Mônaco/Meridian (D'Doro).
- `cabeceira-everest`: rename to "Cabeceira Casal Everest Plus" — same reasoning.
- `roupeiro-buriti-3-portas-9-gavetas`, `roupeiro-encant-6-portas-6-gavetas`: no name/descricao
  change, specs already match (espelho, gavetas already described).
- `roupeiro-monaco-plus-6-portas`, `roupeiro-colibri-6-portas`, `roupeiro-meridian-plus-3-portas`:
  no name change, gavetas count already in the name.

Update `alt` text on affected product images to match renamed `nome` fields.

### 2.2 `roupeiro-colibri-4-portas` — NOT added yet

Fátima's message gives name + price only. No measurements, colours, or images exist for this
SKU, and `Produto.medidas`/`.cores`/`.imagens` are non-optional (`lib/catalog/types.ts`).
Per CLAUDE.md §0 ("never invent... a measurement"), this cannot ship as a placeholder entry.
Logged as `[VERIFY]` in `docs/dados-produtos.md` instead — same treatment as the unresolved
Mônaco/roupeiro-monaco duplicate-size question already there.

### 2.3 `docs/dados-produtos.md`

Update the "Prices for all of them are `[VERIFY]`" line (§ Fornecedores reais) — 10 of 13 now
priced; note the 2× markup rule for each supplier (frete+IPI×2 for Novo Horizonte, (preço×1,0325)×2
for D'Doro) and add the new `[VERIFY: Colibri 4 portas needs measurements/colours/images before
it can be added as a product]` entry.

### 2.4 `CLAUDE.md`

Update the catalogue status paragraph — no longer "None have a confirmed price yet."

## 3. Why

Both messages are Fátima/Benito supplying real pricing data directly, resolving a `[VERIFY]` that
has blocked "Consulte o preço" on 10 of 13 live products since launch. The 2× markup pattern is
already established and shipped for Benetil — applying the same shape here (frete/IPI baked in,
then doubled) keeps pricing logic consistent across all three suppliers rather than introducing a
fourth pattern.

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `content/produtos.ts` | edit | `preco.aVista` added to 10 entries; 3 renamed (`nome`, `descricao`, image `alt`) |
| `docs/dados-produtos.md` | edit | resolve pricing `[VERIFY]`, log new Colibri 4 portas `[VERIFY]` |
| `CLAUDE.md` | edit | status line no longer says all prices unconfirmed |

## 5. Done when

- [x] 10 `preco.aVista` values added, computed exactly as in the tables above.
- [x] 3 renames applied consistently (`nome`, `descricao`, image `alt`).
- [x] `pnpm typecheck` passes.
- [x] `docs/dados-produtos.md` and `CLAUDE.md` updated.
- [x] Colibri 4 portas logged as pending specs, not added to `produtos.ts`.

## 6. Follow-up: "ou também parcelamos" copy

Added mid-task at Benito's request: when a product has `preco.aVista` but no `parcelas`/
`valorParcela` (i.e. every product priced in this task), `PrecoParcelado`
(`components/produto/PrecoParcelado.tsx`) now shows a small second line, "ou também parcelamos",
under the price — same treatment as the existing parcelado case's secondary line. Renders on both
`ProdutoCard` and the PDP, since both consume the same component.
