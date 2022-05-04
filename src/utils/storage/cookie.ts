import { getAppEnvConfig } from "@/utils"
import { merge } from "lodash"
import * as tsCookies from "typescript-cookie"

class Cookies {
  private static env = getAppEnvConfig()
  constructor() {}
  /**
   *  存储 cookie 值
   * @param name
   * @param value
   * @param cookieSetting
   */
  set(name = "default", value = "", cookieSetting = {}) {
    const currentCookieSetting = {
      expires: 1
    }
    merge(currentCookieSetting, cookieSetting)
    tsCookies.setCookie(
      `${Cookies.env.VITE_GLOB_APP_TITLE}-${Cookies.env.VITE_APP_VERSION}-${name}`,
      value,
      currentCookieSetting
    )
  }
  /**
   * 拿到 cookie 值
   * @param name
   * @returns
   */
  get(name = "default") {
    return tsCookies.getCookie(`${Cookies.env.VITE_GLOB_APP_TITLE}-${Cookies.env.VITE_APP_VERSION}-${name}`)
  }
  /**
   * 拿到 cookie 全部的值
   * @returns
   */
  getAll() {
    return tsCookies.getCookies()
  }
  /**
   * 删除 cookie
   * @param name
   */
  remove(name = "default") {
    tsCookies.removeCookie(`${Cookies.env.VITE_GLOB_APP_TITLE}-${Cookies.env.VITE_APP_VERSION}-${name}`)
  }
}

export const cookies = new Cookies()

export default cookies
