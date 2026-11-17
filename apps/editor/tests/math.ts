export function calculateTotal(price: number, taxRate: number): number {
  return Number((price * (1 + taxRate)).toFixed(2));
}
