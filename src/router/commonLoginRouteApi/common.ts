import {RouterApiType, RouteType} from "@/constant/settings";
import Layout from "@/layout/index.vue";

const mainRoutesSource: RouterApiType[] = [
    {
        title: '首页',
        path: '/main',
        key: 'home-page',
        type: RouteType.Page,
        icon: 'iconfont-home-fill'
    },
    {
        path: "/redirect",
        title: "跳转页",
        key: 'redirect-page',
        type: RouteType.Page,
        notShow: true
    }
]
export default mainRoutesSource
