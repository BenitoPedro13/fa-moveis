import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { loja, SITE_URL } from "@/content/loja";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${loja.nome} — Móveis de fábrica no Rio de Janeiro`,
    template: `%s — ${loja.nome}`,
  },
  description: loja.tagline,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: loja.nome,
    title: `${loja.nome} — Móveis de fábrica no Rio de Janeiro`,
    description: loja.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${loja.nome} — Móveis de fábrica no Rio de Janeiro`,
    description: loja.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bodoniModa.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
