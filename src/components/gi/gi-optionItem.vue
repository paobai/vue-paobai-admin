<template>
  <li class="gi-option-item" :class="{ more: more, active: active }" @click="handleClick">
    <section class="wrap">
      <span class="icon-wrapper">
        <slot name="icon">
          <component :is="icon" :size="16" :stroke-width="2"></component>
        </slot>
      </span>
      <slot
        ><span>{{ label }}</span></slot
      >
    </section>
    <a-icon-right v-if="more" />
  </li>
</template>

<script setup lang="ts" name="GiOptionItem">
defineProps({
  icon: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  // more
  more: {
    type: Boolean,
    default: false
  },
  // 选中高亮
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["click"])

const handleClick = () => {
  emit("click")
}
</script>

<style lang="less" scoped>
.gi-option-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 5px 0 10px;
  font-size: 14px;
  line-height: 34px;
  color: var(--color-text-2);
  cursor: pointer;
  user-select: none;

  .wrap {
    display: flex;
    align-items: center;

    .icon-wrapper {
      display: flex;
      align-items: center;
      margin-right: 4px;
    }
  }

  &.active,
  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
  }

  &.more {
    justify-content: space-between;
  }
}
</style>
