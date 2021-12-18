import { useAppStoreHook} from "@/store/modules/app";
import { getUserHook } from './user'
import {computed, ref, unref, watch, onBeforeMount, watchEffect} from 'vue'
import {RouterApiType, RouteType} from "@/constant/settings";
import {fixRouteList} from "@/utils/menu-help";
import router from '@/router/index'

export function useAppHook(){

    let { showRouteList, routerMap } = getUserHook()

    const appStore = useAppStoreHook()

    const navbarShow = computed(() => {
        return appStore.getNavbarShow
    })

    const sidebarShow = computed(() => {
        return appStore.getSidebarShow
    })

    const collapse = computed({
        get: () => appStore.getSidebarMenuCollapsed,
        set: val => {
            updateCollapse(val)
        }
    })

    const fixSidebarShow = computed(() => {
        // nav显示 同时选择的第一个为page ，则侧边栏为空，所以应该隐藏
        if (navbarShow.value && (nowFirstRoute.value && nowFirstRoute.value.type === RouteType.Page)) {
            return false
        }
        return sidebarShow.value
    })

    const updateNavbar = function (res: boolean) {
        appStore.updateNavbarShow(res)
    }

    const updateSidebar = function (res: boolean) {
        appStore.updateSidebarShow(res)
    }

    const updateCollapse = function (res: boolean) {
        appStore.updateSidebarMenuCollapsed(res)
    }

    const updateRightSetting = function (res: boolean) {
        appStore.updateRightSettingShow(res)
    }
    const showRightSetting = computed(() => {
        return appStore.getRightSettingShow
    })
    const updateNowFirstRouteKey = function (nowFirstRouteKey: string) {
        appStore.updateNowFirstRouteKey(nowFirstRouteKey)
    }

    const nowFirstRoute = computed(() => {
        return showRouteList.value.find(route => route.key === nowFirstRouteKey.value)
    })

    let nowFirstRouteKey =  computed({
        get: () => appStore.getNowFirstRouteKey,
        set: val => {
            updateNowFirstRouteKey(val)
        }
    })



    // 左边的routeList
    let {routeSidebarList, getMenuByKey } = function () {
        let sourceRouteList = showRouteList
        let routeSidebarList = ref([] as RouterApiType[])
        let sideRouteMap: { [key: string]: any } = {}
        let getMenuByKey = (key: string) => {
            return sideRouteMap[key]
        }
        watch([() => unref(nowFirstRouteKey
        ),() => unref(navbarShow)], ([nowKey, navbarShow]) => {
            let dist: RouterApiType[] = []
            if (navbarShow) {
                let parentDist = sourceRouteList.value.filter(item => item.key === unref(nowKey))[0]
                if (parentDist) dist = parentDist.children || []
            } else {
                dist = sourceRouteList.value
            }
            routeSidebarList.value = dist || []
            sideRouteMap = {}
            let routeFixArray = fixRouteList(unref(routeSidebarList))
            routeFixArray.forEach(item => {
                sideRouteMap[item.key] = item
            })
        }, {immediate: true})
        return {routeSidebarList, getMenuByKey}
    }()

    const routeNavbarList = computed(() => {
        let dist: RouterApiType[] = []
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
        getMenuByKey,
        updateNowFirstRouteKey,
    }
}
