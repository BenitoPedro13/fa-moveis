import Link from "next/link";
import { BotaoWhatsApp } from "@/components/orcamento/BotaoWhatsApp";
import { linkGeral } from "@/lib/whatsapp";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-rosa/30 bg-papel/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-jacaranda">
          <span
            aria-hidden
            className="h-8 w-8 shrink-0"
            style={{
              maskImage: "url(/logo/famoveis.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url(/logo/famoveis.svg)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              backgroundColor: "var(--rosa)",
            }}
          />
          <span className="truncate font-display text-title-h3 tracking-[0.04em]">
            F&amp;A MÓVEIS
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 sm:flex">
          <Link href="/produtos" className="text-body text-jacaranda hover:text-rosa-forte">
            Produtos
          </Link>
        </nav>

        <BotaoWhatsApp
          href={linkGeral()}
          label="Falar com a Fátima"
          compact
          className="shrink-0 text-body-sm"
        />
      </div>
    </header>
  );
}
