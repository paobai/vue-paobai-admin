import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import type { MyRouter, MyRouterOptions } from "@/router/routerHelp"
import createRouteGuard from "./guard"

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

createRouteGuard(router)

export default router
