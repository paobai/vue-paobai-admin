import { defineStore } from "pinia"
import { store } from "@/store"
import { RouterApiType } from "@/constant/settings"
import { UserInfo } from "@/model/sys/userModel"
import { storageLocal } from "@/utils/storage"
import config from "@/config"

interface userStore {
  userInfo: UserInfo
  routeList: RouterApiType[]
  permissions: string[]
}

export const useUserStore = defineStore({
  id: "store-user",
  state: (): userStore => ({
    userInfo: (storageLocal.getItem(config.app.userInfoKey) || {}) as UserInfo,
    routeList: [] as RouterApiType[],
    permissions: [] as string[]
  }),
  getters: {
    getRouteList(): RouterApiType[] {
      return this.routeList
    },
    getPermissions(): string[] {
      return this.permissions
    },
    getUserInfo(): UserInfo {
      return this.userInfo
    }
  },
  actions: {
    updateRouteList(routeList: RouterApiType[]) {
      this.routeList = routeList
    },
    updatePermissions(permissions: string[]) {
      this.permissions = permissions
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      storageLocal.setItem(config.app.userInfoKey, userInfo)
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
