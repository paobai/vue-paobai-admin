import { useUserStoreHook} from "@/store/modules/user";
import {defineComponent, computed, watchEffect, ref, unref, watch} from 'vue'
import type { Ref } from 'vue'
import {RouterApiType} from "@/constant/settings";
import {fixRouteList, getFirstMenuItem} from "@/utils/menu-help";
import Cookies from "js-cookie"
import { storageSession, storageLocal } from '@/utils/storage'
import router, { resetRouter } from "@/router"
import {addRouterFromData} from "@/router/routerHelp";
import config from "@/config";
import _ from 'lodash'
export function getUserHook() {
    let userStore = useUserStoreHook()
    let routeList = computed((): RouterApiType[] => {
        return userStore.getRouteList
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
        // TODO: 重置store 状态
        // store.commit('resetStore')
        storageSession.setItem('permissions', [])
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
        routerMap,
        logOutEvent,
        loginEvent,
        updateRouteList,
        updatePermissions
    }
}
