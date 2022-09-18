<template>
  <div ref="rootRef" class="bk-wrapper">
    <div v-for="(item, index) in roundList" :key="index" class="round-item-wrapper">
      <div :ref="el => (roundRefs[index] = el)" class="round-item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue"
import { useMouseInElement } from "@vueuse/core"
import type { MaybeElement, MaybeRef } from "@vueuse/core"
import { watch } from "vue"
type directType = "left" | "right" | "top" | "bottom"
type otherConfig = "blur"
type roundConfigType = Partial<Record<directType | otherConfig, number>> & Record<"step" | "size", number>
import anime from "animejs"
export default {
  setup() {
    let roundList = reactive<roundConfigType[]>([
      { left: 15, top: 10, step: 0.1, size: 80, blur: 1 },
      { left: -10, top: 30, step: 0.02, size: 80, blur: 10 },
      { left: -30, bottom: 15, step: 0.01, size: 80, blur: 20 },
      { right: 80, top: 80, step: 0.01, size: 40, blur: 20 },
      { left: 20, bottom: 50, step: 0.01, size: 80, blur: 30 },
      { right: 40, top: 10, step: 0.02, size: 60, blur: 5 },
      { right: 20, bottom: 10, step: 0.015, size: 80, blur: 20 },
      { right: 10, top: 30, step: 0.02, size: 60, blur: 9 },
      { right: 10, top: 60, step: 0.04, size: 60, blur: 2 },
      { right: 40, bottom: 10, step: 0.1, size: 80, blur: 1 }
    ])
    let roundRefs = ref<ElRef[]>([])
    let rootRef = ref<ElRef>()
    onMounted(() => {
      let roundWrapperDomList = Array.from(rootRef.value!.querySelectorAll(".round-item-wrapper")) as HTMLElement[]
      let roundDomList = Array.from(rootRef.value!.querySelectorAll(".round-item-wrapper .round-item")) as HTMLElement[]
      // round-item init
      roundWrapperDomList.forEach((roundRef, index) => {
        if (!roundRef) return
        let setList: directType[] = ["left", "right", "bottom", "top"]
        setList.forEach(setItem => {
          let roundConfig = roundList[index]
          if (roundConfig[setItem] !== undefined) roundRef.style[setItem] = roundConfig[setItem] + "%"
          if (roundConfig.blur) roundRef.style.filter = `blur(${roundConfig.blur}px)`
          roundRef.style.width = roundConfig.size + "px"
          roundRef.style.height = roundConfig.size + "px"
          roundRef.style.animationDelay = (Math.random() * 4).toFixed(1) + "s"
        })
      })
      // round-item mouse move
      let { x, y } = useMouseInElement(rootRef as MaybeRef<MaybeElement>)
      watch([x, y], ([x, y]) => {
        let rootElement = rootRef.value!
        let width = rootElement.clientWidth
        let height = rootElement.clientHeight
        roundDomList.forEach((roundRef, index) => {
          if (!roundRef) return
          let roundConfig = roundList[index]
          let transX = (-1 * (x - width / 2) * roundConfig.step).toFixed(0)
          let transY = (-1 * (y - height / 2) * roundConfig.step).toFixed(0)
          roundRef.style.transform = `translate(${transX}px, ${transY}px)`
        })
      })
      // root wrapper auto move
      let randomMove = () => {
        anime({
          targets: roundWrapperDomList,
          translateX: function () {
            return anime.random(-40, 40)
          },
          translateY: function () {
            return anime.random(-40, 40)
          },
          easing: "linear",
          duration: 5000,
          complete: randomMove
        })
      }
      randomMove()
    })
    return { roundList, roundRefs, rootRef }
  }
}
</script>

<style lang="less" scoped>
.bk-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .round-item-wrapper {
    position: absolute;

    .round-item {
      position: relative;
      width: 100%;
      height: 100%;
      background: rgba(var(--primary-6), 1);
      border-radius: 50%;
      animation: flash-animation 4s ease-in-out infinite;

      &::after {
        position: absolute;
        right: 15%;
        bottom: 15%;
        width: 30%;
        height: 30%;
        content: "";
        background: #fff;
        filter: blur(10px);
        opacity: 0.5;
      }
    }

    @keyframes flash-animation {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.5;
      }

      100% {
        opacity: 1;
      }
    }
  }
}
</style>
