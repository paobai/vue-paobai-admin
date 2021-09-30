/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 20:10:59
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const commonFiles = import.meta.globEager('./commonModules/*.ts')
let commonModules: Array<RouteRecordRaw> = []
Object.keys(commonFiles).forEach((key) => {
  if (key === './index.ts') return
  commonModules = commonModules.concat(commonFiles[key].default)
})
// const asyncFiles = import.meta.globEager('./permissionModules/*.ts')
// let permissionModules: Array<RouteRecordRaw> = []
// Object.keys(asyncFiles).forEach((key) => {
//   if (key === './index.ts') return
//   permissionModules = permissionModules.concat(asyncFiles[key] as RouteRecordRaw)
// })

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
  {
    path: '/',
    component: Layout,
    redirect: '/main',
    children: [
      {
        path: 'main',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/main.vue'),
        name: 'main',
        meta: {
          title: 'main',
          icon: '#icondashboard',
          affix: true
        }
      }
    ]
  },
  ...commonModules
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  // ...permissionModules
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
