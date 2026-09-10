import { developmentComparison, developmentPlatforms } from "@/data/dev-fixtures"
import { effectivePrice } from "@/lib/compare"
import type { Basket, BasketItem, BasketOptimizationResult, PlatformBasket } from "@/types/quickcompare"

const unavailableOn = new Set(["blinkit:cauliflower"])
export async function getBasketComparison(basket: Basket, location: Basket["location"]): Promise<BasketOptimizationResult> {
  const singlePlatformOptions: PlatformBasket[] = developmentPlatforms.map((platform) => {
    const items = basket.items.map((item) => {
      const offer = developmentComparison.offers.find((candidate) => candidate.platformId === platform.id && candidate.productId === item.productId && candidate.variant.id === item.variantId)
      return { ...item, selectedOffer: offer }
    })
    const unavailableItems = items.filter((item) => !item.selectedOffer || item.selectedOffer.availability !== "available")
    const subtotal = items.reduce((sum, item) => sum + (item.selectedOffer?.price ?? 0) * item.quantity, 0)
    const deliveryFee = unavailableItems.length === items.length ? 0 : subtotal > 199 ? 0 : 25
    const handlingFee = unavailableItems.length === items.length ? 0 : 4
    const discount = subtotal > 299 ? 20 : 0
    return { platform, items, subtotal, deliveryFee, handlingFee, discount, effectiveTotal: subtotal + deliveryFee + handlingFee - discount, itemsAvailable: items.length - unavailableItems.length, availability: unavailableItems.length === 0 ? "complete" : unavailableItems.length === items.length ? "unavailable" : "partial", unavailableItems }
  })
  const chosen = basket.items.map((item) => {
    const offer = developmentComparison.offers.filter((candidate) => candidate.productId === item.productId && candidate.variant.id === item.variantId && candidate.availability === "available").sort((a, b) => effectivePrice(a) - effectivePrice(b))[0]
    return { ...item, selectedOffer: offer }
  })
  const subtotal = chosen.reduce((sum, item) => sum + (item.selectedOffer?.price ?? 0) * item.quantity, 0)
  const splitPlatforms = developmentPlatforms.map((platform) => ({ ...singlePlatformOptions.find((option) => option.platform.id === platform.id)!, items: chosen.filter((item) => item.selectedOffer?.platformId === platform.id) })) .filter((platform) => platform.items.length > 0)
  const effectiveTotal = subtotal + splitPlatforms.reduce((sum, option) => sum + option.deliveryFee + option.handlingFee - option.discount, 0)
  return { singlePlatformOptions, splitBasketOption: { platforms: splitPlatforms, itemsByPlatform: Object.fromEntries(splitPlatforms.map((option) => [option.platform.id, option.items])), subtotal, totalFees: effectiveTotal - subtotal, effectiveTotal, savings: Math.max(0, singlePlatformOptions.filter((option) => option.availability === "complete").map((option) => option.effectiveTotal).sort((a, b) => b - a)[0] - effectiveTotal) } }
}

const location = developmentComparison.location
export const basketFixture: Basket = { location, items: [] }
export const basketExamples: BasketItem[] = [
  { productId: "cauliflower", variantId: "cauliflower-1pc", quantity: 1, productName: "Cauliflower", variant: developmentComparison.product.variants[0] },
]
void unavailableOn
