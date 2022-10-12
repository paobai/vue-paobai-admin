import { successResponseWrap } from "./help"
import type { MockRequestType } from "./help"
import fileList from "./data/file"
const urlPre = "/file"

const getList = (type: number | string) => {
  if (Number(type) == 0) return fileList
  const res: any[] = []
  const fileMap: { [k: string]: string[] } = {
    1: ["jpg", "png", "jpeg"],
    2: ["text", "doc", "xls"],
    3: ["mp4"],
    4: ["mp3"],
    5: ["zip", "rar", "ppt", "css", "js", "html"]
  }
  const arr = fileMap[type] || []
  arr.forEach(item => {
    const data = fileList.filter(i => i.extendName === item)
    res.push(...data)
  })
  return res
}

export default [
  {
    url: urlPre + "/list",
    method: "get",
    timeout: Math.floor(Math.random() * 3) * 100,
    response: (request: MockRequestType) => {
      const { fileType } = request.query

      const list = getList(fileType)
      return successResponseWrap({
        total: list.length,
        list: list
      })
    }
  }
]
