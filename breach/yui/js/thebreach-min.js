function init(){breach_init()}function breach_init(){var A=null;var a=null;var w=null;var e=false;var Q=false;var l=false;var G=false;var O=null;var h=null;var o=null;var E=null;var v=null;var B=null;var u=null;var S=0;var r="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";function P(){A=document.getElementById("password");a=document.getElementById("main");w=document.getElementById("entrance");O=document.getElementById("websocket");h=document.getElementById("message");B=document.getElementById("response_text");o=document.getElementById("ws_wss");E=document.getElementById("open_close");v=document.getElementById("send");reset=document.getElementById("reset");A.onkeydown=t;O.onkeydown=f;O.onclick=J;h.onkeydown=K;o.onclick=m;E.onclick=x;v.onclick=D;reset.onclick=I;I();z();c()}function m(T){if(o.value=="WS"){o.value="WSS";o.style.backgroundColor="green";E.style.backgroundColor="green";v.style.backgroundColor="green";O.value="wss://echo.websocket.org"}else{o.value="WS";o.style.backgroundColor="darkblue";E.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";O.value="ws://echo.websocket.org"}if(e){J(T)}reset.style.opacity=1}function x(T){if(E.value=="OPEN"){C()}else{J()}reset.style.opacity=1}function s(){a.style.display="block";w.style.display="none"}function t(T){if(T.keyCode==13){n("ready",A.value);A.style.backgroundColor="gray";return}A.style.backgroundColor="white"}function K(T){if(T.keyCode==13){D()}}function f(T){if(T.keyCode==13){C()}}function C(T){if(e){return}E.value="CLOSE";e=true;u=O.value;k();n("open",u)}function J(T){if(!e){return}E.value="OPEN";n("close",null)}function D(T){if(!e){return}S++;p();n("send","#"+S+" "+h.value);v.style.opacity=0.5}function I(T){O.value="ws://echo.websocket.org";h.value="Into The Breach";B.innerHTML="";v.style.opacity=0;reset.style.opacity=0;o.value="WS";o.style.backgroundColor="darkblue";E.value="OPEN";E.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";H();O.value="ws://echo.websocket.org";u=O.value;if(e){l=true;J(T)}}function j(){S=0;var T=window.location.protocol;var U=u.lastIndexOf("ws:",0);if(U==0){U="ws:"}else{U="wss:"}if(T=="https:"&&U=="ws:"){Q=true;setTimeout(g,500);d("<font color='red'>SECURITY IS BREACHED</font>")}else{Q=false;d("<font color='green'>SECURITY TEST PASSED</font>")}v.style.opacity=1;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;d(y()+" OPENED");D()}function F(){e=false;Q=false;v.style.opacity=0;if(!l){d(y()+" CLOSED")}else{l=false}H()}function R(T){v.style.opacity=1;d(y()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+T+"</i>")}function i(){e=false;Q=false;v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;d(y()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;ADDRESS REJECTED</font>")}function q(){e=false;Q=false;v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;d("<font color='red'>THE BREACH IS<BR>NOT YET POSSIBLE<BR>IN THIS BROWSER VERSION<font>")}function M(){e=false;Q=false;v.style.opacity=0;d(y()+"<font color='red'> TIMEOUT<font>")}function d(T){B.innerHTML=B.innerHTML+T+"<BR><BR>";L();H()}function p(){if(N!=null){if(window.location.protocol=="https:"){d("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+S+" "+h.value)+"</i>"}else{if(window.location.protocol=="http:"){d("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+S+" "+h.value)+"</i>"}else{d("<font color='gray' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+S+" "+h.value)+"</i>"}}}}function k(){if(N!=null){d(y()+" OPENING")}}function y(){var T=u.split("/");if(T[0]=="ws:"&&Q){return"<font color='red'>&#x1f513; "+T[0]+"</font>//"+T[2]}else{if(T[0]=="wss:"){return"<font color='green'>&#x1f512; "+T[0]+"</font>//"+T[2]}else{return"<font color='blue '>&#x1f513; "+T[0]+"</font>//"+T[2]}}}function L(){$("#responses").stop(true).animate({scrollTop:$("#response_text").height()},500);reset.style.opacity=1}function H(){if(!e){if(window.location.protocol=="https:"){responses.style.backgroundImage='url("img/idle-https.jpg")'}if(window.location.protocol=="http:"){responses.style.backgroundImage='url("img/idle-http.jpg")'}if(window.location.protocol=="file:"){responses.style.backgroundImage='url("img/idle.jpg")'}return}var T=window.location.protocol;var U=u.lastIndexOf("ws:",0);if(U==0){U="ws:"}else{U="wss:"}if(U=="ws:"&&T=="http:"){responses.style.backgroundImage='url("img/ws-http.jpg")'}if(U=="ws:"&&T=="https:"){responses.style.backgroundImage='url("img/ws-https.jpg")'}if(U=="wss:"&&T=="http:"){responses.style.backgroundImage='url("img/wss-http.jpg")'}if(U=="wss:"&&T=="https:"){responses.style.backgroundImage='url("img/wss-https.jpg")'}}function c(){var V=["img/ws-https.jpg","img/wss-https.jpg","img/ws-http.jpg","img/wss-http.jpg","img/idle.jpg","img/idle-http.jpg","img/idle-https.jpg"];for(var U=0;U<V.length;U++){var T=new Image();T.src=V[U]}}function g(){if(Q){setTimeout(g,500)}if(G){responses.style.backgroundImage='url("img/ws-https.jpg")'}else{responses.style.backgroundImage='url("img/idle-https.jpg")'}G=!G}var N=null;function z(){try{N=yui_escape(atob(atob(r)))}catch(T){q();return}N.port.onmessage=b;N.port.start()}function b(T){if(T.data=="ready"){s();return}if(T.data=="open"){j();return}if(T.data=="close"){F();return}if(T.data=="error"){i();return}if(T.data=="timeout"){M();return}R(T.data)}function n(V,U){var T=new Object();T.method=V;T.params=U;if(N!=null){N.port.postMessage(T)}else{q()}}return P()}function yui_escape(seq){return eval(seq)};