import { useUserStoreHook } from "@/store/modules/user"
import { computed, unref } from "vue"
import { RouterApiType } from "@/constant/settings"
import { getCanShowRoute, getRouteMap } from "@/utils/menu-help"
import Cookies from "@/utils/storage/cookie"
import { storageSession } from "@/utils/storage"
import router, { resetRouter } from "@/router"
import config from "@/config"
import _ from "lodash"
import { UserInfo } from "@/model/sys/userModel"

export function useUserHook() {
  const userStore = useUserStoreHook()
  const routeList = computed((): RouterApiType[] => {
    return userStore.getRouteList
  })
  const showRouteList = computed(() => {
    return getCanShowRoute(unref(routeList))
  })

  const updateRouteList = function (routeList: RouterApiType[]) {
    userStore.updateRouteList(routeList)
  }

  const updatePermissions = function (permissions: string[]) {
    userStore.updatePermissions(permissions)
  }

  const routerMap = computed(() => {
    return getRouteMap(unref(routeList.value))
  })
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
    routeList: RouterApiType[],
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
    routerMap,
    logOutEvent,
    updateAuth,
    updateUserInfo,
    userInfo,
    updateRouteList,
    updatePermissions
  }
}
