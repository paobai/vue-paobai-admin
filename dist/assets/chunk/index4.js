import p from"./chat-panel.js";import m from"./studio.js";import u from"./data-statistic.js";import l from"./studio-status.js";import f from"./quick-operation.js";import v from"./studio-information.js";import{_ as S}from"../entry/index.js";import{j as h,r as o,o as j,p as x,v as s,m as t,w as a}from"./vendor.js";import"./chat-list.js";import"./chat-item.js";import"./data-statistic-list.js";const y=h({components:{ChatPanel:p,Studio:m,DataStatistic:u,StudioStatus:l,QuickOperation:f,StudioInformation:v},setup(){}}),k={class:"container"},C={class:"layout"},I={class:"layout-left-side"},$={class:"layout-content"},B={class:"layout-right-side"};function D(O,P,Q,g,w,z){const e=o("ChatPanel"),n=o("Studio"),c=o("DataStatistic"),i=o("a-space"),r=o("StudioStatus"),_=o("QuickOperation"),d=o("StudioInformation");return j(),x("div",k,[s("div",C,[s("div",I,[t(e)]),s("div",$,[t(i,{size:16,direction:"vertical",fill:""},{default:a(()=>[t(n),t(c)]),_:1})]),s("div",B,[t(i,{size:16,direction:"vertical",fill:""},{default:a(()=>[t(r),t(_),t(d)]),_:1})])])])}var L=S(y,[["render",D],["__scopeId","data-v-7d29aa85"]]);export{L as default};