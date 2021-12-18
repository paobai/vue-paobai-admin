<template>
  <div class="app-tag">
    <div class="app-tag-main">
      <a-dropdown trigger="contextMenu" :style="{display:'block'}"  v-for="(item, index) in appTagList" :key="item.key" @select="(value)=> tagSelect(value, item, index)">
        <div class="tag-item-card" :class="{'active': activeRouteKey === item.key}">
          <div class="tag-name" @click="gotoTag(item)">{{item.title}}</div>
          <div class="tag-options" @click="deleteTag(item, index)"><a-icon-close /></div>
        </div>
        <template #content>
          <a-doption value="closeChose">
            <template #icon>
              <a-icon-close />
            </template>
            <template #default>关闭选择</template>
          </a-doption>
          <a-doption value="closeAll">
            <template #icon>
              <a-icon-close />
            </template>
            <template #default>关闭全部</template>
          </a-doption>
          <a-doption  value="reloadChose">
            <template #icon>
              <a-icon-refresh spin/>
            </template>
            <template #default>刷新当前</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
    <div class="app-tag-options">
      <div title="刷新当前" class="options-item" @click="optionsClick('refresh')">
        <a-icon-refresh/>
      </div>
      <div title="关闭当前" class="options-item"  @click="optionsClick('close')">
        <a-icon-close/>
      </div>
      <div title="全屏" class="options-item" v-if="fullScreenStatus === 0" @click="optionsClick('fullScreen')">
        <a-icon-fullscreen />
      </div>
      <div title="退出全屏" class="options-item"  v-else @click="optionsClick('exitFullScreen')">
        <a-icon-fullscreen-exit />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from "vue"
import type { Ref } from 'vue'
import {useRouter, useRoute} from "vue-router";
import {RouteLocationNormalizedLoadedCustom, tagType} from '@/constant/settings'
import config from '@/config'

export default defineComponent({
  setup (props) {
    const router = useRouter()
    const fullScreenStatus = ref(0)
    const route: RouteLocationNormalizedLoadedCustom = useRoute() as RouteLocationNormalizedLoadedCustom
    let activeRouteKey: Ref<String> = ref('')
    let appTagList: Ref<Array<tagType>> = ref([])
    const deleteTag = function (item: tagType, index: number) {
      appTagList.value.splice(index, 1)
      if (appTagList.value.length === 0) {
        router.replace({ path: config.app.homePagePath })
        return
      }
      if (activeRouteKey.value === item.key) {
        let nextIndex = index - 1 < 0 ? 0 : index - 1
        let nextItem =  appTagList.value[nextIndex]
        router.replace({ path: nextItem.path })
      }
    }
    const gotoTag = function (item: tagType) {
      router.replace({ path: item.path })
    }
    const tagSelect = function (value: string, item: tagType, index: number) {
      if (value === 'closeChose') {
        deleteTag(item, index)
      } else if (value === 'closeAll'){
        appTagList.value = item.path === config.app.homePagePath ? [item]: []
        router.replace({ path: config.app.homePagePath })
      } else if(value === 'reloadChose') {
        router.replace({
          name: "跳转页-redirect-page",
          params: {distPath: item.path}
        });
      }
    }
    const optionsClick = function (optionsValue: string) {
      let distIndex = appTagList.value.findIndex(item => item.key === activeRouteKey.value)
      let distItem = appTagList.value[distIndex]
      if (optionsValue === 'refresh') {
        tagSelect('reloadChose', distItem, distIndex)
      } else if (optionsValue === 'close') {
        tagSelect('closeChose', distItem, distIndex)
      } else if (optionsValue === 'fullScreen') {
        document.documentElement.requestFullscreen()
        fullScreenStatus.value = 1
      } else if (optionsValue === 'exitFullScreen') {
        document.exitFullscreen();
        fullScreenStatus.value = 0
      }
    }
    watch(() => route.path,() => {
      activeRouteKey.value = route.meta.key
      let find = appTagList.value.find(item => item.key === route.meta.key)
      if (find) return
      if (route.meta.notShow) return;
      appTagList.value.push({
        title: route.meta.title  as string,
        key: route.meta.key  as string,
        name: route.name as string,
        path: route.path as string
      })
    }, { immediate: true })
    return {
      appTagList,
      deleteTag,
      gotoTag,
      activeRouteKey,
      tagSelect,
      fullScreenStatus,
      optionsClick
    }
  }
})
</script>

<style lang="less" scoped>
.app-tag{
  box-shadow: 0 1px 4px #999999;
  display: flex;
  .app-tag-main{
    padding: 3px;
    flex: auto;
    overflow: hidden;
    .tag-item-card {
      display: inline-block;
      border: 1px solid #666666;
      padding: 2px 4px;
      height: 24px;
      border-radius: 4px;
      &.active{
        background: @primary-color;
        color: #ffffff;
        border-color: @primary-color;
        .tag-options{
          border-color: #ffffff;
        }
      }
      &+.tag-item-card{
        margin-left: 16px;
      }
      .tag-name{
        cursor: pointer;
        display: inline-block;
        line-height: 18px;
        height: 18px;
        padding: 0 4px;
        margin-right: 6px;
      }
      .tag-options{
        border-left: 1px solid #999999;
        cursor: pointer;
        padding-left: 4px;
        display: inline-block;
      }
    }
  }
  .app-tag-options{
    .options-item{
      cursor: pointer;
      padding: 0 8px;
      font-size: 16px;
      line-height: 30px;
      display: inline-block;
      &+.options-item{
        border-left: 1px solid #999999;
      }
    }
  }
}
</style>