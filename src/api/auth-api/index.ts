import { postRequest, getRequest } from "@/utils/httpRequest"
import * as ApiType from "./type"
export * from "./type"
import { RouterApiType } from "@/constant/settings"
import { UserInfo } from "@/model/sys/userModel"
const groupPre = "/upms"
// 用户管理

export class AuthApi {
  // 用户登录
  static async login(data: ApiType.AuthLoginByPasswordReq) {
    return postRequest<ApiType.AuthLoginRes>(groupPre + "/users/login", data)
  }
  static async refreshToken(data: ApiType.AuthRefreshToken) {
    return postRequest<ApiType.AuthLoginRes>(groupPre + "/users/login", data)
  }
  // 获取用户可以访问菜单树
  static async getCurrentUserTree() {
    return getRequest<{ routers: RouterApiType[]; permissions: string[] }>(groupPre + "/users/current/menus")
  }
  static async getUserInfo() {
    return getRequest<UserInfo>(groupPre + "/userInfo")
  }
}
