import { resetRouter } from "@/router"
import Cookies from "@/utils/storage/cookie"
import { storageSession } from "@/utils/storage"
import sysConfig from "@/config"
// @ts-ignore
import { generate } from "@arco-design/color/src/index"

export function clearLoginInfo() {
  Cookies.remove(sysConfig.app.tokenName)
  Cookies.remove(sysConfig.app.refreshTokenName)
  storageSession.setItem(sysConfig.app.permissionName, [])
  resetRouter()
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string, force?: boolean | undefined) => {
  if (!ele || !className) {
    return
  }
  ele.classList.toggle(className, force)
}

/**
 * 修改
 * @param color 颜色
 * @param propertyPre 更新类型默认主题色
 */
export const changeArcoPrimaryColor = (color: string, propertyPre = "--primary-") => {
  if (!color) return
  const colors = getArcoColors(color, false)
  const colorsSplit = colors.map((color: string) => color.split("(")[1].split(")")[0]) as string[]
  const body = document.body
  for (let i = 0; i <= 9; i++) {
    body.style.setProperty(propertyPre + (i + 1), colorsSplit[i])
  }
}

export function getArcoColors(color: string, dark = false) {
  return generate(color, { dark: dark, list: true, index: 6, format: "rgb" }) as string[]
}
