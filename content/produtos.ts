// The catalogue. Three products are hers, fully transcribed from docs/dados-produtos.md
// (Roupeiro Mônaco, Fruteira, Armário Aéreo Max — see TASK-scaffold-catalogo.md §2.4).
//
// The other ~27 are demo filler, added to show what a full catalogue looks like before more of
// her real stock is transcribed. Each one's *measurements* are real — sourced from a live
// Brazilian retail listing for a similar item, cited below — never guessed (CLAUDE.md §0).
// Each one's *name* is deliberately generic and does NOT match any model name Fátima has used
// (no "Balcão Max", "Armário Aéreo Plus", etc.) so nothing here is mistaken for a claim about
// her specific inventory. Prices follow her own real stated terms (12x sem juros, desconto à
// vista — content/loja.ts) applied to the sourced market price; see PrecoParcelado. All of this
// is disclosed on `/produtos` — CLAUDE.md forbids inventing facts, not disclosed illustrations.
import type { Produto, Cor } from "@/lib/catalog/types";
import { hexPorNome } from "@/content/cores";

function cores(...nomes: string[]): Cor[] {
  return nomes.map((nome) => ({ nome, hex: hexPorNome(nome) }));
}

// Her real, confirmed payment terms (content/loja.ts: "parcelamos no cartão em 12x ou um
// super desconto para pagamento à vista") applied to a sourced market price. The ~12% cash
// discount matches the ratio in her own real example (Roupeiro Mônaco reference: R$1.590 à
// vista / 12x R$149 ≈ 0.89) — a formula, not a fabricated number.
function precoIlustrativo(precoMercado: number): Produto["preco"] {
  return {
    aVista: Math.round(precoMercado * 0.88),
    parcelas: 12,
    valorParcela: Math.round(precoMercado / 12),
  };
}

// Categories with a real, freely-licensed (Unsplash License) secondary photo — shared per
// category, never the grid cutout. public/produtos/_categoria/ATTRIBUTION.md has the credits.
const AMBIENTE_CATEGORIAS = new Set(["cozinhas", "balcoes", "armarios-aereos"]);

