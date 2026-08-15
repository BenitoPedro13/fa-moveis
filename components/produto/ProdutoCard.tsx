// spec-design.md §6.2. The whole card is the link (stretched-link pattern); the WhatsApp
// button is a nested *action*, implemented as a sibling anchor, never nested inside the card's
// own <a> (invalid HTML, and spec-design.md §8 requires this explicitly).
import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/catalog/types";
import { categorias } from "@/content/categorias";
import { MedidaLinha } from "./MedidaLinha";
import { PrecoParcelado } from "./PrecoParcelado";
import { BotaoWhatsApp } from "@/components/orcamento/BotaoWhatsApp";
import { linkProduto } from "@/lib/whatsapp";

export function ProdutoCard({ produto }: { produto: Produto }) {
  const categoria = categorias.find((c) => c.slug === produto.categoria);
  const imagem = produto.imagens.find((i) => i.tipo === "produto") ?? produto.imagens[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-rosa/40 bg-papel transition-colors hover:border-rosa">
      <div className="relative aspect-square w-full overflow-hidden bg-papel">
        {imagem && (
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain transition-transform duration-[180ms] ease-out group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-rosa/40 p-4">
        {categoria && (
          <p className="text-eyebrow text-rosa-forte uppercase">{categoria.nome}</p>
        )}
        {/* h2: every page that renders this grid has its own h1 immediately above (or an h2
            section title, on the home page) — never h3, or Lighthouse flags a skipped level.
            Fixed 2-line clamp so a long name (Armário Aéreo Max) doesn't push the rest of the
            card taller than a short one (Fruteira) in the same grid row. */}
        <h2 className="line-clamp-2 min-h-[2lh] font-body text-title-h3 font-medium text-jacaranda">
          <Link href={`/produtos/${produto.slug}`} className="static after:absolute after:inset-0">
            {produto.nome}
          </Link>
        </h2>
        <MedidaLinha
          valor={produto.medidas.larguraCm}
          unidade="cm"
          className="my-1 max-w-40"
        />
        <PrecoParcelado preco={produto.preco} />

        <BotaoWhatsApp
          href={linkProduto(produto)}
          className="relative z-10 mt-auto w-full text-body-sm"
        />
      </div>
    </article>
  );
}
