import { useUserStoreHook } from "@/store/modules/user"
import { computed, unref } from "vue"
import { RouterSysType } from "@/constant/settings"
import { getCanShowRoute, getRouteMap } from "@/utils/menu-help"
import Cookies from "@/utils/storage/cookie"
import { storageSession } from "@/utils/storage"
import router, { resetRouter } from "@/router"
import config from "@/config"
import _ from "lodash"
import { UserInfo } from "@/model/sys/userModel"

export function useUserHook() {
  const userStore = useUserStoreHook()
  const routeList = computed((): RouterSysType[] => {
    return userStore.getRouteList
  })
  const showRouteList = computed(() => {
    return getCanShowRoute(unref(routeList))
  })

  const updateRouteList = function (routeList: RouterSysType[]) {
    userStore.updateRouteList(routeList)
  }

  const updatePermissions = function (permissions: string[]) {
    userStore.updatePermissions(permissions)
  }

  const routeMap = computed(() => {
    return getRouteMap(unref(routeList.value))
  })

  const getRouteByKey = (key: string): RouterSysType | undefined => {
    if (!key) return undefined
    return routeMap.value[key]
  }

  const logOutEvent = function () {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    storageSession.setItem(config.app.permissionName, [])
    resetRouter()
    updateRouteList([])
    updatePermissions([])
    router.replace({ name: config.app.loginPageName })
  }

  const updateAuth = function (
    routeList: RouterSysType[],
    permissions: string[]
  ) {
    userStore.updatePermissions(permissions)
    userStore.updateRouteList(routeList)
    router.options.isAddDynamicMenuRoutes = true
    storageSession.setItem(config.app.permissionName, permissions)
  }

  const updateUserInfo = function (userInfo: UserInfo) {
    userStore.updateUserInfo(userInfo)
  }

  const userInfo = computed(() => {
    return userStore.getUserInfo
  })

  return {
    routeList,
    showRouteList,
    routeMap,
    getRouteByKey,
    logOutEvent,
    updateAuth,
    updateUserInfo,
    userInfo,
    updateRouteList,
    updatePermissions
  }
}
