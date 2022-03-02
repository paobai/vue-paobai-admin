import { defineStore } from "pinia"
import { store } from "@/store"
import config from "@/config"
import { storageLocal } from "@/utils/storage"

export const useAppStore = defineStore({
  id: "store-app",
  state: () => ({
    navbarShow: storageLocal.getItem(config.app.navbarShowKey) === null ? config.custom.navbarShow : storageLocal.getItem(config.app.navbarShowKey),
    sidebarShow: storageLocal.getItem(config.app.sidebarShowKey) === null ? config.custom.sidebarShow : storageLocal.getItem(config.app.sidebarShowKey),
    sidebarMenuCollapsed: storageLocal.getItem(config.app.sidebarMenuCollapsedKey) === null ? config.custom.sidebarMenuCollapsed : storageLocal.getItem(config.app.sidebarMenuCollapsedKey),
    rightSettingShow: false,
    footerShow: storageLocal.getItem(config.app.footerShowKey) === null ? config.custom.footerShow : storageLocal.getItem(config.app.footerShowKey),
    sysColor: storageLocal.getItem(config.app.sysColorKey) === null ? config.custom.sysColor : storageLocal.getItem(config.app.sysColorKey),
    weakness: storageLocal.getItem(config.app.weaknessKey) === null ? config.custom.weakness : storageLocal.getItem(config.app.weaknessKey),
    gray: storageLocal.getItem(config.app.grayKey) === null ? config.custom.gray : storageLocal.getItem(config.app.grayKey)
  }),
  getters: {
    getNavbarShow(): boolean {
      return this.navbarShow
    },
    getSidebarShow(): boolean {
      return this.sidebarShow
    },
    getSidebarMenuCollapsed(): boolean {
      return this.sidebarMenuCollapsed
    },
    getRightSettingShow(): boolean {
      return this.rightSettingShow
    },
    getSysColor(): string {
      return this.sysColor
    },
    getFooterShow(): boolean {
      return this.footerShow
    },
    getWeakness(): boolean {
      return this.weakness
    },
    getGray(): boolean {
      return this.gray
    }
  },
  actions: {
    updateNavbarShow(navbarShow: boolean) {
      this.navbarShow = navbarShow
      storageLocal.setItem(config.app.navbarShowKey, navbarShow)
    },
    updateSidebarShow(sidebarShow: boolean) {
      this.sidebarShow = sidebarShow
      storageLocal.setItem(config.app.sidebarShowKey, sidebarShow)
    },
    updateSidebarMenuCollapsed(sidebarMenuCollapsed: boolean) {
      this.sidebarMenuCollapsed = sidebarMenuCollapsed
      storageLocal.setItem(config.app.sidebarMenuCollapsedKey, sidebarMenuCollapsed)
    },
    updateRightSettingShow(rightSettingShow: boolean) {
      this.rightSettingShow = rightSettingShow
    },
    updateFooterShow(footerShow: boolean) {
      this.footerShow = footerShow
      storageLocal.setItem(config.app.footerShowKey, footerShow)
    },
    updateSysColor(sysColor: string) {
      this.sysColor = sysColor
      storageLocal.setItem(config.app.sysColorKey, sysColor)
    },
    updateWeakness(weakness: boolean) {
      this.weakness = weakness
      storageLocal.setItem(config.app.weaknessKey, weakness)
    },
    updateGray(gray: boolean) {
      this.gray = gray
      storageLocal.setItem(config.app.grayKey, gray)
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
