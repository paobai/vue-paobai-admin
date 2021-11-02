/*
 * @Description: 权限指令
 * @Author: ZY
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-28 13:46:23
 */

import { Directive } from "vue"

export const tableScroll: Directive = {
    mounted(el: HTMLElement, binding, vnode, oldVnode) {
        let scrollTop = 0
        let dom = el.querySelector('.el-table__body-wrapper')
        if (!dom) return
        dom.addEventListener('scroll', (e) => {
            if (!dom) return
            let isBottom = Math.abs(dom.scrollHeight - dom.scrollTop - dom.clientHeight) <= 1
            let isHorizontal = scrollTop === dom.scrollTop
            if (isBottom && !isHorizontal && dom.scrollTop !== 0) {
                if (binding.value) {
                    binding.value()
                }
            }
            if (!isHorizontal) {
                scrollTop = dom.scrollTop
            }
        })
    }
}
