import { RouterSysType, RouteType } from "@/constant/settings"
import { buildRouteName } from "@/router/routerHelp"
import config from "@/config"

const mainRoutesSource: RouterSysType[] = [
  {
    title: "首页",
    path: config.app.homePagePath,
    key: "home-page",
    type: RouteType.Page,
    icon: "iconfont-home-fill",
    routeName: ""
  }
  // {
  //   path: "/common/redirect",
  //   title: "跳转页",
  //   key: "redirect-page",
  //   type: RouteType.Page,
  //   notShow: true,
  //   routeName: ""
  // }
]
mainRoutesSource.forEach(item => {
  item.routeName = buildRouteName(item)
})
export default mainRoutesSource
