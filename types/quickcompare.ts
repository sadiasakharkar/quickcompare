export type Unit = "g" | "kg" | "ml" | "l" | "piece"
export type Availability = "available" | "out_of_stock" | "unavailable" | "data_unavailable" | "stale"
export type ComparisonStatus = "comparable" | "not_comparable" | "partial"

export interface Platform { id: string; name: string; shortName: string; color: string }
export interface Location { city: string; pincode?: string; label: string }
export interface ProductVariant { id: string; name: string; quantity: number; unit: Unit; label: string }
export interface Product { id: string; name: string; category: string; variants: ProductVariant[] }
export interface Offer { id: string; platform: Platform; platformId: string; productId: string; productName: string; variant: ProductVariant; price?: number; mrp?: number; discount?: number; deliveryFee?: number; handlingFee?: number; availability: Availability; deliveryMinutes?: number; deliveryEstimate?: string; observedAt?: string; productUrl?: string; comparisonStatus: ComparisonStatus }
export interface ComparisonResponse { product: Product; location: Location; offers: Offer[]; platformsCompared: number; platformsResponded: number; query: string; environment: "development" | "production"; checkedAt: string }
export interface PriceBreakdown { productPrice: number; deliveryFee: number; handlingFee: number; discount: number; effectiveCost: number }
export interface UnitPriceResult { amount: number; unit: Unit; label: string }
