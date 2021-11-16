/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 20:10:59
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import {
  addRouterFromData,
  fixResToSys,
  fnCurrentRouteType,
  GetRouteStructure,
  MyRouter,
  MyRouterOptions
} from "@/router/routerHelp"
import Layout from "@/layout/index.vue"
import { getCurrentUserTree as getCurrentUserTreeApi } from "@/api/upms-api"
import { useUserStoreHook } from "@/store/modules/user"
import { getUserHook } from '@/hooks/user'
import Cookies from "js-cookie"
import {RouterApiType} from "@/constant/settings";
import config from '@/config'
import { storageSession } from "@/utils/storage";

const modulesRoutes = import.meta.glob("/src/views/**/*.vue")

const userStore = getUserHook()

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
        key: "main-1"
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
const sourceRouter: MyRouter = createRouter(routerOptions)

export function resetRouter() {
  (router as any).matcher = (sourceRouter as any).matcher // reset router
  router.options.isAddDynamicMenuRoutes = false
}

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (
    router.options.isAddDynamicMenuRoutes ||
    fnCurrentRouteType(to as any, commonModules) === "global"
  ) {
    next()
  } else {
    // TODO 获取路由
    const token = Cookies.get(config.tokenName)
    if (!token) {
      router.push({ name: "login" })
      next()
      return
    }
    getCurrentUserTreeApi()
      .then(res => {
        if (res.code === 1) {
          let {routers:newRoutes , permissions} = fixResToSys(res.data)
          userStore.loginEvent(newRoutes, permissions)
          addRouterFromData(newRoutes, modulesRoutes, router)
        }
        next({ ...to, replace: true })
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
