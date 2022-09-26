import type { MockMethod } from "vite-plugin-mock"
import type { RouterApiType } from "@/constant/settings"
import { RouteEnum } from "@/enums/app"
import { failResponseWrap, successResponseWrap } from "./help"
import { cloneDeep } from "lodash"
import type { MockRequestType } from "./help"

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
  realName: "默认用户",
  passWord: "test",
  token: "testToken",
  roles: ["user"]
}

const roleList = [
  {
    id: 1,
    roleName: "高级管理员",
    roleCode: "admin",
    description: "高级管理员",
    routerKeys: [] as AppIdType[]
  },
  {
    id: 2,
    roleName: "默认用户",
    roleCode: "user",
    description: "默认用户",
    routerKeys: [] as AppIdType[]
  }
]

function getUserId(request: MockRequestType) {
  return request.headers["paobai-id"] && request.headers["paobai-id"].includes(testUserInfo.token)
    ? testUserInfo.userId
    : paobaiUserInfo.userId
}

const routersConfigPre: any[] = [
  {
    title: "Arco Design Pro",
    path: "",
    key: "menu-header-1",
    type: RouteEnum.Menu,
    icon: "iconfont-store-fill",
    sort: 2,
    children: [
      {
        key: "workplace",
        title: "工作台",
        type: RouteEnum.Page,
        icon: "iconfont-apparel",
        path: "/dashboard/workplace/index"
      },
      {
        key: "monitor",
        title: "实时监控",
        type: RouteEnum.Page,
        path: "/dashboard/monitor/index"
      },
      {
        key: "visualization",
        title: "分析数据可视化",
        type: RouteEnum.Menu,
        icon: "iconfont-integral",
        children: [
          {
            key: "data-analysis",
            title: "数据分析",
            type: RouteEnum.Page,
            path: "/visualization/data-analysis/index"
          },
          {
            key: "multi-dimension-data-analysis",
            title: "多维数据分析",
            type: RouteEnum.Page,
            path: "/visualization/multi-dimension-data-analysis/index"
          }
        ]
      },
      {
        title: "其他页面",
        path: "http://vue-pro.arco.design/",
        key: "arco-design-pro",
        icon: "iconfont-homepage-ads-fill",
        type: RouteEnum.Iframe
      }
    ]
  },
  {
    title: "多菜单",
    path: "",
    key: "menu-multi",
    icon: "iconfont-all-fill",
    type: RouteEnum.Menu,
    children: [
      {
        key: "1",
        title: "menu1",
        type: RouteEnum.Page,
        path: "/test-router/menu1"
      },
      {
        key: "2",
        title: "menu2",
        type: RouteEnum.Menu,
        children: [
          {
            key: "2_1",
            title: "menu2-1",
            type: RouteEnum.Page,
            path: "/test-router/menu2/menu2-1"
          },
          {
            key: "2_2",
            title: "menu2-2",
            type: RouteEnum.Page,
            path: "/test-router/menu2/menu2-2"
          }
        ]
      },
      {
        key: "3",
        title: "menu3",
        type: RouteEnum.Menu,
        children: [
          {
            key: "3_1",
            title: "menu3-1",
            type: RouteEnum.Menu,
            children: [
              {
                key: "3_1_1",
                title: "menu3-1-1",
                type: RouteEnum.Page,
                path: "/test-router/menu3/menu3-1/menu3-1-1"
              },
              {
                key: "3_2_2",
                title: "menu3-1-2",
                type: RouteEnum.Page,
                path: "/test-router/menu3/menu3-1/menu3-1-2"
              }
            ]
          },
          {
            key: "3_2",
            title: "menu3-2",
            type: RouteEnum.Page,
            path: "/test-router/menu3/menu3-2"
          },
          {
            key: "3_3",
            title: "menu3-3",
            type: RouteEnum.Page,
            path: "/test-router/menu3/menu3-3"
          }
        ]
      },
      {
        key: "cd2-3_1",
        title: "菜单2的页面1",
        type: RouteEnum.Page,
        path: ""
      },
      {
        key: "cd2-3_2",
        title: "菜单2的页面2",
        type: RouteEnum.Page,
        path: ""
      }
    ]
  },
  {
    title: "单页面",
    path: "/test-router/single-page",
    key: "menu-single",
    icon: "iconfont-homepage-ads-fill",
    type: RouteEnum.Page
  },
  {
    title: "Iframe页面",
    path: "https://arco.design/vue/docs/pro/start",
    key: "menu-iframe",
    icon: "iconfont-homepage-ads-fill",
    type: RouteEnum.Iframe
  },
  {
    title: "系统设置",
    path: "",
    key: "menu-system-setting",
    icon: "iconfont-set1",
    type: RouteEnum.Menu,
    children: [
      {
        title: "权限设置",
        path: "/system/authority-setting/index",
        key: "authority-setting",
        type: RouteEnum.Page,
        icon: "iconfont-fencengpeizhi",
        children: [
          {
            title: "低权限按钮",
            path: "",
            key: "low-permission-button",
            type: RouteEnum.Button,
            icon: ""
          },
          {
            title: "高权限按钮",
            path: "",
            key: "high-permission-button",
            type: RouteEnum.Button,
            icon: ""
          }
        ]
      },
      {
        title: "角色管理",
        path: "/system/role",
        key: "system-role",
        type: RouteEnum.Page
      },
      {
        title: "菜单管理",
        path: "/system/menu",
        key: "system-menu",
        type: RouteEnum.Page
      },
      {
        title: "低权限页面",
        path: "/system/authority-setting/low-permission",
        key: "authority-setting-low-permission-page",
        type: RouteEnum.Page,
        icon: "iconfont-component"
      },
      {
        title: "高权限页面",
        path: "/system/authority-setting/high-permission",
        key: "authority-setting-high-permission-page",
        type: RouteEnum.Page,
        icon: "iconfont-component"
      }
    ]
  }
]
const routerIdMap = new Map<AppIdType, RouterApiType>()
const routerKeyMap = new Map<AppIdType, RouterApiType>()

