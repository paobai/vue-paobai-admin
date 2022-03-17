var p=Object.defineProperty;var a=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var n=(o,t,e)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,l=(o,t)=>{for(var e in t||(t={}))C.call(t,e)&&n(o,e,t[e]);if(a)for(var e of a(t))F.call(t,e)&&n(o,e,t[e]);return o};import{_ as y,d as f}from"../entry/index.js";import{u as E}from"./chart-option.js";import{j as h,r,o as S,k as A,w as i,m as c}from"./vendor.js";const g=h({setup(){const{chartOption:o}=E(e=>{const u={textAlign:"center",fill:e?"rgba(255,255,255,0.7)":"#4E5969",fontSize:14,lineWidth:10,fontWeight:"bold"};return{legend:{left:"center",data:["UGC\u539F\u521B","\u56FD\u5916\u7F51\u7AD9","\u8F6C\u8F7D\u6587\u7AE0","\u884C\u4E1A\u62A5\u544A","\u5176\u4ED6"],bottom:0,icon:"circle",itemWidth:8,textStyle:{color:e?"rgba(255,255,255,0.7)":"#4E5969"},itemStyle:{borderWidth:0}},tooltip:{show:!0,trigger:"item"},graphic:{elements:[{type:"text",left:"9.6%",top:"center",style:l({text:"\u7EAF\u6587\u672C"},u)},{type:"text",left:"center",top:"center",style:l({text:"\u56FE\u6587\u7C7B"},u)},{type:"text",left:"86.6%",top:"center",style:l({text:"\u89C6\u9891\u7C7B"},u)}]},series:[{type:"pie",radius:["50%","70%"],center:["11%","50%"],label:{formatter:"{d}% ",color:e?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderColor:e?"#000":"#fff",borderWidth:1},data:[{value:[148564],name:"UGC\u539F\u521B",itemStyle:{color:"#249EFF"}},{value:[334271],name:"\u56FD\u5916\u7F51\u7AD9",itemStyle:{color:"#846BCE"}},{value:[445694],name:"\u8F6C\u8F7D\u6587\u7AE0",itemStyle:{color:"#21CCFF"}},{value:[445694],name:"\u884C\u4E1A\u62A5\u544A",itemStyle:{color:"#0E42D2"}},{value:[445694],name:"\u5176\u4ED6",itemStyle:{color:"#86DF6C"}}]},{type:"pie",radius:["50%","70%"],center:["50%","50%"],label:{formatter:"{d}% ",color:e?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderColor:e?"#000":"#fff",borderWidth:1},data:[{value:[148564],name:"UGC\u539F\u521B",itemStyle:{color:"#249EFF"}},{value:[334271],name:"\u56FD\u5916\u7F51\u7AD9",itemStyle:{color:"#846BCE"}},{value:[445694],name:"\u8F6C\u8F7D\u6587\u7AE0",itemStyle:{color:"#21CCFF"}},{value:[445694],name:"\u884C\u4E1A\u62A5\u544A",itemStyle:{color:"#0E42D2"}},{value:[445694],name:"\u5176\u4ED6",itemStyle:{color:"#86DF6C"}}]},{type:"pie",radius:["50%","70%"],center:["88%","50%"],label:{formatter:"{d}% ",color:e?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderColor:e?"#000":"#fff",borderWidth:1},data:[{value:[148564],name:"UGC\u539F\u521B",itemStyle:{color:"#249EFF"}},{value:[334271],name:"\u56FD\u5916\u7F51\u7AD9",itemStyle:{color:"#846BCE"}},{value:[445694],name:"\u8F6C\u8F7D\u6587\u7AE0",itemStyle:{color:"#21CCFF"}},{value:[445694],name:"\u884C\u4E1A\u62A5\u544A",itemStyle:{color:"#0E42D2"}},{value:[445694],name:"\u5176\u4ED6",itemStyle:{color:"#86DF6C"}}]}]}}),{loading:t}=f(!1);return{chartOption:o,loading:t}}});function b(o,t,e,u,v,_){const m=r("Chart"),d=r("a-card"),s=r("a-spin");return S(),A(s,{loading:o.loading,style:{width:"100%"}},{default:i(()=>[c(d,{class:"general-card",title:"\u5185\u5BB9\u53D1\u5E03\u6765\u6E90"},{default:i(()=>[c(m,{style:{width:"100%",height:"300px"},option:o.chartOption},null,8,["option"])]),_:1})]),_:1},8,["loading"])}var w=y(g,[["render",b]]);export{w as default};
