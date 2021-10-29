import { defineStore } from "pinia";
import { store } from "@/store";
import {RouterApiType} from "@/constant/settings";


export const useUserStore = defineStore({
    id: "store-user",
    state: () => ({
        permissions : [] as RouterApiType[]
    }),
    getters: {
        getPermissions(): RouterApiType[] {
            return this.permissions
        }
    },
    actions: {
        updatePermissions (permissions: RouterApiType[]) {
            this.permissions = permissions
        }
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
