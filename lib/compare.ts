import { developmentComparison } from "@/data/dev-fixtures"
import type { ComparisonResponse } from "@/types/quickcompare"

export async function getDevelopmentComparison(): Promise<ComparisonResponse> {
  return developmentComparison
}

export function effectivePrice(price: number | undefined, fees: { delivery?: number; handling?: number }) {
  if (price === undefined) return undefined
  return price + (fees.delivery ?? 0) + (fees.handling ?? 0)
}
