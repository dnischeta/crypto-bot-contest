import type { Price } from '@/types'

export function formatPrice(price: Price): string {
  return `${price.amount}\xa0${price.asset.toUpperCase()}`
}
