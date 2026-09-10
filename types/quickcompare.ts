export type Unit = "g" | "kg" | "ml" | "l" | "piece"
export type Availability = "available" | "out_of_stock" | "unavailable" | "data_unavailable" | "stale"
export type ComparisonStatus = "comparable" | "not_comparable" | "partial"
export type PriceStatus = "below_usual" | "near_usual" | "above_usual" | "not_enough_data"
export type TimeRange = "7d" | "30d" | "90d"
export type BasketAvailability = "complete" | "partial" | "unavailable"

export interface Platform { id: string; name: string; shortName: string; color: string }
export interface Location { city: string; pincode?: string; label: string }
export interface ProductVariant { id: string; name: string; quantity: number; unit: Unit; label: string }
export interface Product { id: string; name: string; category: string; variants: ProductVariant[] }
export interface Offer { id: string; platform: Platform; platformId: string; productId: string; productName: string; variant: ProductVariant; price?: number; mrp?: number; discount?: number; deliveryFee?: number; handlingFee?: number; availability: Availability; deliveryMinutes?: number; deliveryEstimate?: string; observedAt?: string; productUrl?: string; comparisonStatus: ComparisonStatus }
export interface ComparisonResponse { product: Product; location: Location; offers: Offer[]; platformsCompared: number; platformsResponded: number; query: string; environment: "development" | "production"; checkedAt: string }
export interface PriceBreakdown { productPrice: number; deliveryFee: number; handlingFee: number; discount: number; effectiveCost: number }
export interface UnitPriceResult { amount: number; unit: Unit; label: string }

export interface PriceObservation { date: string; price: number; platform: Platform; location: Location }
export interface PriceHistory { productId: string; variantId: string; location: Location; observations: PriceObservation[]; lastObservedAt?: string; currentEffectivePrice?: number }
export interface PriceStats { currentPrice?: number; averagePrice?: number; minimumPrice?: number; maximumPrice?: number; medianPrice30d?: number; hasData: boolean }
export interface PriceHistoryResponse { product: Product; variant: ProductVariant; location: Location; history: PriceHistory; stats: PriceStats; status: PriceStatus }

export interface BasketItem { productId: string; variantId: string; quantity: number; productName: string; variant: ProductVariant; selectedOffer?: Offer }
export interface BasketOffer { offer: Offer; isSelected: boolean }
export interface PlatformBasket { platform: Platform; items: BasketItem[]; subtotal: number; deliveryFee: number; handlingFee: number; discount: number; effectiveTotal: number; itemsAvailable: number; availability: BasketAvailability; unavailableItems: BasketItem[] }
export interface BasketOptimizationResult { singlePlatformOptions: PlatformBasket[]; splitBasketOption: { platforms: PlatformBasket[]; itemsByPlatform: Record<string, BasketItem[]>; subtotal: number; totalFees: number; effectiveTotal: number; savings: number } }
export interface Basket { items: BasketItem[]; location: Location }
