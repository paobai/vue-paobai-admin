// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { initApp } from "./init"

const app = createApp(App)
initApp(app)

app.use(router)
app.mount("#app")
