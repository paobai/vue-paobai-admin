import type { GeneralChart } from "@/types/global"
import { getRequest, postRequest } from "@/utils/httpRequest"
import type * as ApiType from "./type"
export * from "./type"

export function queryDataChainGrowth(data: ApiType.DataChainGrowth) {
  return postRequest<ApiType.DataChainGrowthRes>("/api/data-chain-growth", data)
}

export function queryPopularAuthor() {
  return getRequest<ApiType.PopularAuthorRes>("/api/popular-author/list")
}

export function queryContentPublish() {
  return getRequest<ApiType.ContentPublishRecord[]>("/api/content-publish")
}

export function queryContentPeriodAnalysis() {
  return postRequest<GeneralChart>("/api/content-period-analysis")
}

export function queryPublicOpinionAnalysis(data: ApiType.DataChainGrowth) {
  return postRequest<ApiType.PublicOpinionAnalysisRes>("/api/public-opinion-analysis", data)
}

export function queryDataOverview() {
  return postRequest<ApiType.DataOverviewRes>("/api/data-overview")
}
