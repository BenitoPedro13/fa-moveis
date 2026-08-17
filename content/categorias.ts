// spec-architecture.md §1.1 — her own Facebook album names, not an invented taxonomy.
import type { Categoria } from "@/lib/catalog/types";

export const categorias: Categoria[] = [
  { slug: "roupeiros", nome: "Roupeiros" },
  { slug: "cozinhas", nome: "Cozinhas" },
  { slug: "balcoes", nome: "Balcões Utilitários" },
  { slug: "armarios-aereos", nome: "Armários Aéreos" },
  { slug: "aparador-bar", nome: "Aparador/Bar" },
  { slug: "fruteiras", nome: "Fruteiras" },
  { slug: "multiusos", nome: "Multiusos" },
  { slug: "tabuas-de-passar", nome: "Tábuas de Passar" },
  { slug: "comodas", nome: "Cômodas" },
  { slug: "cabeceiras", nome: "Cabeceiras" },
  { slug: "camas", nome: "Camas" },
];
