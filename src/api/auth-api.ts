import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest
} from "@/utils/httpRequest"
const adminServerNamePre = "/auth"

export async function login(data: any) {
  return postRequest(adminServerNamePre + "/oauth/token", data, null, "form")
}

export async function logout() {
  return deleteRequest(adminServerNamePre + "/oauth/token/logout")
}

export async function getMean() {
  return deleteRequest(adminServerNamePre + "/menu/nav")
}
