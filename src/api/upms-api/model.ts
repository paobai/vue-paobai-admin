import {UserInfo} from "@/model/sys/userModel";
import { grantType } from '@/constant'

// 用户管理
export type AuthLoginByPasswordReq = {
    userName: string,
    passWord: string,
    client_id?: string,
    client_secret?: string,
    grant_type: grantType
}
export type AuthRefreshToken = {
    grant_type: grantType,
    refresh_token: string,
    client_id?: string,
    client_secret?: string
}
export type AuthLoginRes = {
    access_token: string,
    refresh_token: string,
    userInfo: UserInfo
}
