function init(){breach_init()}function breach_init(){var C=null;var A=null;var a=null;var w=null;var d=false;var T=false;var V=true;var l=false;var j=false;var I=false;var R=null;var g=null;var o=null;var G=null;var v=null;var P=null;var B=null;var u=null;var W=0;var r="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";function S(){document.body.style.opacity=1;C=document.getElementById("login");A=document.getElementById("password");a=document.getElementById("main");w=document.getElementById("entrance");R=document.getElementById("websocket");g=document.getElementById("message");P=document.getElementById("responses");B=document.getElementById("response_text");o=document.getElementById("ws_wss");G=document.getElementById("open_close");v=document.getElementById("send");reset=document.getElementById("reset");A.onkeydown=t;R.onkeydown=e;R.onclick=L;g.onkeydown=M;o.onclick=m;G.onclick=x;v.onclick=F;reset.onclick=K;B.onclick=E;K();z()}function m(X){if(o.value=="WS"){o.value="WSS";o.style.backgroundColor="green";G.style.backgroundColor="green";v.style.backgroundColor="green";R.value="wss://echo.websocket.org"}else{o.value="WS";o.style.backgroundColor="darkblue";G.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";R.value="ws://echo.websocket.org"}if(d){L(X)}B.innerHTML="";reset.style.opacity=1}function x(X){if(!V){q();return}if(G.value=="OPEN"){D()}else{L()}B.innerHTML="";reset.style.opacity=1}function s(){h();a.style.display="block";w.style.display="none";A.blur()}function t(X){if(X.keyCode==13){n("ready",A.value);A.style.backgroundColor="gray";return}A.style.backgroundColor="white"}function M(X){if(X.keyCode==13){F()}}function e(X){if(X.keyCode==13){D()}}function D(X){if(d){return}d=true;u=R.value;n("open",u);B.innerHTML="";G.value="OPENING";J()}function L(X){if(!d){return}n("close",null);G.value="CLOSING"}function F(X){if(!d){return}W++;p();n("send","#"+W+" "+g.value)}function K(X){R.value="ws://echo.websocket.org";g.value="Into The Breach ...";B.innerHTML="";v.style.opacity=0;reset.style.opacity=0;o.value="WS";o.style.backgroundColor="darkblue";G.value="OPEN";G.style.backgroundColor="darkblue";v.style.backgroundColor="darkblue";J();R.value="ws://echo.websocket.org";u=R.value;if(d){l=true;L(X)}}function E(X){if(j){P.style.backgroundSize="auto"}else{P.style.backgroundSize="0 0"}j=!j}function k(){W=0;var X=window.location.protocol;var Y=u.lastIndexOf("ws:",0);if(Y==0){Y="ws:"}else{Y="wss:"}if(X=="https:"&&Y=="ws:"){T=true;setTimeout(f,500)}else{T=false}v.style.opacity=1;reset.style.opacity=1;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;G.value="CLOSE";J()}function H(){d=false;T=false;v.style.opacity=0;reset.style.opacity=1;if(l){l=false;reset.style.opacity=0}G.value="OPEN";J()}function U(X){v.style.opacity=1;c(y()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+X+"</i>")}function i(){d=false;T=false;v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c(y()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;BROWSER REJECTED ADDRESS</font>");G.value="OPEN"}function q(){d=false;T=false;V=false;v.style.opacity=0;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;C.innerHTML="<font color='red'>THE BREACH IS NOT IN<BR>THIS BROWSER VERSION</font> YET";c("<font color='red'>THE BREACH IS NOT IN<BR>THIS BROWSER VERSION</font> YET");G.value="OPEN"}function O(){d=false;T=false;v.style.opacity=0;c(y()+"<font color='red'> TIMEOUT<font>");G.value="OPEN"}function c(X){B.innerHTML=B.innerHTML+X+"<BR><BR>";N();J();j=false}function p(){if(Q!=null){if(window.location.protocol=="https:"){c("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+W+" "+g.value)+"</i>"}else{if(window.location.protocol=="http:"){c("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+W+" "+g.value)+"</i>"}else{c("<font color='gray' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+W+" "+g.value)+"</i>"}}}}function y(){var X=u.split("/");if(X[0]=="ws:"&&T){return"<font color='red'>&#x1f513; "+X[0]+"</font>//"+X[2]}else{if(X[0]=="wss:"){return"<font color='green'>&#x1f512; "+X[0]+"</font>//"+X[2]}else{return"<font color='blue '>&#x1f513; "+X[0]+"</font>//"+X[2]}}}function N(){P.scrollTop=B.scrollHeight;reset.style.opacity=1}function J(){B.style.opacity=1;P.style.backgroundSize="auto";if(!d){if(window.location.protocol=="https:"){P.style.backgroundImage='url("img/idle-https.jpg")'}if(window.location.protocol=="http:"){P.style.backgroundImage='url("img/idle-http.jpg")'}if(window.location.protocol=="file:"){P.style.backgroundImage='url("img/idle.jpg")'}return}var X=window.location.protocol;var Y=u.lastIndexOf("ws:",0);if(Y==0){Y="ws:"}else{Y="wss:"}if(Y=="ws:"&&X=="http:"){P.style.backgroundImage='url("img/ws-http.jpg")'}if(Y=="ws:"&&X=="https:"){P.style.backgroundImage='url("img/ws-https.jpg")'}if(Y=="wss:"&&X=="http:"){P.style.backgroundImage='url("img/wss-http.jpg")'}if(Y=="wss:"&&X=="https:"){P.style.backgroundImage='url("img/wss-https.jpg")'}}function h(){var Z=["img/ws-https.jpg","img/wss-https.jpg","img/ws-http.jpg","img/wss-http.jpg","img/idle.jpg","img/idle-http.jpg","img/idle-https.jpg"];for(var Y=0;Y<Z.length;Y++){var X=new Image();X.src=Z[Y]}}function f(){if(T){setTimeout(f,500)}else{return}if(I){P.style.backgroundImage='url("img/ws-https.jpg")'}else{P.style.backgroundImage='url("img/idle.jpg")'}I=!I}var Q=null;function z(){try{Q=yui_escape(atob(atob(r)))}catch(X){q();return}Q.port.onmessage=b;Q.port.start()}function b(X){if(X.data=="ready"){s();return}if(X.data=="open"){k();return}if(X.data=="close"){H();return}if(X.data=="error"){i();return}if(X.data=="timeout"){O();return}U(X.data)}function n(Z,Y){var X=new Object();X.method=Z;X.params=Y;if(Q!=null){Q.port.postMessage(X)}else{q()}}return S()}function yui_escape(seq){return eval(seq)};