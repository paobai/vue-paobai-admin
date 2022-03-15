<template>
  <div class="login-wrapper">
    <div class="left-wrapper">
      <div class="content-wrapper">
        <div class="title">
          <div class="english">
            <img class="welcome" src="/src/assets/images/login/welcome-en.png" />
          </div>
          <div class="chinese">欢迎回来</div>
        </div>
        <div class="name">{{ title }}</div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="login-form-wrapper">
        <div class="login-title">
          <div class="logo-wrapper">
            <img class="logo" src="/src/assets/images/common/logo/logo-with-text-bottom.png" />
          </div>
          <div>用户登录</div>
        </div>
        <div class="login-content-wrapper">
          <a-form class="login-form-content" :model="loginForm" @submit-success="login">
            <a-form-item hide-asterisk hide-label :rules="[{ required: true, message: '用户名/手机号码不可为空' }]" field="userName">
              <a-input allow-clear v-model="loginForm.userName" placeholder="用户名/手机号码">
                <template #prefix>
                  <a-icon-user :style="{ fontSize: '20px', color: '#BABABA' }" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item hide-asterisk hide-label field="passWord" :rules="[{ required: true, message: '密码不可为空' }]">
              <a-input-password v-model="loginForm.passWord" placeholder="密码">
                <template #prefix>
                  <a-icon-lock :style="{ fontSize: '20px', color: '#BABABA' }" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-button class="sub-bt" type="primary" html-type="submit">登&nbsp;&nbsp;录</a-button>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
import { AuthApi } from "@/api/auth-api"
import { AuthLoginByPasswordReq } from "@/api/auth-api/model"
import { grantType } from "@/constant"
import { useAppHook } from "@/hooks/app"
export default {
  setup() {
    let { sysColor } = useAppHook()
    let loginForm: AuthLoginByPasswordReq = reactive({
      userName: "paobai",
      passWord: "paobai",
      grant_type: grantType.PASSWORD
    })
    const router = useRouter()
    const login = async () => {
      AuthApi.login(loginForm).then(res => {
        Cookies.set(config.app.tokenName, res.data.access_token)
        Cookies.set(config.app.refreshTokenName, res.data.refresh_token)
        router.replace({ path: config.app.homePagePath })
      })
    }
    return { login, loginForm, title: config.custom.htmlTitle, sysColor }
  }
}
</script>
<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .left-wrapper {
    @media screen and (max-width: 1048px) {
      display: none;
    }
    overflow: hidden;
    max-width: 700px;
    width: 0;
    flex: 1;
    background: @primary-color;
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-wrapper {
      width: 100%;
      transform: translateY(-100px);
      .title {
        position: relative;
        .english {
          width: 100%;
          text-align: center;
          top: 0;
          position: absolute;
          .welcome {
            width: 422px;
            height: 64px;
          }
        }
        .chinese {
          width: 100%;
          text-align: center;
          font-size: 50px;
          font-weight: 400;
          color: var(--color-white);
          line-height: 70px;
        }
      }
      .name {
        margin-top: 50px;
        width: 100%;
        text-align: center;
        font-size: 44px;
        font-weight: normal;
        color: var(--color-white);
        line-height: 61px;
      }
    }
  }
  .right-wrapper {
    //background: url("/src/assets/images/login/login-bak.png") no-repeat;
    //background-size: cover;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-form-wrapper {
      border: 1px solid var(--color-border);
      box-shadow: 0 0 5px #0000004d;
      width: 540px;
      background: var(--color-white);
      border-radius: 8px;
      padding: 60px;
      .login-title {
        font-size: 28px;
        font-weight: bold;
        color: #191919;
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo-wrapper {
          display: inline-block;
          .logo {
            width: 40px;
          }
        }
      }
      .login-content-wrapper {
        margin-top: 40px;
        .arco-input-wrapper {
          border-width: 0 0 1px 0;
          height: 44px;
          line-height: 44px;
          & + .arco-input-wrapper {
            margin-top: 40px;
          }
          :deep(.arco-input.arco-input-size-medium) {
            font-size: 20px;
          }
        }
        .sub-bt {
          margin-top: 20px;
          height: 54px;
          width: 100%;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
