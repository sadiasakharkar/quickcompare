import type { ComparisonResponse, Offer, Platform, Product } from "@/types/quickcompare"

export const developmentPlatforms: Platform[] = [
  { id: "blinkit", name: "Blinkit", shortName: "B", color: "#f7c928" },
  { id: "zepto", name: "Zepto", shortName: "Z", color: "#5b4bda" },
  { id: "instamart", name: "Swiggy Instamart", shortName: "S", color: "#f15b2a" },
]

export const cauliflower: Product = {
  id: "cauliflower", name: "Cauliflower", category: "Fresh vegetables",
  variants: [
    { id: "cauliflower-1pc", name: "1 pc", quantity: 1, unit: "piece", label: "1 medium piece" },
    { id: "cauliflower-500g", name: "500 g", quantity: 500, unit: "g", label: "500 grams" },
    { id: "cauliflower-1kg", name: "1 kg", quantity: 1, unit: "kg", label: "1 kilogram" },
  ],
}

const offer = (value: Omit<Offer, "platform" | "platformId" | "productId" | "productName" | "variant"> & { platformId: string; variantId: string }): Offer => {
  const platform = developmentPlatforms.find((item) => item.id === value.platformId)!
  const variant = cauliflower.variants.find((item) => item.id === value.variantId)!
  return { ...value, platform, platformId: platform.id, productId: cauliflower.id, productName: cauliflower.name, variant }
}

export const developmentOffers: Offer[] = [
  offer({ id: "blinkit-cauliflower-1pc", platformId: "blinkit", variantId: "cauliflower-1pc", price: 39, mrp: 49, discount: 10, deliveryFee: 0, handlingFee: 3, availability: "unavailable", deliveryEstimate: undefined, observedAt: "2026-09-10T10:42:00+05:30", productUrl: "#", comparisonStatus: "partial" }),
  offer({ id: "zepto-cauliflower-1pc", platformId: "zepto", variantId: "cauliflower-1pc", price: 42, mrp: 50, discount: 8, deliveryFee: 0, handlingFee: 2, availability: "available", deliveryMinutes: 12, deliveryEstimate: "10–15 min", observedAt: "2026-09-10T10:45:00+05:30", productUrl: "#", comparisonStatus: "comparable" }),
  offer({ id: "instamart-cauliflower-1pc", platformId: "instamart", variantId: "cauliflower-1pc", price: 44, mrp: 52, discount: 8, deliveryFee: 0, handlingFee: 4, availability: "available", deliveryMinutes: 18, deliveryEstimate: "15–20 min", observedAt: "2026-09-10T10:38:00+05:30", productUrl: "#", comparisonStatus: "comparable" }),
  offer({ id: "zepto-cauliflower-500g", platformId: "zepto", variantId: "cauliflower-500g", price: 40, mrp: 48, discount: 8, deliveryFee: 0, handlingFee: 2, availability: "available", deliveryMinutes: 12, deliveryEstimate: "10–15 min", observedAt: "2026-09-10T10:45:00+05:30", productUrl: "#", comparisonStatus: "comparable" }),
  offer({ id: "instamart-cauliflower-500g", platformId: "instamart", variantId: "cauliflower-500g", price: 36, mrp: 42, discount: 6, deliveryFee: 0, handlingFee: 4, availability: "available", deliveryMinutes: 18, deliveryEstimate: "15–20 min", observedAt: "2026-09-10T10:38:00+05:30", productUrl: "#", comparisonStatus: "comparable" }),
  offer({ id: "zepto-cauliflower-1kg", platformId: "zepto", variantId: "cauliflower-1kg", price: 65, mrp: 78, discount: 13, deliveryFee: 0, handlingFee: 2, availability: "available", deliveryMinutes: 12, deliveryEstimate: "10–15 min", observedAt: "2026-09-10T10:45:00+05:30", productUrl: "#", comparisonStatus: "comparable" }),
  offer({ id: "instamart-cauliflower-1kg", platformId: "instamart", variantId: "cauliflower-1kg", price: 69, mrp: 80, discount: 11, deliveryFee: 0, handlingFee: 4, availability: "out_of_stock", deliveryEstimate: undefined, observedAt: "2026-09-10T10:38:00+05:30", productUrl: "#", comparisonStatus: "partial" }),
]

export const developmentComparison: ComparisonResponse = { product: cauliflower, location: { city: "Pune", label: "Pune" }, offers: developmentOffers, platformsCompared: 3, platformsResponded: 2, query: "Cauliflower", environment: "development", checkedAt: "2026-09-10T10:45:00+05:30" }
