import { arcoDefaultColorName, arcoPresetColors } from "@/plugins/arco"
import { getAppEnvConfig } from "@/utils"
const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()
export interface CustomConfig {
  appTheme: "light" | "dark"
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
  htmlTitle: VITE_GLOB_APP_TITLE,
  navbarShow: true,
  sidebarShow: true,
  sidebarMenuCollapsed: false,
  footerShow: false,
  sysColor: arcoPresetColors[arcoDefaultColorName].primary,
  weakness: false,
  gray: false
}

export default customConfig
