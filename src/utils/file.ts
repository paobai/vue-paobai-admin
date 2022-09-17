/**
 * 下载url文件方法
 * @param url
 * @param fileName
 */
export function downloadUrl(url: string, fileName?: string) {
  if (!fileName) fileName = undefined
  saveAs(url, fileName)
}
