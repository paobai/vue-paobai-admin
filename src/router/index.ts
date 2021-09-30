/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 20:10:59
 */
import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'
import { MyRouterOptions, fnCurrentRouteType, fixMenu, MyRouter } from "@/router/routerConfig";
import Layout from '@/layout/Index.vue'
import { getCurrentUserTree as getCurrentUserTreeApi } from '@/api/upms-api'
import { useStore } from '@/store'
const store = useStore()

const commonFiles = import.meta.globEager('./commonModules/*.ts')
let commonModules: Array<RouteRecordRaw> = []
Object.keys(commonFiles).forEach((key) => {
  if (key === './index.ts') return
  commonModules = commonModules.concat(commonFiles[key].default)
})


// 主入口路由(需嵌套上左右整体布局)
const mainRoutes: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/main',
  children: [
    {
      path: '/main',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/main.vue'),
      name: 'main',
      meta: {
        title: 'main',
        icon: '#icondashboard',
        affix: true
      }
    }
  ]
}

export const constantRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import(/* webpackChunkName: "redirect" */ '@/views/index.vue')
  //     }
  //   ]
  // },
  mainRoutes,
  ...commonModules
]

const routerOptions: MyRouterOptions = {
  history: createWebHashHistory(),
  routes: constantRoutes,
  isAddDynamicMenuRoutes: false
}
const router:MyRouter = createRouter(routerOptions)

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  // debugger
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, commonModules) === 'global') {
    next()
  } else {
    getCurrentUserTreeApi().then((res) => {
      console.log(res)
      if (res && res.code === 0) {
        let menus = res.data
        let fixRes = fixMenu(menus)
        router.options.isAddDynamicMenuRoutes = true
        // let btPerms = fixRes.btPerms.map(item => item.menuKey)
        // store.commit('user/updateBtPerms', btPerms)
        sessionStorage.setItem('menuList', JSON.stringify(menus || '[]'))
        // sessionStorage.setItem('permissions', JSON.stringify(res.data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        // sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

export default router
