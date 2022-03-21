import { arcoPresetColors } from "@/plugins/arco"
import { MenuPosition } from "@/constant/settings"
export enum grantType {
  PASSWORD = "password",
  REFRESH_TOKEN = "refresh_token"
}
export const clientId = "test"
export const clientSecret = "test"

// @ts-ignore
export const sysColorList = Object.values(arcoPresetColors).map(colorItem => colorItem.primary)
// 这里可以增加颜色
sysColorList.push("#000000")

// layoutModeList
export const layoutModeList = [
  { value: "1", name: "混合模式", menuPosition: MenuPosition.MIX, navbarShow: true, sidebarShow: true },
  { value: "2", name: "不显示侧边栏模式", menuPosition: MenuPosition.NAVBAR, navbarShow: true, sidebarShow: false },
  { value: "3", name: "不显示导航栏", menuPosition: MenuPosition.SIDEBAR, navbarShow: false, sidebarShow: true },
  { value: "4", name: "混合模式+菜单只在侧边栏", menuPosition: MenuPosition.SIDEBAR, navbarShow: true, sidebarShow: true }
]
