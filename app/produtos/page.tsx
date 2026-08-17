import type { Metadata } from "next";
import Link from "next/link";
import { catalog } from "@/lib/catalog/source";
import { categorias } from "@/content/categorias";
import { ProdutoCard } from "@/components/produto/ProdutoCard";
import { cn } from "@/lib/cn";
import { ogPadrao } from "@/lib/seo";

const title = "Produtos";
const description = "Móveis de fábrica com medida certa para sua casa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/produtos" },
  openGraph: { ...ogPadrao, title, description, url: "/produtos" },
  twitter: { title, description },
};

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria: categoriaSlug } = await searchParams;
  const [produtos, categoriasComProdutos] = await Promise.all([
    catalog.listarProdutos(categoriaSlug ? { categoria: categoriaSlug } : undefined),
    catalog.listarProdutos(),
  ]);
  const categoriaAtiva = categorias.find((c) => c.slug === categoriaSlug);
  const categoriasDisponiveis = categorias.filter((c) =>
    categoriasComProdutos.some((p) => p.categoria === c.slug),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <h1 className="font-display text-title-h1 text-jacaranda">
        {categoriaAtiva ? categoriaAtiva.nome : "Nossos móveis"}
      </h1>
      <p className="mt-2 max-w-prose text-body text-tinta-suave">
        Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação. Toda medida
        real, do jeito que ela chega até você.
      </p>

      {categoriasDisponiveis.length > 1 && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Filtrar por categoria">
          <li>
            <Link
              href="/produtos"
              className={cn(
                "inline-flex min-h-9 items-center rounded-[4px] border px-3 text-body-sm",
                !categoriaAtiva
                  ? "border-rosa-forte bg-rosa-forte text-papel"
                  : "border-rosa/40 text-jacaranda hover:border-rosa",
              )}
            >
              Todos
            </Link>
          </li>
          {categoriasDisponiveis.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/produtos?categoria=${c.slug}`}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-[4px] border px-3 text-body-sm",
                  categoriaAtiva?.slug === c.slug
                    ? "border-rosa-forte bg-rosa-forte text-papel"
                    : "border-rosa/40 text-jacaranda hover:border-rosa",
                )}
              >
                {c.nome}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {produtos.length > 0 ? (
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produtos.map((produto, i) => (
            <li key={produto.slug}>
              <ProdutoCard produto={produto} prioridade={i === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-body text-tinta-suave">
          Nada nessa categoria por enquanto — chama a Fátima, ela consegue encomendar.
        </p>
      )}
    </div>
  );
}
