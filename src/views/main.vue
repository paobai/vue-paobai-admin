<template>
  <div>
    123123
    {{language}}
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'App',
  components:{
    HelloWorld
  },
  setup(){
    let store = useStore()
    const language = computed(() => {
      return store.state.app.language
    })
    return { language }
  }
})
</script>
