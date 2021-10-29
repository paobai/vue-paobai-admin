import { defineStore } from "pinia";
import { store } from "@/store";



export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
        nowFirstRouteKey : '',
        navBarShow: false
    }),
    getters: {
        getNowFirstRouteKey (): string {
            return this.nowFirstRouteKey
        },
        getNavbarShow (): boolean {
            return this.navBarShow
        }
    },
    actions: {
        updateNowFirstRouteKey(nowFirstRouteKey: string) {
            this.nowFirstRouteKey = nowFirstRouteKey
        },
        updateNavBarShow (navBarShow: boolean) {
            this.navBarShow = navBarShow
        }
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
