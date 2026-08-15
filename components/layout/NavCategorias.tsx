import Link from "next/link";
import Image from "next/image";
import type { Categoria } from "@/lib/catalog/types";

// spec-design.md §7.1 — the line-icon category rail. "her product photography is inconsistent
// supplier output, so drawn icons give the category rail a uniformity photographs cannot."
export function NavCategorias({ categorias }: { categorias: Categoria[] }) {
  if (categorias.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-rosa/40" />
        <span className="text-eyebrow text-rosa-forte uppercase">
          {categorias.length} categorias
        </span>
        <span className="h-px flex-1 bg-rosa/40" />
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categorias.map((categoria) => (
          <li key={categoria.slug}>
            <Link
              href={`/produtos?categoria=${categoria.slug}`}
              className="group flex flex-col items-center gap-2 rounded-[4px] p-3 text-center"
            >
              <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-rosa/40 bg-papel transition-colors group-hover:border-rosa">
                <span className="relative h-11 w-11">
                  <Image
                    src={`/icons/categorias/${categoria.slug}.svg`}
                    alt=""
                    fill
                    sizes="44px"
                  />
                </span>
              </span>
              <span className="text-body-sm text-jacaranda">{categoria.nome}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
