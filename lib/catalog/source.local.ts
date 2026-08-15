import type { Produto, Categoria } from "./types";
import { produtos } from "@/content/produtos";
import { categorias } from "@/content/categorias";

export const localSource = {
  async listarProdutos(f?: { categoria?: string; ambiente?: string }): Promise<Produto[]> {
    return produtos.filter((p) => {
      if (f?.categoria && p.categoria !== f.categoria) return false;
      if (f?.ambiente && !p.ambientes.includes(f.ambiente)) return false;
      return true;
    });
  },

  async obterProduto(slug: string): Promise<Produto | null> {
    return produtos.find((p) => p.slug === slug) ?? null;
  },

  async listarCategorias(): Promise<Categoria[]> {
    return categorias;
  },
};
