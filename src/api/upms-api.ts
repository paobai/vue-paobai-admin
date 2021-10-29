import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from "@/utils/httpRequest"
import Layout from "@/layout/index.vue"
import {RouteType} from "@/constant/settings";
const groupPre = "/upms"

// 用户管理-获取用户可以访问菜单树
export async function getCurrentUserTree() {
  // return getRequest(groupPre + '/users/current/menus')
  return Promise.resolve({
    code: 1,
    data: [
      {
        title: '总体概况',
        path: '',
        key: 'ztgk',
        type: RouteType.Menu,
        children: [
          { key: "1", title: "menu1", type: RouteType.Page},
          {
            key: "2",
            title: "menu2",
            type: RouteType.Menu,
            children: [
              { key: "2_1", title: "menu2_1", type: RouteType.Page },
              { key: "2_2", title: "menu2_2", type: RouteType.Page }
            ]
          },
          {
            key: "3",
            title: "menu3",
            type: RouteType.Menu,
            children: [
              { key: "3_1", title: "menu3_1", type: RouteType.Page },
              {
                key: "3_2",
                title: "menu3",
                type: RouteType.Menu,
                children: [
                  { key: "3_2_1", title: "menu3_1_1", type: RouteType.Page },
                  { key: "3_2_2", title: "menu3_1_2", type: RouteType.Page }
                ]
              },
              { key: "3_3", title: "menu3_3", type: RouteType.Page }
            ]
          }
        ]
      },
      {
        title: '作战指挥',
        path: '',
        key: 'zzzh',
        type: RouteType.Menu,
        icon: '',
        children: [
          { key: "11", title: "menu1", type: RouteType.Page},
          {
            key: "21",
            title: "menu2",
            type: RouteType.Menu,
            children: [
              { key: "2_11", title: "menu2_1", type: RouteType.Page },
              { key: "2_21", title: "menu2_2", type: RouteType.Page }
            ]
          }
        ]
      },
      {
        title: '智慧治水',
        path: '',
        key: 'zhzs',
        icon: '',
        type: RouteType.Page
      },
      {
        title: '数据管理',
        path: '',
        key: 'sjgl',
        icon: '',
        type: RouteType.Page
      },
      {
        title: '系统管理',
        path: '',
        key: 'xtgl',
        type: RouteType.Page,
        icon: '',
      }
    ]
  })
}
