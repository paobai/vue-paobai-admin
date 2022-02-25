import { RouterOptions, RouteRecordRaw, Router } from "vue-router"

export declare interface MyRouterOptions extends RouterOptions {
  isAddDynamicMenuRoutes?: Boolean
}
export declare interface MyRouter extends Router {
  readonly options: MyRouterOptions
}

import Layout from "@/layout/Index.vue"
import {
  RouterSysType,
  RouterCustomType,
  RouteType,
  RouterApiType
} from "@/constant/settings"
import { buildMenuName } from "@/utils/menu-help"

/**
 * 判断当前路由类型,是否为全局路由
 * @param {*} route 当前路由
 * @param globalRoutes
 */
export function isGlobalRoute(
  route: RouteRecordRaw,
  globalRoutes: any = []
): any {
  let temp: any[] = []
  for (let i = 0; i < globalRoutes.length; i++) {
    if (route.name && route.name === globalRoutes[i].name) {
      return true
    } else if (
      globalRoutes[i].children &&
      globalRoutes[i].children.length >= 1
    ) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? isGlobalRoute(route, temp) : false
}

/**
 * 根据来源api结构改成要的样子
 * @param sourceApiData
 */
export function fixResToSys(sourceApiData: any): {
  permissions: string[]
  routers: RouterSysType[]
} {
  return {
    permissions: sourceApiData.permissions,
    routers: sourceApiData.routers
  }
}
/**
 * 处理route 增加信息
 * @param routeList
 * @param parentKey
 * @param parent
 */
export function fixRouteToSysType(
  routeList: RouterApiType[],
  parentKey: string[] = [],
  parent?: RouterSysType
): RouterSysType[] {
  const resList: RouterSysType[] = []
  routeList.forEach(item => {
    const resItem: RouterSysType = {
      ...item,
      routeName: buildMenuName(item),
      parentKey: parentKey
    } as RouterSysType
    if (!resItem.icon && parent) {
      resItem.icon = parent.icon
    }
    if (item.children) {
      fixRouteToSysType(item.children, parentKey.concat(item.key), resItem)
    }
    resList.push(resItem)
  })
  if (parent) parent.children = resList
  return resList
}

/**
 * 道路后增加routes
 * @param routes 需要加载的route
 * @param modulesRoutes 本地有哪些路由页面
 * @param router router
 */
export function addRouterFromData(
  routes: RouterSysType[],
  modulesRoutes: any,
  router: Router
) {
  if (!routes || routes.length === 0) return
  const inList: RouterCustomType[] = []
  routes.forEach(item => buildRoute(item, modulesRoutes, inList))
  const dist: RouteRecordRaw = {
    path: "/",
    component: Layout,
    redirect: "/main",
    children: inList
  }
  router.addRoute(dist)
  router.addRoute({
    path: "/:pathMatch(.*)",
    redirect: "/error/404"
  })
}

export function buildRoute(
  item: RouterSysType,
  modulesRoutes: any,
  inList: RouterCustomType[] = []
) {
  if (item.type === RouteType.Menu) {
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        buildRoute(child, modulesRoutes, inList)
      })
    }
    return
  }
  if (item.type === RouteType.Button) return
  let findModule = modulesRoutes["/src/views/common/wait-dev.vue"]
  let modulePath = item.path
  if (modulePath) {
    const componentPath = `/src/views${modulePath}.vue`
    findModule = modulesRoutes[componentPath] || findModule
  } else {
    modulePath = "temp-Path-" + item.key
  }
  inList.push({
    path: modulePath,
    name: item.routeName,
    component: findModule,
    meta: {
      icon: item.icon,
      title: item.title,
      key: item.key,
      type: item.type,
      notShow: item.notShow,
      parentKey: item.parentKey
    }
  })
}

export function buildRouteName(route: RouterSysType) {
  return route.title + "-" + route.key
}
