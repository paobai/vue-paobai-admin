import { createApp } from "vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import ArcoVue from "@arco-design/web-vue"
import Dialog from "./dialog.vue"
import type { ApiFileItem } from "@/api/file"

function handleRenameFile(fileInfo: ApiFileItem) {
  // 创建一个挂载容器
  const dom: HTMLElement = document.createElement("div")
  // 挂载组件
  document.body.appendChild(dom)
  // 实例化组件, createApp第二个参数是 props
  const instance = createApp(Dialog, {
    fileInfo: fileInfo,
    onClose: () => {
      setTimeout(() => {
        instance.unmount()
        document.body.removeChild(dom)
      }, 350)
    }
  })
  instance.use(ArcoVue)
  instance.use(ArcoVueIcon)
  instance.mount(dom)
}

export default handleRenameFile
