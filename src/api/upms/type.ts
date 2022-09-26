import type { RouterApiType } from "@/constant/settings"
import type { GrantTypeEnum } from "@/enums/app"
import type { UserInfo } from "@/model/sys/userModel"

export type AuthLoginByPasswordReq = {
  userName: string
  passWord: string
  client_id?: string
  client_secret?: string
  grant_type: GrantTypeEnum
}
export type AuthRefreshToken = {
  grant_type: GrantTypeEnum
  refresh_token: string
  client_id?: string
  client_secret?: string
}
export type AuthLoginRes = {
  access_token: string
  refresh_token: string
  userInfo: UserInfo
}

export type UserApiTypeUpdatePassword = {
  newPassword: string
  oldPassword: string
}

export namespace RoleApiType {
  export type roleItem = {
    id: AppIdType
    roleName: string
    roleCode: string
    description: string
  }
}

export namespace MenuApiType {
  export type get = RouterApiType[]
}
