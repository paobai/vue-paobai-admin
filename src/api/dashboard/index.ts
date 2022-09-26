import { getRequest } from "@/utils/http-request"
import type * as ApiType from "./type"
export * from "./type"

export function queryContentData() {
  return getRequest<ApiType.ContentDataRecord[]>("/api/content-data")
}

export function queryPopularList(params: { type: string }) {
  return getRequest<ApiType.PopularRecord[]>("/api/popular/list", { params })
}
