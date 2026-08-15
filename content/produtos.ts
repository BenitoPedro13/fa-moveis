// Three products, fully transcribed from docs/dados-produtos.md — every field of `Produto`
// exercised, no measurement guessed. See TASK-scaffold-catalogo.md §2.4 for why three, not six.
import type { Produto } from "@/lib/catalog/types";

export const produtos: Produto[] = [
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
    cores: [{ nome: "Branca", hex: "#FFFFFF" }],
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
];
