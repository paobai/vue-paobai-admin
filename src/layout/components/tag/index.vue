<template>
  <div class="app-tag">
    <div class="tag-item-card" :class="{'active': activeRouteKey === item.key}" v-for="(item, index) in appTagList" :key="item.key">
      <div class="tag-name" @click="gotoTag(item)">{{item.title}}</div>
      <div class="tag-options" @click="deleteTag(item, index)"><a-icon-close /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from "vue"
import {useRouter, useRoute} from "vue-router";

export default defineComponent({
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    let activeRouteKey = ref('')
    let appTagList = ref([])
    const deleteTag = function (item, index) {
      appTagList.value.splice(index, 1)
      if (appTagList.value.length === 0) {
        router.replace({ path: '/main' })
        return
      }
      if (activeRouteKey.value === item.key) {
        let nextIndex = index - 1 < 0 ? 0 : index - 1
        let nextItem =  appTagList.value[nextIndex]
        router.replace({ path: nextItem.path })
      }
    }
    const gotoTag = function (item) {
      router.replace({ path: item.path })
    }
    watch(() => route.path,() => {
      activeRouteKey.value = route.meta.key
      let find = appTagList.value.find(item => item.key === route.meta.key)
      if (find) return
      appTagList.value.push({
        title: route.meta.title,
        key: route.meta.key,
        name: route.name,
        path: route.path
      })
    }, { immediate: true })
    return {
      appTagList,
      deleteTag,
      gotoTag,
      activeRouteKey
    }
  }
})
</script>

<style lang="less" scoped>
.app-tag{
  box-shadow: 0 1px 4px #999999;
  padding: 4px;
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
</style>