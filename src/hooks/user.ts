import { useUserStoreHook} from "@/store/modules/user";
import {defineComponent, computed, watchEffect, ref, unref} from 'vue'
import {RouterApiType} from "@/constant/settings";
import {fixRouteList, getFirstMenuItem} from "@/utils/menu-help";
export function getUserHook() {
    let userStore = useUserStoreHook()
    let routeList = computed((): RouterApiType[] => {
        return userStore.getRouteList
    })

    const routerMap = computed(() => {
        let routeFixMap:{[key: string]: RouterApiType} = {}
        let routeFixArray = fixRouteList(unref(routeList.value))
        routeFixArray.forEach(item => {
            routeFixMap[item.key] = item
        })
        return routeFixMap
    })

    return{
        routeList,
        routerMap
    }
}
