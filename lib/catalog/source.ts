// spec-architecture.md §6 — the catalogue boundary. Nothing outside source.*.ts may import
// a Shopify type; phase 3 adds source.shopify.ts and flips CATALOG_SOURCE.
import type { Produto, Categoria } from "./types";
import { localSource } from "./source.local";

export interface CatalogSource {
  listarProdutos(f?: { categoria?: string; ambiente?: string }): Promise<Produto[]>;
  obterProduto(slug: string): Promise<Produto | null>;
  listarCategorias(): Promise<Categoria[]>;
}

export const catalog: CatalogSource = localSource;
