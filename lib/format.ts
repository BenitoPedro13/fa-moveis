// pt-BR formatting — everything is stored in cm / reais as numbers; formatted only here.
// spec-design.md §5.2: decimal comma, thousands point. Never format inside content/.

export function formatCm(valor: number): string {
  if (valor >= 100) {
    const metros = valor / 100;
    return `${metros.toFixed(2).replace(".", ",")} m`;
  }
  return `${valor} cm`;
}

export function formatMedidas(m: { larguraCm: number; alturaCm: number; profundidadeCm: number }): string {
  return `${m.larguraCm} × ${m.alturaCm} × ${m.profundidadeCm} cm`;
}

export function formatReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatParcelado(parcelas: number, valorParcela: number): string {
  return `${parcelas}x de ${formatReais(valorParcela)}`;
}

export function formatAVista(aVista: number): string {
  return `${formatReais(aVista)} à vista`;
}
