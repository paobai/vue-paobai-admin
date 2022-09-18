import { useUserStoreWithOut } from "@/store/modules/user"
import { computed, onBeforeMount, unref } from "vue"
import type { RouterSysType } from "@/constant/settings"
import { getCanShowRoute, getRouteMap } from "@/utils/menu-help"
import Cookies from "@/utils/storage/cookie"
import { UserApi } from "@/api/upms"
import router, { resetRouter } from "@/router"
import config from "@/config"
import type { UserInfo } from "@/model/sys/userModel"

export function useUserHook() {
  const userStore = useUserStoreWithOut()
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

  const logoutEvent = function () {
    Cookies.remove(config.app.tokenName)
    Cookies.remove(config.app.refreshTokenName)
    resetRouter()
    updateUserInfo({} as UserInfo)
    updateRouteList([])
    updatePermissions([])
    router.replace({ name: config.app.loginPageName })
  }

  const updateAuth = function (routeList: RouterSysType[], permissions: string[]) {
    userStore.updatePermissions(permissions)
    userStore.updateRouteList(routeList)
  }

  const updateUserInfo = function (userInfo: UserInfo) {
    userStore.updateUserInfo(userInfo)
  }

  const userInfo = computed(() => {
    return userStore.getUserInfo
  })

  const initUser = () => {
    onBeforeMount(() => {
      UserApi.getCurrentUserInfo().then(res => {
        updateUserInfo(res.data)
      })
    })
  }

  return {
    routeList,
    showRouteList,
    routeMap,
    getRouteByKey,
    logoutEvent,
    updateAuth,
    updateUserInfo,
    userInfo,
    updateRouteList,
    updatePermissions,
    initUser
  }
}
