import { defineStore } from "pinia";
import { store } from "@/store";
import config from "@/config";
import { storageSession, storageLocal } from '@/utils/storage'

export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
        nowFirstRouteKey : '',
        menuChoseKey: '',
        navbarShow: storageLocal.getItem(config.navbarShowKey) === null ? true : storageLocal.getItem(config.navbarShowKey),
        sidebarShow: storageLocal.getItem(config.sidebarShowKey) === null ? true : storageLocal.getItem(config.sidebarShowKey),
        rightSettingShow: false
    }),
    getters: {
        getNowFirstRouteKey (): string {
            return this.nowFirstRouteKey
        },
        getNavbarShow (): boolean {
            return this.navbarShow
        },
        getSidebarShow (): boolean {
            return this.sidebarShow
        },
        getRightSettingShow () : boolean{
            return this.rightSettingShow
        },
        getMenuChoseKey (): string {
            return this.menuChoseKey
        }
    },
    actions: {
        updateNowFirstRouteKey(nowFirstRouteKey: string) {
            this.nowFirstRouteKey = nowFirstRouteKey
        },
        updateNavbarShow (navbarShow: boolean) {
            this.navbarShow = navbarShow
            storageLocal.setItem(config.navbarShowKey, navbarShow)
        },
        updateSidebarShow (sidebarShow: boolean) {
            this.sidebarShow = sidebarShow
            storageLocal.setItem(config.sidebarShowKey, sidebarShow)
        },
        updateRightSettingShow (rightSettingShow: boolean) {
            this.rightSettingShow = rightSettingShow
        },
        updateMenuChoseKey (menuChoseKey: string) {
            return this.menuChoseKey = menuChoseKey
        }
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
