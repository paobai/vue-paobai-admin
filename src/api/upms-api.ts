import {postRequest, getRequest, putRequest, deleteRequest} from '@/utils/httpRequest'
var groupPre = '/upms'

// 用户管理-获取用户可以访问菜单树
export async function getCurrentUserTree () {
    return getRequest(groupPre + '/users/current/menus')
}
