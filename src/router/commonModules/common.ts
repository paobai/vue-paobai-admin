/*
 * @Description: 用户管理相关路由管理
 * @Author: ZY
 * @Date: 2020-12-10 16:12:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 18:04:55
 */
import { RouteRecordRaw } from "vue-router"

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
    path: "/error/401",
    component: import(
      /* webpackChunkName: "error-page-401" */ "@/views/common/error-page/401.vue"
    ),
    // redirect: "noredirect",
    name: "Page401",
    meta: {
      title: "错误页面",
      icon: "#icon404"
    }
  },
  {
    path: "/error/404",
    component: import(
      /* webpackChunkName: "error-page-404" */ "@/views/common/error-page/404.vue"
    ),
    // redirect: "noredirect",
    name: "Page404",
    meta: {
      title: "找不到页面",
      icon: "#icon404"
    }
  }
]
export default UserManagerRouter
