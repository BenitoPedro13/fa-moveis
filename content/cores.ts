// Maps a colour *name* (real, sourced from a listing or her own posts) to a display hex for
// the swatch. The name is data; the hex is a rendering necessity, not a fact about her business
// — CLAUDE.md's "never invent a fact" is about prices/measurements/addresses, not swatch tints.
const MAPA: Record<string, string> = {
  branco: "#FFFFFF",
  branca: "#FFFFFF",
  "off white": "#F3EDE6",
  preto: "#1E1B19",
  "preto fosco": "#1E1B19",
  "preto frankfurt": "#1E1B19",
  nogueira: "#5C4033",
  cacau: "#5A3A28",
  fendi: "#B8AC94",
  ipê: "#6B4A2E",
  imbuia: "#6B4A34",
  verde: "#4B6B4E",
  rústico: "#7A5C3E",
  rustic: "#7A5C3E",
  vermont: "#8A6A4A",
  avelã: "#A9825A",
  marrom: "#5C4033",
};

export function hexPorNome(nome: string): string {
  const chave = nome.trim().toLowerCase();
  return MAPA[chave] ?? "#8A7A72";
}
