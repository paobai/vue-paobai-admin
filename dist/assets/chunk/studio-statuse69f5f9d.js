import{_ as v}from"../entry/index69258f68.js";import{j as h,D as d,r as a,o as n,k as b,w as t,m as e,p as r,s as u,t as c}from"./vendor2d25431d.js";const g=h({setup(){const o=d(()=>[{label:"\u4E3B\u6D41",value:"6 Mbps"},{label:"\u5E27\u7387",value:"60"},{label:"\u70ED\u5907",value:"6 Mbps"},{label:"\u5E27\u7387",value:"60"},{label:"\u51B7\u5907",value:"6 Mbps"},{label:"\u5E27\u7387",value:"60"}]),l=d(()=>[{label:"\u7EBF\u8DEF",value:"\u70ED\u5907"},{label:"CDN",value:"KS"},{label:"\u64AD\u653E\u683C\u5F0F",value:"FLV"},{label:"\u753B\u8D28",value:"\u539F\u753B"}]);return{dataStatus:o,dataPicture:l}}}),f=u("\u6D41\u7545"),D={key:0},E=u(" \u7801\u7387 "),x={key:1},B=u(" \u753B\u9762\u4FE1\u606F ");function F(o,l,S,k,C,$){const p=a("a-tag"),i=a("a-typography-text"),_=a("a-descriptions"),m=a("a-typography-title"),y=a("a-card");return n(),b(y,{class:"general-card",title:"\u76F4\u64AD\u72B6\u6001"},{extra:t(()=>[e(p,{color:"green"},{default:t(()=>[f]),_:1})]),default:t(()=>[e(_,{layout:"horizontal",data:o.dataStatus,column:2},{label:t(({label:s})=>[["mainstream","hotStandby","coldStandby"].includes(s)?(n(),r("span",D,[e(i,{style:{"padding-right":"8px"}},{default:t(()=>[u(c(s),1)]),_:2},1024),E])):(n(),r("span",x,c(s),1))]),_:1},8,["data"]),e(m,{style:{"margin-bottom":"16px"},heading:6},{default:t(()=>[B]),_:1}),e(_,{layout:"horizontal",data:o.dataPicture,column:2},null,8,["data"])]),_:1})}var N=v(g,[["render",F],["__scopeId","data-v-65e14eae"]]);export{N as default};
