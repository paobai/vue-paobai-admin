/*
 * @Description: app mutations type
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-30 11:37:33
 */

export enum TagsMutationTypes {
  ADD_VISITED_VIEW = "ADD_VISITED_VIEW",
  ADD_CACHED_VIEW = "ADD_CACHED_VIEW",
  DEL_VISITED_VIEW = "DEL_VISITED_VIEW",
  DEL_CACHED_VIEW = "DEL_CACHED_VIEW",
  DEL_OTHERS_VISITED_VIEWS = "DEL_OTHERS_VISITED_VIEWS",
  DEL_OTHERS_CACHED_VIEWS = "DEL_OTHERS_CACHED_VIEWS",
  DEL_ALL_VISITED_VIEWS = "DEL_ALL_VISITED_VIEWS",
  DEL_ALL_CACHED_VIEWS = "DEL_ALL_CACHED_VIEWS",
  UPDATE_VISITED_VIEW = "UPDATE_VISITED_VIEW"
}
