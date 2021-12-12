import { RouterOptions, RouteRecordRaw, Router } from "vue-router"
import { isURL } from "@/utils/validate"

export declare interface MyRouterOptions extends RouterOptions {
  isAddDynamicMenuRoutes?: Boolean
}
export declare interface MyRouter extends Router {
  readonly options: MyRouterOptions
}

import Layout from "@/layout/Index.vue"
import {RouterApiType, RouterCustomType, RouteType} from "@/constant/settings";
import {fixRouteList} from "@/utils/menu-help";
import {storageSession} from "@/utils/storage";

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
export function fnAddDynamicMenuRoutes(
  menuList: any[] = [],
  routes: any[] = []
): any {
  let temp: any[] = []
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
      // 开头去掉/
      menuList[i].path = menuList[i].path.replace(/^\//, "")
      const route = {
        path: menuList[i].path,
        component: null,
        name: menuList[i].path,
        meta: {
          id: menuList[i].id,
          parentId: menuList[i].parentId,
          title: menuList[i].menuName,
          isDynamic: true,
          isTab: true,
          iframeUrl: ""
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].path)) {
        route["path"] = `i-${menuList[i].id}`
        route["name"] = `i-${menuList[i].id}`
        route["meta"]["iframeUrl"] = menuList[i].path
      } else {
        try {
          let distComponent = null
          // 先看直接目录有没有
          try {
            distComponent = import.meta.glob(`/src/views/${menuList[i].path}`)
          } catch (e) {}
          // 没有的话就去该目录的index文件看看有没有
          if (!distComponent)
            distComponent =
              import.meta.glob(`/src/views/${menuList[i].path}/index`) || null
          route["component"] = distComponent as any
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    return fnAddDynamicMenuRoutes(temp, routes)
  } else {
    return routes
  }
}

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
export function fixResToSys(sourceApiData: any): { permissions: string[], routers: RouterApiType[]} {
  return { permissions: sourceApiData.permissions, routers: sourceApiData.routers}
}
function fixMenuMainDo(menu: any, btPerms: any) {
  const newMenu: any[] = []
  menu.forEach((item: any) => {
    if (item.type === 2) {
      btPerms.push(item)
    } else {
      if (item.children && item.children.length > 0) {
        item.children = fixMenuMainDo(item.children, btPerms)
      }
      newMenu.push(item)
    }
  })
  return newMenu
}

/**
 * 把动态路由加载现存路由中
 * @param routes 路由列表
 * @param router 路由实例
 * @param mainRoutes 现存的动态路由（只包括首页）
 */
export function addRouterToMainRouter(
  routes: any,
  router: any,
  mainRoutes: any
) {
  mainRoutes.menuName = "main-dynamic"
  mainRoutes.children = mainRoutes.children.concat(routes)
  router.addRoutes([mainRoutes, { path: "*", redirect: { name: "404" } }])
  storageSession.setItem("dynamicMenuRoutes", mainRoutes.children || []);
}

export interface GetRouteStructure {
  path: string
  name: string
  component: any
  meta: object
  children?: GetRouteStructure[]
}

/**
 * 道路后增加routes
 * @param routes 需要加载的route
 * @param modulesRoutes 本地有哪些路由页面
 * @param router router
 */
export function addRouterFromData(
  routes: RouterApiType[],
  modulesRoutes: any,
  router: Router
) {
  if (!routes || routes.length === 0) return
  let inList:RouterCustomType[] = []
  routes.forEach(item => buildRoute(item, modulesRoutes, inList))
  let dist :RouteRecordRaw = {
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

export function buildRoute (
    item: RouterApiType,
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
  if (!item.path) return
  const componentPath = `/src/views${item.path}.vue`
  let findModule = modulesRoutes[componentPath]
  inList.push({
    path: item.path,
    name: buildRouteName(item),
    component: findModule,
    meta: {
      icon: item.icon,
      title: item.title,
      key: item.key,
      type: item.type,
      notShow: item.notShow
    }
  })
}

export function buildRouteName (route :RouterApiType) {
  return route.title + '-' + route.key
}
