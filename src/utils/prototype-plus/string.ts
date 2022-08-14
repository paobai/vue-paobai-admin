// @ts-ignore
String.prototype.format = function (args: string | string[]) {
  if (arguments.length > 0) {
    let result = this
    let reg = null
    if (arguments.length === 1 && typeof args === "object") {
      for (const key in args) {
        reg = new RegExp("({" + key + "})", "g")
        result = result.replace(reg, args[key])
      }
    } else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === undefined) {
          return ""
        } else {
          reg = new RegExp("({[" + i + "]})", "g")
          result = result.replace(reg, arguments[i])
        }
      }
    }
    return result
  } else {
    return this
  }
}

String.prototype.trim = function () {
  return this.trimLeft().trimRight()
}

String.prototype.trimLeft = function () {
  return this.replace(/^[\s\n\t]+/g, "")
}

String.prototype.trimRight = function () {
  return this.replace(/[\s\n\t]+$/g, "")
}
