function init(){rgb_led_matrix_init()}function rgb_led_matrix_init(){var k=false,C=null,o=8,m=1,D=1,H=false,r=new Uint8Array(o*m*3),l=document.getElementById("matrix"),e=l.getContext("2d"),E=window.innerWidth,b=window.innerHeight,B=E/(o+1),t=b/(m+1),n=B*0.4,v=0,u=0,g=null,F=null,s=null,J=null,H=false;function z(K,M,L){k&&console.log("WEBSOCKET: CONNECT");try{s=M;J=L;socket=new WebSocket(K);socket.binaryType="arraybuffer";socket.onopen=y;socket.onclose=I;socket.onerror=d;socket.onmessage=function(O){a(O)}}catch(N){k&&console.log("WEBSOCKET: CONNECT ERROR");k&&console.log(N.message)}}function y(){k&&console.log("WEBSOCKET: OPEN");socket=this;s()}function a(K){r=new Uint8Array(K.data);k&&console.log("WEBSOCKET: ONMESSAGE: "+K.data);x()}function I(K){k&&console.log("WEBSOCKET: ONCLOSE");C=null;J()}function d(K){k&&console.log("WEBSOCKET: ONERROR");k&&console.log(K.message)}function f(M,L){k&&console.log("WEBSOCKET: SEND");var K={method:M,params:L};if(socket.readyState===socket.OPEN){socket.send(p(JSON.stringify(K)))}}function p(O){var L=new ArrayBuffer(O.length);var K=new Uint8Array(L);for(var M=0,N=O.length;M<N;M++){K[M]=O.charCodeAt(M)}return L}function A(){k&&console.log("UI INIT");z("ws://localhost:8080",H,q)}function H(){k&&console.log("UI CONNECTED");H=true;G()}function q(){k&&console.log("UI DISCONNECTED");H=false}function G(){var K=Math.floor(Math.random()*8+1);var L=Math.floor(Math.random()*8+1);f("resize",[K,L]);o=K;m=L;c();setTimeout(G,10000)}A();function c(){k&&console.log("resizeMatrix");E=window.innerWidth;b=window.innerHeight;v=0;u=0;l.width=E;l.height=b;l.style.width=E;l.style.height=b;B=E/(o+1);t=b/(m+1);if(B>t){B=t}else{t=B}u=(b-t*(m+1))/2;v=(E-B*(o+1))/2;n=B*0.4}function x(){k&&console.log("drawMatrix");for(i=0;i<m;i++){for(j=0;j<o;j++){var K=B*(j+1),L=t*(i+1);w(K,L,n,h(i,j))}}}function h(O,L){var N=r[(O*o+L)*3+0],M=r[(O*o+L)*3+1],K=r[(O*o+L)*3+2];k&&console.log("getColor:"+L+" "+O+" "+(O*m+L));return"rgba("+N+","+M+","+K+",1)"}function w(L,N,K,M){e.beginPath();e.arc(L+v,N+u,K,0,2*Math.PI,false);e.fillStyle=M;e.fill();e.lineWidth=1;e.strokeStyle="#101010";e.stroke();k&&console.log("drawDot: "+M)}c();document.getElementsByTagName("BODY")[0].onresize=c};