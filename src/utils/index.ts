import router, { resetRouter } from "@/router"
import Vue from "vue"
import Cookies from "js-cookie"
import {MyRouter, MyRouterOptions} from "@/router/routerHelp"
import { storageSession } from '@/utils/storage'

export function clearLoginInfo() {
  Cookies.remove("access_token")
  Cookies.remove("refresh_token")
  // store.commit('resetStore')
  // @ts-ignore
  storageSession.setItem("permissions", []);
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
