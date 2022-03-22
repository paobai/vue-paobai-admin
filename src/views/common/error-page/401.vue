<!--
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-01-15 13:50:15
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-26 08:49:38
-->
<template>
  <div class="error-page-401">
    <div class="errPage-container">
      <a-button icon="el-icon-arrow-left" class="back-btn" @click="back"> 返回 </a-button>
      <a-row>
        <a-col :span="12">
          <h1 class="text-jumbo text-ginormous">Oops!</h1>
          gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
          <h2>你没有权限去该页面</h2>
          <h6>如有不满请联系你领导</h6>
          <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <li class="link-type">
              <router-link :to="homePage"> 回首页 </router-link>
            </li>
            <li class="link-type">
              <a href="https://github.com/rcyj-FED">随便看看</a>
            </li>
            <li>
              <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
            </li>
          </ul>
        </a-col>
        <a-col :span="12"> </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { useRoute, useRouter } from "vue-router"
import config from "@/config"
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      dialogVisible: false,
      homePage: config.app.homePagePath,
      back() {
        if (route.query.noGoBack) {
          router.push({ path: config.app.homePagePath }).catch(err => {
            console.warn(err)
          })
        } else {
          router.go(-1)
        }
      }
    })

    return { ...toRefs(data) }
  }
})
</script>

<style lang="less" scoped>
.error-page-401 {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  overflow-y: auto;
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    .back-btn {
      background: #008489;
      color: #fff;
      border: none !important;
    }

    .some-gif {
      margin: 0 auto;
      display: block;
    }

    .some-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }

    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: var(--color-text-2);
    }

    .list-unstyled {
      font-size: 14px;

      li {
        padding-bottom: 5px;
      }

      a {
        color: #008489;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
