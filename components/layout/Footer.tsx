import { loja } from "@/content/loja";

export function Footer() {
  return (
    <footer className="bg-jacaranda text-papel">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-12">
        <div className="flex items-center gap-3">
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
              backgroundColor: "var(--papel)",
            }}
          />
          <span className="font-display text-title-h3 tracking-[0.04em]">F&amp;A MÓVEIS</span>
        </div>

        <p className="max-w-md text-body-sm text-rosa-claro">{loja.tagline}</p>

        <dl className="grid gap-1 text-body-sm text-papel/90">
          <div className="flex gap-2">
            <dt className="text-rosa-claro">WhatsApp</dt>
            <dd>(21) 97002-1791</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-rosa-claro">E-mail</dt>
            <dd>{loja.email}</dd>
          </div>
        </dl>

        <p className="text-body-sm text-rosa-claro">
          © {new Date().getFullYear()} {loja.nome}. {loja.servicos}
        </p>

        <p className="text-body-sm text-rosa-claro">
          Powered by{" "}
          <a
            href="https://blessed-moon.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-papel"
          >
            Blessed Moon Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
