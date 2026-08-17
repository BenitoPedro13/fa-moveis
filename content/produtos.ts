// The catalogue. All real supplier stock from her printed catalogue's QR codes — D'Doro and
// Novo Horizonte, see docs/tasks/TASK-importar-catalogo-fabrica.md. No demo/illustrative
// filler — every measurement here traces to her own material (supplier site, or the printed
// catalogue dictated by Benito) — CLAUDE.md §0 forbids inventing facts.
//
// Her own 3 confirmed products (Roupeiro Mônaco, Fruteira, Armário Aéreo Max — measurements in
// docs/dados-produtos.md, fully real) are pulled off the site for now, not deleted from the
// record — their only photos are stills from her low-quality Facebook video capture, flagged
// since TASK-scaffold-catalogo.md as unfit to ship (spec-architecture.md §14 #4/#6). Re-add once
// real photos exist (ask Fátima directly, or a supplier match like the Mônaco/Mônaco-Plus one
// noted in dados-produtos.md).
import type { Produto, Cor } from "@/lib/catalog/types";
import { hexPorNome } from "@/content/cores";

function cores(...nomes: string[]): Cor[] {
  return nomes.map((nome) => ({ nome, hex: hexPorNome(nome) }));
}

export const produtos: Produto[] = [
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
        src: "/produtos/comoda-austria-5-gavetas/produto.avif",
        alt: "Cômoda Áustria 5 Gavetas, acabamento camaru",
        tipo: "produto",
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
        src: "/produtos/comoda-space-5-gavetas-2-portas/produto.avif",
        alt: "Cômoda Space 5 Gavetas 2 Portas, acabamento cumaru",
        tipo: "produto",
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
        src: "/produtos/comoda-deca-10-gavetas/produto.avif",
        alt: "Cômoda Deca 10 Gavetas, acabamento cumaru",
        tipo: "produto",
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
        src: "/produtos/cabeceira-everest/produto.avif",
        alt: "Cabeceira Casal Everest, acabamento cumaru",
        tipo: "produto",
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
        src: "/produtos/roupeiro-buriti-3-portas-9-gavetas/produto.avif",
        alt: "Roupeiro Buriti 3 Portas 9 Gavetas, acabamento cumaru fendi",
        tipo: "produto",
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
        src: "/produtos/roupeiro-encant-6-portas-6-gavetas/produto.avif",
        alt: "Roupeiro Encant 6 Portas 6 Gavetas, acabamento cumaru",
        tipo: "produto",
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
        src: "/produtos/roupeiro-paradizzo/produto.avif",
        alt: "Roupeiro Paradizzo, acabamento cumaru",
        tipo: "produto",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "cama-verona-solteiro",
    nome: "Cama Verona Solteiro",
    categoria: "camas",
    ambientes: ["quarto"],
    resumo: "Cama de solteiro com cabeceira ripada.",
    descricao:
      "Cama de solteiro com cabeceira ripada. Móvel de fábrica, entregue e montado na sua " +
      "casa pela F&A Móveis.",
    // Largura corrigida por Benito em 2026-08-17 (101 cm) — a ficha original do catálogo
    // impresso tinha o mesmo valor da versão casal (151 cm), que não fazia sentido pra um
    // solteiro. Altura/profundidade não corrigidas, seguem a ficha impressa.
    medidas: { larguraCm: 101, alturaCm: 113, profundidadeCm: 207 },
    cores: cores("Neve", "Cumaru"),
    imagens: [
      {
        src: "/produtos/cama-verona-solteiro/produto.avif",
        alt: "Cama Verona Solteiro",
        tipo: "produto",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },
  {
    slug: "cama-verona-casal",
    nome: "Cama Verona Casal",
    categoria: "camas",
    ambientes: ["quarto"],
    resumo: "Cama de casal com cabeceira ripada.",
    descricao:
      "Cama de casal com cabeceira ripada. Móvel de fábrica, entregue e montado na sua casa " +
      "pela F&A Móveis.",
    // Mesma altura/profundidade da versão solteiro, só a largura muda (confirmado por Benito
    // 2026-08-17) — bate com a ficha original dictada pra "cama casal verona".
    medidas: { larguraCm: 151, alturaCm: 113, profundidadeCm: 207 },
    cores: cores("Neve", "Cumaru"),
    imagens: [
      {
        src: "/produtos/cama-verona-casal/produto.avif",
        alt: "Cama Verona Casal",
        tipo: "produto",
      },
    ],
    fabricante: "Novo Horizonte",
    disponivel: true,
  },

  // ── Fornecedor real — Benetil (distribuidor de móveis) ──────────────────────────────────
  // Produtos de novo fornecedor agregado 2026-08-17, via benetil.com.br. Custo wholesale
  // fornecido via WhatsApp com markup 2x para preço de venda. Medidas e descrições detalhadas
  // ainda precisam ser confirmadas diretamente com Fátima ou obtidas do manual de cada produto.
  // [VERIFY: dimensões exatas, peso suportado, composição dos materiais — obter do manual ou
  // ficha técnica de Benetil.]
  {
    slug: "comoda-california-8-gavetas",
    nome: "Cômoda Califórnia 8 Gavetas",
    categoria: "comodas",
    ambientes: ["quarto"],
    resumo: "Cômoda com 8 gavetas para organizar o quarto.",
    descricao: "Cômoda com 8 gavetas. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 79.3, alturaCm: 110, profundidadeCm: 45 },
    cores: cores("Cinamomo"),
    imagens: [
      {
        src: "/produtos/comoda-california-8-gavetas/comoda_california_cinamomo_1.webp",
        alt: "Cômoda Califórnia 8 Gavetas, acabamento cinamomo",
        tipo: "produto",
      },
    ],
    preco: { aVista: 1114.8 },
    fabricante: "Benetil",
    disponivel: true,
  },
  {
    slug: "comoda-milao",
    nome: "Cômoda Milão",
    categoria: "comodas",
    ambientes: ["quarto"],
    resumo: "Cômoda com gavetas, disponível em duas cores.",
    descricao: "Cômoda com gavetas. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 79.3, alturaCm: 110, profundidadeCm: 45 },
    cores: cores("Cinamomo", "Off Arenas"),
    imagens: [
      {
        src: "/produtos/comoda-milao/comoda_milao_cinamo_off_arenas_1.webp",
        alt: "Cômoda Milão, acabamento cinamomo",
        tipo: "produto",
      },
    ],
    preco: { aVista: 913.2 },
    fabricante: "Benetil",
    disponivel: true,
  },
  {
    slug: "multiuso-sparta",
    nome: "Multiuso Sparta",
    categoria: "multiusos",
    ambientes: ["quarto", "sala"],
    resumo: "Multiuso versátil, disponível em três acabamentos.",
    descricao:
      "Multiuso prático para uso em quarto ou sala. Móvel de fábrica, entregue e montado " +
      "na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 40, alturaCm: 110, profundidadeCm: 30 },
    cores: cores("Cinamomo", "Off Arenas", "Castanho"),
    imagens: [
      {
        src: "/produtos/multiuso-sparta/multiuso_sparta_cinamomo_off_arenas.webp",
        alt: "Multiuso Sparta, acabamento cinamomo",
        tipo: "produto",
      },
    ],
    preco: { aVista: 446.8 },
    fabricante: "Benetil",
    disponivel: true,
  },
  {
    slug: "balcao-flora",
    nome: "Balcão Flora",
    categoria: "balcoes",
    ambientes: ["cozinha"],
    resumo: "Balcão utilitário com acabamento refinado.",
    descricao:
      "Balcão utilitário da linha Flora em MDF 15mm. Puxadores modernos e corrediças " +
      "telescópicas. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 85, profundidadeCm: 47 },
    cores: cores("Cinamomo", "Off Arenas"),
    imagens: [
      {
        src: "/produtos/balcao-flora/balcao_flora_cina_off_arenas1000x600.webp",
        alt: "Balcão Flora, acabamento cinamomo",
        tipo: "produto",
      },
    ],
    preco: { aVista: 670 },
    fabricante: "Benetil",
    disponivel: true,
  },
  {
    slug: "aereo-central-flora",
    nome: "Aéreo Central Flora 1,20",
    categoria: "armarios-aereos",
    ambientes: ["cozinha"],
    resumo: "Aéreo com 1,20 m de largura, da linha Flora.",
    descricao:
      "Aéreo com 1,20 m de largura da linha Flora em MDF 15mm. Puxadores modernos e " +
      "corrediças telescópicas. Móvel de fábrica, entregue e montado na sua casa pela F&A Móveis.",
    medidas: { larguraCm: 120, alturaCm: 68, profundidadeCm: 30 },
    cores: cores("Cinamomo", "Refleta"),
    imagens: [
      {
        src: "/produtos/aereo-central-flora/aereo_2p_flora_cina_reflecta1000x500.webp",
        alt: "Aéreo Central Flora 1,20, acabamento cinamomo",
        tipo: "produto",
      },
    ],
    preco: { aVista: 730 },
    fabricante: "Benetil",
    disponivel: true,
  },
];
