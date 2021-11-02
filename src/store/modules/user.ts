import { defineStore } from "pinia";
import { store } from "@/store";
import {RouterApiType} from "@/constant/settings";


export const useUserStore = defineStore({
    id: "store-user",
    state: () => ({
        routeList : [] as RouterApiType[],
        permissions: [] as string[]
    }),
    getters: {
        getRouteList(): RouterApiType[] {
            return this.routeList
        },
        getPermissions (): string[] {
            return this.permissions
        }
    },
    actions: {
        updateRouteList (routeList: RouterApiType[]) {
            this.routeList = routeList
        },
        updatePermissions (permissions: string[]) {
            this.permissions = permissions
        }
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
