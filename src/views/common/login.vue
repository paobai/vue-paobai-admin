<template>
  <div ref="rootRef" class="login-wrapper">
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
      <div class="login-form-wrapper">
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
      <div ref="roundWrapperRef" class="right-round-wrapper">
        <div class="right-round"></div>
      </div>
    </div>
    <a-button type="text" class="theme-btn" size="medium" @click="toggleAppTheme">
      <template #icon>
        <template v-if="darkAppTheme">
          <a-icon-moon-fill size="20" />
        </template>
        <template v-else>
          <a-icon-sun-fill size="20" />
        </template>
      </template>
    </a-button>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch } from "vue"
import { useRouter } from "vue-router"
import Cookies from "@/utils/storage/cookie"
import config from "@/config"
import { AuthApi } from "@/api/auth-api"
import { AuthLoginByPasswordReq } from "@/api/auth-api/model"
import { grantType } from "@/constant"
import { useAppHook } from "@/hooks/app"
import { useMouseInElement } from "@vueuse/core"

export default {
  setup() {
    let { sysColor, darkAppTheme, toggleAppTheme } = useAppHook()
    let rootRef = ref<ElRef>(null)
    let roundWrapperRef = ref<ElRef>(null)
    let { x, y } = useMouseInElement(rootRef)
    watch([x, y], ([x, y]) => {
      let rootElement = rootRef.value!
      let roundWrapperElement = roundWrapperRef.value!
      let width = rootElement.clientWidth
      let height = rootElement.clientHeight
      let transX = ((-1 * (x - width / 2)) / 30).toFixed(0)
      let transY = ((-1 * (y - height / 2)) / 30).toFixed(0)
      roundWrapperElement.style.transform = `translate(${transX}px, ${transY}px)`
      console.log(transX, transY)
    })
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
      darkAppTheme,
      rootRef,
      roundWrapperRef
    }
  }
}
</script>
<style lang="less" scoped>
@loginBkColor: var(--primary-1);
.login-wrapper {
  background-color: rgba(@loginBkColor, 1);
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .left-wrapper {
    @media screen and (max-width: 1048px) {
      display: none;
    }
    overflow: hidden;
    max-width: 750px;
    width: 0;
    flex: 1;
    background: @primary-color;
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-wrapper {
      width: 100%;
      .title {
        position: relative;
        .english {
          width: 100%;
          text-align: center;
          top: 0;
          position: absolute;
          .welcome {
            opacity: 0.1;
            font-size: 84px;
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -16%);
            //width: 422px;
            //height: 64px;
            &:nth-child(2) {
              opacity: 0.5;
              animation: animation 8s ease-in-out infinite;
            }
            @keyframes animation {
              0%,
              100% {
                -webkit-clip-path: polygon(0 0, 20% 0, 20% 100%, 0% 100%);
                clip-path: polygon(0 0, 20% 0, 20% 100%, 0% 100%);
              }
              50% {
                -webkit-clip-path: polygon(80% 0, 100% 0, 100% 100%, 80% 100%);
                clip-path: polygon(80% 0, 100% 0, 100% 100%, 80% 100%);
              }
            }
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
    //background: url("/src/assets/images/login/xxx.png") no-repeat;
    //background-size: cover;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .login-form-wrapper {
      z-index: 1;
      border: 1px solid var(--color-border);
      box-shadow: 0 0 5px #0000004d;
      width: 540px;
      background: var(--color-bg-1);
      border-radius: 8px;
      padding: 60px;
      .login-title {
        font-size: 28px;
        font-weight: bold;
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
    .right-round-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .right-round {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(@loginBkColor, 1);
        border-radius: 50%;
        //left: calc(50% - 40px);
        //top: -50%;
        transform: translateX(-40px);
        &:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(@loginBkColor, 0.5);
          border-radius: 50%;
          top: 30%;
        }
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(@loginBkColor, 0.2);
          border-radius: 50%;
          top: -30%;
        }
      }
    }
  }
  .theme-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
