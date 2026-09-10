import type { Offer, PriceBreakdown, Unit, UnitPriceResult } from "@/types/quickcompare"

export function getPriceBreakdown(offer: Offer): PriceBreakdown {
  const productPrice = offer.price ?? 0
  const deliveryFee = offer.deliveryFee ?? 0
  const handlingFee = offer.handlingFee ?? 0
  const discount = offer.discount ?? 0
  return { productPrice, deliveryFee, handlingFee, discount, effectiveCost: productPrice + deliveryFee + handlingFee }
}

export function effectivePrice(offer: Offer) { return getPriceBreakdown(offer).effectiveCost }

function baseQuantity(quantity: number, unit: Unit) {
  if (unit === "kg" || unit === "l") return quantity * 1000
  return quantity
}

export function getUnitPrice(offer: Offer): UnitPriceResult | undefined {
  if (offer.price === undefined) return undefined
  const { quantity, unit } = offer.variant
  if (unit === "piece") return { amount: offer.price / quantity, unit, label: `₹${Math.round(offer.price / quantity)} / piece` }
  const normalized = baseQuantity(quantity, unit)
  const target: Unit = unit === "g" || unit === "kg" ? "kg" : "l"
  return { amount: (offer.price / normalized) * 1000, unit: target, label: `₹${Math.round((offer.price / normalized) * 1000)} / ${target}` }
}

export function formatFreshness(observedAt?: string) {
  if (!observedAt) return "Freshness unavailable"
  const minutes = Math.max(0, Math.round((Date.now() - new Date(observedAt).getTime()) / 60000))
  if (minutes < 60) return `Checked ${minutes || 1} min ago`
  return `Checked ${Math.round(minutes / 60)}h ago`
}
