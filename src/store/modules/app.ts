import { defineStore } from "pinia";
import { store } from "@/store";



export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
    }),
    getters: {
    },
    actions: {
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
