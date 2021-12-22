import {UserInfo} from "@/model/sys/userModel";

// 用户管理
export type AuthLoginReq = {
    userName: string,
    passWord: string
}
export type AuthLoginRes = {
    access_token: string,
    refresh_token: string,
    userInfo: UserInfo
}