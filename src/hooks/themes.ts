import { computed } from "vue"

export default function useThemes() {
  const isDark = computed(() => {
    return false
  })
  return {
    isDark
  }
}
