import { useAppStoreWithOut } from "@/store/modules/app"
import { useUserHook } from "./user"
import { computed, onMounted, ref, unref, watch } from "vue"
import { MenuPositionEnum, RouteEnum } from "@/enums/app"
import type { RouterSysType } from "@/constant/settings"
import { getRouteMap } from "@/utils/menu-help"
import type { RouteLocationNormalized } from "vue-router"
import { changeArcoPrimaryColor, toggleClass } from "@/utils"
import { toggleTheme as toggleArcoTheme } from "@/plugins/arco"
import config from "@/config"
import { layoutModeList } from "@/constant"
import { listenerRouteChange } from "@/utils/route-listener"

export function useAppHook() {
  const { showRouteList, getRouteByKey } = useUserHook()

  const appStore = useAppStoreWithOut()

  const darkAppTheme = computed<boolean>({
    get: () => appStore.getTheme === "dark",
    set: val => updateAppTheme(val)
  })

  const updateAppTheme = function (dark: boolean) {
    if (dark) appStore.updateAppTheme("dark")
    else appStore.updateAppTheme("light")
    toggleArcoTheme(dark)
  }

  const toggleAppTheme = function () {
    updateAppTheme(!darkAppTheme.value)
  }

  const navbarShow = computed({
    get: () => appStore.getNavbarShow,
    set: val => {
      updateNavbar(val)
    }
  })

  const layoutMode = computed({
    get: () => appStore.layoutMode,
    set: val => {
      updateLayoutModel(val)
    }
  })

  const updateLayoutModel = function (layoutModel: string) {
    const findFix = layoutModeList.find(e => e.value === layoutModel) || layoutModeList[0]
    updateMenuPositionEnum(findFix.menuPosition)
    updateSidebar(findFix.sidebarShow)
    updateNavbar(findFix.navbarShow)
    appStore.updateLayoutMode(layoutModel)
  }

  const menuPosition = computed({
    get: () => appStore.getMenuPositionEnum,
    set: val => {
      updateMenuPositionEnum(val)
    }
  })

  const updateMenuPositionEnum = function (menuPosition: MenuPositionEnum) {
    appStore.updateMenuPositionEnum(menuPosition)
  }

  const navbarMenuShow = computed(() => {
    return menuPosition.value !== MenuPositionEnum.SIDEBAR
  })

  const sidebarMenuShow = computed(() => {
    return menuPosition.value !== MenuPositionEnum.NAVBAR
  })

  const updateNavbar = function (res: boolean) {
    appStore.updateNavbarShow(res)
  }

  const sidebarShow = computed({
    get: () => appStore.getSidebarShow,
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
    get: () => appStore.getFooterShow,
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
    changeArcoPrimaryColor(color, darkAppTheme.value)
  }

  // 改变theme也会改变颜色
  watch([() => unref(darkAppTheme)], ([darkAppTheme]) => {
    changeArcoPrimaryColor(sysColor.value, darkAppTheme)
  })

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
    get: () => appStore.getGray,
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
    if (menuPosition.value === MenuPositionEnum.SIDEBAR) return true
    if (navbarShow.value && nowFirstRoute.value && nowFirstRoute.value.type !== RouteEnum.Menu) {
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

  const nowMenuKey = ref("")

  // 当router发生变化会触发mitt事件，改变nowMenuKey。
  listenerRouteChange((route: RouteLocationNormalized) => {
    nowMenuKey.value = route.meta.key as string
  }, true)

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
      [() => unref(nowFirstRouteKey), () => unref(menuPosition)],
      ([nowKey, menuPosition]) => {
        let dist: RouterSysType[] = []
        // mix情况左部需要为所选的子集
        if (menuPosition === MenuPositionEnum.MIX) {
          const parentDist = sourceRouteList.value.filter(item => item.key === unref(nowKey))[0]
          if (parentDist) dist = parentDist.children || []
        } else {
          // 其他情况都返回就好
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

  const getAppTagList = () => {
    return appStore.appTagList
  }

  const initSys = () => {
    return onMounted(() => {
      updateLayoutModel(layoutMode.value)
      updateAppTheme(darkAppTheme.value)
      updateSysColor(sysColor.value)
      updateWeakness(weakness.value)
      updateGray(gray.value)
    })
  }

  return {
    layoutMode,
    updateLayoutModel,
    navbarMenuShow,
    sidebarMenuShow,
    darkAppTheme,
    updateAppTheme,
    toggleAppTheme,
    navbarShow,
    updateNavbar,
    updateSidebar,
    collapse,
    updateCollapse,
    updateRightSetting,
    menuPosition,
    updateMenuPositionEnum,
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
    initSys,
    getAppTagList
  }
}
export default useAppHook
