import router, { resetRouter } from "@/router"
import Vue from "vue"
import Cookies from "js-cookie"
import {MyRouter, MyRouterOptions} from "@/router/routerHelp"
import { storageSession } from '@/utils/storage'
import sysConfig from "@/config";

export function clearLoginInfo() {
  Cookies.remove(sysConfig.app.tokenName)
  Cookies.remove(sysConfig.app.refreshTokenName)
  // store.commit('resetStore')
  // @ts-ignore
  storageSession.setItem(sysConfig.permissionName, []);
  resetRouter()
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += "" + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

/**
 * 修改
 * @param color 颜色
 * @param propertyPre 更新类型默认主题色
 */
export const changeArcoPrimaryColor = (color: string, propertyPre='--arcoblue-') => {
  const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) { // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))
      return `${red},${green},${blue}`
    }
  }
  const clusters = []
  let body = document.body
  for (let i = 0; i <= 9; i++) {
    let tgbText = tintColor(color.replace('#', ''), Number(((i - 5) / 10).toFixed(2)))
    clusters.push(tgbText)
    body.style.setProperty(propertyPre + (i+1), tgbText)
  }
}
