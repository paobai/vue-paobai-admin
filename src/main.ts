import "@/styles/index.scss"
import { createApp, Directive, Component } from "vue"
import App from "./App.vue"
import router from "./router"
import { i18n } from "@/plugins/i18n"
import { useElementPlus } from "@/plugins/element-plus"
import { useArco } from "@/plugins/arco"
import { initApp } from './init'


const app = createApp(App)
initApp(app)

app.use(router).use(useArco).use(useElementPlus).use(i18n)
app.mount("#app")
