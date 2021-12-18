import { useUserStoreHook} from "@/store/modules/user";
import {defineComponent, computed, watchEffect, ref, unref, watch} from 'vue'
import type { Ref } from 'vue'
import {RouterApiType} from "@/constant/settings";
import {fixRouteList, getCanShowRoute, getFirstMenuItem} from "@/utils/menu-help";
import Cookies from "js-cookie"
import { storageSession } from '@/utils/storage'
import router, { resetRouter } from "@/router"
import config from "@/config";
import _ from 'lodash'
export function getUserHook() {
    let userStore = useUserStoreHook()
    let routeList = computed((): RouterApiType[] => {
        return userStore.getRouteList
    })
    const showRouteList = computed(() => {
        return getCanShowRoute(unref(routeList))
    })

    const updateRouteList =  function (routeList: RouterApiType[]) {
        userStore.updateRouteList(routeList)
    }

    const updatePermissions =  function (permissions: string[]) {
        userStore.updatePermissions(permissions)
    }

    const routerMap = computed(() => {
        let routeFixMap:{[key: string]: RouterApiType} = {}
        let routeFixArray = fixRouteList(_.cloneDeep(unref(routeList.value)))
        routeFixArray.forEach(item => {
            routeFixMap[item.key] = item
        })
        return routeFixMap
    })
    const logOutEvent = function () {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        storageSession.setItem(config.permissionName, [])
        resetRouter()
        updateRouteList([])
        updatePermissions([])
        router.replace({name: config.loginPageName})
    }

    const loginEvent = function (routeList: RouterApiType[], permissions: string[]){
        userStore.updatePermissions(permissions)
        userStore.updateRouteList(routeList)
        router.options.isAddDynamicMenuRoutes = true
        storageSession.setItem(config.permissionName, permissions)
    }

    return{
        routeList,
        showRouteList,
        routerMap,
        logOutEvent,
        loginEvent,
        updateRouteList,
        updatePermissions
    }
}
