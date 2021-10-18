import '@/styles/index.scss'
import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
// import { loadAllPlugins } from './plugins'
import { i18n } from "./plugins/i18n/index.ts";
import { useElementPlus } from "../src/plugins/element-plus";
import * as directives from '@/directives'
import '@/assets/iconfont/iconfont.css'

const app = createApp(App)
// loadAllPlugins(app)

// 自定义指令
Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string ]: Directive })[key])
})
app.use(router)
    .use(useElementPlus)
    .use(i18n)
    .use(store)
app.mount('#app')
