import { useAppStoreHook } from "@/store/modules/app"
import { useUserHook } from "./user"
import { computed, onMounted, ref, unref, watch } from "vue"
import { RouterSysType, RouteType } from "@/constant/settings"
import { getRouteMap } from "@/utils/menu-help"
import { useRoute } from "vue-router"
import { changeArcoPrimaryColor, toggleClass } from "@/utils"
import config from "@/config"

export function useAppHook() {
  const { showRouteList, getRouteByKey } = useUserHook()

  const appStore = useAppStoreHook()

  const route = useRoute()

  const navbarShow = computed({
    get: () => appStore.navbarShow,
    set: val => {
      updateNavbar(val)
    }
  })

  const updateNavbar = function (res: boolean) {
    appStore.updateNavbarShow(res)
  }

  const sidebarShow = computed({
    get: () => appStore.sidebarShow,
    set: val => {
      updateSidebar(val)
    }
  })

  const updateCollapse = function (res: boolean) {
    appStore.updateSidebarMenuCollapsed(res)
  }

  const collapse = computed({
    get: () => appStore.getSidebarMenuCollapsed,
    set: val => {
      updateCollapse(val)
    }
  })

  const footerShow = computed({
    get: () => appStore.footerShow,
    set: val => {
      updateFooterShow(val)
    }
  })

  const updateFooterShow = (footerShow: boolean) => {
    appStore.updateFooterShow(footerShow)
  }

  const sysColor = computed({
    get: () => appStore.getSysColor,
    set: (color: string) => {
      updateSysColor(color)
    }
  })

  const updateSysColor = (color: string) => {
    appStore.updateSysColor(color)
    changeArcoPrimaryColor(color)
  }

  const weakness = computed({
    get: () => appStore.getWeakness,
    set: (weakness: boolean) => {
      updateWeakness(weakness)
    }
  })

  const updateWeakness = (weakness: boolean) => {
    appStore.updateWeakness(weakness)
    toggleClass(document.body, config.app.weaknessKey, weakness)
  }

  const gray = computed({
    get: () => appStore.gray,
    set: (gray: boolean) => {
      updateGray(gray)
    }
  })

  const updateGray = (gray: boolean) => {
    appStore.updateGray(gray)
    toggleClass(document.body, config.app.grayKey, gray)
  }

  const fixSidebarShow = computed(() => {
    // nav显示 同时选择的第一个为page ，则侧边栏为空，所以应该隐藏
    if (
      navbarShow.value &&
      nowFirstRoute.value &&
      nowFirstRoute.value.type === RouteType.Page
    ) {
      return false
    }
    return sidebarShow.value
  })

  const updateSidebar = function (res: boolean) {
    appStore.updateSidebarShow(res)
  }

  const updateRightSetting = function (res: boolean) {
    appStore.updateRightSettingShow(res)
  }
  const showRightSetting = computed(() => {
    return appStore.getRightSettingShow
  })

  const nowMenuKey = computed(() => {
    return route.meta.key as string
  })

  const nowMenu = computed(() => {
    return getRouteByKey(nowMenuKey.value)
  })

  const nowFirstRoute = computed(() => {
    return getRouteByKey(nowFirstRouteKey.value!)
  })

  const nowFirstRouteKey = computed(() => {
    const nowMenuUnRef = unref(nowMenu)
    if (!nowMenuUnRef || nowMenuUnRef.notShow) return
    if (!nowMenuUnRef.parentKey || !nowMenuUnRef.parentKey[0]) {
      return nowMenuUnRef.key
    } else {
      return nowMenuUnRef.parentKey[0]
    }
  })

  // 左边的routeList
  const { routeSidebarList, getSideRouteByKey } = (function () {
    const sourceRouteList = showRouteList
    const routeSidebarList = ref([] as RouterSysType[])
    let sideRouteMap: { [key: string]: any } = {}
    const getSideRouteByKey = (key: string) => {
      return sideRouteMap[key]
    }
    watch(
      [() => unref(nowFirstRouteKey), () => unref(navbarShow)],
      ([nowKey, navbarShow]) => {
        let dist: RouterSysType[] = []
        // navbar显示 sidebar route情况
        if (navbarShow) {
          const parentDist = sourceRouteList.value.filter(
            item => item.key === unref(nowKey)
          )[0]
          if (parentDist) dist = parentDist.children || []
        } else {
          // 顶部不显示 sidebar route情况
          dist = sourceRouteList.value
        }
        routeSidebarList.value = dist || []
        sideRouteMap = getRouteMap(unref(routeSidebarList))
      },
      { immediate: true }
    )
    return { routeSidebarList, getSideRouteByKey }
  })()

  const routeNavbarList = computed(() => {
    let dist: RouterSysType[] = []
    if (sidebarShow.value) {
      unref(showRouteList).forEach(item => {
        dist.push({
          ...item,
          children: []
        })
      })
    } else {
      dist = unref(showRouteList)
    }
    return dist
  })

  const initSys = () => {
    return onMounted(() => {
      updateSysColor(sysColor.value)
      updateWeakness(weakness.value)
      updateGray(gray.value)
    })
  }

  return {
    navbarShow,
    updateNavbar,
    updateSidebar,
    collapse,
    updateCollapse,
    updateRightSetting,
    showRightSetting,
    nowFirstRouteKey,
    nowFirstRoute,
    fixSidebarShow,
    sidebarShow,
    routeSidebarList,
    routeNavbarList,
    getSideRouteByKey,
    nowMenuKey,
    nowMenu,
    updateSysColor,
    sysColor,
    footerShow,
    updateFooterShow,
    weakness,
    gray,
    initSys
  }
}
