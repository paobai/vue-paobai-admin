import axios from "axios"
import type { AxiosRequestConfig, Method } from "axios"
import qs from "qs"
import { merge } from "lodash"
import { UserApi } from "@/api/upms"
import { clientId, clientSecret } from "@/constant"
import { GrantTypeEnum } from "@/enums/app"
import { ApiCodeEnum, ContentType } from "./help"
import type { ApiPromise, CustomAxiosInstance } from "./help"
import { saveAs } from "file-saver"
import Cookies from "@/utils/storage/cookie"
import { getAppEnvConfig } from "@/utils"
import sysConfig from "@/config"
import { Message } from "@arco-design/web-vue"
import config from "@/config"
import { useUserHook } from "@/hooks/user"

const env = getAppEnvConfig()
const apiBaseUrl = env.VITE_API_BASE_URL

const http: CustomAxiosInstance = axios.create({
  timeout: 1000 * 30,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
}) as CustomAxiosInstance

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName: string) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  // @ts-ignore
  return apiBaseUrl + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefaultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
  const defaults = {
    t: new Date().getTime()
  }
  return openDefaultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefaultParams 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefaultParams = true, contentType = ContentType.JSON) => {
  const defaults = {
    t: new Date().getTime()
  }
  data = openDefaultParams ? merge(defaults, data) : data
  return contentType === ContentType.JSON ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    config.headers[sysConfig.app.appApiTokenName] = "Bearer " + Cookies.get(sysConfig.app.tokenName) // 请求头带上token
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // config.headers['Access-Control-Allow-Methods'] = '*'
    config.headers["X-STEINS-TENANT-ID"] = "1"
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let isRefreshing = false

function checkStatus(httpConfig: AxiosRequestConfig) {
  // 刷新token的函数,这需要添加一个开关，防止重复请求
  if (!isRefreshing) {
    referToken()
  }
  isRefreshing = true
  // 将token刷新成功后的回调请求缓存
  const retryOriginalRequest = new Promise(resolve => {
    addSubscriber(() => {
      httpConfig.headers[sysConfig.app.appApiTokenName] = sysConfig.app.tokenPre + Cookies.get(sysConfig.app.tokenName)
      resolve(http(httpConfig))
    })
  })
  return retryOriginalRequest
}
let subscribers: any[] = []
function onAccessTokenFetched() {
  subscribers.forEach(callback => {
    callback()
  })
  subscribers = []
}

function addSubscriber(callback: () => void) {
  subscribers.push(callback)
}

function referToken() {
  const refreshToken = Cookies.get(config.app.refreshTokenName)! as string
  UserApi.refreshToken({
    grant_type: GrantTypeEnum.REFRESH_TOKEN,
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret
  })
    .then(res => {
      Cookies.set(sysConfig.app.tokenName, res.data.access_token)
      Cookies.set(sysConfig.app.refreshTokenName, res.data.refresh_token)
      onAccessTokenFetched()
    })
    .catch(() => {
      subscribers = []
      errorLogin()
    })
    .finally(() => {
      // 延迟几秒再将刷新token的开关放开，不然偶尔还是会重复提交刷新token的请求
      setTimeout(() => {
        isRefreshing = false
      }, 3000)
    })
}

function errorLogin() {
  const { logoutEvent } = useUserHook()
  logoutEvent()
  Message.error("登录失效")
}
/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    if (!response.data) {
      return Promise.reject("系统错误")
    }
    if (response.data.code !== ApiCodeEnum.SUCCESS) {
      Message.error(response.data.msg || "系统错误")
      return Promise.reject(response.data)
    }
    response.data.__headers = response.headers
    return response.data
  },
  async error => {
    const response = error.response
    console.log("error resoponse", response)
    // 401, token失效
    if (response.data && response.status === 401 && response.data.code === 10250) {
      // Bad client错误流程
      if (response.data && response.data.msg === "Bad client credentials") {
        errorLogin()
        Message.error("认证失败,client错误,请联系管理员。")
        return Promise.reject(error.response.data)
      }
      const refreshToken = Cookies.get(sysConfig.app.refreshTokenName)
      if (!refreshToken) {
        // 没有refreshToken情况直接返回不需要提示。
        errorLogin()
        return Promise.reject(error.response.data)
      } else {
        return new Promise(resolve => {
          checkStatus(response.config).then(res => {
            resolve(res)
          })
        })
      }
    }
    if (response.data && response.data.code === 10250) {
      Message.error("登录失效,请先登录")
      // eslint-disable-next-line no-empty
    } else if (error.response.data.code === 10251) {
      // TODO
    } else Message.error(error.response.data.msg)
    return Promise.reject(error.response.data)
  }
)

export const postRequest = <T>(url: string, data?: any, params?: any, type = "json"): ApiPromise<T> => {
  url = http.adornUrl(url) as string
  if (type === "json") {
    return http({
      method: "post",
      url: `${url}`,
      data: JSON.stringify(data),
      params: params
    })
  } else {
    return http({
      method: "post",
      url: `${url}`,
      data: qs.stringify(data),
      params: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }
}

export const getRequest = <T>(url: string, params?: any): ApiPromise<T> => {
  url = http.adornUrl(url) as string
  return http({
    method: "get",
    url: `${url}`,
    params: params
  })
}

export const putRequest = <T>(url: any, data?: any, params?: any): ApiPromise<T> => {
  url = http.adornUrl(url)
  return http({
    method: "put",
    url: `${url}`,
    data: data,
    params: params
  })
}

export const deleteRequest = <T>(url: any, params?: any, data?: any): ApiPromise<T> => {
  url = http.adornUrl(url)
  return http({
    method: "delete",
    url: `${url}`,
    params: params,
    data: data
  })
}

// 下载文件方法
export function downloadFile(
  url: any,
  params?: any,
  method = "get",
  fileName: string | undefined = undefined
): ApiPromise {
  url = http.adornUrl(url)
  return new Promise(() => {
    http({
      method: method as Method,
      url: url,
      params: params,
      data: params,
      responseType: "blob"
    }).then(res => {
      fileName = fileName || "download"
      const contentDisposition =
        (res as any).__headers["content-disposition"] || (res as any).__headers["Content-disposition"]
      if (contentDisposition) {
        fileName = fileName || window.decodeURI(contentDisposition.split("''")[1])
      }
      const blob = new Blob([res as any], { type: "application/vnd.ms-excel" })
      saveAs(blob, fileName)
    })
  })
}

// 上传文件方法
export function uploadFile(
  url: string,
  data: any,
  method = "post",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  fileName = undefined
): ApiPromise {
  url = http.adornUrl(url) as string
  return http({
    method: method as Method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export default http
