import router from '@/router'
import { resetRoute } from '@/router'
import store from '@/store'
export function clearLoginInfo () {
    Vue.cookie.delete('access_token')
    Vue.cookie.delete('refresh_token')
    store.commit('resetStore')
    sessionStorage.setItem('permissions', '[]')
    router.options.isAddDynamicMenuRoutes = false
    resetRoute()
}
