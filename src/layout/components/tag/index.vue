<template>
  <div class="app-tag">
    <div class="app-left-tag">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a-icon-home style="font-size: 14px" />
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="item in leftTag" :key="item.title">{{ item.title }}</a-breadcrumb-item>
        <template #separator>
          <a-icon-right />
        </template>
      </a-breadcrumb>
    </div>
    <div class="app-tag-main">
      <a-dropdown
        v-for="(item, index) in appTagList"
        :key="item.key"
        trigger="contextMenu"
        :style="{ display: 'block' }"
        @select="value => tagSelect(value, item, index)">
        <div class="tag-item-card" :class="{ active: activeRouteKey === item.key }">
          <div class="tag-name" @click="gotoTag(item)">{{ item.title }}</div>
          <div class="tag-options" @click="deleteTag(item, index)">
            <a-icon-close />
          </div>
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
          <a-doption value="reloadChose">
            <template #icon>
              <a-icon-refresh spin />
            </template>
            <template #default>刷新当前</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
    <div class="app-tag-options">
      <div title="刷新当前" class="options-item" @click="optionsClick('refresh')">
        <a-icon-refresh />
      </div>
      <div title="关闭当前" class="options-item" @click="optionsClick('close')">
        <a-icon-close />
      </div>
      <div v-if="fullScreenStatus === 0" title="全屏" class="options-item" @click="optionsClick('fullScreen')">
        <a-icon-fullscreen />
      </div>
      <div v-else title="退出全屏" class="options-item" @click="optionsClick('exitFullScreen')">
        <a-icon-fullscreen-exit />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from "vue"
import type { Ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { RouteLocationNormalizedLoadedCustom, tagType } from "@/constant/settings"
import config from "@/config"
import { useUserHook } from "@/hooks/user"
import { useAppHook } from "@/hooks/app"
export default defineComponent({
  setup() {
    let { getRouteByKey } = useUserHook()
    let { nowMenu } = useAppHook()
    let leftTag = computed(() => {
      if (!unref(nowMenu)) {
        return
      }
      let keyList = (unref(nowMenu)!.parentKey || []).concat(unref(nowMenu)!.key)
      let menuList: any = []
      keyList.forEach(key => {
        menuList.push(getRouteByKey(key))
      })
      return menuList
    })
    const router = useRouter()
    const fullScreenStatus = ref(0)
    const route: RouteLocationNormalizedLoadedCustom = useRoute() as RouteLocationNormalizedLoadedCustom
    let activeRouteKey: Ref<String> = ref("")
    let appTagList: Ref<Array<tagType>> = ref([])
    const deleteTag = function (item: tagType, index: number) {
      appTagList.value.splice(index, 1)
      if (appTagList.value.length === 0) {
        router.replace({ path: config.app.homePagePath })
        return
      }
      if (activeRouteKey.value === item.key) {
        let nextIndex = index - 1 < 0 ? 0 : index - 1
        let nextItem = appTagList.value[nextIndex]
        router.replace({ path: nextItem.path })
      }
    }
    const gotoTag = function (item: tagType) {
      router.replace({ path: item.path })
    }
    const tagSelect = function (value: string, item: tagType, index: number) {
      if (value === "closeChose") {
        deleteTag(item, index)
      } else if (value === "closeAll") {
        appTagList.value = item.path === config.app.homePagePath ? [item] : []
        router.replace({ path: config.app.homePagePath })
      } else if (value === "reloadChose") {
        router.replace({
          name: config.app.redirectPageName,
          params: { distPath: item.path }
        })
      }
    }
    const optionsClick = function (optionsValue: string) {
      let distIndex = appTagList.value.findIndex(item => item.key === activeRouteKey.value)
      let distItem = appTagList.value[distIndex]
      if (optionsValue === "refresh") {
        tagSelect("reloadChose", distItem, distIndex)
      } else if (optionsValue === "close") {
        tagSelect("closeChose", distItem, distIndex)
      } else if (optionsValue === "fullScreen") {
        document.documentElement.requestFullscreen()
        fullScreenStatus.value = 1
      } else if (optionsValue === "exitFullScreen") {
        document.exitFullscreen()
        fullScreenStatus.value = 0
      }
    }
    watch(
      () => route.path,
      () => {
        activeRouteKey.value = route.meta.key
        let find = appTagList.value.find(item => item.key === route.meta.key)
        if (find) return
        if (route.meta.notShow) return
        appTagList.value.unshift({
          title: route.meta.title as string,
          key: route.meta.key as string,
          name: route.name as string,
          path: route.path as string
        })
      },
      { immediate: true }
    )
    return {
      appTagList,
      deleteTag,
      gotoTag,
      activeRouteKey,
      tagSelect,
      fullScreenStatus,
      optionsClick,
      leftTag
    }
  }
})
</script>

<style lang="less" scoped>
.app-tag {
  display: flex;
  box-shadow: 0 1px 4px @primary-color;

  .app-left-tag {
    flex-shrink: 0;
    padding: 0 16px;
    line-height: 30px;

    .menu-tag {
      padding: 0 8px;
      border-right: 1px solid @primary-color;
    }
  }

  .app-tag-main {
    flex: auto;
    padding: 3px;
    overflow: hidden;
    white-space: pre;

    .tag-item-card {
      display: inline-block;
      height: 24px;
      padding: 2px 4px;
      border: 1px solid @primary-color;
      border-radius: 4px;

      .tag-name {
        display: inline-block;
        height: 18px;
        padding: 0 4px;
        margin-right: 6px;
        line-height: 18px;
        color: var(--color-text-2);
        cursor: pointer;
      }

      .tag-options {
        display: inline-block;
        padding-left: 4px;
        cursor: pointer;
        border-left: 1px solid @primary-color;
      }

      &.active {
        color: var(--color-white);
        background: @primary-color;
        border-color: @primary-color;

        .tag-options {
          border-color: var(--color-white);
        }

        .tag-name {
          color: var(--color-white);
        }
      }

      & + .tag-item-card {
        margin-left: 16px;
      }
    }
  }

  .app-tag-options {
    flex-shrink: 0;
    color: var(--color-text-1);

    .options-item {
      display: inline-block;
      padding: 0 8px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;

      & + .options-item {
        border-left: 1px solid @primary-color;
      }
    }
  }
}
</style>
