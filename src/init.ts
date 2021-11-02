import {App, Component, Directive} from "vue";
import config from '@/config'
import * as directives from "./directives"
import iconfont from "@/components/iconfont.vue"
import { setupStore } from "@/store"
export function initApp(app: App) {
    let dist = document.getElementsByTagName('title')[0]
    dist.innerHTML = config.htmlTitle
    app.component("iconfont", iconfont as unknown as Component)
    setupStore(app)
    // 自定义指令
    Object.keys(directives).forEach(key => {
        app.directive(key, (directives as { [key: string]: Directive })[key])
    })
}
interface String {
    format(args: string): string;
}
// eslint-disable-next-line no-extend-native
String.prototype.format = function (args: string | string[]) {
    if (arguments.length > 0) {
        let result = this
        let reg = null
        if (arguments.length === 1 && typeof (args) === 'object') {
            for (var key in args) {
                reg = new RegExp('({' + key + '})', 'g')
                result = result.replace(reg, args[key])
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined) {
                    return ''
                } else {
                    reg = new RegExp('({[' + i + ']})', 'g')
                    result = result.replace(reg, arguments[i])
                }
            }
        }
        return result
    } else {
        return this
    }
}

// eslint-disable-next-line no-extend-native
String.prototype.trim = function () {
    return this.trimLeft().trimRight()
}
// eslint-disable-next-line no-extend-native
String.prototype.trimLeft = function () {
    return this.replace(/^[\s\n\t]+/g, '')
}
// eslint-disable-next-line no-extend-native
String.prototype.trimRight = function () {
    return this.replace(/[\s\n\t]+$/g, '')
}
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt: string) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'H+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) {
        // @ts-ignore
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    } }
    return fmt
}
