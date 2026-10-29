export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return <span className="text-xs font-semibold text-red-600">Esgotado</span>
  }
  if (stock <= 5) {
    return <span className="text-xs font-semibold text-accent-600">Últimas {stock} unidades</span>
  }
  return <span className="text-xs font-medium text-brand-700">Em estoque</span>
}
