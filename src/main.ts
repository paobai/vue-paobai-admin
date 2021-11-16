import "@/styles/index.less"
import { createApp, Directive, Component } from "vue"
import App from "./App.vue"
import router from "./router"
import { i18n } from "@/plugins/i18n"
import { useArco } from "@/plugins/arco"
import { initApp } from './init'


const app = createApp(App)
initApp(app)

app.use(router).use(useArco).use(i18n)
app.mount("#app")
