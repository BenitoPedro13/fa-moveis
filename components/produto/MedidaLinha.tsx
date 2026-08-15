// spec-design.md §6.1 — the signature. A rose hairline with tick ends and a mono number,
// exactly like the supplier drawings. Binding rule: it must carry a real number — `valor`
// is required, never optional, so a decorative hairline can't compile.
import { cn } from "@/lib/cn";

type Props = {
  valor: number;
  unidade?: "cm" | "m";
  orientacao?: "h" | "v";
  className?: string;
};

function formatar(valor: number, unidade?: "cm" | "m"): string {
  if (unidade === "m") return `${(valor / 100).toFixed(2).replace(".", ",")} m`;
  if (unidade === "cm") return `${valor} cm`;
  return valor >= 100 ? `${(valor / 100).toFixed(2).replace(".", ",")} m` : `${valor} cm`;
}

export function MedidaLinha({ valor, unidade, orientacao = "h", className }: Props) {
  const texto = formatar(valor, unidade);

  if (orientacao === "v") {
    return (
      <div
        role="img"
        aria-label={`Medida: ${texto}`}
        className={cn("relative flex w-4 flex-col items-center justify-center", className)}
      >
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-rosa" />
        <span aria-hidden className="absolute top-0 left-1/2 h-px w-2 -translate-x-1/2 bg-rosa" />
        <span aria-hidden className="absolute bottom-0 left-1/2 h-px w-2 -translate-x-1/2 bg-rosa" />
        <span
          aria-hidden
          className="relative bg-papel px-1 py-2 font-mono text-medida text-rosa-forte [writing-mode:vertical-rl]"
        >
          {texto}
        </span>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Medida: ${texto}`}
      className={cn("relative flex h-4 items-center justify-center", className)}
    >
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rosa" />
      <span aria-hidden className="absolute top-1/2 left-0 h-2 w-px -translate-y-1/2 bg-rosa" />
      <span aria-hidden className="absolute top-1/2 right-0 h-2 w-px -translate-y-1/2 bg-rosa" />
      <span
        aria-hidden
        className="relative bg-papel px-2 font-mono text-medida text-rosa-forte"
      >
        {texto}
      </span>
    </div>
  );
}
