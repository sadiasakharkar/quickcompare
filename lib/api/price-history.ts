import { developmentComparison, developmentPriceObservations } from "@/data/dev-fixtures"
import type { Location, PriceHistoryResponse, PriceStatus, ProductVariant, TimeRange } from "@/types/quickcompare"

export async function getPriceHistory(productId: string, variantId: string, location: Location, range: TimeRange = "30d"): Promise<PriceHistoryResponse> {
  void productId
  void variantId
  void range
  const observations = developmentPriceObservations
  const prices = observations.map((item) => item.price)
  const current = developmentComparison.offers.find((offer) => offer.availability === "available")
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length
  const sorted = [...prices].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  const status: PriceStatus = current && current.price !== undefined ? current.price < average * 0.95 ? "below_usual" : current.price > average * 1.05 ? "above_usual" : "near_usual" : "not_enough_data"
  const variant = developmentComparison.product.variants.find((item) => item.id === variantId) ?? developmentComparison.product.variants[0]
  return { product: developmentComparison.product, variant: variant as ProductVariant, location, history: { productId, variantId, location, observations, lastObservedAt: developmentComparison.checkedAt, currentEffectivePrice: current ? current.price : undefined }, stats: { currentPrice: current?.price, averagePrice: average, minimumPrice: Math.min(...prices), maximumPrice: Math.max(...prices), medianPrice30d: median, hasData: prices.length > 1 }, status }
}
