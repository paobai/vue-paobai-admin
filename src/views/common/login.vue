<template>
  <div>
    <h1>login page demo</h1>
    账号<input v-model="userName"><br>
    密码<input v-model="password" type="password"><br>
    <button @click="commit">loginbt</button>
  </div>
</template>

<script>
import {ref} from 'vue'
import { useStore } from '../../store'
import { MainActionTypes } from "../../store/modules/paobai/action-types";
import {UserActionTypes} from "../../store/modules/user/action-types";
import { LoginType } from '../../store/modules/paobai/state.ts'
import router from '../../router'
export default {
  setup(){
    let store = useStore()
    let userName = ref('')
    let password = ref('')
    let commit = async function () {
      console.log('commit start')
      await store.dispatch(MainActionTypes.ACTION_LOGIN, { username: userName.value, password: password.value })
      if (store.state.main.loginState === LoginType.HadLogin) {
        router.push({name: 'main'})
      }
    }
    return {userName, password, commit}
  }
}
</script>
