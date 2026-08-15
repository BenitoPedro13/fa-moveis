// Single source of truth for the store's own facts. Nothing else hardcodes these values —
// CLAUDE.md §4. Sourced from docs/dados-produtos.md "Store data".

export const loja = {
  nome: "F&A Móveis",
  responsavel: "Fátima",
  whatsapp: "5521970021791", // (21) 97002-1791 — [VERIFY: still current, spec-architecture.md §14.2]
  email: "fatimaeamoveis@gmail.com",
  tagline: "Móveis de fábrica para decorar sua casa com muita qualidade e sofisticação.",
  servicos: "Entrega e montagem inclusos.",
  pagamento: "Parcelamos no cartão em 12x ou um super desconto para pagamento à vista.",
  // [VERIFY: endereço real — não visível na captura do Facebook. Bloqueia GBP, schema e /contato.]
  endereco: "[VERIFY: endereço — Rio de Janeiro, RJ]",
  // [VERIFY: horário de funcionamento — Facebook só mostrava "Aberto agora".]
  horario: "[VERIFY: horário de funcionamento]",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
