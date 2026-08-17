import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import https from "https";
import http from "http";

// Benetil product URLs from WhatsApp, mapped to supplier refs
// Full URLs with all required parameters
const PRODUTOS = [
  {
    url: "https://benetil.com.br/index.php?produto&cod=317&grupo=2&C%C3%B4moda-Calif%C3%B3rnia&2608172614081326",
    ref: "10104",
    nome_esperado: "Cômoda Califórnia 8 Gavetas",
  },
  {
    url: "https://benetil.com.br/index.php?produto&cod=292&grupo=2&C%C3%B4moda-Mil%C3%A3o&2608172614080626",
    ref: "8079",
    nome_esperado: "Cômoda Milão",
  },
  {
    url: "https://benetil.com.br/index.php?produto&cod=285&grupo=6&Multiuso-Sparta&2608172614080326",
    ref: "7479",
    nome_esperado: "Multiuso Sparta",
  },
  {
    url: "https://benetil.com.br/index.php?produto&cod=342&grupo=7&Cozinha-Modulada-Flora",
    ref: "11925/11934",
    nome_esperado: "Flora", // multiple products on this page
  },
];

interface ProdutoExtraido {
  ref: string;
  nome: string;
  descricao?: string;
  medidas?: {
    larguraCm?: number;
    alturaCm?: number;
    profundidadeCm?: number;
  };
  cores: string[];
  imagens: string[];
  fonte: string;
  fornecedor: "Benetil";
  notas?: string;
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (response) => {
        const fileStream = fs.createWriteStream(destPath);
        response.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(destPath, () => {}); // delete the file if error
        reject(err);
      });
  });
}

