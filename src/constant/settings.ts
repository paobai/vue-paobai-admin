import type { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from "vue-router"
import type { FileStatus } from "@arco-design/web-vue/es/upload/interfaces"
import { RouteEnum } from "@/enums/app"

/**
 * route的类型
 */
export const RouteEnumMap: { name: string; value: RouteEnum }[] = [
  { name: "菜单", value: RouteEnum.Menu },
  { name: "页面", value: RouteEnum.Page },
  { name: "外链", value: RouteEnum.Iframe },
  { name: "按钮", value: RouteEnum.Button }
]
/**
 * api返回的route结构
 */
export interface RouterApiType {
  id: AppIdType
  key: string
  path?: string
  type: RouteEnum
  icon?: string
  children?: RouterApiType[]
  title: string
  notShow?: boolean
  sort?: number
  parentKey?: string
  parentTitle?: string
}

/**
 * 系统中使用的的route结构
 */
export interface RouterSysType {
  id: AppIdType
  key: string
  path?: string
  routeName: string
  type: RouteEnum
  icon?: string
  children?: RouterSysType[]
  title: string
  parentKey?: string[]
  notShow?: boolean
  sort?: number
  [k: string]: any
}

export declare interface RouteMetaCustom extends RouteMeta {
  icon?: string
  title: string
  key: string
  type: RouteEnum
  notShow?: boolean
  iframePath?: string
}
/**
 * 自定义的route储存结构
 */
export type RouterCustomType = RouteRecordRaw & {
  meta: RouteMetaCustom
}

/**
 * useRoute 返回的route对象类型
 */
export declare interface RouteLocationNormalizedLoadedCustom extends RouteLocationNormalizedLoaded {
  meta: RouteMetaCustom
}

/**
 * tag的类型结构
 */
export type tagType = {
  title: string
  key: string
  name: string
  path: string
}

/**
 * fileUpload
 */
export const FileState = {
  INIT: "init" as FileStatus,
  UPLOADING: "uploading" as FileStatus,
  SUCCESS: "done" as FileStatus,
  ERROR: "error" as FileStatus
}
