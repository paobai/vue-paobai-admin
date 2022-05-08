<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div class="app-search-modal" v-if="visible">
        <div class="app-search-modal-content" v-click-outside="handleClose">
          <div class="app-search-modal-input__wrapper">
            <a-input
              class="app-search-modal-input"
              placeholder="请输入关键字"
              ref="inputRef"
              allow-clear
              @input="handleSearch"
            >
              <template #prefix>
                <a-icon-search />
              </template>
            </a-input>
          </div>

          <div class="app-search-modal-not-data" v-if="getIsNotData">暂无搜索结果</div>
          <ul class="app-search-modal-list" v-else ref="scrollWrap">
            <li
              :ref="setRefs(index)"
              v-for="(item, index) in searchResult"
              :key="item.path"
              :data-index="index"
              @mouseenter="handleMouseenter"
              @click="handleEnter"
              :class="[
                'app-search-modal-list__item',
                {
                  [`app-search-modal-list__item--active`]: activeIndex === index
                }
              ]"
            >
              <div class="app-search-modal-list__item-icon">
                <a-icon-list size="22" />
              </div>
              <div class="app-search-modal-list__item-text">
                {{ item.title }}
              </div>
              <div class="app-search-modal-list__item-enter">
                <a-icon-import size="22" />
              </div>
            </li>
          </ul>
          <!--          <AppSearchFooter />-->
          <search-footer></search-footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, unref, ref, watch, nextTick, Ref, defineExpose } from "vue"
import { useMenuSearch } from "./useMenuSearch"
import { useRefs } from "@/hooks/core"
import SearchFooter from "./search-footer.vue"

let visible = ref(false)

const scrollWrap: Ref<ElRef> = ref(null)
const inputRef = ref<Nullable<HTMLElement>>(null)

const [refs, setRefs] = useRefs()

watch(
  () => visible.value,
  visible => {
    visible &&
      nextTick(() => {
        unref(inputRef)?.focus()
      })
  }
)

const { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter, showSearch, handleClose } =
  useMenuSearch(refs, scrollWrap, visible)

defineExpose({ showSearch })

const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0)
</script>
<style scoped lang="less">
@prefix-cls: ~"app-search-modal";
@footer-prefix-cls: ~"app-search-footer";
.@{prefix-cls} {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: @app-navbar-height;
  background-color: rgb(0 0 0 / 25%);
  justify-content: center;

  &-content {
    position: relative;
    width: 632px;
    margin: 0 auto auto;
    background-color: var(--color-bg-1);
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
    flex-direction: column;
  }

  &-input__wrapper {
    display: flex;
    padding: 14px 14px 0;
    justify-content: space-between;
    align-items: center;
  }

  &-input {
    width: 100%;
    height: 48px;
    font-size: 1.5em;
    color: #1c1e21;
    border-radius: 6px;

    span[role="img"] {
      color: #999;
    }
  }

  &-cancel {
    display: none;
    font-size: 1em;
    color: #666;
  }

  &-not-data {
    display: flex;
    width: 100%;
    height: 100px;
    font-size: 0.9;
    color: rgb(150 159 175);
    align-items: center;
    justify-content: center;
  }

  &-list {
    max-height: 472px;
    padding: 0 14px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    overflow: auto;

    &__item {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      padding-bottom: 4px;
      padding-left: 14px;
      margin-top: 8px;
      font-size: 14px;
      color: @normal-text-color;
      cursor: pointer;
      background-color: var(--color-bg-1);
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d4d9e1;
      align-items: center;

      > div:first-child,
      > div:last-child {
        display: flex;
        align-items: center;
      }

      &--active {
        color: #fff;
        background-color: @primary-color;

        .@{prefix-cls}-list__item-enter {
          opacity: 100%;
        }
      }

      &-icon {
        width: 40px;
      }

      &-text {
        flex: 1;
        font-size: 16px;
      }

      &-enter {
        width: 40px;
        opacity: 0%;
      }
    }
  }
}
</style>
