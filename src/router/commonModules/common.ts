/*
 * @Description: 用户管理相关路由管理
 * @Author: ZY
 * @Date: 2020-12-10 16:12:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 18:04:55
 */
import { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue";

const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/common/login.vue"),
    meta: {
      title: "登录",
      icon: "#icondashboard"
    }
  },
  {
    path: "/error",
    component: Layout,
    redirect: "noredirect",
    meta: {
      title: "错误页面",
      icon: "#icon404"
    },
    children: [
      {
        path: "401",
        component: () =>
            import(
                /* webpackChunkName: "error-page-401" */ "@/views/error-page/401.vue"
                ),
        name: "Page401",
        meta: {
          title: "page401",
          noCache: true
        }
      },
      {
        path: "404",
        component: () =>
            import(
                /* webpackChunkName: "error-page-404" */ "@/views/error-page/404.vue"
                ),
        name: "Page404",
        meta: {
          title: "page404",
          noCache: true
        }
      }
    ]
  }
]
export default UserManagerRouter
