// The full home page (spec-design.md §7.1 — category rail with drawn icons, the fit tool) is
// step 5–7 of the build order and needs assets that don't exist yet (TASK-scaffold-catalogo.md
// §2.5). This keeps the hero's actual idea — a product with its measurement frame — and adds a
// products preview so the page isn't empty below the fold; the icon rail and fit tool are still
// separate, later work.
import Link from "next/link";
import Image from "next/image";
import { loja } from "@/content/loja";
import { catalog } from "@/lib/catalog/source";
import { categorias } from "@/content/categorias";
import { MedidaLinha } from "@/components/produto/MedidaLinha";
import { ProdutoCard } from "@/components/produto/ProdutoCard";
import { AvisoIlustrativo } from "@/components/produto/AvisoIlustrativo";
import { BotaoWhatsApp } from "@/components/orcamento/BotaoWhatsApp";
import { NavCategorias } from "@/components/layout/NavCategorias";
import { linkGeral } from "@/lib/whatsapp";

const PREVIEW_COUNT = 8;

export default async function Home() {
  const produtos = await catalog.listarProdutos();
  const preview = produtos.slice(0, PREVIEW_COUNT);
  const categoriasComProdutos = categorias.filter((c) =>
    produtos.some((p) => p.categoria === c.slug),
  );
  const destaque = produtos.find((p) => p.destaque) ?? produtos[0];
  const imagemDestaque = destaque?.imagens.find((i) => i.tipo === "produto") ?? destaque?.imagens[0];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <p className="text-eyebrow text-rosa-forte uppercase">Móveis de fábrica</p>
          <h1 className="max-w-xl font-display text-display-xl text-jacaranda">
            Da fábrica para a sua casa.
          </h1>
          <p className="max-w-md text-body text-tinta-suave">{loja.tagline}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/produtos"
              className="inline-flex min-h-11 w-fit items-center rounded-[4px] border border-rosa px-5 py-3 font-body text-body font-medium text-jacaranda transition-colors hover:bg-rosa hover:text-papel"
            >
              Ver os móveis
            </Link>
            <BotaoWhatsApp href={linkGeral()} label="Falar com a Fátima" />
          </div>
        </div>

        {destaque && imagemDestaque && (
          <div className="lg:col-span-6">
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-[4px] border border-rosa bg-papel">
                <Image
                  src={imagemDestaque.src}
                  alt={imagemDestaque.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  priority
                  className="object-contain"
                />
              </div>
              <MedidaLinha valor={destaque.medidas.alturaCm} orientacao="v" className="h-full" />
            </div>
            <MedidaLinha valor={destaque.medidas.larguraCm} className="mt-2" />
          </div>
        )}
      </div>

      <section className="mt-20 border-t border-rosa/30 pt-16 sm:mt-28 sm:pt-20">
        <NavCategorias categorias={categoriasComProdutos} />
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-title-h2 text-jacaranda">Nossos móveis</h2>
          <Link href="/produtos" className="text-body-sm text-rosa-forte hover:text-rosa">
            Ver todos →
          </Link>
        </div>
        <p className="mt-1 text-eyebrow text-rosa-forte uppercase">
          {produtos.length} móveis na loja
        </p>
        <AvisoIlustrativo />

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {preview.map((produto, i) => (
            <li key={produto.slug}>
              <ProdutoCard produto={produto} prioridade={i === 0} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
