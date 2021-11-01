import {RouterApiType, RouteType} from "@/constant/settings";

export function fixRouteList (routeList: RouterApiType[], parentKey: string[] = [], sourceArray:any[] = []) {
    routeList.forEach(item => {
        item.parentKey = parentKey
        sourceArray.push(item)
        if (item.children) {
            fixRouteList(item.children, parentKey.concat(item.key), sourceArray)
        }
    })
    return sourceArray
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
