/*
 * @Description: 用户管理相关路由管理
 * @Author: ZY
 * @Date: 2020-12-10 16:12:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 18:04:55
 */
import type { RouteRecordRaw } from "vue-router"

const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/common/login/login.vue"),
    meta: {
      title: "登录",
      icon: "#icondashboard"
    }
  },
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("@/views/common/redirect.vue"),
    meta: {
      title: "跳转页",
      icon: "#icondashboard"
    }
  },
  {
    path: "/error/401",
    component: () => import("@/views/common/error-page/401.vue"),
    name: "Page401",
    meta: {
      title: "错误页面",
      icon: "#icon404"
    }
  },
  {
    path: "/error/404",
    component: () => import("@/views/common/error-page/404.vue"),
    name: "Page404",
    meta: {
      title: "找不到页面",
      icon: "#icon404"
    }
  }
]
export default UserManagerRouter
