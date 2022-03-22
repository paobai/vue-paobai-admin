import { arcoDefaultColorName, arcoPresetColors } from "@/plugins/arco"
import { getAppEnvConfig } from "@/utils"
import { layoutModeList } from "@/constant"
const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()
export interface CustomConfig {
  appTheme: "light" | "dark"
  layoutMode: string
  htmlTitle: string
  navbarShow: boolean
  sidebarShow: boolean
  sidebarMenuCollapsed: boolean
  footerShow: boolean
  sysColor: string
  weakness: boolean
  gray: boolean
}

const customConfig: CustomConfig = {
  appTheme: "light",
  layoutMode: layoutModeList[0].value,
  htmlTitle: VITE_GLOB_APP_TITLE,
  navbarShow: true,
  sidebarShow: true,
  sidebarMenuCollapsed: false,
  footerShow: true,
  sysColor: arcoPresetColors[arcoDefaultColorName].primary,
  weakness: false,
  gray: false
}

export default customConfig
