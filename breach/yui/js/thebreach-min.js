function init(){breach_init()}function breach_init(){var a=false;var z=false;var e=false;var R=false;var n=false;var P=null;var h=null;var r=null;var T=null;var d=null;var H=null;var y=null;var C=null;var k=null;var g=null;var p=null;var w=null;var x=null;var U=0;var t="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";function Q(){password=document.getElementById("password");a=document.getElementById("main");z=document.getElementById("entrance");P=document.getElementById("websocket");h=document.getElementById("message");C=document.getElementById("response_text");r=document.getElementById("wss");T=document.getElementById("ws");d=document.getElementById("open");H=document.getElementById("close");y=document.getElementById("send");reset=document.getElementById("reset");password.onkeydown=v;P.onkeydown=f;P.onclick=K;h.onkeydown=L;H.onclick=K;d.onclick=D;y.onclick=E;reset.onclick=J;r.onclick=j;T.onclick=G;J();B()}function j(V){P.value="wss://echo.websocket.org";if(e){K(V)}T.style.color="black";r.style.color="white";T.style.opacity=1;r.style.opacity=0.25;reset.style.opacity=1;d.style.backgroundColor="green";y.style.backgroundColor="green"}function G(V){P.value="ws://echo.websocket.org";if(e){K(V)}T.style.color="white";r.style.color="black";T.style.opacity=0.25;r.style.opacity=1;reset.style.opacity=1;d.style.backgroundColor="blue";y.style.backgroundColor="blue"}function u(){a.style.display="block";z.style.display="none"}function v(V){if(V.keyCode==13){o("ready",password.value);password.style.backgroundColor="gray"}}function L(V){if(V.keyCode==13){E()}}function f(V){if(V.keyCode==13){D()}}function D(V){if(e){return}e=true;d.style.opacity=0.25;x=P.value;m();o("open",x)}function K(V){if(!e){return}H.style.opacity=0.25;o("close",null)}function E(V){if(!e){return}U++;q();o("send","#"+U+" "+h.value);y.style.opacity=0.5}function J(V){P.value="ws://echo.websocket.org";h.value="Into The Breach";C.innerHTML="";d.style.opacity=1;H.style.opacity=0.25;y.style.opacity=0.25;reset.style.opacity=0.25;d.style.backgroundColor="blue";y.style.backgroundColor="blue";T.style.color="white";r.style.color="black";T.style.opacity=0.25;r.style.opacity=1;responses.style.backgroundImage='url("img/idle.jpg")';x=P.value;if(e){n=true;K(V)}}function l(){U=0;var V=window.location.protocol;var W=x.lastIndexOf("ws:",0);if(W==0){W="ws:"}else{W="wss:"}if(V=="https:"&&W=="ws:"){R=true;c("<font color='red'>SECURITY CHECK FAILED</font>")}else{R=false;c("<font color='green'>SECURITY CHECK PASSED</font>")}d.style.opacity=0.25;H.style.opacity=1;y.style.opacity=1;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c(A()+" OPENED");E()}function F(){e=false;R=false;d.style.opacity=1;H.style.opacity=0.25;y.style.opacity=0.25;if(!n){c(A()+" CLOSED")}else{n=false}}function S(V){y.style.opacity=1;c(A()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+V+"</i>")}function i(){e=false;R=false;d.style.opacity=1;H.style.opacity=0.25;y.style.opacity=0.25;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c(A()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;ADDRESS REJECTED</font>")}function s(){e=false;R=false;d.style.opacity=1;H.style.opacity=0.25;y.style.opacity=0.25;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;c("<font color='red'>THE BREACH IS<BR>NOT YET POSSIBLE<BR>IN THIS BROWSER VERSION<font>")}function N(){e=false;R=false;d.style.opacity=1;H.style.opacity=0.25;y.style.opacity=0.25;c(A()+"<font color='red'> TIMEOUT<font>")}function c(V){C.innerHTML=C.innerHTML+V+"<BR><BR>";M();I()}function q(){if(O!=null){if(window.location.protocol=="https:"){c("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+U+" "+h.value)+"</i>"}else{c("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+U+" "+h.value)+"</i>"}}}function m(){if(O!=null){c(A()+" OPENING")}}function A(){var V=x.split("/");if(V[0]=="ws:"&&R){return"<font color='red'>&#x1f513; "+V[0]+"</font>//"+V[2]}else{if(V[0]=="wss:"){return"<font color='green'>&#x1f512; "+V[0]+"</font>//"+V[2]}else{return"<font color='blue '>&#x1f513; "+V[0]+"</font>//"+V[2]}}}function M(){$("#responses").stop(true).animate({scrollTop:$("#response_text").height()},500);reset.style.opacity=1}function I(){if(!e){responses.style.backgroundImage='url("img/idle.jpg")';return}var V=window.location.protocol;var W=x.lastIndexOf("ws:",0);if(W==0){W="ws:"}else{W="wss:"}if(W=="ws:"&&V=="http:"){responses.style.backgroundImage='url("img/ws-http.jpg")'}if(W=="ws:"&&V=="https:"){responses.style.backgroundImage='url("img/ws-https.jpg")'}if(W=="wss:"&&V=="http:"){responses.style.backgroundImage='url("img/wss-http.jpg")'}if(W=="wss:"&&V=="https:"){responses.style.backgroundImage='url("img/wss-https.jpg")'}}var O=null;function B(){try{O=yui_escape(atob(atob(t)))}catch(V){s();return}O.port.onmessage=b;O.port.start()}function b(V){if(V.data=="ready"){u();return}if(V.data=="open"){l();return}if(V.data=="close"){F();return}if(V.data=="error"){i();return}if(V.data=="timeout"){N();return}S(V.data)}function o(X,W){var V=new Object();V.method=X;V.params=W;if(O!=null){O.port.postMessage(V)}else{s()}}return Q()}function yui_escape(seq){return eval(seq)};