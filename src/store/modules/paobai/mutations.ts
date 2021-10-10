import { MutationTree } from 'vuex'
import { MainState, LoginType } from './state'
import { MainMutationTypes } from './mutation-types'

export type Mutations<S = MainState> = {
    [MainMutationTypes.SET_LOGIN_STATE](state: S, loginState: LoginType): void
    [MainMutationTypes.SET_USERINFO](state: S, userInfo: object): void
}

export const mutations: MutationTree<MainState> & Mutations = {
    [MainMutationTypes.SET_LOGIN_STATE](state: MainState, loginState: LoginType) {
        state.loginState = loginState
    },
    [MainMutationTypes.SET_USERINFO](state: MainState, userInfo: object) {
        state.userInfo = userInfo
    },
}
