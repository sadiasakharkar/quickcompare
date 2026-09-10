export type Availability = "available" | "unavailable" | "unknown"

export interface ProductVariant { id: string; label: string; quantity: string }
export interface Product { id: string; name: string; variants: ProductVariant[] }
export interface Platform { id: string; name: string; shortName: string; color: string }
export interface Location { city: string; pincode?: string; label: string }
export interface Fees { delivery?: number; handling?: number }
export interface Offer { id: string; platform: Platform; product: Product; variant: ProductVariant; price?: number; mrp?: number; discount?: number; fees: Fees; availability: Availability; deliveryEstimate?: string; observedAt: string }
export interface ComparisonResponse { product: Product; location: Location; offers: Offer[]; platformsCompared: number; platformsResponded: number; observedAt: string }
