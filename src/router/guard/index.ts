import { setRouteEmitter } from "@/utils/route-listener"
import NProgress from "nprogress"
import { addRouterFromData, fixResToSys, fixRouteToSysType, isGlobalRoute, sortRouteSys } from "@/router/routerHelp"
import type { MyRouter } from "@/router/routerHelp"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
import { AuthApi } from "@/api/auth-api"
import { useUserHook } from "@/hooks/user"
import mainRoutesSource from "@/router/commonLoginRoute/common"
import { constantRoutes } from "@/router"

NProgress.configure({ showSpinner: false }) // NProgress Configuration
function setupPageGuard(router: MyRouter) {
  router.beforeEach(async to => {
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: MyRouter) {
  const modulesRoutes = import.meta.glob("/src/views/**/*.vue")
  setupPageGuard(router)
  router.beforeEach((to, from, next) => {
    NProgress.start()
    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储
    if (router.options.isAddDynamicMenuRoutes || isGlobalRoute(to as any, constantRoutes)) {
      NProgress.done()
      next()
    } else {
      const token = Cookies.get(config.app.tokenName)
      if (!token) {
        NProgress.done()
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
        .finally(() => {
          NProgress.done()
        })
    }
  })
}
