import { getRequest, postRequest, deleteRequest, downloadFile, uploadFile } from "@/utils/httpRequest"
import type * as ApiType from "./type"
export * from "./type"
import { BaseApi } from "@/api/help"

// 角色接口
export class RoleApi extends BaseApi {
  static baseUrlPre = groupPre + "/roles"

  static async getDetailsById(id: any) {
    return getRequest(this.baseUrlPre + `/${id}`)
  }
}

// 菜单接口
export class MenuApi extends BaseApi {
  static baseUrlPre = groupPre + "/menus"
  static async get(data?: any) {
    return getRequest<ApiType.MenuApiType.get>(this.baseUrlPre, data)
  }
  // 菜单管理-删除菜单
  static async deleteMenu(params: any) {
    return deleteRequest(groupPre + "/menus/batch", params)
  }
}

// 权限资源
export class ResourceApi extends BaseApi {
  static baseUrlPre = groupPre + "/resources"
  static async get(data?: any) {
    return getRequest<ApiType.ResourceApiType.resourceGroupItem[]>(this.baseUrlPre, data)
  }
  static async deleteByIds(ids: string) {
    return deleteRequest(this.baseUrlPre + `/batch`, { resourceIds: ids })
  }
}

// 权限资源组
export class ResourceGroupsApi extends BaseApi {
  static baseUrlPre = groupPre + "/resource_groups"
}

// 人员Api
export class PersonApi extends BaseApi {
  static baseUrlPre = groupPre + "/persons"

  // 组织管理-下载模板
  static async downloadDeptTemp() {
    return downloadFile(this.baseUrlPre + "/import_template")
  }

  // 组织管理-下载模板
  static async downloadDeptFile() {
    return downloadFile(this.baseUrlPre + "/export")
  }

  static async deletePerson(params: any) {
    return deleteRequest(groupPre + "/persons", params)
  }

  static async importDeptFile(data: any) {
    return uploadFile(groupPre + "/persons/import", data)
  }

  // 组织管理-人员移动排序
  static async moveUser(data: { personId: AppIdType; prePersonId: AppIdType; nextPersonId: AppIdType }) {
    return putRequest(groupPre + `/persons/${data.personId}/move`, data)
  }

  static async add(data: any) {
    return postRequest(groupPre + "/la_user", data)
  }
}

// UserApi
export class UserApi extends BaseApi {
  static baseUrlPre = groupPre + "/users"
  // 获取用户可以访问菜单树
  static async getCurrentUserTree() {
    return getRequest(this.baseUrlPre + "/current/menus")
  }

  // 用户管理-获取用户信息
  static async getCurrentUserInfo() {
    return getRequest(this.baseUrlPre + "/info")
  }

  // 用户管理-获取用户信息
  static async getDetailsById(id: AppIdType) {
    return getRequest(this.baseUrlPre + `/${id}`)
  }

  static async updatePassword(data: ApiType.UserApiTypeUpdatePassword) {
    return putRequest(this.baseUrlPre + "/password", data)
  }
}

// DeptApi
export class DeptApi extends BaseApi2 {
  static baseUrlPre = groupPre + "/dept"
  static async getDeptManTree() {
    return getRequest(this.baseUrlPre + "/tree")
  }
  static async moveDept(data: { deptId: AppIdType; nextDeptId: AppIdType; preDeptId: AppIdType; parentId: AppIdType }) {
    return putRequest(this.baseUrlPre + `/${data.deptId}/move`, data)
  }
}

// 通用文件上传
export async function fileUpload(data: any, onUploadProgress?: Function): Promise<any> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uploadFile(groupPre + "/attachments/upload", data, "post", "", onUploadProgress)
      .then(res => {
        res.data.fullFileUrl = res.data.urlPrefix + res.data.fileUrl
        resolve(res)
      })
      .catch(error => {
        return reject(error)
      })
  })
}
