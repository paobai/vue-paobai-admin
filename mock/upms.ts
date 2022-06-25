import { MockMethod } from "vite-plugin-mock"
import { RouteType } from "@/constant/settings"
import { failResponseWrap, successResponseWrap } from "@/utils/mock"

const urlPre = "/upms"
const paobaiUserInfo = {
  userId: 1,
  userName: "paobai",
  realName: "泡白",
  passWord: "paobai",
  token: "paobaiToken",
  roles: ["admin"]
}
const testUserInfo = {
  userId: 2,
  userName: "test",
  realName: "测试用户",
  passWord: "test",
  token: "testToken",
  roles: []
}
function getUserId(request: any) {
  return request.headers["paobai-id"] && request.headers["paobai-id"].includes(testUserInfo.token)
    ? testUserInfo.userId
    : paobaiUserInfo.userId
}

export default [
  {
    url: urlPre + "/users/current/menus",
    method: "get",
    response: (request: any) => {
      const commonRouters = [
        {
          title: "Arco Design Pro",
          path: "",
          key: "menu-header-1",
          type: RouteType.Menu,
          icon: "iconfont-store-fill",
          sort: 2,
          children: [
            {
              key: "workplace",
              title: "工作台",
              type: RouteType.Page,
              icon: "iconfont-apparel",
              path: "/dashboard/workplace/index"
            },
            {
              key: "monitor",
              title: "实时监控",
              type: RouteType.Page,
              path: "/dashboard/monitor/index"
            },
            {
              key: "visualization",
              title: "分析数据可视化",
              type: RouteType.Menu,
              icon: "iconfont-integral",
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
            },
            {
              title: "其他页面",
              path: "http://vue-pro.arco.design/",
              key: "arco-design-pro",
              icon: "iconfont-homepage-ads-fill",
              type: RouteType.Iframe
            }
          ]
        },
        {
          title: "多菜单",
          path: "",
          key: "menu-multi",
          icon: "iconfont-all-fill",
          type: RouteType.Menu,
          children: [
            {
              key: "1",
              title: "menu1",
              type: RouteType.Page,
              path: "/test-router/menu1"
            },
            {
              key: "2",
              title: "menu2",
              type: RouteType.Menu,
              children: [
                {
                  key: "2_1",
                  title: "menu2-1",
                  type: RouteType.Page,
                  path: "/test-router/menu2/menu2-1"
                },
                {
                  key: "2_2",
                  title: "menu2-2",
                  type: RouteType.Page,
                  path: "/test-router/menu2/menu2-2"
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
                  title: "menu3-1",
                  type: RouteType.Menu,
                  children: [
                    {
                      key: "3_1_1",
                      title: "menu3-1-1",
                      type: RouteType.Page,
                      path: "/test-router/menu3/menu3-1/menu3-1-1"
                    },
                    {
                      key: "3_2_2",
                      title: "menu3-1-2",
                      type: RouteType.Page,
                      path: "/test-router/menu3/menu3-1/menu3-1-2"
                    }
                  ]
                },
                {
                  key: "3_2",
                  title: "menu3-2",
                  type: RouteType.Page,
                  path: "/test-router/menu3/menu3-2"
                },
                {
                  key: "3_3",
                  title: "menu3-3",
                  type: RouteType.Page,
                  path: "/test-router/menu3/menu3-3"
                }
              ]
            },
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
            }
          ]
        },
        {
          title: "单页面",
          path: "/test-router/single-page",
          key: "menu-single",
          icon: "iconfont-homepage-ads-fill",
          type: RouteType.Page
        },
        {
          title: "Iframe页面",
          path: "https://arco.design/vue/docs/pro/start",
          key: "menu-iframe",
          icon: "iconfont-homepage-ads-fill",
          type: RouteType.Iframe
        },
        {
          title: "用户设置",
          path: "",
          key: "menu-user-setting",
          icon: "iconfont-set1",
          type: RouteType.Menu,
          children: [
            {
              title: "权限设置",
              path: "/user-setting/authority-setting/index",
              key: "authority-setting",
              type: RouteType.Page,
              icon: "iconfont-fencengpeizhi"
            },
            {
              title: "低权限页面",
              key: "authority-setting-low-power-page",
              type: RouteType.Page,
              icon: "iconfont-component"
            }
          ]
        }
      ]
      const data = {
        routers: commonRouters,
        permissions: ["low-power-button"]
      }
      if (getUserId(request) === paobaiUserInfo.userId) {
        data.routers[4].children.push({
          title: "高权限页面",
          key: "authority-setting-high-power-page",
          type: RouteType.Page,
          icon: "iconfont-component"
        })
        data.permissions.push("high-power-button")
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
      const res = {
        access_token: ""
      }
      if (data.userName === paobaiUserInfo.userName && data.passWord === paobaiUserInfo.passWord) {
        res.access_token = paobaiUserInfo.token
      } else if (data.userName === testUserInfo.userName && data.passWord === testUserInfo.passWord) {
        res.access_token = testUserInfo.token
      } else {
        return failResponseWrap(null, "错误账号或者密码")
      }
      return successResponseWrap(res)
    }
  },
  {
    url: urlPre + "/userInfo",
    method: "get",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    response: (request: any) => {
      const res = {
        userId: paobaiUserInfo.userId,
        username: paobaiUserInfo.userName,
        realName: paobaiUserInfo.realName,
        avatar: "./images/avatar.jpg",
        roles: paobaiUserInfo.roles,
        request: request
      }
      if (getUserId(request) === testUserInfo.userId) {
        res.realName = testUserInfo.realName
        res.username = testUserInfo.userName
        res.roles = testUserInfo.roles
        res.userId = testUserInfo.userId
      }
      return successResponseWrap(res)
    }
  }
] as MockMethod[]
