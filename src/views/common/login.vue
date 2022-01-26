<template>
  <div class="login-wrapper">
    <div class="left-wrapper">
      <div class="content-wrapper">
        <div class="title">
          <div class="english">
            <img class="welcome" src="/src/assets/images/login/welcome-en.png">
          </div>
          <div class="chinese">欢迎回来</div>
        </div>
        <div class="name">{{title}}</div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="login-form-wrapper">
        <div class="login-title">
          <div class="logo-wrapper">
            <img class="logo" src="/src/assets/images/common/logo-with-text-bottom.png" />
          </div>
          <div>用户登录</div>
        </div>
        <div class="login-content-wrapper">
          <a-form :model="loginForm" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}" @keyup.enter.native="login()">
            <a-form-item field="userName">
              <a-input v-model="loginForm.userName" placeholder="用户名/手机号码">
                <template #prefix>
                  <a-icon-user  :style="{fontSize:'20px',color:'#BABABA'}"/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="passWord">
              <a-input v-model="loginForm.passWord" placeholder="密码" type="password">
                <template #prefix>
                  <a-icon-lock  :style="{fontSize:'20px',color:'#BABABA'}"/>
                </template>
              </a-input>
            </a-form-item>
            <a-button class="sub-bt" type="primary" @click="login">登&nbsp;&nbsp;录</a-button>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  ref,
  getCurrentInstance
} from 'vue'
import { useRouter } from "vue-router";
import Cookies from "js-cookie"
import config from '@/config'
import { AuthApi } from '@/api/upms-api'
import { AuthLoginReq } from '@/api/upms-api/model'
import { useUserHook } from '@/hooks/user'
export default {
  setup() {
    const userStore = useUserHook()
    let loginForm: AuthLoginReq = reactive({
      userName: "",
      passWord: ""
    });
    const router = useRouter()
    const login = async () => {
      AuthApi.login(loginForm).then(res => {
        Cookies.set('access_token', res.data.access_token)
        userStore.updateUserInfo(res.data.userInfo)
        // this.$cookie.set('refresh_token', res.data.refresh_token)
        router.replace({ path: config.app.homePagePath })
      })
    }
    return { login, loginForm , title: config.custom.htmlTitle}
  }
}
</script>
<style lang="less" scoped>
.login-wrapper{
  width: 100%;
  height: 100%;
  background: url("/src/assets/images/login/login-bak.png") no-repeat;
  background-size: cover;
  display: flex;
  .left-wrapper{
    overflow: hidden;
    max-width: 700px;
    width: 0;
    flex: 1;
    background: #06979C;
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-wrapper{
      width: 100%;
      transform: translateY(-100px);
      .title{
        position: relative;
        .english{
          width: 100%;
          text-align: center;
          top: 0;
          position: absolute;
          .welcome{
            width: 422px;
            height: 64px
          }
        }
        .chinese{
          width: 100%;
          text-align: center;
          font-size: 50px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 70px;
        }
      }
      .name{
        margin-top: 50px;
        width: 100%;
        text-align: center;
        font-size: 44px;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 61px;
      }
    }
  }
  .right-wrapper{
    padding: 20px;
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-form-wrapper{
      width: 540px;
      background: #FFFFFF;
      border-radius: 8px;
      padding: 60px;
      .login-title{
        font-size: 28px;
        font-weight: bold;
        color: #191919;
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo-wrapper{
          display: inline-block;
          .logo{
            width: 40px;
          }
        }
      }
      .login-content-wrapper{
        margin-top: 40px;
        .arco-input-wrapper{
          border-width: 0 0 1px 0;
          height: 44px;
          line-height: 44px;
          &+.arco-input-wrapper{
            margin-top: 40px;
          }
          :deep(.arco-input.arco-input-size-medium){
            font-size: 20px;
          }
        }
        .sub-bt{
          margin-top: 47px;
          height: 54px;
          width: 100%;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
