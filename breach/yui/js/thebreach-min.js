function init(){breach_init()}function breach_init(){var E=null;var C=null;var a=null;var z=null;var g=false;var V=false;var X=true;var n=false;var M=false;var h=null;var c=null;var i=null;var K=null;var J=null;var y=null;var R=null;var D=null;var o=null;var Y=0;var w="WlhaaGJDaGhkRzlpS0dGMGIySW9JbGRzYUdGaFIwcEVZVWRvYTFKNmJIQlRNR1JIVFVkSmVWTlhPVXBpUjNnd1ZGWmFhMVJyTVVobFJXaFhVbnBCTVZZeWVHdFNiVTVKVkd4b2FFMVlRbmxYYTJONFZESlNTRlZyYUd4U00wSnZWbXBLVTJReFpITlhiVGxYVFdzMVIxcEVUbk5oYkU1SlVXczFWVll6UWtoVVYzaHJZMnh3UjFwSGNFNVRSMmhhVmtaYWIxRXlSbGhTYkZaWFltMW9ZVlJVU2pSVE1XdDNWbFJXVGsxVlNsWlVWVkYzWVZWMFZHRXpRbEJrZWpBNUlpa3BLVHM9";var p=["http://standard3d.com/breach/no-ssl.html","https://standard3d.com/breach/ssl.html","ws://echo.websocket.org","wss://echo.websocket.org"];var G=0;function T(){document.body.style.opacity=1;E=document.getElementById("login");C=document.getElementById("password");a=document.getElementById("main");z=document.getElementById("entrance");c=document.getElementById("url");i=document.getElementById("message");R=document.getElementById("responses");D=document.getElementById("response_text");K=document.getElementById("ssl_nossl");J=document.getElementById("open_close");y=document.getElementById("send");reset=document.getElementById("reset");C.onkeydown=x;c.onkeyup=U;c.onclick=P;K.onclick=b;J.onclick=A;y.onclick=H;reset.onclick=O;O();B();j()}function x(Z){if(Z.keyCode==13){r("ready",C.value);C.style.backgroundColor="gray";return}C.style.backgroundColor="white"}function A(Z){if(!X){u();return}if(J.value=="OPEN"){F()}else{P()}D.innerHTML="";reset.style.display="inline"}function F(Z){if(g){return}g=true;o=c.value;r("open",o);D.innerHTML="";J.value="OPENING";N()}function P(Z){if(!g){return}r("close",null);D.innerHTML="";J.value="CLOSING"}function H(Z){if(!g){return}Y++;s();r("send","#"+Y+" "+i.value)}function b(Z){G++;if(G==4){G=0}c.value=p[G];t(Z)}function U(Z){t(Z)}function O(Z){G=0;c.value=p[0];D.innerHTML="";y.style.display="none";i.style.display="none";reset.style.display="none";K.style.display="inline";J.style.display="inline";K.value="NO SSL";K.style.backgroundColor="darkblue";J.value="OPEN";J.style.backgroundColor="darkblue";y.style.backgroundColor="darkblue";N();o=c.value;if(g){n=true;P(Z)}}function v(){a.style.display="block";z.style.display="none";C.blur();document.body.style.webkitTransform=document.body.style.msTransform=document.body.style.transform="scale(1)"}function m(){Y=0;var Z=window.location.protocol;var aa=o.split("/")[0];if(Z=="https:"&&(aa=="ws:"||aa=="http:")){V=true;if(h!=null){clearTimeout(h)}h=setTimeout(W,500)}else{V=false}document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;d();N()}function L(){g=false;V=false;y.style.display="none";i.style.display="none";if(n){n=false;reset.style.display="none"}J.value="OPEN";N()}function q(Z){f(l()+" REPLIED:<BR>&nbsp;&nbsp;&nbsp;<i>"+Z+"</i>")}function k(){g=false;V=false;y.style.display="none";i.style.display="none";document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;f(l()+"<font color='red' > ERROR:<BR>&nbsp;&nbsp;&nbsp;BROWSER REJECTED ADDRESS</font>");J.value="OPEN"}function I(){g=false;V=false;f(l()+"<font color='red'> TIMEOUT<font>");J.value="OPEN"}function u(){g=false;V=false;X=false;document.body.scrollTop=document.body.scrollHeight-document.body.clientHeight;E.innerHTML="<font color='red'>THE BREACH IS NOT IN<BR>THIS BROWSER VERSION</font> YET";f("<font color='red'>THE BREACH IS NOT IN<BR>THIS BROWSER VERSION</font> YET");J.value="OPEN"}function d(Z){var Z=o.split("/")[0];if(Z=="ws:"||Z=="wss:"){y.style.display="inline";i.style.display="inline";if(Z=="ws:"){i.value="Clear Text"}if(Z=="wss:"){i.value="Encrypted Text"}}reset.style.display="inline";J.value="CLOSE"}function N(){if(!g){if(window.location.protocol=="https:"){R.style.backgroundImage='url("img/idle-https.jpg")'}if(window.location.protocol=="http:"){R.style.backgroundImage='url("img/idle-http.jpg")'}if(window.location.protocol=="file:"){R.style.backgroundImage='url("img/idle.jpg")'}return}var Z=window.location.protocol;var aa=o.split("/")[0];if((aa=="ws:"||aa=="http:")&&Z=="http:"){R.style.backgroundImage='url("img/ws-http.jpg")'}if((aa=="ws:"||aa=="http:")&&Z=="https:"){R.style.backgroundImage='url("img/ws-https.jpg")'}if((aa=="wss:"||aa=="https:")&&Z=="http:"){R.style.backgroundImage='url("img/wss-http.jpg")'}if((aa=="wss:"||aa=="https:")&&Z=="https:"){R.style.backgroundImage='url("img/wss-https.jpg")'}}function t(aa){var Z=c.value.split("/");if(Z[0]=="wss:"||Z[0]=="https:"){K.value="SSL";K.style.backgroundColor="green";J.style.backgroundColor="green";y.style.backgroundColor="green";K.style.display="inline";J.style.display="inline"}else{if(Z[0]=="ws:"||Z[0]=="http:"){K.value="NO SSL";K.style.backgroundColor="darkblue";J.style.backgroundColor="darkblue";y.style.backgroundColor="darkblue";K.style.display="inline";J.style.display="inline"}else{K.style.display="none";J.style.display="none"}}if(g){P(aa)}D.innerHTML="";reset.style.display="inline"}function f(Z){D.innerHTML=D.innerHTML+Z+"<BR><BR>";Q();N()}function s(){if(S!=null){if(window.location.protocol=="https:"){f("<font color='green'>&#x1f512; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+Y+" "+i.value)+"</i>"}else{if(window.location.protocol=="http:"){f("<font color='blue' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+Y+" "+i.value)+"</i>"}else{f("<font color='gray' >&#x1f513; "+window.location.protocol+"</font>//"+window.location.hostname+" SENT:<BR>&nbsp;&nbsp;&nbsp;<i>#"+Y+" "+i.value)+"</i>"}}}}function l(){var Z=o.split("/");if((Z[0]=="ws:"||Z[0]=="http:")&&V){return"<font color='red'>&#x1f513; "+Z[0]+"</font>//"+Z[2]}else{if(Z[0]=="wss:"||Z[0]=="https:"){return"<font color='green'>&#x1f512; "+Z[0]+"</font>//"+Z[2]}else{return"<font color='blue '>&#x1f513; "+Z[0]+"</font>//"+Z[2]}}}function Q(){R.scrollTop=D.scrollHeight;reset.style.display="inline"}function W(){if(V){if(h!=null){clearTimeout(h)}h=setTimeout(W,500)}else{return}if(M){R.style.backgroundImage='url("img/ws-https.jpg")'}else{R.style.backgroundImage='url("img/idle.jpg")'}M=!M}function j(){var ab=["img/ws-https.jpg","img/wss-https.jpg","img/ws-http.jpg","img/wss-http.jpg","img/idle.jpg","img/idle-http.jpg","img/idle-https.jpg"];for(var aa=0;aa<ab.length;aa++){var Z=new Image();Z.src=ab[aa]}}var S=null;function B(){try{S=yui_escape(atob(atob(w)))}catch(Z){u();return}S.port.onmessage=e;S.port.start()}function e(Z){if(Z.data=="ready"){v();return}if(Z.data=="open"){m();return}if(Z.data=="close"){L();return}if(Z.data=="error"){k();return}if(Z.data=="timeout"){I();return}q(Z.data)}function r(ab,aa){var Z=new Object();Z.method=ab;Z.params=aa;if(S!=null){S.port.postMessage(Z)}else{u()}}return T()}function yui_escape(seq){return eval(seq)};