export function formatQty(qty: number): string {
  if (qty < 1000) {
    return qty.toString(10)
  }

  return Math.ceil(qty / 1000).toString(10) + 'K'
}
