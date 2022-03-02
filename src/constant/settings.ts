import { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from "vue-router"

export enum TokenStorageName {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
  Cookie = "cookie"
}

/**
 * route的类型
 */
export enum RouteType {
  Menu,
  Page,
  Button
}

/**
 * api返回的route结构
 */
export interface RouterApiType {
  key: string
  path?: string
  type: RouteType
  icon?: string
  children?: RouterApiType[]
  title: string
  notShow?: boolean
}

/**
 * 系统中使用的的route结构
 */
export interface RouterSysType {
  key: string
  path?: string
  routeName: string
  type: RouteType
  icon?: string
  children?: RouterSysType[]
  title: string
  parentKey?: string[]
  notShow?: boolean
  [k: string]: any
}

export declare interface RouteMetaCustom extends RouteMeta {
  icon?: string
  title: string
  key: string
  type: RouteType
  notShow?: boolean
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
