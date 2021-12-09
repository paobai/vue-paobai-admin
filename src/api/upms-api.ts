import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from "@/utils/httpRequest"
import Layout from "@/layout/index.vue"
import {RouteType} from "@/constant/settings";
let groupPre = "/upms"
// 用户管理
export class AuthApi {
  // 用户登录
  static async login (data) {
    return postRequest(groupPre + '/users/login', data)
  }
  // 获取用户可以访问菜单树
  static async getCurrentUserTree() {
    return getRequest(groupPre + '/users/current/menus')
  }
}