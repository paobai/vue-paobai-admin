/**
 * URL地址
 * @param {string} s
 */
export function isURL(s: string) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证图片路径
 * @param {string} fileUrl
 */
export function isImgURL(fileUrl: string) {
  // 验证图片
  if (fileUrl !== "") {
    if (!/\.(gif|jpg|jpeg|png|GIF|JPEG|JPG|PNG)$/.test(fileUrl)) {
      return false
    }
    return true
  }
}

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
