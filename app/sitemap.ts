import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog/source";
import { SITE_URL } from "@/content/loja";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const produtos = await catalog.listarProdutos();

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/produtos`, changeFrequency: "weekly", priority: 0.9 },
    ...produtos.map((p) => ({
      url: `${SITE_URL}/produtos/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
