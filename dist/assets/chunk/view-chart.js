import{u as c}from"./chart-option.js";import{_ as f}from"../entry/index.js";import{j as s,ai as d,r,o as n,k as a,w as p,y as m}from"./vendor.js";const g=s({data(){let e=d("loading");const{chartOption:o}=c(t=>({legend:{left:"center",data:["Star\u6570","Fork\u6570","Watching\u6570"],bottom:0,icon:"circle",itemWidth:8,textStyle:{color:t?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderWidth:0}},tooltip:{show:!0,trigger:"item"},graphic:{elements:[{type:"text",left:"center",top:"42%",style:{text:"\u603B\u6570",textAlign:"center",fill:t?"#ffffffb3":"#4E5969",fontSize:16}},{type:"text",left:"center",top:"53%",style:{text:"334",textAlign:"center",fill:t?"#ffffffb3":"#1D2129",fontSize:18,fontWeight:500}}]},series:[{type:"pie",radius:["50%","70%"],center:["50%","50%"],label:{formatter:"{d}%",fontSize:14,color:t?"rgba(255, 255, 255, 0.7)":"#4E5969"},itemStyle:{borderColor:t?"#232324":"#fff",borderWidth:1},data:[{value:[184],name:"Star\u6570",itemStyle:{color:t?"#3D72F6":"#249EFF"}},{value:[63],name:"Fork\u6570",itemStyle:{color:t?"#A079DC":"#313CA9"}},{value:[87],name:"Watching\u6570",itemStyle:{color:t?"#6CAAF5":"#21CCFF"}}]}]}));return{loading:e,options:o}}});function h(e,o,t,u,y,C){const i=r("chart"),l=r("a-card");return n(),a(l,{loading:e.loading,class:"first-card",title:"\u9879\u76EE\u5360\u6BD4(\u5E0C\u671B)"},{default:p(()=>[e.loading?m("",!0):(n(),a(i,{key:0,options:e.options},null,8,["options"]))]),_:1},8,["loading"])}var x=f(g,[["render",h]]);export{x as default};