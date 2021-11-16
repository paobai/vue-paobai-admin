import { useAppStoreHook} from "@/store/modules/app";
import { getUserHook } from './user'
import {defineComponent, computed, watchEffect, ref, unref, onMounted, watch, onBeforeMount} from 'vue'
import {RouterApiType, RouteType} from "@/constant/settings";
import {fixRouteList, getFirstMenuItem} from "@/utils/menu-help";
import router from '@/router/index'
import { storageSession, storageLocal } from '@/utils/storage'
import config from "@/config";

export function useAppHook(){

    let { routeList, routerMap } = getUserHook()

    const appStore = useAppStoreHook()

    const navbarShow = computed(() => {
        return appStore.getNavbarShow
    })
    const showSideBar = computed(() => {
        return !(nowFirstRoute.value && nowFirstRoute.value.type === RouteType.Page)
    })

    const updateNavBar = function (res: boolean) {
        appStore.updateNavBarShow(res)
        storageLocal.setItem(config.NavBarShowKey, res)
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
        return routeList.value.find(route => route.key === nowFirstRouteKey.value)
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
        let sourceRouteList = routeList
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
        watch([() => appStore.getNowFirstRouteKey,() => appStore.getNavbarShow], ([nowKey, navBarShow]) => {
            let dist: RouterApiType[] = []
            if (navBarShow) {
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
        updateNavBar,
        updateRightSetting,
        showRightSetting,
        nowFirstRouteKey,
        nowFirstRoute,
        showSideBar,
        menuChoseKey,
        routeSidebarList,
        changeSideChose,
        getMenuByKey,
        updateNowFirstRouteKey,
        initRouterMenuChose
    }
}
