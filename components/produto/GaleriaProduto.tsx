"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { MedidaLinha } from "./MedidaLinha";
import { profundidadeLabel } from "./FichaTecnica";
import type { Produto } from "@/lib/catalog/types";

// spec-design.md §6.3 — the measurement frame around the image. Thumbnails swap which image
// sits inside the frame; the frame itself (real numbers) never changes with the photo.
export function GaleriaProduto({ produto }: { produto: Produto }) {
  const principal = produto.imagens.find((i) => i.tipo === "produto") ?? produto.imagens[0];
  const [ativa, setAtiva] = useState(principal);

  if (!ativa) return null;

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-[4px] border border-rosa bg-papel">
          <Image
            src={ativa.src}
            alt={ativa.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority
            className="object-contain"
          />
        </div>
        <MedidaLinha valor={produto.medidas.alturaCm} orientacao="v" className="h-full" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <MedidaLinha valor={produto.medidas.larguraCm} className="flex-1" />
        <span className="font-mono text-medida text-rosa-forte">
          {profundidadeLabel(produto.medidas.profundidadeCm)}
        </span>
      </div>

      {produto.imagens.length > 1 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Outras imagens deste produto">
          {produto.imagens.map((img) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setAtiva(img)}
                aria-current={img.src === ativa.src}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-[4px] border bg-papel transition-colors",
                  img.src === ativa.src ? "border-rosa" : "border-rosa/30 hover:border-rosa/70",
                )}
              >
                <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
