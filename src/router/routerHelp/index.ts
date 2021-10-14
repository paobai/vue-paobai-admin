import { RouterOptions, RouteRecordRaw, Router } from 'vue-router'
import { isURL } from '@/utils/validate'

export declare interface MyRouterOptions extends RouterOptions{
    isAddDynamicMenuRoutes?: Boolean
}
export declare interface MyRouter extends Router{
    readonly options: MyRouterOptions;
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
export function fnAddDynamicMenuRoutes (menuList:any[] = [], routes:any[] = []) : any{
    var temp:any[] = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
            temp = temp.concat(menuList[i].children)
        } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
            // 开头去掉/
            menuList[i].path = menuList[i].path.replace(/^\//, '')
            var route = {
                path: menuList[i].path,
                component: null,
                name: menuList[i].path,
                meta: {
                    id: menuList[i].id,
                    parentId: menuList[i].parentId,
                    title: menuList[i].menuName,
                    isDynamic: true,
                    isTab: true,
                    iframeUrl: ''
                }
            }
            // url以http[s]://开头, 通过iframe展示
            if (isURL(menuList[i].path)) {
                route['path'] = `i-${menuList[i].id}`
                route['name'] = `i-${menuList[i].id}`
                route['meta']['iframeUrl'] = menuList[i].path
            } else {
                try {
                    let distComponent = null
                    // 先看直接目录有没有
                    try { distComponent = import.meta.glob(`/src/views/${menuList[i].path}`) } catch (e) {}
                    // 没有的话就去该目录的index文件看看有没有
                    if (!distComponent) distComponent = import.meta.glob(`/src/views/${menuList[i].path}/index`) || null
                    route['component'] = distComponent as any
                } catch (e) {}
            }
            routes.push(route)
        }
    }
    if (temp.length >= 1) {
        return fnAddDynamicMenuRoutes(temp, routes)
    } else {
        return routes
    }
}


/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 * @param globalRoutes
 */
export function fnCurrentRouteType (route: RouteRecordRaw, globalRoutes:any = []) :any {
    var temp: any[] = []
    for (var i = 0; i < globalRoutes.length; i++) {
        if (route.path === globalRoutes[i].path) {
            return 'global'
        } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 根据来源menu修改成需要的样子
 * @param menu
 */
export function fixMenu (menu: any[]) : any{
    // let btPerms = []
    // let newMenu = fixMenuMainDo(menu, btPerms)
    // let routers = fnAddDynamicMenuRoutes(newMenu)
    return {menu: [], btPerms: [], routers: []}
}
function fixMenuMainDo (menu: any, btPerms: any) {
    let newMenu: any[] = []
    menu.forEach((item: any) => {
        if (item.type === 2) {
            btPerms.push(item)
        } else {
            if (item.children && item.children.length > 0) {
                item.children = fixMenuMainDo(item.children, btPerms)
            }
            newMenu.push(item)
        }
    })
    return newMenu
}

/**
 * 把动态路由加载现存路由中
 * @param routes 路由列表
 * @param router 路由实例
 * @param mainRoutes 现存的动态路由（只包括首页）
 */
export function addRouterToMainRouter(routes: any, router: any, mainRoutes: any) {
    mainRoutes.menuName = 'main-dynamic'
    mainRoutes.children = mainRoutes.children.concat(routes)
    router.addRoutes([
        mainRoutes,
        { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
}

export interface GetRouteStructure {
    path: string
    name: string
    component: any
    meta: object
}

import Layout from '@/layout/Index.vue'
export function buildRouter(item: GetRouteStructure, modulesRoutes: any) {
    let componentPath = `/src/views${item.path}.vue`
    return {
        path: '/home',
        component: Layout,
        name: 'normal-layout',
        children: [{
            path: item.path,
            name: item.name,
            component: modulesRoutes[componentPath],
            meta: {
                }
            }
        ]
    }
}