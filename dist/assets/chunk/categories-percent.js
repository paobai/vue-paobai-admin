import{_ as c,d as s}from"../entry/index.js";import{u as d}from"./chart-option.js";import{j as f,r as o,o as p,k as m,w as n,m as a,s as C}from"./vendor.js";const h=f({setup(){const{loading:e}=s(),{chartOption:r}=d(t=>({legend:{left:"center",data:["\u7EAF\u6587\u672C","\u56FE\u6587\u7C7B","\u89C6\u9891\u7C7B"],bottom:0,icon:"circle",itemWidth:8,textStyle:{color:t?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderWidth:0}},tooltip:{show:!0,trigger:"item"},graphic:{elements:[{type:"text",left:"center",top:"40%",style:{text:"\u5185\u5BB9\u91CF",textAlign:"center",fill:t?"#ffffffb3":"#4E5969",fontSize:14}},{type:"text",left:"center",top:"50%",style:{text:"928,531",textAlign:"center",fill:t?"#ffffffb3":"#1D2129",fontSize:16,fontWeight:500}}]},series:[{type:"pie",radius:["50%","70%"],center:["50%","50%"],label:{formatter:"{d}%",fontSize:14,color:t?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderColor:t?"#232324":"#fff",borderWidth:1},data:[{value:[148564],name:"\u7EAF\u6587\u672C",itemStyle:{color:t?"#3D72F6":"#249EFF"}},{value:[334271],name:"\u56FE\u6587\u7C7B",itemStyle:{color:t?"#A079DC":"#313CA9"}},{value:[445694],name:"\u89C6\u9891\u7C7B",itemStyle:{color:t?"#6CAAF5":"#21CCFF"}}]}]}));return{loading:e,chartOption:r}}}),_=C(" \u5185\u5BB9\u7C7B\u578B\u5360\u6BD4 ");function g(e,r,t,y,B,x){const l=o("Chart"),i=o("a-card"),u=o("a-spin");return p(),m(u,{loading:e.loading,style:{width:"100%"}},{default:n(()=>[a(i,{class:"general-card","header-style":{paddingBottom:"0"},"body-style":{padding:"20px"}},{title:n(()=>[_]),default:n(()=>[a(l,{height:"310px",option:e.chartOption},null,8,["option"])]),_:1})]),_:1},8,["loading"])}var A=c(h,[["render",g]]);export{A as default};