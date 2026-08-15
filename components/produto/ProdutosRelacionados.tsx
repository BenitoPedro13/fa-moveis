import type { Produto } from "@/lib/catalog/types";
import { ProdutoCard } from "./ProdutoCard";

const MAX_RELACIONADOS = 8;

export function ProdutosRelacionados({
  produtos,
  atual,
}: {
  produtos: Produto[];
  atual: string;
}) {
  const produtoAtual = produtos.find((p) => p.slug === atual);
  const outros = produtos.filter((p) => p.slug !== atual);

  // Same category first (genuinely related), then fill with the rest, capped — this is a
  // "you might also like" strip, not a second copy of the whole catalogue.
  const mesmaCategoria = outros.filter((p) => p.categoria === produtoAtual?.categoria);
  const resto = outros.filter((p) => p.categoria !== produtoAtual?.categoria);
  const relacionados = [...mesmaCategoria, ...resto].slice(0, MAX_RELACIONADOS);

  if (relacionados.length === 0) return null;

  return (
    <section className="mt-20 border-t border-rosa/30 pt-16">
      <h2 className="font-display text-title-h2 text-jacaranda">Você também pode gostar</h2>
      <ul
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {relacionados.map((produto) => (
          <li key={produto.slug} className="w-[220px] shrink-0 snap-start sm:w-[260px]">
            <ProdutoCard produto={produto} />
          </li>
        ))}
      </ul>
    </section>
  );
}
