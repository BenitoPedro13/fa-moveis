import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/lib/catalog/source";
import { categorias } from "@/content/categorias";
import { GaleriaProduto } from "@/components/produto/GaleriaProduto";
import { FichaTecnica } from "@/components/produto/FichaTecnica";
import { PrecoParcelado } from "@/components/produto/PrecoParcelado";
import { BotaoWhatsApp } from "@/components/orcamento/BotaoWhatsApp";
import { ProdutosRelacionados } from "@/components/produto/ProdutosRelacionados";
import { linkProduto } from "@/lib/whatsapp";
import { SITE_URL } from "@/content/loja";
import { ogPadrao } from "@/lib/seo";

export async function generateStaticParams() {
  const produtos = await catalog.listarProdutos();
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produto = await catalog.obterProduto(slug);
  if (!produto) return {};
  return {
    title: produto.nome,
    description: produto.resumo,
    alternates: { canonical: `/produtos/${produto.slug}` },
    openGraph: {
      ...ogPadrao,
      title: produto.nome,
      description: produto.resumo,
      url: `/produtos/${produto.slug}`,
    },
    twitter: { title: produto.nome, description: produto.resumo },
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [produto, todos] = await Promise.all([
    catalog.obterProduto(slug),
    catalog.listarProdutos(),
  ]);
  if (!produto) notFound();

  const categoria = categorias.find((c) => c.slug === produto.categoria);

  // schema.org Product — only confirmed fields. No `offers`: no real price exists yet, and a
  // fabricated one is worse for local SEO than none (CLAUDE.md §0).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: produto.resumo,
    category: categoria?.nome,
    image: produto.imagens.map((i) => new URL(i.src, SITE_URL).toString()),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Largura", value: `${produto.medidas.larguraCm} cm` },
      { "@type": "PropertyValue", name: "Altura", value: `${produto.medidas.alturaCm} cm` },
      {
        "@type": "PropertyValue",
        name: "Profundidade",
        value: `${produto.medidas.profundidadeCm} cm`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Trilha" className="mb-6 flex items-center gap-2 text-body-sm text-tinta-suave">
        <Link href="/produtos" className="hover:text-rosa-forte">
          Produtos
        </Link>
        {categoria && (
          <>
            <span aria-hidden>/</span>
            <Link href={`/produtos?categoria=${categoria.slug}`} className="hover:text-rosa-forte">
              {categoria.nome}
            </Link>
          </>
        )}
        <span aria-hidden>/</span>
        <span className="text-jacaranda">{produto.nome}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <GaleriaProduto produto={produto} />
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          {categoria && (
            <p className="text-eyebrow text-rosa-forte uppercase">{categoria.nome}</p>
          )}
          <h1 className="mt-1 font-display text-title-h1 text-jacaranda">{produto.nome}</h1>
          <p className="mt-3 text-body text-tinta-suave">{produto.resumo}</p>

          <div className="mt-6">
            <PrecoParcelado preco={produto.preco} />
          </div>

          <div className="mt-6 border-t border-rosa/30 pt-6">
            <FichaTecnica produto={produto} />
          </div>

          <p className="mt-6 text-body text-jacaranda">{produto.descricao}</p>

          <BotaoWhatsApp href={linkProduto(produto)} className="mt-8 w-full sm:w-auto" />
        </div>
      </div>

      <ProdutosRelacionados produtos={todos} atual={produto.slug} />
    </div>
  );
}
