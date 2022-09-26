<template>
  <ul class="file-grid">
    <a-trigger
      v-for="item in data"
      :key="item.id"
      trigger="contextMenu"
      align-point
      animation-name="slide-dynamic-origin"
      auto-fit-transform-origin
      position="bl"
      update-at-scroll>
      <li class="file-grid-item" @click.stop="handleClickFile(item)">
        <div class="file-image">
          <file-img :data="item"></file-img>
        </div>
        <div class="file-name">{{ getFileName(item) }}</div>

        <!-- 勾选模式 -->
        <section
          v-show="props.isBatchMode"
          class="check-mode"
          :class="{ checked: props.selectedFileIdList.includes(item.id) }"
          @click.stop="handleCheckFile(item)">
          <a-checkbox
            class="checkbox"
            :model-value="props.selectedFileIdList.includes(item.id)"
            @change="handleCheckFile(item)"></a-checkbox>
        </section>
      </li>
      <template #content>
        <file-right-menu :file-info="item" @click="handleRightMenuItemClick($event, item)"></file-right-menu>
      </template>
    </a-trigger>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import FileImg from "./file-img.vue"
import FileRightMenu from "./file-right-menu.vue"
import type { ApiFileItem } from "@/api/file"

const props = defineProps({
  // 文件数据
  data: {
    type: Array as PropType<ApiFileItem[]>,
    default: () => []
  },
  // 批量模式下选中的文件id数组
  selectedFileIdList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  // 是否是批量模式
  isBatchMode: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const emit = defineEmits(["click", "check", "right-menu-click"])

// 文件名称带后缀
const getFileName = (item: ApiFileItem) => {
  return `${item.name}${item.extendName ? `.${item.extendName}` : ""}`
}

// 点击事件
const handleClickFile = (item: ApiFileItem) => {
  emit("click", item)
}

// 选中事件
const handleCheckFile = (item: ApiFileItem) => {
  emit("check", item)
}

// 右键菜单点击事件
const handleRightMenuItemClick = (mode: string, item: ApiFileItem) => {
  emit("right-menu-click", mode, item)
}
</script>

<style lang="less" scoped>
.file-grid {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 12px;
  overflow: auto;
  background: var(--color-bg-2);
}

.file-grid-item {
  position: relative;
  z-index: 1;
  // background: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-light-1);
  }

  &:active {
    svg,
    img {
      transform: scale(0.9);
    }
  }

  .file-image {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    overflow: hidden;

    .img {
      width: auto;
      height: 100%;
      transition: all 0.3s;
    }

    .svg-img {
      height: 100%;
      transition: all 0.3s;
    }
  }

  .file-name {
    height: 2em;
    padding: 0 5px;
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
  }

  .check-mode {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 10%);

    &.checked {
      background: none;
    }

    .checkbox {
      position: absolute;
      top: 5px;
      left: 5px;
      padding-left: 0;
    }
  }
}
</style>
