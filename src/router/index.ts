import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import {
  addRouterFromData,
  fixResToSys,
  isGlobalRoute,
  fixRouteToSysType,
  sortRouteSys,
  MyRouter,
  MyRouterOptions
} from "@/router/routerHelp"
import { AuthApi } from "@/api/auth-api"
import { useUserHook } from "@/hooks/user"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
import mainRoutesSource from "./commonLoginRoute/common"

const modulesRoutes = import.meta.glob("/src/views/**/*.vue")

const commonFiles = import.meta.globEager("./commonModules/*.ts")
let commonModules: Array<RouteRecordRaw> = []
Object.keys(commonFiles).forEach(key => {
  if (key === "./index.ts") return
  commonModules = commonModules.concat(commonFiles[key].default)
})

export const constantRoutes: Array<RouteRecordRaw> = [...commonModules]

const routerOptions: MyRouterOptions = {
  history: createWebHashHistory(),
  routes: constantRoutes,
  isAddDynamicMenuRoutes: false
}
const router: MyRouter = createRouter(routerOptions)
const sourceRouter: MyRouter = createRouter(routerOptions)

export function resetRouter() {
  ;(router as any).matcher = (sourceRouter as any).matcher // reset router
  router.options.isAddDynamicMenuRoutes = false
}

export function clearRouter() {
  ;(router as any).matcher = [] // reset router
  router.options.isAddDynamicMenuRoutes = false
}

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || isGlobalRoute(to as any, constantRoutes)) {
    next()
  } else {
    // TODO 获取路由
    const token = Cookies.get(config.app.tokenName)
    if (!token) {
      router.push({ name: "login" })
      return
    }
    AuthApi.getCurrentUserTree()
      .then(res => {
        const userStore = useUserHook()
        const { routers: newRoutes, permissions } = fixResToSys(res.data)
        // mainRoutesSource为加入了登录之后的默认route
        // 改变为内部系统使用的sysRouteType
        // 如果后台做了排序那么这个处理可以省略
        const finalSysRoutes = sortRouteSys([...mainRoutesSource, ...fixRouteToSysType(newRoutes)])
        // 设置该参数为判断获取过动态路由
        router.options.isAddDynamicMenuRoutes = true
        userStore.updateAuth(finalSysRoutes, permissions)
        // clearRouter()
        addRouterFromData(finalSysRoutes, modulesRoutes, router)
        next({ ...to, replace: true })
      })
      .catch(e => {
        console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, "color:blue")
        router.push({ name: "login" })
      })
  }
})

export default router
