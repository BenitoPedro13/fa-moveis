// Next.js shallow-merges `metadata.openGraph`: a page that declares its own object *replaces*
// the root layout's entirely, silently dropping `siteName`, `locale` and `type`. That is how
// /produtos shipped with no og:site_name and no og:locale — and, lacking its own
// opengraph-image.tsx, no og:image either, so the link she shares on WhatsApp unfurled as a
// bare title. Spread this into every page-level openGraph instead of restating the fields.
//
// A route still needs its own opengraph-image.tsx (or an explicit `images`) — this helper
// carries the identity fields, not the picture.
import type { Metadata } from "next";
import { loja } from "@/content/loja";

export const ogPadrao = {
  type: "website",
  locale: "pt_BR",
  siteName: loja.nome,
} as const satisfies Metadata["openGraph"];
