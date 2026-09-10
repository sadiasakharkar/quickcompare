import type { ComparisonResponse, Offer, Platform, Product } from "@/types/quickcompare"

export const developmentPlatforms: Platform[] = [
  { id: "blinkit", name: "Blinkit", shortName: "B", color: "#f7c928" },
  { id: "zepto", name: "Zepto", shortName: "Z", color: "#5b4bda" },
  { id: "instamart", name: "Swiggy Instamart", shortName: "S", color: "#f15b2a" },
]

export const cauliflower: Product = { id: "cauliflower", name: "Cauliflower", variants: [{ id: "cauliflower-1pc", label: "1 medium piece", quantity: "1 pc" }, { id: "cauliflower-500g", label: "500 g", quantity: "500 g" }] }

export const developmentOffers: Offer[] = [
  { id: "blinkit-cauliflower", platform: developmentPlatforms[0], product: cauliflower, variant: cauliflower.variants[0], price: 39, mrp: 49, discount: 10, fees: { delivery: 0, handling: 3 }, availability: "available", deliveryEstimate: "8–13 min", observedAt: "Development fixture" },
  { id: "zepto-cauliflower", platform: developmentPlatforms[1], product: cauliflower, variant: cauliflower.variants[0], price: 42, mrp: 50, discount: 8, fees: { delivery: 0, handling: 2 }, availability: "available", deliveryEstimate: "10–15 min", observedAt: "Development fixture" },
  { id: "instamart-cauliflower", platform: developmentPlatforms[2], product: cauliflower, variant: cauliflower.variants[1], price: 32, mrp: 40, discount: 8, fees: { delivery: 0, handling: 4 }, availability: "unknown", deliveryEstimate: undefined, observedAt: "Development fixture" },
]

export const developmentComparison: ComparisonResponse = { product: cauliflower, location: { city: "Pune", label: "Pune" }, offers: developmentOffers, platformsCompared: 3, platformsResponded: 2, observedAt: "Development fixture" }
