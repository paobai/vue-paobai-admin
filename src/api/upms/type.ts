import type { RouterApiType } from "@/constant/settings"
import type { grantType } from "@/constant"
import type { UserInfo } from "@/model/sys/userModel"

export type AuthLoginByPasswordReq = {
  userName: string
  passWord: string
  client_id?: string
  client_secret?: string
  grant_type: grantType
}
export type AuthRefreshToken = {
  grant_type: grantType
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

export namespace ResourceApiType {
  export type resourceItem = {
    groupId: AppIdType
    id: AppIdType
    lockFlag: boolean
    permissionCode: string
    resourceName: string
    sort?: number
  }
  export type resourceGroupItem = {
    children: resourceItem[]
    groupId: AppIdType
    groupName: string
  }
}

export namespace MenuApiType {
  export type get = RouterApiType[]
}
