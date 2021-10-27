import { defineStore } from "pinia";
import { store } from "@/store";


export const useUserStore = defineStore({
    id: "store-user",
    state: () => ({
        permissions: []
    }),
    getters: {
    },
    actions: {
        updatePermissions (permissions) {
            this.permissions = permissions
        }
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
