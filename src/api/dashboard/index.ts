import { getRequest } from "@/utils/httpRequest"

export interface ContentDataRecord {
  x: string
  y: number
}

export function queryContentData() {
  return getRequest<ContentDataRecord[]>("/api/content-data")
}

export interface PopularRecord {
  key: number
  clickNumber: string
  title: string
  increases: number
}

export function queryPopularList(params: { type: string }) {
  return getRequest<PopularRecord[]>("/api/popular/list", { params })
}
