import { successResponseWrap } from "../src/utils/mock"
import Mock from "mockjs"

export default [
  {
    url: new RegExp("/api/chat/list"),
    method: "post",
    timeout: 1000,
    response: () => {
      const data = Mock.mock({
        "data|4-6": [
          {
            "id|+1": 1,
            username: "用户7352772",
            content: "马上就开始了，好激动！",
            time: "13:09:12",
            "isCollect|2": true
          }
        ]
      })
      return successResponseWrap(data.data)
    }
  },
  {
    url: new RegExp("/api/popular/list"),
    method: "get",
    response: (request: any) => {
      const { type = "text" } = request.query
      if (type === "image") {
        return successResponseWrap([...videoList])
      }
      if (type === "video") {
        return successResponseWrap([...imageList])
      }
      return successResponseWrap([...textList])
    }
  }
]
