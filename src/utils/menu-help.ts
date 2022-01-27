import {RouterApiType, RouteType} from "@/constant/settings";

/**
 * 处理route 增加信息
 * @param routeList
 * @param parentKey
 * @param parent
 */
export function fixRoute (routeList: RouterApiType[], parentKey: string[] = [], parent?: RouterApiType): RouterApiType[] {
    routeList.forEach(item => {
        item.parentKey = parentKey
        if (!item.icon && parent) {
            item.icon = parent.icon
        }
        if (item.children) {
            fixRoute(item.children, parentKey.concat(item.key), item)
        }
    })
    return routeList
}

/**
 *
 * @param routeList
 * @param sourceArray
 */
export function getRouteList (routeList: RouterApiType[], sourceArray:any[] = []) {
    routeList.forEach(item => {
        sourceArray.push(item)
        if (item.children) {
            getRouteList(item.children, sourceArray)
        }
    })
    return sourceArray
}

/**
 * 根据key 得到route map
 * @param routeList
 * @param sourceMap
 */
export function getRouteMap (routeList: RouterApiType[], sourceMap: {[key: string]: RouterApiType } = {}): {[key: string]: RouterApiType } {
    routeList.forEach(item => {
        sourceMap[item.key] = item
        if (item.children) {
            getRouteMap(item.children, sourceMap)
        }
    })
    return sourceMap
}

export function getFirstMenuItem(routeList?: RouterApiType[]): undefined|RouterApiType {
    let dist
    if (!routeList || routeList.length === 0) return dist
    for (let i = 0; i< routeList.length; i++) {
        dist = routeList[i]
        if (dist.type === RouteType.Page) return dist
        dist = getFirstMenuItem(dist.children)
        if (dist) return dist
    }
}
export function buildMenuName (route: RouterApiType) {
    return route.title + '-' + route.key
}

export function getCanShowRoute (routes: RouterApiType[]) {
    let res:RouterApiType[] = []
    routes.filter(route => {
        if (route.notShow) return false
        let children = getCanShowRoute(route.children || [])
        res.push({
            ...route,
            children: children
        })
        return true
    })
    return res
}

