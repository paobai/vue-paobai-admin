<template>
  <div class="authority-setting">
    <h3>高级权限用户：用户名:paobai 密码: paobai</h3>
    <h3>低级权限用户： 用户名:test 密码: paobai</h3>
    <h3>查看菜单中高权限和低权限的页面显隐控制</h3>
    <h2>当前用户为：{{ userInfo.realName }}</h2>
    <div>
      <h3>切换用户：</h3>
      <a-button size="large" type="primary" @click="changeUser('paobai')">切换为高级用户</a-button>
      <a-button size="large" type="primary" style="margin-left: 20px" @click="changeUser('test')"
        >切换为低级用户</a-button
      >
    </div>
    <div style="margin-top: 40px">
      <h3>权限控制显隐按钮：</h3>
      <a-button v-permission="'high-power-button'" type="primary" style="margin-right: 20px"
        >高级权限可以看按钮（元素）</a-button
      >
      <a-button v-permission="'low-power-button'" type="primary">低级权限也可以看按钮（元素）</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserHook } from "@/hooks/user"
import { AuthLoginByPasswordReq } from "@/api/auth-api"
import { grantType } from "@/constant"
import { AuthApi } from "@/api/auth-api"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
export default {
  name: "AuthoritySetting",
  setup() {
    const { userInfo } = useUserHook()
    const changeUser = function (userName: string) {
      let loginForm: AuthLoginByPasswordReq = {
        userName: userName,
        passWord: userName,
        grant_type: grantType.PASSWORD
      }
      const login = async () => {
        AuthApi.login(loginForm).then(res => {
          Cookies.set(config.app.tokenName, res.data.access_token)
          Cookies.set(config.app.refreshTokenName, res.data.refresh_token)
          location.reload()
        })
      }
      login()
    }
    return {
      userInfo,
      changeUser
    }
  }
}
</script>

<style scoped lang="less">
.authority-setting {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  margin: 20px;
  line-height: 40px;
  background: var(--color-bg-1);
}
</style>
