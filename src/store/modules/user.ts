import { defineStore } from "pinia";
import { store } from "@/store";
import {RouterApiType} from "@/constant/settings";


export const useUserStore = defineStore({
    id: "store-user",
    state: () => ({
        routeList : [] as RouterApiType[]
    }),
    getters: {
        getRouteList(): RouterApiType[] {
            return this.routeList
        }
    },
    actions: {
        updateRouteList (routeList: RouterApiType[]) {
            this.routeList = routeList
        }
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
