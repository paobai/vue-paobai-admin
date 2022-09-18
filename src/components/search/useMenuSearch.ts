import type { RouterSysType } from "@/constant/settings"
import { ref, unref, nextTick, computed } from "vue"
import type { Ref, ComputedRef } from "vue"
import { useScrollTo } from "@/hooks/event/useScrollTo"
import { onKeyStroke, useDebounceFn } from "@vueuse/core"
import { useRouter } from "vue-router"
import { useUserHook } from "@/hooks/user"

export interface SearchResult {
  title: string
  routeName: string
  path?: string
  icon?: string
}

// Translate special characters
function transform(c: string) {
  const code: string[] = ["$", "(", ")", "*", "+", ".", "[", "]", "?", "\\", "^", "{", "}", "|"]
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ["", ...keys, ""].join(".*")
  return new RegExp(str)
}

export function useMenuSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, visible: Ref<boolean>) {
  const router = useRouter()
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref("")
  const activeIndex = ref(-1)
  const { showRouteList } = useUserHook()
  const menuList: ComputedRef<SearchResult[]> = computed(() => {
    function deepFlatRoutes(arr: RouterSysType[], res: SearchResult[] = []) {
      arr.forEach(e => {
        res.push({
          title: e.title.toLocaleLowerCase(),
          routeName: e.routeName,
          path: e.path,
          icon: e.icon
        })
        deepFlatRoutes(e.children || [], res)
      })
      return res
    }
    return deepFlatRoutes(showRouteList.value)
  })
  const handleSearch = useDebounceFn(search, 200)

  function search(key: string) {
    keyword.value = key.toLocaleLowerCase()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const searchList = menuList.value || []
    searchResult.value = searchList
      .filter(item => {
        return reg.test(item.title)
      })
      .slice(0, 5)
    activeIndex.value = 0
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight
    })
    start()
  }

  // enter keyboard event
  function handleEnter() {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    nextTick().then(() => {
      router.push({ name: to.routeName })
    })
  }

  const showSearch = () => {
    visible.value = true
  }
  // close search modal
  function handleClose() {
    searchResult.value = []
    visible.value = false
  }

  // enter search
  onKeyStroke("Enter", handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke("ArrowUp", handleUp)
  onKeyStroke("ArrowDown", handleDown)
  // esc close
  onKeyStroke("Escape", handleClose)

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter, showSearch, handleClose }
}
