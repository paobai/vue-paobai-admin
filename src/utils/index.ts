import router, { resetRouter } from '@/router'
import { useStore } from '@/store'
const store = useStore()
import Vue from 'vue'
import Cookies from "js-cookie";
import {MyRouterOptions} from "@/router/routerConfig";

export function clearLoginInfo () {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    // store.commit('resetStore')
    // @ts-ignore
    sessionStorage.setItem('permissions', '[]')
    (router.options as MyRouterOptions).isAddDynamicMenuRoutes = false
    resetRouter()
}
