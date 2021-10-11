import {ActionContext, ActionTree} from 'vuex'

import {RootState} from '@/store'
import {LoginType, MainState} from './state'
import {Mutations} from './mutations'
import {MainMutationTypes} from './mutation-types'
import {MainActionTypes} from './action-types'


type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<MainState, RootState>, 'commit'>

export interface Actions {
    [MainActionTypes.ACTION_LOGIN](
        { commit }: AugmentedActionContext,
        loginInfo: { username: string, password: string }
    ): void
}

export const actions: ActionTree<MainState, RootState> & Actions  = {
    async [MainActionTypes.ACTION_LOGIN](
        { commit }: AugmentedActionContext,
        loginInfo: { username: string, password: string }
    ) {
        let { username, password } = loginInfo
        username = username.trim()
        // TODO: login Main
        async function loginFun () {
            return new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(function(){
                    if (username === 'admin' && password === 'admin') resolve({data : {userInfo: {name: 'paobai'}}, code: 1});
                    else resolve({data : null, code: 0})
                }, 2000);
            })
        }
        let res = await loginFun()
        if (res.code === 1) {
            commit(MainMutationTypes.SET_USERINFO, res.data.userInfo)
            commit(MainMutationTypes.SET_LOGIN_STATE, LoginType.HadLogin)
        } else {
            alert('账号或密码出错')
        }
    }
}