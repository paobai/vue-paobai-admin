<template>
  <h1>404 page</h1>
  <button @click="goHome"> 回到登录页</button>
</template>
<script lang="ts">
import router from '@/router'
export default {
  setup(){
    let goHome = function () {
      router.push({ name: 'login'})
    }
    return {goHome}
  }
}
</script>