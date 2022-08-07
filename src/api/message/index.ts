import { postRequest } from "@/utils/httpRequest"
import * as ApiType from "./type"
export * from "./type"

export function queryMessageList() {
  return postRequest<ApiType.MessageListType>("/api/message/list")
}

export function setMessageStatus(data: ApiType.MessageStatus) {
  return postRequest<ApiType.MessageListType>("/api/message/read", data)
}

export function queryChatList() {
  return postRequest<ApiType.ChatRecord[]>("/api/chat/list")
}
