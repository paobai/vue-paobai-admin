import { postRequest, getRequest } from "@/utils/httpRequest"
import { AuthLoginByPasswordReq, AuthLoginRes, AuthRefreshToken } from "./model"
const groupPre = "/upms"
// 用户管理

export class AuthApi {
  // 用户登录
  static async login(data: AuthLoginByPasswordReq) {
    return postRequest<AuthLoginRes>(groupPre + "/users/login", data)
  }
  static async refreshToken(data: AuthRefreshToken) {
    return postRequest<AuthLoginRes>(groupPre + "/users/login", data)
  }
  // 获取用户可以访问菜单树
  static async getCurrentUserTree() {
    return getRequest(groupPre + "/users/current/menus")
  }
}
