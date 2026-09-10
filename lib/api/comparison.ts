import { developmentComparison } from "@/data/dev-fixtures"
import type { ComparisonResponse, Location } from "@/types/quickcompare"

/** Development adapter. Replace this implementation with GET /compare without changing UI consumers. */
export async function getComparisonResults(query: string, location: Location): Promise<ComparisonResponse> {
  return { ...developmentComparison, query, location }
}
