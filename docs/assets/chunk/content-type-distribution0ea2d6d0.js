import{u as r}from"./chart-option44acf56d.js";import{_ as u}from"../entry/indexfa44c11a.js";import{j as i,r as o,o as c,k as l,w as m,m as s}from"./vendorfcaffdeb.js";const p=i({setup(){const{chartOption:t}=r(e=>({grid:{left:0,right:0,top:0,bottom:20},legend:{show:!0,top:"center",right:"0",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:e?"#ffffff":"#4E5969"}},radar:{center:["40%","50%"],radius:80,indicator:[{name:"\u56FD\u9645",max:6500},{name:"\u8D22\u7ECF",max:22e3},{name:"\u79D1\u6280",max:3e4},{name:"\u5176\u4ED6",max:38e3},{name:"\u4F53\u80B2",max:52e3},{name:"\u5A31\u4E50",max:25e3}],axisName:{color:e?"#ffffff":"#1D2129"},axisLine:{lineStyle:{color:e?"#484849":"#E5E6EB"}},splitLine:{lineStyle:{color:e?"#484849":"#E5E6EB"}},splitArea:{areaStyle:{color:[]}}},series:[{type:"radar",areaStyle:{opacity:.2},data:[{value:[4850,19e3,19e3,29500,35200,2e4],name:"\u7EAF\u6587\u672C",symbol:"none",itemStyle:{color:e?"#6CAAF5":"#249EFF"}},{value:[2250,17e3,21e3,23500,42950,22e3],name:"\u56FE\u6587\u7C7B",symbol:"none",itemStyle:{color:e?"#A079DC":"#313CA9"}},{value:[5850,11e3,26e3,27500,46950,18e3],name:"\u89C6\u9891\u7C7B",symbol:"none",itemStyle:{color:e?"#3D72F6":"#21CCFF"}}]}]}));return{chartOption:t}}});function f(t,e,d,y,C,h){const a=o("Chart"),n=o("a-card");return c(),l(n,{class:"general-card",title:"\u5185\u5BB9\u9898\u6750\u5206\u5E03","header-style":{paddingBottom:0}},{default:m(()=>[s(a,{style:{height:"222px"},option:t.chartOption},null,8,["option"])]),_:1})}var F=u(p,[["render",f]]);export{F as default};
