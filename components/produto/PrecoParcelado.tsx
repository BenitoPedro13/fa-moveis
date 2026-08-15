// spec-architecture.md §8, spec-design.md §8 — renders "Consulte o preço" when `preco` is
// absent. Never invent a price (CLAUDE.md §0) — sourcing real ones is a separate task.
import type { Preco } from "@/lib/catalog/types";
import { formatAVista, formatParcelado } from "@/lib/format";

export function PrecoParcelado({ preco }: { preco?: Preco }) {
  if (!preco) {
    return <p className="font-mono text-parcela text-jacaranda">Consulte o preço</p>;
  }

  return (
    <div>
      <p className="font-mono text-parcela text-jacaranda">
        {formatParcelado(preco.parcelas, preco.valorParcela)}
      </p>
      <p className="text-body-sm text-tinta-suave">{formatAVista(preco.aVista)}</p>
    </div>
  );
}
