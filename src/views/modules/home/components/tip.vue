<template>
  <a-card :loading="loading" class="tip-card" title="TIP/技术栈">
    <a-typography style="margin-top: -20px">
      <a-typography-title :heading="4">前言</a-typography-title>
      <a-typography-paragraph
        >为何开发？目前前端框架很多了为什么还要在开发一个呢。目前我看到过几个前端admin， 比如vben应该是最广为人知的，但是里面的代码对新手不是很友好。也有有很多东西是用不到的，同时会影响开发体验。
        比如vue-il8n国际化，这个对项目耦合度太高了。我相信开发给国内用户的人来说不需要国际化，那就非常不希望代码里面出现$t这个东西存在了。
        加之很多框架对用户权限菜单支持不是特别好。以及目前没有（可能我不知道）基于Arco Design的admin，所以我打算开发一个这样的框架。</a-typography-paragraph
      >
      <a-typography-title :heading="4"><a-link href="https://gitee.com/zheng_yc/paobai" style="font-size: 24px">PAOBAI-ADMIN</a-link>框架简介</a-typography-title>
      <a-typography-title :heading="5">技术栈</a-typography-title>
      <a-typography-paragraph>
        <ul>
          <li>Vue 全家桶，基于Vue3, Vite, Vue Router 开发</li>
          <li>Typescript。应用程序级 JavaScript 的语言</li>
          <li>UI库来自字节跳动开源的<a-link href="https://arco.design/vue/docs/start">Arco Design</a-link>框架</li>
          <li>状态管理工具使用<a-link href="https://pinia.vuejs.org/">Pinia</a-link></li>
          <li>图表使用<a-link href="https://echarts.apache.org/zh/index.html">Echarts</a-link></li>
          <li>数据模拟使用<a-link href="http://mockjs.com/">Mockjs</a-link>，并搭配vite-plugin-mock插件食用</li>
        </ul></a-typography-paragraph
      >
      <a-typography-title :heading="5">Tip</a-typography-title>
      <a-typography-paragraph>
        <ul>
          <li>项目部分页面copy自<a-link href="http://vue-pro.arco.design/login">Arco Design Pro</a-link></li>
          <li>
            之所以不用Arco Design Pro是因为有几点原因：
            <ul>
              <li>路由权限实现太过单调，修改角色所对应显示的菜单需要修改前端代码而不能通过修改数据来实现。该项目可通过配置角色获取能访问的菜单通过接口返回后动态载入，可以在数据层面实现配置。</li>
              <li>
                菜单显示位置不够多态。只能在侧边栏显示菜单。本人的项目很多一级菜单在导航栏（顶部），二级菜单在侧边栏，或者都有可能。 该项目有三种菜单显示方式：
                <ul>
                  <li>菜单都在侧边栏</li>
                  <li>菜单都在侧边栏导航栏（顶部）</li>
                  <li>一级菜单在导航栏，选中的子菜单在侧边栏显示，同时选中一级菜单若没有子菜单则自动隐藏侧边栏（该菜单方式可以实现首页全屏的应用场景）。</li>
                </ul>
              </li>
              <li></li>
            </ul>
          </li>
          <li>页面setting在右侧悬浮设置按钮上，请尝试使用</li>
          <li>若有疑问或bug，请提issue至<a-link href="https://gitee.com/zheng_yc/paobai">PAOBAI-ADMIN</a-link></li>
        </ul></a-typography-paragraph
      >
    </a-typography>
  </a-card>
</template>

<script>
import { defineComponent, inject } from "vue"
export default defineComponent({
  setup() {
    const loading = inject("loading")
    return { loading }
  }
})
</script>

<style lang="less" scoped>
.tip-wrapper {
  .tip-card {
    .arco-link {
      font-size: unset;
    }
  }
}
</style>
