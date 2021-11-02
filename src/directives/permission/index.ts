/*
 * @Description: 权限指令
 * @Author: ZY
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-28 13:46:23
 */
import { useUserStoreHook } from "@/store/modules/user"
import { Directive } from "vue"

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const permissions = useUserStoreHook().getPermissions
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
