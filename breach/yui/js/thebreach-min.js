function init(){breach_init()}function breach_init(){var a=false;var A=false;var f=false;var R=false;var o=false;var P=null;var i=null;var s=null;var T=null;var e=null;var I=null;var z=null;var D=null;var l=null;var h=null;var q=null;var x=null;var y=null;var U=0;var u="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";function Q(){password=document.getElementById("password");a=document.getElementById("main");A=document.getElementById("entrance");P=document.getElementById("websocket");i=document.getElementById("message");D=document.getElementById("response_text");s=document.getElementById("wss");T=document.getElementById("ws");e=document.getElementById("open");I=document.getElementById("close");z=document.getElementById("send");reset=document.getElementById("reset");password.onkeydown=w;P.onkeydown=g;P.onclick=K;i.onkeydown=L;I.onclick=K;e.onclick=E;z.onclick=F;reset.onclick=J;s.onclick=k;T.onclick=H;l=new Audio("./img/siren.ogg");h=new Audio("./img/sneak.ogg");x=new Audio("./img/error.ogg");J();C()}function k(V){P.value="wss://echo.websocket.org";if(f){K(V)}reset.style.opacity=1;e.style.backgroundColor="green";z.style.backgroundColor="green"}function H(V){P.value="ws://echo.websocket.org";if(f){K(V)}reset.style.opacity=1;e.style.backgroundColor="blue";z.style.backgroundColor="blue"}function v(){a.style.display="block";A.style.display="none";x.load()}function w(V){if(V.keyCode==13){p("ready",password.value);x.play()}}function L(V){if(V.keyCode==13){F()}}function g(V){if(V.keyCode==13){E()}}function E(V){if(f){return}f=true;e.style.opacity=0.25;y=P.value;n();p("open",y);l.load()}function K(V){if(!f){return}I.style.opacity=0.25;p("close",null)}function F(V){if(!f){return}if(R){responses.style.backgroundImage='url("img/hole2.jpg")';h.onloadedmetadata=function(){clearTimeout(q);h.currentTime=(Math.random()*4).toFixed(0);h.play();q=setTimeout(b,1000)};h.load()}U++;r();p("send","#"+U+" "+i.value);z.style.opacity=0.5}function J(V){P.value="ws://echo.websocket.org";i.value="Into The Breach";D.innerHTML="";e.style.opacity=1;I.style.opacity=0.25;z.style.opacity=0.25;reset.style.opacity=0.25;e.style.backgroundColor="blue";z.style.backgroundColor="blue";responses.style.backgroundImage="none";y=P.value;h.pause();clearTimeout(q);if(f){o=true;K(V)}}function m(){U=0;var V=window.location.protocol;var W=y.lastIndexOf("ws:",0);if(W==0){W="ws:"}else{W="wss:"}if(V=="https:"&&W=="ws:"){R=true;responses.style.backgroundImage='url("img/hole.jpg")';l.play();d("<font color='red'>SECURITY CHECK FAILED</font>")}else{R=false;d("<font color='green'>SECURITY CHECK PASSED</font>")}e.style.opacity=0.25;I.style.opacity=1;z.style.opacity=1;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;d(B()+" OPENED");F()}function G(){f=false;R=false;responses.style.backgroundImage="none";e.style.opacity=1;I.style.opacity=0.25;z.style.opacity=0.25;l.pause();l.load();if(!o){d(B()+" CLOSED")}else{o=false}}function S(V){z.style.opacity=1;d(B()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+V+"</i>")}function j(){f=false;R=false;e.style.opacity=1;I.style.opacity=0.25;z.style.opacity=0.25;responses.style.backgroundImage="none";document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;x.pause();x.load();x.play();d(B()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;ADDRESS REJECTED</font>")}function t(){f=false;R=false;e.style.opacity=1;I.style.opacity=0.25;z.style.opacity=0.25;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;x.pause();x.load();x.play();d("<font color='red'>THE BREACH IS<BR>NOT YET POSSIBLE<BR>IN THIS BROWSER VERSION<font>")}function N(){f=false;R=false;e.style.opacity=1;I.style.opacity=0.25;z.style.opacity=0.25;responses.style.backgroundImage="none";x.play();d(B()+"<font color='red'> TIMEOUT<font>")}function d(V){D.innerHTML=D.innerHTML+V+"<BR><BR>";M()}function r(){if(O!=null){if(window.location.protocol=="https:"){d("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+U+" "+i.value)+"</i>"}else{d("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+U+" "+i.value)+"</i>"}}}function n(){if(O!=null){d(B()+" OPENING")}}function B(){var V=y.split("/");if(V[0]=="ws:"&&R){return"<font color='red'>&#x1f513; "+V[0]+"</font>//"+V[2]}else{if(V[0]=="wss:"){return"<font color='green'>&#x1f512; "+V[0]+"</font>//"+V[2]}else{return"<font color='blue '>&#x1f513; "+V[0]+"</font>//"+V[2]}}}function M(){$("#responses").stop(true).animate({scrollTop:$("#response_text").height()},500);reset.style.opacity=1}function b(){h.pause();if(R){responses.style.backgroundImage='url("img/hole.jpg")'}else{responses.style.backgroundImage="none"}}var O=null;function C(){try{O=yui_escape(atob(atob(u)))}catch(V){t();return}O.port.onmessage=c;O.port.start()}function c(V){if(V.data=="ready"){v();return}if(V.data=="open"){m();return}if(V.data=="close"){G();return}if(V.data=="error"){j();return}if(V.data=="timeout"){N();return}S(V.data)}function p(X,W){var V=new Object();V.method=X;V.params=W;if(O!=null){O.port.postMessage(V)}else{t()}}return Q()}function yui_escape(code){return eval(code)};