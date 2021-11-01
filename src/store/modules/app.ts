import { defineStore } from "pinia";
import { store } from "@/store";



export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
        nowFirstRouteKey : '',
        menuChoseKey: [''],
        navBarShow: true,
        rightSettingShow: false
    }),
    getters: {
        getNowFirstRouteKey (): string {
            return this.nowFirstRouteKey
        },
        getNavbarShow (): boolean {
            return this.navBarShow
        },
        getRightSettingShow () : boolean{
            return this.rightSettingShow
        },
        getMenuChoseKey () {
            return this.menuChoseKey
        }
    },
    actions: {
        updateNowFirstRouteKey(nowFirstRouteKey: string) {
            this.nowFirstRouteKey = nowFirstRouteKey
        },
        updateNavBarShow (navBarShow: boolean) {
            this.navBarShow = navBarShow
        },
        updateRightSettingShow (rightSettingShow: boolean) {
            this.rightSettingShow = rightSettingShow
        },
        updateMenuChoseKey (menuChoseKey: string[]) {
            return this.menuChoseKey = menuChoseKey
        }
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
