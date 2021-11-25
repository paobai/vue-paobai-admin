import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import {
  addRouterFromData,
  fixResToSys,
  isGlobalRoute,
  MyRouter,
  MyRouterOptions
} from "@/router/routerHelp"
import { getCurrentUserTree as getCurrentUserTreeApi } from "@/api/upms-api"
import { getUserHook } from '@/hooks/user'
import Cookies from "js-cookie"
import config from '@/config'
import mainRoutesSource from './commonLoginRouteApi/common'

const modulesRoutes = import.meta.glob("/src/views/**/*.vue")

const userStore = getUserHook()

const commonFiles = import.meta.globEager("./commonModules/*.ts")
let commonModules: Array<RouteRecordRaw> = []
Object.keys(commonFiles).forEach(key => {
  if (key === "./index.ts") return
  commonModules = commonModules.concat(commonFiles[key].default)
})

export const constantRoutes: Array<RouteRecordRaw> = [
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
    isGlobalRoute(to as any, commonModules)
  ) {
    next()
  } else {
    // TODO 获取路由
    const token = Cookies.get(config.tokenName)
    if (!token) {
      router.push({ name: "login" })
      return
    }
    getCurrentUserTreeApi()
      .then(res => {
        if (res.code === 1) {
          let {routers:newRoutes , permissions} = fixResToSys(res.data)
          // 加入了登录之后的默认route
          let addCommonRoutes = [...mainRoutesSource, ...newRoutes]
          userStore.loginEvent(addCommonRoutes, permissions)
          addRouterFromData(addCommonRoutes, modulesRoutes, router)
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
