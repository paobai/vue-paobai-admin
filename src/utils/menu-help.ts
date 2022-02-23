import { RouterApiType, RouteType } from "@/constant/settings"

/**
 *
 * @param routeList
 * @param sourceArray
 */
export function getRouteList(
  routeList: RouterApiType[],
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
  routeList: RouterApiType[],
  sourceMap: { [key: string]: RouterApiType } = {}
): { [key: string]: RouterApiType } {
  routeList.forEach(item => {
    sourceMap[item.key] = item
    if (item.children) {
      getRouteMap(item.children, sourceMap)
    }
  })
  return sourceMap
}

export function getFirstMenuItem(
  routeList?: RouterApiType[]
): undefined | RouterApiType {
  let dist
  if (!routeList || routeList.length === 0) return dist
  for (let i = 0; i < routeList.length; i++) {
    dist = routeList[i]
    if (dist.type === RouteType.Page) return dist
    dist = getFirstMenuItem(dist.children)
    if (dist) return dist
  }
}
export function buildMenuName(route: RouterApiType) {
  return route.title + "-" + route.key
}

export function getCanShowRoute(routes: RouterApiType[]) {
  const res: RouterApiType[] = []
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
