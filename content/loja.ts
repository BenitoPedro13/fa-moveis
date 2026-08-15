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

// The absolute origin every outbound URL is built from: the WhatsApp deep links (lib/whatsapp.ts),
// `metadataBase`, the PDP's Product JSON-LD, sitemap.xml and robots.txt.
//
// Empty-string handling is deliberate throughout. `NEXT_PUBLIC_SITE_URL` was once set to "" in
// the Vercel dashboard, which `??` does not treat as missing — that first crashed the build on
// `new URL("")`, and then, once "fixed" with a plain fallback, silently shipped
// `http://localhost:3000` inside every WhatsApp message the live site produced. Both failure
// modes are defended against here; see docs/tasks/TASK-verificacao-dispositivo.md §1.1.

/**
 * Trim, reject empty, prefix a bare host (Vercel's system vars omit the protocol), and strip
 * trailing slashes. Every caller concatenates `${SITE_URL}/algo`, so a value pasted into the
 * dashboard as "https://fa-moveis.vercel.app/" would otherwise emit
 * "https://fa-moveis.vercel.app//produtos/…" — a 308 hop in the WhatsApp message and a
 * duplicate-URL signal in the sitemap and canonicals. Normalise once, here.
 */
function origem(valor: string | undefined, protocolo = ""): string | null {
  const limpo = valor?.trim().replace(/\/+$/, "");
  if (!limpo) return null;
  return protocolo && !limpo.startsWith("http") ? `${protocolo}${limpo}` : limpo;
}

function resolverSiteUrl(): string {
  return (
    // Explicit configuration always wins — this is what a custom domain sets in phase 1.
    origem(process.env.NEXT_PUBLIC_SITE_URL) ??
    // Otherwise a Vercel deployment is correct by default: the project's stable production
    // host, then this specific deployment's host for previews. Both are bare hostnames.
    origem(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL, "https://") ??
    origem(process.env.NEXT_PUBLIC_VERCEL_URL, "https://") ??
    "http://localhost:3000"
  );
}

const resolvido = resolverSiteUrl();

// A production deploy that would emit localhost URLs is the exact defect that reached the live
// site once already, and it is invisible until someone reads a WhatsApp message closely. Fail
// the build instead. Scoped to Vercel production so local `pnpm build` and previews are free.
if (process.env.VERCEL_ENV === "production" && resolvido.startsWith("http://localhost")) {
  throw new Error(
    "SITE_URL resolveu para localhost em produção. Defina NEXT_PUBLIC_SITE_URL " +
      "(ex.: https://fa-moveis.vercel.app) nas variáveis de ambiente de Production da Vercel. " +
      "Sem isso, todo link do WhatsApp sai com http://localhost:3000.",
  );
}

export const SITE_URL = resolvido;
