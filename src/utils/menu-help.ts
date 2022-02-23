import { RouterApiType, RouterSysType, RouteType } from "@/constant/settings"

/**
 *
 * @param routeList
 * @param sourceArray
 */
export function getRouteList(
  routeList: RouterSysType[],
  sourceArray: any[] = []
) {
  routeList.forEach(item => {
    sourceArray.push(item)
    if (item.children) {
      getRouteList(item.children, sourceArray)
    }
  })
  return sourceArray
}

/**
 * 返回一个map 可以根据key 得到route
 * @param routeList
 * @param sourceMap
 */
export function getRouteMap(
  routeList: RouterSysType[],
  sourceMap: { [key: string]: RouterSysType } = {}
): { [key: string]: RouterSysType } {
  routeList.forEach(item => {
    sourceMap[item.key] = item
    if (item.children) {
      getRouteMap(item.children, sourceMap)
    }
  })
  return sourceMap
}

export function getFirstMenuItem(
  routeList?: RouterSysType[]
): undefined | RouterSysType {
  let dist
  if (!routeList || routeList.length === 0) return dist
  for (let i = 0; i < routeList.length; i++) {
    dist = routeList[i]
    if (dist.type === RouteType.Page) return dist
    dist = getFirstMenuItem(dist.children)
    if (dist) return dist
  }
}
export function buildMenuName(route: RouterSysType | RouterApiType) {
  return route.title + "-" + route.key
}

export function getCanShowRoute(routes: RouterSysType[]) {
  const res: RouterSysType[] = []
  routes.filter(route => {
    if (route.notShow) return false
    const children = getCanShowRoute(route.children || [])
    res.push({
      ...route,
      children: children
    })
    return true
  })
  return res
}
