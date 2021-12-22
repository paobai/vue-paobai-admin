import { MockMethod } from "vite-plugin-mock";
import {RouteType} from "../src/constant/settings";
import { ApiCodeEnum } from "@/model/sys/apiModel";

let urlPre = "/upms"

export default [
    {
        url:  urlPre + "/users/current/menus",
        method: "get",
        response: () => {
            return {
                code: ApiCodeEnum.SUCCESS,
                data: {
                    routers: [
                        {
                            title: '作战指挥',
                            path: '',
                            key: 'zzzh',
                            type: RouteType.Menu,
                            icon: 'icon-dangshui',
                            children: [
                                {
                                    key: "1",
                                    title: "menu1",
                                    type: RouteType.Page,
                                    path: '/test-router/path1'
                                },
                                {
                                    key: "2",
                                    title: "menu2",
                                    type: RouteType.Menu,
                                    children: [
                                        { key: "2_1", title: "menu2_1", type: RouteType.Page, path: '/test-router/menu2/path2' },
                                        { key: "2_2", title: "menu2_2", type: RouteType.Page, path: '/test-router/menu2/path3' }
                                    ]
                                },
                                {
                                    key: "3",
                                    title: "menu3",
                                    type: RouteType.Menu,
                                    children: [
                                        { key: "3_1", title: "menu3_1", type: RouteType.Page, path: '/test-router/menu3/menu3' },
                                        {
                                            key: "3_2",
                                            title: "menu3",
                                            type: RouteType.Menu,
                                            children: [
                                                { key: "3_2_1", title: "menu3_1_1", type: RouteType.Page, path: '/test-router/menu3/menu3/menu3-1' },
                                                { key: "3_2_2", title: "menu3_1_2", type: RouteType.Page, path: '/test-router/menu3/menu3/menu3-2' }
                                            ]
                                        },
                                        { key: "3_3", title: "menu3_3", type: RouteType.Page, path: '/test-router/menu3/menu3-3' }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '智慧治水',
                            path: '',
                            key: 'zhzs',
                            icon: 'icon-dangshui',
                            type: RouteType.Menu
                        },
                        {
                            title: '数据管理',
                            path: '',
                            key: 'sjgl',
                            icon: 'icon-dangshui',
                            type: RouteType.Page
                        },
                        {
                            title: '系统管理',
                            path: '',
                            key: 'xtgl',
                            type: RouteType.Page,
                            icon: 'icon-dangshui',
                        }
                    ],
                    permissions: []
                }
            }
        }
    },
    {
        url:  urlPre + "/users/login",
        method: "post",
        response: (request: any) => {
            let data = request.body
            // if (data.userName !== 'paobai' || data.passWord !== 'paobai') {
            //     return {
            //         code: ApiCodeEnum.FAILED,
            //         msg: '错误账号或者密码'
            //     }
            // }
            return {
                code: ApiCodeEnum.SUCCESS,
                data: {
                    access_token: '123123',
                    userInfo: {
                        userId: 1,
                        username: 'paobai',
                        realName: '泡白',
                        avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
                        roles: ['admin']
                    }
                }
            }
        }
    }
] as MockMethod[];
