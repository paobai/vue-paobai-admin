import { useAppStoreHook} from "@/store/modules/app";
import { getUserHook } from './user'
import {defineComponent, computed, watchEffect, ref, unref, onMounted, watch} from 'vue'
import {RouterApiType} from "@/constant/settings";
import {fixRouteList, getFirstMenuItem} from "@/layout/components/sidebar/menu-help";

export function useAppHook(){
    const appStore = useAppStoreHook()

    const navbarShow = computed(() => {
        return appStore.getNavbarShow
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


    let nowFirstRouteKey =  function (){
        let { routerList } = getUserHook()
        let res = computed({
            get: () => [appStore.getNowFirstRouteKey],
            set: val => {
                updateNowFirstRouteKey(val)
            }
        })
        onMounted(() => {
            if (unref(routerList).length >0) res.value = unref(routerList)[0].key
        });
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

    let {routeList: routeSidebarList, menuChose } = function () {
        let { routerList: sourceRouterList } = getUserHook()
        let routeList = ref([] as RouterApiType[])
        let routeFixMap: { [key: string]: any } = {}
        watch([() => appStore.getNowFirstRouteKey,() => appStore.getNavbarShow], ([nowKey, navBarShow]) => {
            let dist: RouterApiType[] = []
            if (navBarShow) {
                let parentDist = sourceRouterList.value.filter(item => item.key === unref(nowKey))[0]
                if (parentDist) dist = parentDist.children || []
            } else {
                dist = sourceRouterList.value
            }
            routeList.value = dist || []
            routeFixMap = {}
            let routeFixArray = fixRouteList(unref(routeList))
            routeFixArray.forEach(item => {
                routeFixMap[item.key] = item
            })
            let findFirstMenu = getFirstMenuItem(unref(routeList))
            if (findFirstMenu) menuChoseKey.value = routeFixMap[findFirstMenu.key].parentKey.concat(findFirstMenu.key)
        }, {immediate: true})
        let menuChose = (key: string) => {
            let dist = routeFixMap[key].parentKey
            menuChoseKey.value = dist.concat(key)
        }
        return {routeList, menuChose}
    }()

    return {
        navbarShow,
        updateNavBar,
        updateRightSetting,
        showRightSetting,
        nowFirstRouteKey,
        menuChoseKey,
        routeSidebarList,
        menuChose
    }
}
