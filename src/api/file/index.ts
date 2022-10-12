import { getRequest } from "@/utils/http-request"
import type * as ApiType from "./type"
export * from "./type"

const prefix = "/file"
/**
 * 获取文件列表
 * @param params
 */
export function getFileList(params: ApiType.FileListParams) {
  return getRequest<ApiListData<ApiType.ApiFileItem[]>>(`${prefix}/list`, params)
}
