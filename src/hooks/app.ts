import { useAppStoreHook} from "@/store/modules/app";
import { getUserHook } from './user'
import {computed, ref, unref, watch, onBeforeMount} from 'vue'
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
    // 顶部菜单不显示，则显示侧边菜单。
    const fixSidebarShow = computed(() => {
        return sidebarShow.value && !(nowFirstRoute.value && nowFirstRoute.value.type === RouteType.Page)
    })

    const updateNavbar = function (res: boolean) {
        appStore.updateNavbarShow(res)
    }

    const updateSidebar = function (res: boolean) {
        appStore.updateSidebarShow(res)
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

    const updateMenuChoseKey = function (menuChoseKey: string) {
        appStore.updateMenuChoseKey(menuChoseKey)
    }

    let menuChoseKey = computed({
        get: () => appStore.getMenuChoseKey,
        set: val => {
            updateMenuChoseKey(val)
        }
    })

    // 左边的routeList
    let {routeSidebarList, changeSideChose, getMenuByKey } = function () {
        let sourceRouteList = showRouteList
        let routeSidebarList = ref([] as RouterApiType[])
        let sideRouteMap: { [key: string]: any } = {}
        // 该方法有延迟。只能在sidebar点击中使用。
        let changeSideChose = (key: string) => {
            let dist = sideRouteMap[key]
            if (!dist) return
            menuChoseKey.value = key
        }
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
        return {routeSidebarList, changeSideChose, getMenuByKey}
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

    const initRouterMenuChose = function () {
        onBeforeMount(() => {
            let key = router.currentRoute.value.meta.key as string
            let dist = routerMap.value[key]
            if (!dist) return
            menuChoseKey.value = key
            updateNowFirstRouteKey(dist.parentKey![0] || dist.key)
        })
    }
    return {
        navbarShow,
        updateNavbar,
        updateSidebar,
        updateRightSetting,
        showRightSetting,
        nowFirstRouteKey,
        nowFirstRoute,
        fixSidebarShow,
        sidebarShow,
        menuChoseKey,
        routeSidebarList,
        routeNavbarList,
        changeSideChose,
        getMenuByKey,
        updateNowFirstRouteKey,
        initRouterMenuChose
    }
}
