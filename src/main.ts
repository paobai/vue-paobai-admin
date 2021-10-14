import '@/styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
// import { loadAllPlugins } from './plugins'
import { i18n } from "./plugins/i18n/index.ts";

const app = createApp(App)
// loadAllPlugins(app)
app.use(router)
    .use(i18n)
    .use(store)
app.mount('#app')
