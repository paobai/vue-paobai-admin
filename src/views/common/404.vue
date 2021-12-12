<template>
  <h1>404 page</h1>
  <button @click="goHome">回到登录页</button>
</template>
<script lang="ts">
import config from "@/config";
import {useRouter} from "vue-router";
export default {
  setup() {
    const router = useRouter()
    let goHome = function () {
      router.push({ path: config.homePagePath })
    }
    return { goHome }
  }
}
</script>
