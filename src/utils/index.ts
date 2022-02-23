import { resetRouter } from "@/router"
import Cookies from "@/utils/storage/cookie"
import { storageSession } from "@/utils/storage"
import sysConfig from "@/config"

export function clearLoginInfo() {
  Cookies.remove(sysConfig.app.tokenName)
  Cookies.remove(sysConfig.app.refreshTokenName)
  storageSession.setItem(sysConfig.app.permissionName, [])
  resetRouter()
}

// Toggle class for the selected element
export const toggleClass = (
  ele: HTMLElement,
  className: string,
  force?: boolean | undefined
) => {
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
export const changeArcoPrimaryColor = (
  color: string,
  propertyPre = "--arcoblue-"
) => {
  const tintColor = (color: string, tint: number) => {
    if (!color) return ""
    let red = 0
    let blue = 0
    let green = 0
    if (color.indexOf("#") !== -1) {
      color = color.replace("#", "")
      red = parseInt(color.slice(0, 2), 16)
      green = parseInt(color.slice(2, 4), 16)
      blue = parseInt(color.slice(4, 6), 16)
    } else {
      const colorList = color.match(/\d+/g)!
      red = +colorList[0]
      green = +colorList[1]
      blue = +colorList[2]
    }

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(",")
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))
      return `${red},${green},${blue}`
    }
  }
  const clusters = []
  const body = document.body
  for (let i = 0; i <= 9; i++) {
    const tgbText = tintColor(color, Number(((i - 5) / 10).toFixed(2)))
    clusters.push(tgbText)
    body.style.setProperty(propertyPre + (i + 1), tgbText)
  }
}
