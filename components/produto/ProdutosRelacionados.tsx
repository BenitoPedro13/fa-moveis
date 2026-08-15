import type { Produto } from "@/lib/catalog/types";
import { ProdutoCard } from "./ProdutoCard";

export function ProdutosRelacionados({
  produtos,
  atual,
}: {
  produtos: Produto[];
  atual: string;
}) {
  const outros = produtos.filter((p) => p.slug !== atual);
  if (outros.length === 0) return null;

  return (
    <section className="mt-20 border-t border-rosa/30 pt-16">
      <h2 className="font-display text-title-h2 text-jacaranda">Você também pode gostar</h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {outros.map((produto) => (
          <li key={produto.slug}>
            <ProdutoCard produto={produto} />
          </li>
        ))}
      </ul>
    </section>
  );
}
