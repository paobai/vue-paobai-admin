/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 20:10:59
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import {
  buildRouter,
  fixMenu,
  fnCurrentRouteType,
  GetRouteStructure,
  MyRouter,
  MyRouterOptions
} from "@/router/routerHelp"
import Layout from "@/layout/index.vue"
import { getCurrentUserTree as getCurrentUserTreeApi } from "@/api/upms-api"
import { useUserStoreHook } from "@/store/modules/user"
import Cookies from "js-cookie"
import {RouterApiType} from "@/constant/settings";

const modulesRoutes = import.meta.glob("/src/views/*/*.vue")

const store = useUserStoreHook()

const commonFiles = import.meta.globEager("./commonModules/*.ts")
let commonModules: Array<RouteRecordRaw> = []
Object.keys(commonFiles).forEach(key => {
  if (key === "./index.ts") return
  commonModules = commonModules.concat(commonFiles[key].default)
})

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes: RouteRecordRaw = {
  path: "/",
  component: Layout,
  redirect: "/main",
  children: [
    {
      path: "/main",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "@/views/main.vue"),
      name: "main",
      meta: {
        title: "main",
        icon: "#icondashboard",
        affix: true
      }
    }
  ]
}

export const constantRoutes: Array<RouteRecordRaw> = [
  mainRoutes,
  ...commonModules
]

const routerOptions: MyRouterOptions = {
  history: createWebHashHistory(),
  routes: constantRoutes,
  isAddDynamicMenuRoutes: false
}
const router: MyRouter = createRouter(routerOptions)
router.addRoute({
  path: "/:pathMatch(.*)",
  redirect: "/error/404"
})

export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  // debugger
  if (
    router.options.isAddDynamicMenuRoutes ||
    fnCurrentRouteType(to as any, commonModules) === "global"
  ) {
    next()
  } else {
    // TODO 获取路由
    const token = Cookies.get("access_token")
    if (!token) {
      router.push({ name: "login" })
      next()
      return
    }
    getCurrentUserTreeApi()
      .then(res => {
        if (res.code === 1) {
          const newRoute: Array<RouterApiType> = res.data as any
          // newRoute.forEach(item => {
          //   buildRouter(item, modulesRoutes, router)
          // })
          store.updatePermissions(newRoute)
        }
        next()
      })
      .catch(e => {
        console.log(
          `%c${e} 请求菜单列表和权限失败，跳转至登录页！！`,
          "color:blue"
        )
        router.push({ name: "login" })
      })
  }
})

export default router
