import '@arco-design/web-vue/dist/arco.css';
import ArcoVue from '@arco-design/web-vue';
import {App, Component} from "vue";

// import {
//     Button
// } from '@arco-design/web-vue'
//
// const components = [
//     Button
// ]
// const plugins = [];
let componentPrefix =  'A'
export function useArco(app: App) {
    // components.forEach((component: Component) => {
    //     app.component(( componentPrefix + component.name) as string, component);
    // });
    // plugins.forEach(plugin => {
    //     app.use(plugin);
    // });
    app.use(ArcoVue, {componentPrefix})
}
