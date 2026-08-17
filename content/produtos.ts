// The catalogue. Three products are hers, fully transcribed from docs/dados-produtos.md
// (Roupeiro Mônaco, Fruteira, Armário Aéreo Max — see TASK-scaffold-catalogo.md §2.4). The rest
// are real supplier stock from her printed catalogue's QR codes — D'Doro and Novo Horizonte,
// see docs/tasks/TASK-importar-catalogo-fabrica.md. No demo/illustrative filler — every
// measurement here traces to her own material (Facebook capture, supplier site, or the printed
// catalogue dictated by Benito) — CLAUDE.md §0 forbids inventing facts.
import type { Produto, Cor } from "@/lib/catalog/types";
import { hexPorNome } from "@/content/cores";

function cores(...nomes: string[]): Cor[] {
  return nomes.map((nome) => ({ nome, hex: hexPorNome(nome) }));
}

export const produtos: Produto[] = [
  // ── Confirmadas (docs/dados-produtos.md) ──────────────────────────────────────────────
  {
    slug: "roupeiro-monaco",
    nome: "Roupeiro Mônaco",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal deslumbrante, isso e muito mais você encontra na F&A Móveis!",
    descricao:
      "Roupeiro de casal com 6 portas e 9 gavetas, bastante espaço para guardar tudo. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 240, alturaCm: 230, profundidadeCm: 55 },
    // [VERIFY: cor — render em nogueira escura, nome não impresso na captura]
    cores: [],
    imagens: [
      {
        src: "/produtos/roupeiro-monaco/produto.avif",
        alt: "Roupeiro Mônaco de 6 portas, vista frontal",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-monaco/tecnico.avif",
        alt: "Desenho técnico do Roupeiro Mônaco com medidas 2,40 × 2,30 × 0,55 m",
        tipo: "tecnico",
      },
    ],
    preco: { aVista: 1590, parcelas: 12, valorParcela: 149 },
    destaque: true,
    disponivel: true,
  },
  {
    slug: "fruteira",
    nome: "Fruteira",
    categoria: "fruteiras",
    ambientes: ["cozinha"],
    resumo: "Lindas Fruteiras para decorar e organizar sua casa!",
    descricao:
      "Fruteira com 2 portas e 3 cestos vazados, sobre rodízios para facilitar a limpeza da " +
      "cozinha. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 107, alturaCm: 88, profundidadeCm: 39 },
    cores: cores("Branca"),
    imagens: [
      {
        src: "/produtos/fruteira/ambiente.avif",
        alt: "Fruteira branca em ambiente de cozinha, com frutas nos cestos",
        tipo: "ambiente",
      },
      {
        src: "/produtos/fruteira/tecnico.avif",
        alt: "Desenho técnico da Fruteira com medidas 107 × 88 × 39 cm",
        tipo: "tecnico",
      },
    ],
    destaque: true,
    disponivel: true,
  },
  {
    slug: "armario-aereo-max",
    nome: "Armário Aéreo Max",
    categoria: "armarios-aereos",
    ambientes: ["cozinha"],
    resumo: "Lindos Armários Aéreos para decorar e organizar sua cozinha!",
    descricao:
      "Armário aéreo de 120 cm com porta basculante e prateleira aberta, suporta até 22,50 kg. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 58, profundidadeCm: 32, pesoSuportadoKg: 22.5 },
    // [VERIFY: nomes das cores — branco e um woodgrain claro aparecem na captura, nomes não impressos]
    cores: [],
    imagens: [
      {
        src: "/produtos/armario-aereo-max/produto-branco.avif",
        alt: "Armário Aéreo Max branco, vista frontal",
        tipo: "produto",
      },
      {
        src: "/produtos/armario-aereo-max/produto-carvalho.avif",
        alt: "Armário Aéreo Max em acabamento amadeirado claro, vista frontal",
        tipo: "produto",
      },
      {
        src: "/produtos/armario-aereo-max/tecnico.avif",
        alt: "Desenho técnico do Armário Aéreo Max com medidas 120 × 58 × 32 cm, suporta 22,50 kg",
        tipo: "tecnico",
      },
    ],
    disponivel: true,
  },

  // ── Fornecedor real — D'Doro (docs/tasks/TASK-importar-catalogo-fabrica.md) ──────────────
  // Extraídos do catálogo impresso da loja (QR code → dedoromoveis.com.br) via
  // scripts/importar-catalogo-fabrica.ts — medidas, cores e composição são as do fabricante,
  // não uma estimativa. Preço ainda não confirmado com a Fátima — sem campo `preco`, mostra
  // "Consultar" (spec-architecture.md §11).
  {
    slug: "roupeiro-monaco-plus-6-portas",
    nome: "Roupeiro Mônaco Plus 6 Portas 12 Gavetas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 6 portas e 12 gavetas, para quem precisa de muito espaço.",
    descricao:
      "Roupeiro de casal com 6 portas e 12 gavetas em MDF, corrediça telescópica de 40 cm e " +
      "puxadores de madeira. Produzido em chapa de 15mm, com pé e espelho opcionais (altura " +
      "com pé: 2,40 m). Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 240, alturaCm: 230, profundidadeCm: 55 },
    cores: cores(
      "Cinamomo",
      "Cinamomo com off white",
      "Branco",
      "Castanho",
      "Castanho com linho",
      "Castanho com off white",
    ),
    imagens: [
      {
        src: "/produtos/roupeiro-monaco-plus-6-portas/produto.avif",
        alt: "Roupeiro Mônaco Plus 6 Portas, acabamento cinamomo com off white",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-monaco-plus-6-portas/produto-branco.avif",
        alt: "Roupeiro Mônaco Plus 6 Portas, acabamento branco",
        tipo: "produto",
      },
    ],
    fabricante: "D'Doro",
    disponivel: true,
  },
  {
    slug: "roupeiro-colibri-6-portas",
    nome: "Roupeiro Colibri 6 Portas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 6 portas e gavetas internas, direto de fábrica.",
    descricao:
      "Roupeiro de casal com 6 portas e gavetas internas, corrediça telescópica de 40 cm e " +
      "puxadores de madeira. Produzido em chapa de 15mm, com pé e espelho opcionais (altura " +
      "com pé: 2,28 m). Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 206, alturaCm: 218, profundidadeCm: 48 },
    cores: cores(
      "Cinamomo",
      "Cinamomo com off white",
      "Branco",
      "Castanho",
      "Castanho com linho",
      "Castanho com off white",
    ),
    imagens: [
      {
        src: "/produtos/roupeiro-colibri-6-portas/produto.avif",
        alt: "Roupeiro Colibri 6 Portas, acabamento cinamomo",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-colibri-6-portas/produto-castanho.avif",
        alt: "Roupeiro Colibri 6 Portas, acabamento castanho",
        tipo: "produto",
      },
    ],
    fabricante: "D'Doro",
    disponivel: true,
  },
  {
    slug: "roupeiro-meridian-plus-3-portas",
    nome: "Roupeiro Meridian Plus 3 Portas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 3 portas de correr e espelho, ideal para quartos menores.",
    descricao:
      "Roupeiro de casal com 3 portas de correr, espelho central e gaveteiro interno com " +
      "chave, corrediça telescópica de 40 cm e puxadores de madeira. Produzido em chapa de " +
      "15mm, com pé opcional (altura com pé: 2,28 m). Móvel de fábrica, entregue e montado na " +
      "sua casa pela F&A Móveis.",
    medidas: { larguraCm: 200, alturaCm: 218, profundidadeCm: 52 },
    cores: cores("Cinamomo", "Cinamomo com off white", "Branco", "Castanho", "Castanho com off white"),
    imagens: [
      {
        src: "/produtos/roupeiro-meridian-plus-3-portas/produto.avif",
        alt: "Roupeiro Meridian Plus 3 Portas de correr, acabamento cinamomo com off white",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-meridian-plus-3-portas/produto-branco.avif",
        alt: "Roupeiro Meridian Plus 3 Portas de correr, acabamento branco",
        tipo: "produto",
      },
    ],
    fabricante: "D'Doro",
    disponivel: true,
  },

  // ── Fornecedor real — Novo Horizonte (docs/tasks/TASK-importar-catalogo-fabrica.md) ───────
  // Medidas e cores ditadas por Benito direto do catálogo impresso físico da loja (fonte mais
  // confiável que existe — é o catálogo que a Fátima usa). Preço ainda não confirmado com ela.
  {
    slug: "comoda-austria-5-gavetas",
    nome: "Cômoda Áustria 5 Gavetas",
    categoria: "comodas",
    ambientes: ["quarto"],
    resumo: "Cômoda de 5 gavetas para organizar o quarto com estilo, gaveta superior com chave.",
    descricao:
      "Cômoda com 5 gavetas, gaveta superior com chave. Altura com pés: 1,095 m. Móvel de " +
      "fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 69.3, alturaCm: 102.5, profundidadeCm: 45 },
    cores: cores("Neve", "Camaru", "Camaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/comodas.svg",
        alt: "Desenho ilustrativo — Cômoda Áustria 5 Gavetas",
        tipo: "produto",
      },
      {
        src: "/produtos/comoda-austria-5-gavetas/ambiente.avif",
        alt: "Cômoda Áustria 5 Gavetas, acabamento camaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "comoda-space-5-gavetas-2-portas",
    nome: "Cômoda Space 5 Gavetas 2 Portas",
    categoria: "comodas",
    ambientes: ["quarto"],
    resumo: "Cômoda com 5 gavetas e 2 portas, mais espaço fechado pra organizar o quarto.",
    descricao:
      "Cômoda com 5 gavetas e 2 portas, gaveta superior com chave. Altura com pés: 1,095 m. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 136, alturaCm: 102.5, profundidadeCm: 45 },
    cores: cores("Neve", "Cumaru", "Cumaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/comodas.svg",
        alt: "Desenho ilustrativo — Cômoda Space 5 Gavetas 2 Portas",
        tipo: "produto",
      },
      {
        src: "/produtos/comoda-space-5-gavetas-2-portas/ambiente.avif",
        alt: "Cômoda Space 5 Gavetas 2 Portas, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "comoda-deca-10-gavetas",
    nome: "Cômoda Deca 10 Gavetas",
    categoria: "comodas",
    ambientes: ["quarto"],
    resumo: "Cômoda com 10 gavetas, duas com chave, bastante espaço pra organizar o quarto.",
    descricao:
      "Cômoda com 10 gavetas, duas gavetas superiores com chave. Altura com pés: 1,095 m. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 136, alturaCm: 102.5, profundidadeCm: 45 },
    cores: cores("Neve", "Cumaru", "Cumaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/comodas.svg",
        alt: "Desenho ilustrativo — Cômoda Deca 10 Gavetas",
        tipo: "produto",
      },
      {
        src: "/produtos/comoda-deca-10-gavetas/ambiente.avif",
        alt: "Cômoda Deca 10 Gavetas, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "cabeceira-box-himalaia",
    nome: "Cabeceira Casal Box Himalaia com LED",
    categoria: "cabeceiras",
    ambientes: ["quarto"],
    resumo: "Cabeceira de casal com LED, ripas e 2 criados-mudos embutidos.",
    descricao:
      "Cabeceira de casal com iluminação em LED, ripas e 2 criados-mudos embutidos, um de cada " +
      "lado. Largura total do conjunto: 2,605 m (painel da cabeceira sozinho: 2,405 m). Móvel " +
      "de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 260.5, alturaCm: 121, profundidadeCm: 39.5 },
    cores: cores("Cumaru", "Cumaru Fendi"),
    imagens: [
      {
        src: "/produtos/cabeceira-box-himalaia/produto.avif",
        alt: "Cabeceira Casal Box Himalaia com LED, acabamento cumaru",
        tipo: "produto",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "cabeceira-everest",
    nome: "Cabeceira Casal Everest",
    categoria: "cabeceiras",
    ambientes: ["quarto"],
    resumo: "Cabeceira de casal estofada com 2 criados-mudos embutidos.",
    descricao:
      "Cabeceira de casal estofada com iluminação em LED e 2 criados-mudos embutidos, um de " +
      "cada lado. Largura total do conjunto: 2,605 m (painel da cabeceira sozinho: 2,405 m). " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 260.5, alturaCm: 121, profundidadeCm: 39.5 },
    cores: cores("Neve", "Cumaru", "Cumaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/cabeceiras.svg",
        alt: "Desenho ilustrativo — Cabeceira Casal Everest",
        tipo: "produto",
      },
      {
        src: "/produtos/cabeceira-everest/ambiente.avif",
        alt: "Cabeceira Casal Everest, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "roupeiro-buriti-3-portas-9-gavetas",
    nome: "Roupeiro Buriti 3 Portas 9 Gavetas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 3 portas de correr, espelho central e 9 gavetas.",
    descricao:
      "Roupeiro de casal com 3 portas de correr, espelho central e 9 gavetas. Altura com pés: " +
      "2,05 m. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 180, alturaCm: 205, profundidadeCm: 46.5 },
    cores: cores("Neve", "Cumaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/roupeiros.svg",
        alt: "Desenho ilustrativo — Roupeiro Buriti 3 Portas 9 Gavetas",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-buriti-3-portas-9-gavetas/ambiente.avif",
        alt: "Roupeiro Buriti 3 Portas 9 Gavetas, acabamento cumaru fendi, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "roupeiro-encant-6-portas-6-gavetas",
    nome: "Roupeiro Encant 6 Portas 6 Gavetas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 6 portas, espelho central e 6 gavetas.",
    descricao:
      "Roupeiro de casal com 6 portas, espelho central e 6 gavetas. Altura com pés: 2,05 m. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 180, alturaCm: 205, profundidadeCm: 46.5 },
    cores: cores("Neve", "Cumaru", "Cumaru Fendi"),
    imagens: [
      {
        src: "/icons/categorias/roupeiros.svg",
        alt: "Desenho ilustrativo — Roupeiro Encant 6 Portas 6 Gavetas",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-encant-6-portas-6-gavetas/ambiente.avif",
        alt: "Roupeiro Encant 6 Portas 6 Gavetas, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "roupeiro-paradizzo",
    nome: "Roupeiro Paradizzo",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal com 3 portas de correr, linhas retas e bastante espaço interno.",
    descricao:
      "Roupeiro de casal com 3 portas de correr. Altura com pés: 2,18 m. Móvel de fábrica, " +
      "entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 241.4, alturaCm: 218, profundidadeCm: 55.5 },
    cores: cores("Cumaru", "Cumaru Fendi", "Neve"),
    imagens: [
      {
        src: "/icons/categorias/roupeiros.svg",
        alt: "Desenho ilustrativo — Roupeiro Paradizzo",
        tipo: "produto",
      },
      {
        src: "/produtos/roupeiro-paradizzo/ambiente.avif",
        alt: "Roupeiro Paradizzo, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "cama-verona-casal-e-solteiro",
    nome: "Cama Verona Casal e Solteiro",
    categoria: "camas",
    ambientes: ["quarto"],
    resumo: "Cama com cabeceira ripada, disponível em casal e solteiro.",
    descricao:
      "Cama com cabeceira ripada, disponível em versão casal e solteiro. Móvel de fábrica, " +
      "entregue e montado na sua casa pela F&A Móveis.",
    // Mesma ficha de medidas informada pra casal e solteiro no catálogo impresso da loja —
    // confirmado duas vezes por Benito, não é erro de digitação.
    medidas: { larguraCm: 151, alturaCm: 113, profundidadeCm: 207 },
    cores: cores("Neve", "Cumaru"),
    imagens: [
      {
        src: "/icons/categorias/camas.svg",
        alt: "Desenho ilustrativo — Cama Verona Casal e Solteiro",
        tipo: "produto",
      },
      {
        src: "/produtos/cama-verona-casal-e-solteiro/ambiente.avif",
        alt: "Cama Verona, acabamento cumaru, em ambiente decorado",
        tipo: "ambiente",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
];
