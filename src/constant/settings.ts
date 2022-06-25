import { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from "vue-router"

export enum TokenStorageName {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
  Cookie = "cookie"
}

/**
 * 菜单位置信息
 */
export enum MenuPosition {
  NAVBAR = "navbar",
  SIDEBAR = "sidebar",
  MIX = "mix"
}

/**
 * route的类型
 */
export enum RouteType {
  Menu,
  Page,
  Iframe
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
  sort?: number
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
  sort?: number
  [k: string]: any
}

export declare interface RouteMetaCustom extends RouteMeta {
  icon?: string
  title: string
  key: string
  type: RouteType
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
