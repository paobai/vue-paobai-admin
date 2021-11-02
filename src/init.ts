import { App } from "vue";
import config from '@/config'
export function initApp(app: App) {
    let dist = document.getElementsByTagName('title')[0]
    dist.innerHTML = config.htmlTitle
}