let idStart = 1
function fixSourceRouterConfig(routersConfig: RouterApiType[], parent?: RouterApiType): RouterApiType[] {
  routersConfig.forEach(e => {
    e.id = idStart++
    routerIdMap.set(e.id, e)
    routerKeyMap.set(e.key, e)
    if (parent) {
      e.parentKey = parent.key
      e.parentTitle = parent.title
    }
    if (e.children) {
      fixSourceRouterConfig(e.children, e)
    }
  })
  return routersConfig
}
const routersConfig = fixSourceRouterConfig(routersConfigPre)

const adminRouter = cloneDeep(routersConfig)
const normalUserRouters = cloneDeep(routersConfig)
normalUserRouters[4].children!.splice(
  normalUserRouters[4].children!.findIndex(e => e.key === "authority-setting-high-permission-page"),
  1
)
normalUserRouters[4].children![0].children!.splice(1, 1)

// 把按钮从router里面分离出来，并把button key 加到permissions里面
function splitButtonFromRouter(routersConfig: RouterApiType[], permissions: string[] = [], start = true) {
  if (start) routersConfig = cloneDeep(routersConfig)
  routersConfig.forEach(e => {
    if (e.type === RouteEnum.Page && e.children) {
      permissions.push(...e.children.map(buttonConfig => buttonConfig.key))
      e.children = undefined
    } else if (e.type === RouteEnum.Iframe) {
      return
    } else if (e.type === RouteEnum.Menu && e.children) {
      splitButtonFromRouter(e.children, permissions, false)
    }
  })
  return { routers: routersConfig, permissions: permissions }
}

function getRouterKeyToList(routersConfig: RouterApiType[], keysList: AppIdType[] = []) {
  routersConfig.forEach(e => {
    keysList.push(e.key)
    e.children && getRouterKeyToList(e.children, keysList)
  })
  return keysList
}
roleList[0].routerKeys = getRouterKeyToList(adminRouter)
roleList[1].routerKeys = getRouterKeyToList(normalUserRouters)

export default [
  {
    url: urlPre + "/users/current/menus",
    method: "get",
    response: (request: MockRequestType) => {
      let distRouter = normalUserRouters
      // 因为是paobai 所以是admin用户 实际会有用户role是否有admin流程
      if (getUserId(request) === paobaiUserInfo.userId) {
        distRouter = adminRouter
      }
      return successResponseWrap({
        ...splitButtonFromRouter(distRouter),
        other: getUserId(request),
        and: distRouter,
        normal: normalUserRouters
      })
    }
  },
  {
    url: urlPre + "/users/login",
    method: "post",
    response: (request: MockRequestType) => {
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
    url: urlPre + "/users/current/userInfo",
    method: "get",
    response: (request: MockRequestType) => {
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
  },
  {
    url: urlPre + "/roles/list",
    method: "get",
    response: (request: MockRequestType) => {
      let resData = roleList
      if (request.query.keyword) {
        resData = resData.filter(e => e.roleName.includes(request.query.keyword))
      }
      return successResponseWrap(resData)
    }
  },
  {
    url: urlPre + "/roles/:id",
    method: "get",
    response: (request: MockRequestType) => {
      const id = request.query.id
      return successResponseWrap(roleList.find(e => +e.id === +id) || {})
    }
  },
  {
    url: urlPre + "/roles",
    method: "post",
    response: (request: MockRequestType) => {
      const dist = request.body
      roleList.push(dist as any)
      dist.id = roleList.length
      return successResponseWrap({})
    }
  },
  {
    url: urlPre + "/roles/:id",
    method: "put",
    response: (request: MockRequestType) => {
      const id = request.query.id
      const distRole = roleList.find(e => +e.id === +id)
      Object.assign(distRole, request.body)
      return successResponseWrap(distRole)
    }
  },
  {
    url: urlPre + "/menus",
    method: "get",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    response: (request: MockRequestType) => {
      let res: RouterApiType[] = routersConfig
      if (!request.query.attachButton) res = splitButtonFromRouter(routersConfig).routers
      return successResponseWrap(res)
    }
  },
  {
    url: urlPre + "/menus",
    method: "post",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    response: (request: MockRequestType) => {
      const key = request.body.key
      const dist = routerKeyMap.get(key)
      if (dist) {
        return failResponseWrap(dist, "菜单标识复")
      }
      const parentKey = request.body.parentKey
      const obj = request.body as RouterApiType
      obj.id = idStart++
      if (parentKey) {
        const parent = routerKeyMap.get(parentKey) as RouterApiType
        obj.parentKey = parent.key
        obj.parentTitle = parent.title
        parent!.children?.push(obj)
      } else {
        routersConfig.push(obj)
      }

      routerKeyMap.set(obj.key, obj)
      routerIdMap.set(obj.id, obj)
      return successResponseWrap({ routersConfig })
    }
  },
  {
    url: urlPre + "/menus/:id",
    method: "put",
    response: (request: MockRequestType) => {
      const id = request.query.id
      const dist = routerIdMap.get(+id)
      dist && Object.assign(dist, request.body)
      return successResponseWrap(id)
    }
  }
] as MockMethod[]