async function extrairProduto(
  page: any,
  url: string,
  ref: string
): Promise<ProdutoExtraido[]> {
  console.log(`\n📄 Navegando para: ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Aguarda a página carregar elementos
  await page.waitForTimeout(3000);

  // Tenta extrair dados via JavaScript
  const produtosEncontrados = await page.evaluate(() => {
    const produtos: any[] = [];

    // Tenta encontrar o nome do produto - pega do título da página
    let nome = "";
    const titleTag = document.querySelector("title");
    if (titleTag?.textContent) {
      nome = titleTag.textContent
        .replace(" - Benetil", "")
        .replace(" - ", "")
        .trim();
    }

    // Se não encontrou, tenta outros seletores
    if (!nome) {
      const h1 = document.querySelector("h1");
      if (h1?.textContent) {
        nome = h1.textContent.trim();
      }
    }

    // Extrai imagens de produto - procura no conteúdo da página
    const imagens = new Set<string>();

    // Procura em meta tags (OpenGraph)
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage?.getAttribute("content")) {
      const imgUrl = ogImage.getAttribute("content") || "";
      if (imgUrl) imagens.add(imgUrl);
    }

    // Procura todas as imagens que contenham "produto", "comoda", "multiuso", etc
    const todasImagens = document.querySelectorAll("img[src*='/upload/']");
    for (const img of todasImagens) {
      const src = (img as HTMLImageElement).src;
      if (src && !src.includes("logo") && !src.includes("menu")) {
        imagens.add(src);
      }
    }

    // Procura em data attributes ou scripts que possam conter URLs de imagens
    const scripts = document.querySelectorAll("script");
    let coresimagensExtraidas = "";
    for (const script of scripts) {
      if (script.textContent && script.textContent.includes("/upload/")) {
        coresimagensExtraidas += script.textContent;
      }
    }

    // Extrai URLs de imagens do conteúdo de scripts
    const urlRegex = /\/upload\/images\/produtos\/[^"']+\.(jpg|jpeg|png|webp)/gi;
    const matches = coresimagensExtraidas.match(urlRegex);
    if (matches) {
      matches.forEach((url) => imagens.add(url));
    }

    // Extrai texto da página para cores
    const bodyText = document.body.innerText.toLowerCase();
    const cores: string[] = [];

    // Lista de cores conhecidas do catálogo de Fátima
    const coresComuns = [
      "cinamomo",
      "castanho",
      "off white",
      "off arenas",
      "neve",
      "branco",
      "natural",
      "cumaru",
      "ipê",
    ];

    for (const cor of coresComuns) {
      if (bodyText.includes(cor)) {
        cores.push(cor);
      }
    }

    // Tenta extrair dimensões do texto
    let medidas = null;
    const dimensionesMatch = bodyText.match(
      /(\d+(?:[.,]\d+)?)\s*(?:cm|m|x|\s)(?:\s*x\s*)?(\d+(?:[.,]\d+)?)\s*(?:cm|m|x|\s)(?:\s*x\s*)?(\d+(?:[.,]\d+)?)/
    );
    if (dimensionesMatch) {
      medidas = {
        larguraCm: parseFloat(dimensionesMatch[1].replace(",", ".")),
        alturaCm: parseFloat(dimensionesMatch[2].replace(",", ".")),
        profundidadeCm: parseFloat(dimensionesMatch[3].replace(",", ".")),
      };
    }

    // Se encontrou pelo menos nome e imagens
    if (nome || imagens.size > 0) {
      produtos.push({
        nome: nome || "Produto sem nome",
        cores: [...cores],
        imagens: Array.from(imagens),
        medidas: medidas,
        textoPagina: bodyText.substring(0, 500),
      });
    }

    return produtos;
  });

  const resultado: ProdutoExtraido[] = [];

  if (produtosEncontrados.length > 0 && produtosEncontrados[0].nome) {
    for (const prod of produtosEncontrados) {
      resultado.push({
        ref,
        nome: prod.nome,
        descricao: prod.descricao || "",
        medidas: prod.medidas,
        cores: prod.cores,
        imagens: prod.imagens,
        fonte: url,
        fornecedor: "Benetil",
        notas: `Extraído de ${url}`,
      });
    }
  }

  return resultado;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const scratchpadDir = path.join(process.cwd(), "scratchpad");
    const framesDir = path.join(scratchpadDir, "frames", "benetil");

    // Cria diretórios se não existirem
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    const page = await browser.newPage();
    const produtosExtraidos: ProdutoExtraido[] = [];

    for (const produto of PRODUTOS) {
      try {
        const extraidos = await extrairProduto(page, produto.url, produto.ref);
        produtosExtraidos.push(...extraidos);

        // Cria diretório para as imagens do produto
        const prodDir = path.join(framesDir, produto.ref);
        if (!fs.existsSync(prodDir)) {
          fs.mkdirSync(prodDir, { recursive: true });
        }

        // Baixa imagens
        for (let i = 0; i < extraidos[0]?.imagens.length; i++) {
          let imgUrl = extraidos[0].imagens[i];

          // Converte URLs relativas em absolutas
          if (imgUrl.startsWith("/")) {
            imgUrl = "https://benetil.com.br" + imgUrl;
          }

          if (imgUrl) {
            try {
              const fileName = `imagem-${i + 1}.${
                imgUrl.includes(".webp") ? "webp" : "jpg"
              }`;
              const destPath = path.join(prodDir, fileName);
              console.log(`📥 Baixando: ${fileName} de ${produto.ref}`);
              await downloadImage(imgUrl, destPath);
            } catch (err) {
              console.error(
                `❌ Erro ao baixar imagem de ${produto.ref}:`,
                err
              );
            }
          }
        }
      } catch (err) {
        console.error(`❌ Erro ao processar ${produto.ref}:`, err);
        produtosExtraidos.push({
          ref: produto.ref,
          nome: produto.nome_esperado,
          cores: [],
          imagens: [],
          fonte: produto.url,
          fornecedor: "Benetil",
          notas: `Erro na extração: ${err}`,
        });
      }
    }

    // Salva resultado em JSON
    const outputPath = path.join(scratchpadDir, "catalogo-benetil.json");
    fs.writeFileSync(outputPath, JSON.stringify(produtosExtraidos, null, 2));
    console.log(`\n✅ Dados salvos em: ${outputPath}`);
    console.log(`📊 ${produtosExtraidos.length} produtos processados`);

    await page.close();
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
