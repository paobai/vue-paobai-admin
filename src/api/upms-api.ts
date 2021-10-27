import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from "@/utils/httpRequest"
import Layout from "@/layout/index.vue"
const groupPre = "/upms"

// 用户管理-获取用户可以访问菜单树
export async function getCurrentUserTree() {
  // return getRequest(groupPre + '/users/current/menus')
  return Promise.resolve({
    code: 1,
    data: [
      {
        path: "/theme",
        redirect: "noredirect",
        id: "99",
        children: [
          {
            path: "/theme/index",
            name: "Theme",
            meta: {
              title: "theme",
              icon: "#iconhuanfu",
              id: "100"
            }
          }
        ]
      }
    ]
  })
}
