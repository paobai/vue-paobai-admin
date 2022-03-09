import { MockMethod } from "vite-plugin-mock"
import { RouteType } from "@/constant/settings"
import { successResponseWrap, failResponseWrap } from "@/utils/mock"

const urlPre = "/upms"

export default [
  {
    url: urlPre + "/users/current/menus",
    method: "get",
    response: () => {
      const data = {
        routers: [
          {
            title: "Arco Design Pro",
            path: "",
            key: "menu-header-1",
            type: RouteType.Menu,
            icon: "iconfont-store-fill",
            children: [
              {
                key: "dashboard",
                title: "仪表盘",
                type: RouteType.Menu,
                children: [
                  {
                    key: "workplace",
                    title: "工作台",
                    type: RouteType.Page,
                    path: "/dashboard/workplace/index"
                  },
                  {
                    key: "monitor",
                    title: "实时监控",
                    type: RouteType.Page,
                    path: "/dashboard/monitor/index"
                  }
                ]
              },
              {
                key: "visualization",
                title: "分析数据可视化",
                type: RouteType.Menu,
                children: [
                  {
                    key: "data-analysis",
                    title: "数据分析",
                    type: RouteType.Page,
                    path: "/visualization/data-analysis/index"
                  },
                  {
                    key: "multi-dimension-data-analysis",
                    title: "多维数据分析",
                    type: RouteType.Page,
                    path: "/visualization/multi-dimension-data-analysis/index"
                  }
                ]
              }
            ]
          },
          {
            title: "菜单二",
            path: "",
            key: "menu-header-2",
            icon: "iconfont-cecurity-protection-fill",
            type: RouteType.Menu,
            children: [
              {
                key: "cd2-3_1",
                title: "菜单2的页面1",
                type: RouteType.Page,
                path: ""
              },
              {
                key: "cd2-3_2",
                title: "菜单2的页面2",
                type: RouteType.Page,
                path: ""
              },
              {
                key: "1",
                title: "menu1",
                type: RouteType.Page,
                path: "/test-router/path1"
              },
              {
                key: "2",
                title: "menu2",
                type: RouteType.Menu,
                children: [
                  {
                    key: "2_1",
                    title: "menu2_1",
                    type: RouteType.Page,
                    path: "/test-router/menu2/path2"
                  },
                  {
                    key: "2_2",
                    title: "menu2_2",
                    type: RouteType.Page,
                    path: "/test-router/menu2/path3"
                  }
                ]
              },
              {
                key: "3",
                title: "menu3",
                type: RouteType.Menu,
                children: [
                  {
                    key: "3_1",
                    title: "menu3_1",
                    type: RouteType.Page,
                    path: "/test-router/menu3/menu3"
                  },
                  {
                    key: "3_2",
                    title: "menu3",
                    type: RouteType.Menu,
                    children: [
                      {
                        key: "3_2_1",
                        title: "menu3_1_1",
                        type: RouteType.Page,
                        path: "/test-router/menu3/menu3/menu3-1"
                      },
                      {
                        key: "3_2_2",
                        title: "menu3_1_2",
                        type: RouteType.Page,
                        path: "/test-router/menu3/menu3/menu3-2"
                      }
                    ]
                  },
                  {
                    key: "3_3",
                    title: "menu3_3",
                    type: RouteType.Page,
                    path: "/test-router/menu3/menu3-3"
                  }
                ]
              }
            ]
          },
          {
            title: "菜单三",
            path: "",
            key: "menu-header-3",
            icon: "iconfont-Customermanagement-fill",
            type: RouteType.Page
          },
          {
            title: "菜单四",
            path: "",
            key: "menu-header-4",
            type: RouteType.Page,
            icon: "iconfont-set1"
          }
        ],
        permissions: []
      }
      return successResponseWrap(data)
    }
  },
  {
    url: urlPre + "/users/login",
    method: "post",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    response: (request: any) => {
      const data = request.body
      if (data.userName !== "paobai" || data.passWord !== "paobai") {
        return failResponseWrap(null, "错误账号或者密码")
      }
      const res = {
        access_token: "123123",
        userInfo: {
          userId: 1,
          username: "paobai",
          realName: "泡白",
          avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
          roles: ["admin"]
        }
      }
      return successResponseWrap(res)
    }
  }
] as MockMethod[]
