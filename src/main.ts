import "@/styles/index.less"
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { createApp, Directive, Component } from "vue"
import App from "./App.vue"
import router from "./router"
import { useArco } from "@/plugins/arco"
import { initApp } from "./init"

const app = createApp(App)
initApp(app)

app.use(router).use(useArco)
app.mount("#app")
