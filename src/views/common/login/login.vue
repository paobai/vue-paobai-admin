<template>
  <div class="login-wrapper">
    <div class="left-wrapper">
      <div class="content-wrapper">
        <div class="title">
          <div class="english">
            <div class="welcome">WELCOME</div>
            <div class="welcome">WELCOME</div>
          </div>
          <div class="chinese">欢迎回来</div>
        </div>
        <div class="name">{{ title }}</div>
      </div>
    </div>
    <div ref="rightWrapper" class="right-wrapper">
      <bk-round style="position: absolute; z-index: 1"></bk-round>
      <div class="login-form-wrapper animate__animated animate__fadeInUp">
        <div class="login-title">
          <div class="logo-wrapper">
            <img class="logo" src="/images/logo/logo-with-text-bottom.png" />
          </div>
          <div>用户登录</div>
        </div>
        <div class="login-content-wrapper">
          <a-form class="login-form-content" :model="loginForm" @submit-success="login">
            <a-form-item
              hide-asterisk
              hide-label
              :rules="[{ required: true, message: '用户名/手机号码不可为空' }]"
              field="userName">
              <a-input v-model="loginForm.userName" allow-clear placeholder="用户名/手机号码">
                <template #prefix>
                  <a-icon-user :style="{ fontSize: '20px', color: '#BABABA' }" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              hide-asterisk
              hide-label
              field="passWord"
              :rules="[{ required: true, message: '密码不可为空' }]">
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
    <a-button type="text" class="theme-btn" size="medium" @click="toggleAppTheme">
      <template #icon>
        <template v-if="darkAppTheme">
          <a-icon-moon-fill />
        </template>
        <template v-else>
          <a-icon-sun-fill />
        </template>
      </template>
    </a-button>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
import { AuthApi } from "@/api/auth-api"
import type { AuthLoginByPasswordReq } from "@/api/auth-api"
import { grantType } from "@/constant"
import { useAppHook } from "@/hooks/app"
import bkRound from "./components/bk-round.vue"

export default {
  components: {
    bkRound
  },
  setup() {
    let { sysColor, darkAppTheme, toggleAppTheme } = useAppHook()
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
    return {
      login,
      loginForm,
      title: config.custom.htmlTitle,
      sysColor,
      toggleAppTheme,
      darkAppTheme
    }
  }
}
</script>
<style lang="less" scoped>
@loginBkColor: var(--primary-1);

.login-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(@loginBkColor, 1);

  .left-wrapper {
    @media screen and (max-width: 1048px) {
      display: none;
    }

    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 0;
    max-width: 750px;
    overflow: hidden;
    background: linear-gradient(to right, @primary-color, rgb(@loginBkColor));
    opacity: 0.95;

    .content-wrapper {
      width: 100%;

      .title {
        position: relative;

        .english {
          position: absolute;
          top: 0;
          width: 100%;
          text-align: center;

          .welcome {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 84px;
            font-weight: bold;
            color: #fff;
            opacity: 0.1;
            transform: translate(-50%, -16%);
            //width: 422px;
            //height: 64px;
            &:nth-child(2) {
              opacity: 0.7;
              animation: animation 8s ease-in-out infinite;
            }

            @keyframes animation {
              0%,
              100% {
                clip-path: polygon(0 0, 20% 0, 20% 100%, 0% 100%);
              }

              50% {
                clip-path: polygon(80% 0, 100% 0, 100% 100%, 80% 100%);
              }
            }
          }
        }

        .chinese {
          width: 100%;
          font-size: 50px;
          font-weight: 400;
          line-height: 70px;
          color: var(--color-white);
          text-align: center;
        }
      }

      .name {
        width: 100%;
        margin-top: 50px;
        font-size: 44px;
        font-weight: normal;
        line-height: 61px;
        color: var(--color-white);
        text-align: center;
      }
    }
  }

  .right-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background: url("/src/assets/images/login/xxx.png") no-repeat;
    //background-size: cover;
    padding: 20px;

    .login-form-wrapper {
      z-index: 2;
      width: 540px;
      padding: 60px;
      background: var(--color-bg-1);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      box-shadow: 0 0 5px #0000004d;

      .login-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        font-weight: bold;
        line-height: 32px;

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
          height: 44px;
          line-height: 44px;
          border-width: 0 0 1px;

          & + .arco-input-wrapper {
            margin-top: 40px;
          }

          :deep(.arco-input.arco-input-size-medium) {
            font-size: 20px;
          }
        }

        .sub-bt {
          width: 100%;
          height: 54px;
          margin-top: 20px;
          font-size: 20px;
        }
      }
    }
  }

  .theme-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
}
</style>
