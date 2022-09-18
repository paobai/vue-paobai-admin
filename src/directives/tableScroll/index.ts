import type { Directive } from "vue"

export const tableScroll: Directive = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  mounted(el: HTMLElement, binding, vnode, oldVnode) {
    let scrollTop = 0
    const dom = el.querySelector(".el-table__body-wrapper")
    if (!dom) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    dom.addEventListener("scroll", e => {
      if (!dom) return
      const isBottom = Math.abs(dom.scrollHeight - dom.scrollTop - dom.clientHeight) <= 1
      const isHorizontal = scrollTop === dom.scrollTop
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
