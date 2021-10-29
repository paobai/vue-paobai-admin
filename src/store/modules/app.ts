import { defineStore } from "pinia";
import { store } from "@/store";



export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
        nowFirstRouteKey : '',
        navBarShow: true,
        showRightSetting: false
    }),
    getters: {
        getNowFirstRouteKey (): string {
            return this.nowFirstRouteKey
        },
        getNavbarShow (): boolean {
            return this.navBarShow
        },
        getShowRightSetting () : boolean{
            return this.showRightSetting
        }
    },
    actions: {
        updateNowFirstRouteKey(nowFirstRouteKey: string) {
            this.nowFirstRouteKey = nowFirstRouteKey
        },
        updateNavBarShow (navBarShow: boolean) {
            this.navBarShow = navBarShow
        },
        updateShowRightSetting (showRightSetting: boolean) {
            this.showRightSetting = showRightSetting
        }
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
