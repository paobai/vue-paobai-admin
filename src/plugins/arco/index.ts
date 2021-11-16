import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { App, Component } from "vue"
import '@/styles/arco-thme.less'

// import {
//     Button
// } from '@arco-design/web-vue'
//
// const components = [
//     Button
// ]
// const plugins = [];
const componentPrefix = "A"
export function useArco(app: App) {
  // components.forEach((component: Component) => {
  //     app.component(( componentPrefix + component.name) as string, component);
  // });
  // plugins.forEach(plugin => {
  //     app.use(plugin);
  // });
  app.use(ArcoVue, { componentPrefix })
  Object.keys(ArcoVueIcon).forEach(key => {
    app.component(componentPrefix + key, (<any>ArcoVueIcon)[key] as Component);
  })
}
