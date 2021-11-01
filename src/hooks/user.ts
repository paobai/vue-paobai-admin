import { useUserStoreHook} from "@/store/modules/user";
import {defineComponent, computed, watchEffect, ref, unref} from 'vue'
import {RouterApiType} from "@/constant/settings";
export function getUserHook() {
    let userStore = useUserStoreHook()
    const routerList = computed((): RouterApiType[] => {
        return userStore.getRouteList
    })

    return{
        routerList
    }
}
