// spec-design.md §8 — definition list: medidas, peso suportado, cores, montagem inclusa.
// Plex Mono values, DM Sans labels, hairline rules between rows.
import type { Produto } from "@/lib/catalog/types";
import { formatMedidas, formatCm } from "@/lib/format";

function Linha({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rosa/20 py-3">
      <dt className="text-eyebrow text-rosa-forte uppercase">{label}</dt>
      <dd className="text-right font-mono text-body text-jacaranda">{children}</dd>
    </div>
  );
}

export function FichaTecnica({ produto }: { produto: Produto }) {
  return (
    <dl>
      <Linha label="Medidas (L × A × P)">{formatMedidas(produto.medidas)}</Linha>
      {produto.medidas.pesoSuportadoKg !== undefined && (
        <Linha label="Peso suportado">
          {produto.medidas.pesoSuportadoKg.toLocaleString("pt-BR")} kg
        </Linha>
      )}
      <Linha label="Cores disponíveis">
        {produto.cores.length > 0 ? produto.cores.map((c) => c.nome).join(" · ") : "Consultar"}
      </Linha>
      <Linha label="Entrega e montagem">Inclusas</Linha>
    </dl>
  );
}

// re-exported for the PDP frame, where profundidade is called out at the corner (spec-design §6.3)
export function profundidadeLabel(profundidadeCm: number) {
  return `prof. ${formatCm(profundidadeCm)}`;
}
