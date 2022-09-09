export class BaseApi {
  static baseUrlPre = ""
  static async getList(params?: any) {
    return getRequest(this.baseUrlPre + "/list", params)
  }
  static async getListByPost(params?: any) {
    return postRequest(this.baseUrlPre + "/list", params)
  }
  static async getDetailsById(id: any) {
    return getRequest(this.baseUrlPre + `/detail/${id}`)
  }
  static async get(data?: any) {
    return getRequest(this.baseUrlPre, data)
  }
  static async add(data: any) {
    return postRequest(this.baseUrlPre, data)
  }
  static async update(data: any, id: any, params?: any) {
    return putRequest(this.baseUrlPre + `/${id}`, data, params)
  }
  static async delete(id: any) {
    return deleteRequest(this.baseUrlPre + `/${id}`)
  }
  static async deleteByIds(ids: any) {
    return deleteRequest(this.baseUrlPre + `/deleteByIds`, null, ids)
  }
}
