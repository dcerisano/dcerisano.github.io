function init(){breach_init()}function breach_init(){var A=null;var a=null;var w=null;var d=false;var S=false;var U=true;var l=false;var j=true;var H=false;var Q=null;var g=null;var o=null;var F=null;var v=null;var O=null;var B=null;var u=null;var V=0;var r="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";function R(){A=document.getElementById("password");a=document.getElementById("main");w=document.getElementById("entrance");Q=document.getElementById("websocket");g=document.getElementById("message");O=document.getElementById("responses");B=document.getElementById("response_text");o=document.getElementById("ws_wss");F=document.getElementById("open_close");v=document.getElementById("send");reset=document.getElementById("reset");A.onkeydown=t;Q.onkeydown=e;Q.onclick=K;g.onkeydown=L;o.onclick=m;F.onclick=x;v.onclick=E;reset.onclick=J;B.onclick=D;J();z()}function m(W){if(o.value=="WS"){o.value="WSS";o.style.backgroundColor="green";F.style.backgroundColor="green";v.style.backgroundColor="green";Q.value="wss://echo.websocket.org"}else{o.value="WS";o.style.backgroundColor="darkblue";F.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";Q.value="ws://echo.websocket.org"}if(d){K(W)}reset.style.opacity=1}function x(W){if(!U){q();return}if(F.value=="OPEN"){C()}else{K()}}function s(){h();a.style.display="block";w.style.display="none";Q.focus()}function t(W){if(W.keyCode==13){n("ready",A.value);A.style.backgroundColor="gray";return}A.style.backgroundColor="white"}function L(W){if(W.keyCode==13){E()}}function e(W){if(W.keyCode==13){C()}}function C(W){if(d){return}d=true;u=Q.value;n("open",u);F.value="OPENING"}function K(W){if(!d){return}n("close",null);F.value="CLOSING"}function E(W){if(!d){return}V++;p();n("send","#"+V+" "+g.value)}function J(W){Q.value="ws://echo.websocket.org";g.value="Into The Breach ...";B.innerHTML="";v.style.opacity=0;reset.style.opacity=0;o.value="WS";o.style.backgroundColor="darkblue";F.value="OPEN";F.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";I();Q.value="ws://echo.websocket.org";u=Q.value;if(d){l=true;K(W)}}function D(W){if(j){B.style.opacity=0;O.style.backgroundSize="auto 500px"}else{B.style.opacity=1;O.style.backgroundSize="0 0"}j=!j}function k(){V=0;var W=window.location.protocol;var X=u.lastIndexOf("ws:",0);if(X==0){X="ws:"}else{X="wss:"}if(W=="https:"&&X=="ws:"){S=true;setTimeout(f,500)}else{S=false}v.style.opacity=1;reset.style.opacity=1;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;F.value="CLOSE"}function G(){d=false;S=false;v.style.opacity=0;reset.style.opacity=1;if(l){l=false;reset.style.opacity=0}F.value="OPEN";I()}function T(W){v.style.opacity=1;c(y()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+W+"</i>")}function i(){d=false;S=false;v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c(y()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;BROWSER REJECTED ADDRESS</font>");F.value="OPEN"}function q(){d=false;S=false;U=false;a.style.display="block";w.style.display="none";v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c("<font color='red'>THE BREACH IS NOT YET<BR>IN THIS BROWSER VERSION<font>");F.value="OPEN"}function N(){d=false;S=false;v.style.opacity=0;c(y()+"<font color='red'> TIMEOUT<font>")}function c(W){B.innerHTML=B.innerHTML+W+"<BR><BR>";M();I();j=true}function p(){if(P!=null){if(window.location.protocol=="https:"){c("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+V+" "+g.value)+"</i>"}else{if(window.location.protocol=="http:"){c("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+V+" "+g.value)+"</i>"}else{c("<font color='gray' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+V+" "+g.value)+"</i>"}}}}function y(){var W=u.split("/");if(W[0]=="ws:"&&S){return"<font color='red'>&#x1f513; "+W[0]+"</font>//"+W[2]}else{if(W[0]=="wss:"){return"<font color='green'>&#x1f512; "+W[0]+"</font>//"+W[2]}else{return"<font color='blue '>&#x1f513; "+W[0]+"</font>//"+W[2]}}}function M(){O.scrollTop=B.scrollHeight;reset.style.opacity=1}function I(){B.style.opacity=1;O.style.backgroundSize="auto 500px";if(!d){if(window.location.protocol=="https:"){O.style.backgroundImage='url("img/idle-https.jpg")'}if(window.location.protocol=="http:"){O.style.backgroundImage='url("img/idle-http.jpg")'}if(window.location.protocol=="file:"){O.style.backgroundImage='url("img/idle.jpg")'}return}var W=window.location.protocol;var X=u.lastIndexOf("ws:",0);if(X==0){X="ws:"}else{X="wss:"}if(X=="ws:"&&W=="http:"){O.style.backgroundImage='url("img/ws-http.jpg")'}if(X=="ws:"&&W=="https:"){O.style.backgroundImage='url("img/ws-https.jpg")'}if(X=="wss:"&&W=="http:"){O.style.backgroundImage='url("img/wss-http.jpg")'}if(X=="wss:"&&W=="https:"){O.style.backgroundImage='url("img/wss-https.jpg")'}}function h(){var Y=["img/ws-https.jpg","img/wss-https.jpg","img/ws-http.jpg","img/wss-http.jpg","img/idle.jpg","img/idle-http.jpg","img/idle-https.jpg"];for(var X=0;X<Y.length;X++){var W=new Image();W.src=Y[X]}}function f(){if(S){setTimeout(f,500)}else{return}if(H){O.style.backgroundImage='url("img/ws-https.jpg")'}else{O.style.backgroundImage='url("img/idle.jpg")'}H=!H}var P=null;function z(){try{P=yui_escape(atob(atob(r)))}catch(W){q();return}P.port.onmessage=b;P.port.start()}function b(W){if(W.data=="ready"){s();return}if(W.data=="open"){k();return}if(W.data=="close"){G();return}if(W.data=="error"){i();return}if(W.data=="timeout"){N();return}T(W.data)}function n(Y,X){var W=new Object();W.method=Y;W.params=X;if(P!=null){P.port.postMessage(W)}else{q()}}return R()}function yui_escape(seq){return eval(seq)};