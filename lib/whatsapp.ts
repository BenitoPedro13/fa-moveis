// spec-architecture.md §8 — the whole site is a machine for producing one good WhatsApp message.
import type { Produto } from "./catalog/types";
import { loja, SITE_URL } from "@/content/loja";
import { formatMedidas } from "./format";

function buildLink(texto: string): string {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function linkProduto(p: Produto, cor?: string): string {
  const texto = [
    `Olá, Fátima! Vi no site e me interessei:`,
    ``,
    `*${p.nome}*`,
    `Medidas: ${formatMedidas(p.medidas)} (L × A × P)`,
    cor ? `Cor: ${cor}` : null,
    ``,
    `${SITE_URL}/produtos/${p.slug}`,
  ]
    .filter((linha): linha is string => linha !== null)
    .join("\n");

  return buildLink(texto);
}

export function linkLista(produtos: Produto[]): string {
  const texto = [
    `Olá, Fátima! Separei esses móveis no site e queria saber mais:`,
    ``,
    ...produtos.map((p) => `• *${p.nome}* — ${formatMedidas(p.medidas)}`),
    ``,
    `${SITE_URL}/produtos`,
  ].join("\n");

  return buildLink(texto);
}

export function linkGeral(): string {
  return buildLink(`Olá, Fátima! Vi o site da F&A Móveis e queria saber mais.`);
}
