import router, { resetRouter } from "@/router"
import { useStore } from "@/store"
const store = useStore()
import Vue from "vue"
import Cookies from "js-cookie"
import { MyRouterOptions } from "@/router/routerHelp"

export function clearLoginInfo() {
  Cookies.remove("access_token")
  Cookies.remove("refresh_token")
  // store.commit('resetStore')
  // @ts-ignore
  sessionStorage.setItem(
    "permissions",
    "[]"
  )(router.options as MyRouterOptions).isAddDynamicMenuRoutes = false
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
