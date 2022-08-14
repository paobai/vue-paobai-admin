import { RouteType } from "@/constant/settings"
import type { RouterApiType } from "@/constant/settings"
import { fixRouteToSysType } from "@/router/routerHelp"
import config from "@/config"

const mainRoutesSource: RouterApiType[] = [
  {
    title: "首页",
    path: config.app.homePagePath,
    key: "home-page",
    type: RouteType.Page,
    icon: "iconfont-home-fill",
    sort: 1
  }
]
export default fixRouteToSysType(mainRoutesSource)
