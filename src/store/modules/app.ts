import { defineStore } from "pinia"
import { store } from "@/store"
import config from "@/config"
import { storageLocal, storageSession } from "@/utils/storage"
import { MenuPosition } from "@/constant/settings"

interface appStore {
  appTheme: "dark" | "light"
  layoutMode: string
  navbarShow: boolean
  sidebarShow: boolean
  menuPosition: MenuPosition
  sidebarMenuCollapsed: boolean
  rightSettingShow: boolean
  footerShow: boolean
  sysColor: string
  weakness: boolean
  gray: boolean
}
export const useAppStore = defineStore({
  id: "store-app",
  state: (): appStore => ({
    layoutMode: config.custom.layoutMode,
    appTheme: config.custom.appTheme,
    navbarShow: config.custom.navbarShow,
    sidebarShow: config.custom.sidebarShow,
    menuPosition: MenuPosition.MIX,
    sidebarMenuCollapsed: config.custom.sidebarMenuCollapsed,
    rightSettingShow: false,
    footerShow: config.custom.footerShow,
    sysColor: config.custom.sysColor,
    weakness: config.custom.weakness,
    gray: config.custom.gray
  }),
  getters: {
    getTheme(): string {
      return this.appTheme
    },
    getLayoutMode(): string {
      return this.layoutMode
    },
    getNavbarShow(): boolean {
      return this.navbarShow
    },
    getSidebarShow(): boolean {
      return this.sidebarShow
    },
    getMenuPosition(): MenuPosition {
      return this.menuPosition
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
    updateAppTheme(appTheme: "light" | "dark") {
      this.appTheme = appTheme
    },
    updateNavbarShow(navbarShow: boolean) {
      this.navbarShow = navbarShow
    },
    updateSidebarShow(sidebarShow: boolean) {
      this.sidebarShow = sidebarShow
    },
    updateMenuPosition(menuPosition: MenuPosition) {
      this.menuPosition = menuPosition
    },
    updateLayoutMode(layoutMode: string) {
      this.layoutMode = layoutMode
    },
    updateSidebarMenuCollapsed(sidebarMenuCollapsed: boolean) {
      this.sidebarMenuCollapsed = sidebarMenuCollapsed
    },
    updateRightSettingShow(rightSettingShow: boolean) {
      this.rightSettingShow = rightSettingShow
    },
    updateFooterShow(footerShow: boolean) {
      this.footerShow = footerShow
    },
    updateSysColor(sysColor: string) {
      this.sysColor = sysColor
    },
    updateWeakness(weakness: boolean) {
      this.weakness = weakness
    },
    updateGray(gray: boolean) {
      this.gray = gray
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "appStore",
        storage: storageLocal,
        paths: ["sidebarMenuCollapsed", "footerShow", "sysColor", "weakness", "gray", "layoutMode"]
      },
      {
        key: "appStore",
        storage: storageSession,
        paths: ["rightSettingShow"]
      }
    ]
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
