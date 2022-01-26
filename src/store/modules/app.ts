import { defineStore } from "pinia";
import { store } from "@/store";
import config from "@/config";
import { storageSession, storageLocal } from '@/utils/storage'

export const useAppStore = defineStore({
    id: "store-app",
    state: () => ({
        navbarShow: storageLocal.getItem(config.app.navbarShowKey) === null ? config.custom.navbarShow : storageLocal.getItem(config.app.navbarShowKey),
        sidebarShow: storageLocal.getItem(config.app.sidebarShowKey) === null ? config.custom.sidebarShow : storageLocal.getItem(config.app.sidebarShowKey),
        sidebarMenuCollapsed :storageLocal.getItem(config.app.sidebarMenuCollapsedKey) === null ? config.custom.sidebarMenuCollapsed : storageLocal.getItem(config.app.sidebarMenuCollapsedKey),
        rightSettingShow: false,
        sysColor: storageLocal.getItem(config.app.sysColorKey) === null ? config.custom.sysColor : storageLocal.getItem(config.app.sysColorKey)
    }),
    getters: {
        getNavbarShow (): boolean {
            return this.navbarShow
        },
        getSidebarShow (): boolean {
            return this.sidebarShow
        },
        getSidebarMenuCollapsed (): boolean {
            return this.sidebarMenuCollapsed
        },
        getRightSettingShow () : boolean{
            return this.rightSettingShow
        },
        getSysColor () : string {
            return this.sysColor
        }
    },
    actions: {
        updateNavbarShow (navbarShow: boolean) {
            this.navbarShow = navbarShow
            storageLocal.setItem(config.app.navbarShowKey, navbarShow)
        },
        updateSidebarShow (sidebarShow: boolean) {
            this.sidebarShow = sidebarShow
            storageLocal.setItem(config.app.sidebarShowKey, sidebarShow)
        },
        updateSidebarMenuCollapsed (sidebarMenuCollapsed: boolean) {
            this.sidebarMenuCollapsed = sidebarMenuCollapsed
            storageLocal.setItem(config.app.sidebarMenuCollapsedKey, sidebarMenuCollapsed)
        },
        updateRightSettingShow (rightSettingShow: boolean) {
            this.rightSettingShow = rightSettingShow
        },
        updateSysColor(sysColor: string) {
            this.sysColor = sysColor
            storageLocal.setItem(config.app.sysColorKey, sysColor)
        }
    }
});

export function useAppStoreHook() {
    return useAppStore(store);
}
