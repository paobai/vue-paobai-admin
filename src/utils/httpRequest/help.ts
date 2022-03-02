import { AxiosInstance, AxiosRequestConfig } from "axios"

export enum ApiCodeEnum {
  SUCCESS = 1,
  FAILED = 0
}

export interface ApiResponseBase<T> {
  code: ApiCodeEnum
  data: T
  msg?: string
  __headers: any
}

export type ApiPromise<T = any> = Promise<ApiResponseBase<T>>

export enum ContentType {
  JSON = "json",
  FORM = "form"
}

export interface CustomAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): ApiPromise
  adornUrl(actionName: string): String
  adornParams(params: any, openDefaultParams: boolean): String
  adornData(data: any, openDefaultParams: boolean, contentType: ContentType): String
}
