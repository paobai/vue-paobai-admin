import { arcoPresetColors } from "@/plugins/arco"
import { MenuPositionEnum } from "@/enums/app"
export const clientId = "test"
export const clientSecret = "test"

// @ts-ignore
export const sysColorList = Object.values(arcoPresetColors).map(colorItem => colorItem.primary)
// 这里可以增加颜色
sysColorList.push("#23f1df")
sysColorList.push("#000000")

// layoutModeList
export const layoutModeList = [
  {
    value: "1",
    name: "混合模式",
    details: "混合模式。导航栏只显示第一级，侧边栏显示选中第一级菜单的子菜单，如果没有子菜单则不显示侧边栏比如首页。",
    menuPosition: MenuPositionEnum.MIX,
    navbarShow: true,
    sidebarShow: true
  },
  {
    value: "2",
    name: "不显示侧边栏模式",
    details: "不显示侧边栏模式。菜单都在导航栏，鼠标移入方式。",
    menuPosition: MenuPositionEnum.NAVBAR,
    navbarShow: true,
    sidebarShow: false
  },
  {
    value: "3",
    name: "不显示导航栏",
    details: "不显示导航栏。菜单只在侧边栏，树形排列。",
    menuPosition: MenuPositionEnum.SIDEBAR,
    navbarShow: false,
    sidebarShow: true
  },
  {
    value: "4",
    name: "混合模式+菜单只在侧边栏",
    details: "混合模式+菜单只在侧边栏。菜单只在侧边栏，树形排列。",
    menuPosition: MenuPositionEnum.SIDEBAR,
    navbarShow: true,
    sidebarShow: true
  }
]
