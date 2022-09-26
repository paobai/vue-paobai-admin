import { RouteEnum } from "@/enums/app"
import type { RouterApiType } from "@/constant/settings"
import { fixRouteToSysType } from "@/router/routerHelp"
import config from "@/config"

/**
 * 登录之后可以获取的共用页面
 */
const mainRoutesSource: RouterApiType[] = [
  {
    id: "home-page",
    title: "首页",
    path: config.app.homePagePath,
    key: "home-page",
    type: RouteEnum.Page,
    icon: "iconfont-home-fill",
    sort: 1
  }
]
export default fixRouteToSysType(mainRoutesSource)
