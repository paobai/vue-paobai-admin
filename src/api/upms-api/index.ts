import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from "@/utils/httpRequest"
import {AuthLoginReq, AuthLoginRes} from "./model";
let groupPre = "/upms"
// 用户管理

export class AuthApi {
  // 用户登录
  static async login (data: AuthLoginReq) {
    return postRequest<AuthLoginRes>(groupPre + '/users/login', data)
  }
  // 获取用户可以访问菜单树
  static async getCurrentUserTree() {
    return getRequest(groupPre + '/users/current/menus')
  }
}