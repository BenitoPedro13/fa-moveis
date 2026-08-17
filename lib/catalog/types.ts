// spec-architecture.md §5 — domain model. Zero Shopify imports, ever.

export type Medidas = {
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
  pesoSuportadoKg?: number;
};

export type Cor = {
  nome: string;
  hex: string;
  imagem?: string;
};

export type Preco = {
  aVista: number;
  parcelas?: number;
  valorParcela?: number;
  descontoAVistaPct?: number;
};

export type Produto = {
  slug: string;
  nome: string;
  categoria: string;
  ambientes: string[];
  resumo: string;
  descricao: string;
  medidas: Medidas;
  cores: Cor[];
  imagens: { src: string; alt: string; tipo: "ambiente" | "produto" | "tecnico" }[];
  preco?: Preco;
  destaque?: boolean;
  disponivel: boolean;
  fabricante?: string;
};

export type Categoria = {
  slug: string;
  nome: string;
};

export type Ambiente = {
  slug: string;
  nome: string;
};
