function init(){rgb_led_matrix_init()}function rgb_led_matrix_init(){var D=false,s=null,y=null,h=null,U={},k={},B="localhost:8080",M=null,O=1,p=false,w=false,L=1,H=null,m=document.getElementById("emulator"),F=document.getElementById("ui"),S=m.getContext("2d"),a=8,d=1,K=0,o=0,v=0,R=0,J=0,g=0,e=0,P=null,n=null,c=null;function G(V,X,W){D&&console.log("WEBSOCKET: CONNECT");try{q=X;E=W;socket=new WebSocket(V);socket.onopen=N;socket.onclose=u;socket.onerror=l;socket.onmessage=function(Z){C(Z)}}catch(Y){D&&console.log("WEBSOCKET: CONNECT ERROR");D&&console.log(Y.message)}}function N(){D&&console.log("WEBSOCKET: OPEN");socket=this;q()}function C(W){D&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+W.data.toString());var V=JSON.parse(W.data.toString());var Y=V.method;var X=V.params;switch(Y){case"set_colors_ack":r(X);Q(X);break;case"get_shaders_ack":s=X;break;case"get_controllers_ack":y=X;break;case"get_images_ack":h=X;break;default:}}function u(V){D&&console.log("WEBSOCKET: ONCLOSE");M=null;E()}function l(V){D&&console.log("WEBSOCKET: ONERROR")}function A(W,V){D&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+I(W,V));if(socket.readyState===socket.OPEN){socket.send(I(W,V))}}function I(X,W){var V={method:X,params:W};return JSON.stringify(V)}function Q(V){}function T(){if(!s||!y){while(L--){clearTimeout(L)}L=setTimeout(T,100);return}U={};k={};U.shader=s[Math.floor(Math.random()*s.length)];U.width=Math.floor(Math.random()*15+1);U.height=Math.floor(Math.random()*15+1);U.shader="ambilight";if(U.shader=="notifier"){U.image=h[Math.floor(Math.random()*h.length)];U.width=8;U.height=1}if(U.shader=="cpu_meter"){U.pwm_path="/sys/class/hwmon/hwmon0/pwm3";U.width=8;U.height=1}if(U.shader=="ambilight"){U.width=16;U.height=9;U.cropx=0.56;U.cropy=0.3;U.cropw=0.44;U.croph=0.7}if(U.shader=="plasma"){U.width=64;U.height=36;U.scale=(U.width+U.height)/10}A("set_shader_req",U);Q()}z();function z(){D&&console.log("UI INIT");t()}function t(){if(!w){G("ws://"+B,q,E)}}function q(){D&&console.log("UI CONNECTED");w=true;T()}function E(){D&&console.log("UI DISCONNECTED");w=false;r(null);t()}function r(W){if(W&&W.shader_params&&W.shader_params.width&&W.shader_params.height&&W.colors&&W.colors.data){a=W.shader_params.width;d=W.shader_params.height;if(W.colors){H=W.colors.data}}else{a=8;d=1;H=new Uint8Array(24).fill(0)}b(W);D&&console.log("drawMatrix");if(d*a*3!=H.length){return}for(i=0;i<a;i++){for(j=0;j<d;j++){var V=v*(i+1),X=R*(j+1);f(V,X,J,x(i,j))}}}function b(){D&&console.log("resizeMatrix");K=window.innerWidth;o=window.innerHeight;g=0;e=0;m.width=K;m.height=o;m.style.width=K;m.style.height=o;v=K/(a+1);R=o/(d+1);if(v>R){v=R}else{R=v}e=(o-R*(d+1))/2;g=(K-v*(a+1))/2;J=v*0.4}function x(W,Z){var Y=H[(Z*a+W)*3+0],X=H[(Z*a+W)*3+1],V=H[(Z*a+W)*3+2];if(typeof Y!=="undefined"&&X!=="undefined"&&V!=="undefined"){return"rgba("+Y+","+X+","+V+",1)"}else{return null}}function f(W,Y,V,X){if(X){S.beginPath();S.arc(W+g,Y+e,V,0,2*Math.PI,false);S.fillStyle=X;S.fill();S.lineWidth=1;S.strokeStyle="#101010";S.stroke()}}document.getElementsByTagName("BODY")[0].onresize=r};