// 响应式storage
import { App } from "vue"
import Storage from "responsive-storage"

export const injectResponsiveStorage = (app: App, config: ServerConfigs) => {
  app.use(Storage, {
    // 默认显示首页tag
    routesInStorage: {
      type: Array,
      default: Storage.getData(undefined, "routesInStorage") ?? [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "message.hshome",
            icon: "el-icon-s-home",
            showLink: true,
            savedPosition: false
          }
        }
      ]
    },
    // 国际化 默认中文zh
    locale: {
      type: Object,
      default: Storage.getData(undefined, "locale") ?? {
        locale: config.Locale
      }
    },
    // layout模式以及主题
    layout: {
      type: Object,
      default: Storage.getData(undefined, "layout") ?? {
        layout: config.Layout
      }
    }
  })
}
