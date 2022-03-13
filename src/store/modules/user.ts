import { defineStore } from "pinia"
import { store } from "@/store"
import { RouterSysType } from "@/constant/settings"
import { UserInfo } from "@/model/sys/userModel"
import { storageSession } from "@/utils/storage"

interface userStore {
  userInfo: UserInfo
  routeList: RouterSysType[]
  permissions: string[]
}

export const useUserStore = defineStore({
  id: "store-user",
  state: (): userStore => ({
    userInfo: {} as UserInfo,
    routeList: [] as RouterSysType[],
    permissions: [] as string[]
  }),
  getters: {
    getRouteList(): RouterSysType[] {
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
    updateRouteList(routeList: RouterSysType[]) {
      this.routeList = routeList
    },
    updatePermissions(permissions: string[]) {
      this.permissions = permissions
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "userStore",
        storage: storageSession,
        paths: ["userInfo", "routeList", "permissions"]
      }
    ]
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
