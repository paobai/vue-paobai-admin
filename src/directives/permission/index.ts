/*
 * @Description: 权限指令
 * @Author: ZY
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-28 13:46:23
 */
import { useUserStoreWithOut } from "@/store/modules/user"
import type { Directive } from "vue"

export const permission: Directive = {
  mounted(el, binding) {
    let { value } = binding
    const permissions = useUserStoreWithOut().getPermissions
    if (typeof value === "string") value = [value]
    if (value && value instanceof Array && value.length > 0) {
      let res = true
      value.every(item => {
        res = permissions.indexOf(item) !== -1
        return res
      })
      if (!res) {
        el.style.display = "none"
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  }
}
