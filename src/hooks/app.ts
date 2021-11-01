import { useAppStoreHook} from "@/store/modules/app";
import { getUserHook } from './user'
import {defineComponent, computed, watchEffect, ref, unref, onMounted, watch, onBeforeMount} from 'vue'
import {RouterApiType, RouteType} from "@/constant/settings";
import {fixRouteList, getFirstMenuItem} from "@/utils/menu-help";
import router from '@/router/index'

export function useAppHook(){
    const appStore = useAppStoreHook()

    const navbarShow = computed(() => {
        return appStore.getNavbarShow
    })
    const showSideBar = computed(() => {
        return !(nowFirstRoute.value && nowFirstRoute.value.type === RouteType.Page)
    })

    const updateNavBar = function (res: boolean) {
        appStore.updateNavBarShow(res)
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
        let { routerList } = getUserHook()
        return routerList.value.find(route => route.key === nowFirstRouteKey.value)
    })

    let nowFirstRouteKey =  function (){
        let { routerList } = getUserHook()
        let res = computed({
            get: () => appStore.getNowFirstRouteKey,
            set: val => {
                updateNowFirstRouteKey(val)
            }
        })
        return res
    }()

    const updateMenuChoseKey = function (menuChoseKey: string[]) {
        appStore.updateMenuChoseKey(menuChoseKey)
    }

    let menuChoseKey = computed({
        get: () => appStore.getMenuChoseKey,
        set: val => {
            updateMenuChoseKey(val)
        }
    })

    // 左边的routeList
    let {routeList: routeSidebarList, changeSideChose, getMenuByKey } = function () {
        let { routerList: sourceRouterList } = getUserHook()
        let routeList = ref([] as RouterApiType[])
        let sideRouteMap: { [key: string]: any } = {}
        // 该方法有延迟。只能在sidebar点击中使用。
        let changeSideChose = (key: string) => {
            let dist = sideRouteMap[key]
            if (!dist) return
            menuChoseKey.value = dist.parentKey.concat(key)
        }
        let getMenuByKey = (key: string) => {
            return sideRouteMap[key]
        }
        watch([() => appStore.getNowFirstRouteKey,() => appStore.getNavbarShow], ([nowKey, navBarShow]) => {
            let dist: RouterApiType[] = []
            if (navBarShow) {
                let parentDist = sourceRouterList.value.filter(item => item.key === unref(nowKey))[0]
                if (parentDist) dist = parentDist.children || []
            } else {
                dist = sourceRouterList.value
            }
            routeList.value = dist || []
            sideRouteMap = {}
            let routeFixArray = fixRouteList(unref(routeList))
            routeFixArray.forEach(item => {
                sideRouteMap[item.key] = item
            })
        }, {immediate: true})
        return {routeList, changeSideChose, getMenuByKey}
    }()
    onBeforeMount(() => {
        let { routerList: sourceRouterList, routerMap } = getUserHook()
        let key = router.currentRoute.value.meta.key as string
        let dist = routerMap.value[key]
        if (!dist) return
        menuChoseKey.value = dist.parentKey!.concat(key)
        updateNowFirstRouteKey(dist.parentKey![0] || dist.key)
    })
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
        updateNowFirstRouteKey
    }
}