function iconeCategoria(categoria: string, nome: string): Produto["imagens"] {
  const imagens: Produto["imagens"] = [
    {
      src: `/icons/categorias/${categoria}.svg`,
      alt: `Desenho ilustrativo — ${nome}`,
      tipo: "produto" as const,
    },
  ];
  if (AMBIENTE_CATEGORIAS.has(categoria)) {
    imagens.push({
      src: `/produtos/_categoria/${categoria}/ambiente.avif`,
      alt: `Ambiente ilustrativo — ${nome}`,
      tipo: "ambiente" as const,
    });
  }
  return imagens;
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

  // ── Demo — medidas reais de anúncios públicos, nomes genéricos (ver nota no topo) ────────

  // roupeiros — madeiramadeira.com.br
  {
    slug: "roupeiro-verona-6-portas",
    nome: "Roupeiro Verona 6 Portas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal espaçoso, com 6 portas e acabamento que combina com qualquer quarto!",
    descricao:
      "Um roupeiro grande e organizado, com nichos e compartimentos para guardar tudo com " +
      "estilo. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 267, alturaCm: 228, profundidadeCm: 55 },
    cores: cores("Branco"),
    imagens: iconeCategoria("roupeiros", "Roupeiro Verona 6 Portas"),
    disponivel: true,
  },
  {
    slug: "roupeiro-positano-6-portas-6-gavetas",
    nome: "Roupeiro Positano 6 Portas 6 Gavetas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro de casal robusto, 6 portas e 6 gavetas — muito espaço, muita sofisticação!",
    descricao:
      "Organização pensada para casal, com divisão interna e 8 prateleiras. Móvel de fábrica, " +
      "entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 277.5, alturaCm: 237, profundidadeCm: 56.5 },
    cores: cores("Cacau", "Fendi"),
    imagens: iconeCategoria("roupeiros", "Roupeiro Positano 6 Portas 6 Gavetas"),
    disponivel: true,
  },
  {
    slug: "roupeiro-amalfi-grande",
    nome: "Roupeiro Amalfi Grande 6 Portas 8 Gavetas",
    categoria: "roupeiros",
    ambientes: ["quarto"],
    resumo: "Roupeiro grande e branco, lindo para deixar seu quarto ainda mais aconchegante!",
    descricao:
      "6 portas e 8 gavetas com 10 prateleiras internas — espaço de sobra pra toda a família. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 270, alturaCm: 234, profundidadeCm: 55 },
    cores: cores("Branco"),
    imagens: iconeCategoria("roupeiros", "Roupeiro Amalfi Grande 6 Portas 8 Gavetas"),
    disponivel: true,
  },

  // cozinhas — madeiramadeira.com.br
  {
    slug: "cozinha-compacta-zurique",
    nome: "Cozinha Compacta Zurique",
    categoria: "cozinhas",
    ambientes: ["cozinha"],
    resumo: "Cozinha compacta linda e completa, do jeito que sua casa merece!",
    descricao:
      "Armário aéreo, balcão de pia e tudo que sua cozinha precisa em um conjunto só. Móvel " +
      "de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 180, alturaCm: 225, profundidadeCm: 52 },
    cores: cores("Branco"),
    imagens: iconeCategoria("cozinhas", "Cozinha Compacta Zurique"),
    disponivel: true,
  },
  {
    slug: "kit-cozinha-compacta-lucca",
    nome: "Kit Cozinha Compacta Lucca 105cm",
    categoria: "cozinhas",
    ambientes: ["cozinha"],
    resumo: "Kit compacto pra cozinha pequena ficar linda e organizada!",
    descricao:
      "6 portas e 1 gaveta num espaço enxuto de 105 cm — perfeito pra apartamento. Móvel de " +
      "fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 105, alturaCm: 177.5, profundidadeCm: 38 },
    cores: cores("Preto"),
    imagens: iconeCategoria("cozinhas", "Kit Cozinha Compacta Lucca 105cm"),
    preco: precoIlustrativo(599),
    disponivel: true,
  },
  {
    slug: "cozinha-compacta-diamante",
    nome: "Cozinha Compacta Diamante",
    categoria: "cozinhas",
    ambientes: ["cozinha"],
    resumo: "Cozinha compacta deslumbrante, com tampo incluso e muito espaço pra guardar!",
    descricao:
      "Armário, balcão e tampo num conjunto branco que combina com qualquer cozinha. Móvel " +
      "de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 180, alturaCm: 210, profundidadeCm: 52 },
    cores: cores("Branco"),
    imagens: iconeCategoria("cozinhas", "Cozinha Compacta Diamante"),
    preco: precoIlustrativo(1259.99),
    disponivel: true,
  },
  {
    slug: "cozinha-compacta-torino",
    nome: "Cozinha Compacta Torino 200cm",
    categoria: "cozinhas",
    ambientes: ["cozinha"],
    resumo: "Cozinha planejada linda para deixar seu apartamento ainda mais bonito e funcional!",
    descricao:
      "3 peças modulares — aéreo, canto e balcão de pia — com puxadores em ABS. Móvel de " +
      "fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 200, alturaCm: 202, profundidadeCm: 52 },
    cores: cores("Branco", "Avelã"),
    imagens: iconeCategoria("cozinhas", "Cozinha Compacta Torino 200cm"),
    disponivel: true,
  },

  // balcões — madeiramadeira.com.br
  {
    slug: "balcao-sicilia-3-gavetas",
    nome: "Balcão Sicília 3 Gavetas",
    categoria: "balcoes",
    ambientes: ["cozinha"],
    resumo: "Balcão compacto e prático, perfeito para organizar sua cozinha!",
    descricao:
      "Balcão de cozinha com 3 gavetas espaçosas, ideal para quem tem pouco espaço mas não " +
      "abre mão de organização. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 60, alturaCm: 84, profundidadeCm: 52 },
    cores: cores("Branco"),
    imagens: iconeCategoria("balcoes", "Balcão Sicília 3 Gavetas"),
    disponivel: true,
  },
  {
    slug: "balcao-verona-com-tampo",
    nome: "Balcão Verona com Tampo",
    categoria: "balcoes",
    ambientes: ["cozinha"],
    resumo: "Lindo balcão com tampo para deixar sua cozinha ainda mais bonita e aconchegante!",
    descricao:
      "Balcão com tampo e 2 gavetas amplas, combina praticidade e estilo para o dia a dia. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 100, alturaCm: 82, profundidadeCm: 50 },
    cores: cores("Branco", "Preto"),
    imagens: iconeCategoria("balcoes", "Balcão Verona com Tampo"),
    disponivel: true,
  },
  {
    slug: "balcao-hagar-grande",
    nome: "Balcão Hagar Grande 1,94m",
    categoria: "balcoes",
    ambientes: ["cozinha"],
    resumo: "Balcão grande para quem precisa de espaço de verdade na cozinha!",
    descricao:
      "Balcão robusto de 1,94 m, perfeito para cozinhas amplas que pedem bastante espaço de " +
      "armazenamento. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 194, alturaCm: 70, profundidadeCm: 50.5 },
    cores: [],
    imagens: iconeCategoria("balcoes", "Balcão Hagar Grande 1,94m"),
    disponivel: true,
  },
  {
    slug: "balcao-torino-2-portas",
    nome: "Balcão Torino 2 Portas",
    categoria: "balcoes",
    ambientes: ["cozinha"],
    resumo: "Lindo balcão para deixar sua cozinha ainda mais bonita e aconchegante!",
    descricao:
      "Balcão com 2 portas e 2 gavetas, suporta até 40 kg de peso distribuído. Móvel de " +
      "fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 90.9, alturaCm: 86, profundidadeCm: 36.3, pesoSuportadoKg: 40 },
    cores: cores("Nogueira", "Off White"),
    imagens: iconeCategoria("balcoes", "Balcão Torino 2 Portas"),
    preco: precoIlustrativo(296.89),
    disponivel: true,
  },

  // armários aéreos — madeiramadeira.com.br
  {
    slug: "armario-aereo-bristol-150",
    nome: "Armário Aéreo Bristol 150",
    categoria: "armarios-aereos",
    ambientes: ["cozinha"],
    resumo: "Lindo armário aéreo para decorar e organizar sua cozinha!",
    descricao:
      "Armário aéreo de 150 cm com 2 portas, ideal para ganhar espaço vertical na cozinha. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 150, alturaCm: 54, profundidadeCm: 32 },
    cores: cores("Branco"),
    imagens: iconeCategoria("armarios-aereos", "Armário Aéreo Bristol 150"),
    preco: precoIlustrativo(287.99),
    disponivel: true,
  },
  {
    slug: "armario-aereo-verona-verde",
    nome: "Armário Aéreo Verona Verde",
    categoria: "armarios-aereos",
    ambientes: ["cozinha"],
    resumo: "Um toque de cor pra alegrar sua cozinha, olha que lindo!",
    descricao:
      "Armário aéreo com 3 portas em um verde lindo, perfeito pra quem quer fugir do básico. " +
      "Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 45, profundidadeCm: 38 },
    cores: cores("Verde"),
    imagens: iconeCategoria("armarios-aereos", "Armário Aéreo Verona Verde"),
    disponivel: true,
  },
  {
    slug: "armario-aereo-vercelli-3-portas",
    nome: "Armário Aéreo Vercelli 3 Portas",
    categoria: "armarios-aereos",
    ambientes: ["cozinha"],
    resumo: "Lindos Armários Aéreos para decorar e organizar sua cozinha!",
    descricao:
      "Armário aéreo com 3 portas e ótimo aproveitamento de espaço na parede. Móvel de " +
      "fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 55, profundidadeCm: 32 },
    cores: [],
    imagens: iconeCategoria("armarios-aereos", "Armário Aéreo Vercelli 3 Portas"),
    disponivel: true,
  },

  // aparador/bar — madeiramadeira.com.br
  {
    slug: "aparador-positano",
    nome: "Aparador Positano",
    categoria: "aparador-bar",
    ambientes: ["sala"],
    resumo: "Lindo aparador para deixar sua sala ainda mais bonita e aconchegante!",
    descricao:
      "Aparador buffet com 2 portas e prateleiras internas, ideal para organizar louças e " +
      "servir de apoio na sala de jantar. Móvel de fábrica, entregue e montado na sua casa " +
      "pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 80, profundidadeCm: 38.5 },
    cores: cores("Off White"),
    imagens: iconeCategoria("aparador-bar", "Aparador Positano"),
    disponivel: true,
  },
  {
    slug: "aparador-bar-toscana",
    nome: "Aparador Bar Toscana",
    categoria: "aparador-bar",
    ambientes: ["sala"],
    resumo: "Aparador bar retrô lindo e funcional para seu lar!",
    descricao:
      "Aparador com adega para 12 garrafas de vinho e porta com fechamento suave. Um clássico " +
      "retrô, isso e muito mais você encontra na F&A Móveis! Entrega e montagem inclusas.",
    medidas: { larguraCm: 88.8, alturaCm: 77, profundidadeCm: 40.3 },
    cores: cores("Rústico"),
    imagens: iconeCategoria("aparador-bar", "Aparador Bar Toscana"),
    preco: precoIlustrativo(2802),
    disponivel: true,
  },
  {
    slug: "buffet-bar-industrial-vermont",
    nome: "Buffet Bar Industrial Vermont",
    categoria: "aparador-bar",
    ambientes: ["sala"],
    resumo: "Buffet bar industrial pra decorar e organizar sua sala!",
    descricao:
      "Estilo industrial retrô com 2 portas de aço e nicho aberto, suporta até 30 kg. Móvel " +
      "de fábrica com muita qualidade e sofisticação, entrega e montagem pela F&A Móveis.",
    medidas: { larguraCm: 100, alturaCm: 75, profundidadeCm: 37.5, pesoSuportadoKg: 30 },
    cores: cores("Vermont", "Preto"),
    imagens: iconeCategoria("aparador-bar", "Buffet Bar Industrial Vermont"),
    disponivel: true,
  },
  {
    slug: "aparador-multiuso-berlim",
    nome: "Aparador Multiuso Berlim",
    categoria: "aparador-bar",
    ambientes: ["sala"],
    resumo: "Lindo aparador multiuso pra decorar e organizar sua casa!",
    descricao:
      "Aparador branco de 2 portas, serve como buffet, bar ou estante — verdadeiramente " +
      "multiuso. Móvel de fábrica, entrega e montagem inclusas.",
    medidas: { larguraCm: 90, alturaCm: 95, profundidadeCm: 32 },
    cores: cores("Branco"),
    imagens: iconeCategoria("aparador-bar", "Aparador Multiuso Berlim"),
    disponivel: true,
  },

  // fruteiras — madeiramadeira.com.br
  {
    slug: "fruteira-industrial-bella",
    nome: "Fruteira Industrial Bella",
    categoria: "fruteiras",
    ambientes: ["cozinha"],
    resumo: "Linda fruteira industrial pra deixar sua cozinha ainda mais bonita!",
    descricao:
      "Fruteira de chão com 2 cestos ventilados, estilo industrial em aço com tampo em MDF " +
      "imbuia. Móvel de fábrica, entrega e montagem pela F&A Móveis.",
    medidas: { larguraCm: 65, alturaCm: 92, profundidadeCm: 45, pesoSuportadoKg: 30 },
    cores: cores("Preto Fosco", "Imbuia"),
    imagens: iconeCategoria("fruteiras", "Fruteira Industrial Bella"),
    preco: precoIlustrativo(296.91),
    disponivel: true,
  },
  {
    slug: "fruteira-montreal",
    nome: "Fruteira Montreal",
    categoria: "fruteiras",
    ambientes: ["cozinha"],
    resumo: "Linda fruteira pra decorar e organizar sua cozinha!",
    descricao:
      "3 cestos removíveis em aço com tampo em MDF, suporta um bebedouro de galão de até 20 " +
      "litros. Móvel de fábrica com muita qualidade, entrega e montagem inclusas.",
    medidas: { larguraCm: 39, alturaCm: 83, profundidadeCm: 29 },
    cores: cores("Preto"),
    imagens: iconeCategoria("fruteiras", "Fruteira Montreal"),
    disponivel: true,
  },
  {
    slug: "fruteira-milano",
    nome: "Fruteira Milano",
    categoria: "fruteiras",
    ambientes: ["cozinha"],
    resumo: "Lindas Fruteiras para decorar e organizar sua casa!",
    descricao:
      "Fruteira em aço com 3 cestos ventilados removíveis e rodízios, suporta até 30 kg e um " +
      "bebedouro de galão. Móvel de fábrica, entrega e montagem pela F&A Móveis.",
    medidas: { larguraCm: 33.5, alturaCm: 90, profundidadeCm: 28, pesoSuportadoKg: 30 },
    cores: cores("Branca", "Preta"),
    imagens: iconeCategoria("fruteiras", "Fruteira Milano"),
    disponivel: true,
  },

  // multiusos — madeiramadeira.com.br
  {
    slug: "multiuso-trento-139",
    nome: "Multiuso Trento 139",
    categoria: "multiusos",
    ambientes: ["area-de-servico"],
    resumo: "Estante multiuso pra deixar sua lavanderia mais organizada!",
    descricao:
      "Cinco prateleiras fixas e duas removíveis, com base plástica protegida contra umidade " +
      "— perfeita pra área de serviço. Entrega e montagem inclusas, do jeito que só a F&A " +
      "Móveis faz.",
    medidas: { larguraCm: 139, alturaCm: 180, profundidadeCm: 45 },
    cores: cores("Branco", "Rústico"),
    imagens: iconeCategoria("multiusos", "Multiuso Trento 139"),
    preco: precoIlustrativo(519.99),
    disponivel: true,
  },
  {
    slug: "multiuso-cozinha-turim",
    nome: "Multiuso Cozinha Turim",
    categoria: "multiusos",
    ambientes: ["cozinha"],
    resumo: "Lindos Multiusos para decorar e organizar sua casa!",
    descricao:
      "Estante com porta-toalhas pra cozinha, suporta até 10 kg por prateleira. Um móvel " +
      "simples que resolve um problema real — e a F&A entrega e monta pra você.",
    medidas: { larguraCm: 90.5, alturaCm: 170, profundidadeCm: 33.5, pesoSuportadoKg: 10 },
    cores: cores("Marrom"),
    imagens: iconeCategoria("multiusos", "Multiuso Cozinha Turim"),
    preco: precoIlustrativo(150.06),
    disponivel: true,
  },
  {
    slug: "multiuso-aco-bolonha",
    nome: "Multiuso Aço Bolonha",
    categoria: "multiusos",
    ambientes: ["area-de-servico"],
    resumo: "Estante de aço reforçada pra você organizar de tudo!",
    descricao:
      "Seis prateleiras de aço, suportando até 20 kg cada uma. Resistente, prática e com " +
      "entrega e montagem inclusas.",
    medidas: { larguraCm: 93, alturaCm: 198, profundidadeCm: 30, pesoSuportadoKg: 20 },
    cores: cores("Preto"),
    imagens: iconeCategoria("multiusos", "Multiuso Aço Bolonha"),
    disponivel: true,
  },

  // tábuas de passar — madeiramadeira.com.br
  {
    slug: "tabua-de-passar-verona",
    nome: "Tábua de Passar Verona",
    categoria: "tabuas-de-passar",
    ambientes: ["area-de-servico"],
    resumo: "Praticidade pra sua área de serviço, com estilo!",
    descricao:
      "Armário com tábua de passar embutida, 2 prateleiras removíveis e rodízios pra " +
      "facilitar a limpeza. Entrega e montagem inclusas.",
    medidas: { larguraCm: 77, alturaCm: 81, profundidadeCm: 40 },
    cores: cores("Branco"),
    imagens: iconeCategoria("tabuas-de-passar", "Tábua de Passar Verona"),
    disponivel: true,
  },
  {
    slug: "tabua-de-passar-napoles",
    nome: "Tábua de Passar Nápoles",
    categoria: "tabuas-de-passar",
    ambientes: ["area-de-servico"],
    resumo: "Tábua de passar com armário, pra guardar tudo sem perder espaço!",
    descricao:
      "Armário de 2 portas com tábua de passar embutida, acabamento em MDP com pintura UV. A " +
      "F&A cuida da entrega e da montagem pra você.",
    medidas: { larguraCm: 90, alturaCm: 83, profundidadeCm: 30 },
    cores: cores("Branca"),
    imagens: iconeCategoria("tabuas-de-passar", "Tábua de Passar Nápoles"),
    preco: precoIlustrativo(269.99),
    disponivel: true,
  },
  {
    slug: "tabua-de-passar-ravena",
    nome: "Tábua de Passar Ravena",
    categoria: "tabuas-de-passar",
    ambientes: ["area-de-servico"],
    resumo: "Gabinete completo com tábua de passar embutida!",
    descricao:
      "Móvel multiuso com gabinete espaçoso e tábua de passar prática de usar. Móvel de " +
      "fábrica, entregue e montado na sua casa.",
    medidas: { larguraCm: 118.5, alturaCm: 92, profundidadeCm: 36 },
    cores: cores("Branco"),
    imagens: iconeCategoria("tabuas-de-passar", "Tábua de Passar Ravena"),
    preco: precoIlustrativo(457.85),
    disponivel: true,
  },
];
