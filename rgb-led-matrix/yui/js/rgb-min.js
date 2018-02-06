function rgb_led_matrix_init(){var P=false,M="localhost:8080",ag=null,ai=1,t=false,I=false,ad=1,W=null,at=true,m=document.getElementById("canvas"),T=document.getElementById("ui"),an=document.getElementById("menu"),c=document.getElementById("show_button"),s=document.getElementById("layer_button"),z=document.getElementById("shader_button"),N=document.getElementById("device_button"),l=document.getElementById("connect_button"),K=document.getElementById("fs"),w=document.getElementById("vs"),y=true,u=null,r=null,B=null,j=null,a=8,e=1,ac=0,p=0,H=0,aq=0,aa=0,g=0,f=0,am=null,n=null,d=null,E=false,ar=false,Q=[],Y=8080,D=8443,ag=null,b=null;function U(au){P&&console.log("WEBSOCKET: CONNECT");if(ar&&ag!=null){P&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");o(ag)}else{h()}}function af(){P&&console.log("WEBSOCKET: OPEN");socket=this;v()}function O(av){P&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+av.data.toString());var au=JSON.parse(av.data.toString());var ax=au.method;var aw=au.params;switch(ax){case"set_colors_ack":b=aw;break;case"get_data_ack":get_data_ack(aw);break;case"get_webgl_ack":ab(aw.vertex_shader,aw.fragment_shader);break;default:}}function F(au){P&&console.log("WEBSOCKET: ONCLOSE");S()}function k(au){P&&console.log("WEBSOCKET: ONERROR")}function L(av,au){P&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+Z(av,au));if(socket.readyState===socket.OPEN){socket.send(Z(av,au))}}function Z(aw,av){var au={method:aw,params:av};console.log(JSON.stringify(au));return JSON.stringify(au)}function h(){try{E=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var au=new RTCPeerConnection({iceServers:[]});au.createDataChannel("");au.createOffer(au.setLocalDescription.bind(au),aj);au.onicecandidate=X}catch(av){console.log(av.message)}}function X(au){if(!au||!au.candidate||!au.candidate.candidate){return}var av=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(au.candidate.candidate)[1];this.onicecandidate=aj;ip=av.split(".")[0]+"."+av.split(".")[1]+"."+av.split(".")[2];setTimeout(V,5000);scan_counter=0;setTimeout(ao,20)}function ao(){scan_counter++;if(scan_counter<255){var au=ip+"."+scan_counter;q(au);setTimeout(ao,20)}}function aj(){}function V(){P&&console.log("DISCOVER TIMEOUT");E=false;if(!ar){}}function C(){for(var au=0;au<Q.length;++au){Q.shift().abort()}}function q(au){ah(au).then(function(av){o(av);C()},function(av){})}function ah(au){return new Promise(function(aw,av){try{var ay=new XMLHttpRequest();Q.push(ay);ay.ip=au;ay.timeout=1000;ay.open("GET","http://"+au+":"+Y,true);ay.ontimeout=function(az){av(Error("NA"))};ay.onerror=function(){av(Error("NA"))};ay.onload=function(az){if(ay.readyState===4){if(ay.status===200){console.log("FOUND SERVER: "+this.ip);ar=true;ag="ws://"+this.ip+":"+Y;aw(ag)}}};ay.send()}catch(ax){"XHR:"+console.log(ax.message)}})}function o(au){try{socket=new WebSocket(au);socket.onopen=af;socket.onclose=F;socket.onerror=k;socket.onmessage=function(aw){O(aw)}}catch(av){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(av.message)}}function x(){if(b&&b.shader_params&&b.shader_params.width&&b.shader_params.height&&b.colors&&b.colors.data){a=b.shader_params.width;e=b.shader_params.height;if(b.colors){W=b.colors.data}}else{a=8;e=8;W=new Uint8Array(a*e*3).fill(32)}const av=twgl.createTexture(u,{width:a,height:e,internalFormat:u.RGB,min:u.NEAREST,mag:u.NEAREST,src:W});twgl.resizeCanvasToDisplaySize(u.canvas,window.devicePixelRatio);u.viewport(0,0,u.canvas.width,u.canvas.height);const au={time:Math.random()/5,canvas_resolution:[u.canvas.width,u.canvas.height],texture_resolution:[a,e],tex:av};if(e*a*3!=W.length){return}twgl.setUniforms(r,au);twgl.drawBufferInfo(u,j);u.deleteTexture(av);requestAnimationFrame(x)}function R(){b=null}function ap(au){}J();function J(){P&&console.log("UI INIT");A()}function A(){c.style.color="red";if(!I){U("ws://"+M)}}function v(){P&&console.log("UI CONNECTED");I=true;c.style.color="green";L("get_data_req",null)}function S(){P&&console.log("UI DISCONNECTED");I=false;R();A()}function ab(av,au){w.text=av;K.text=au;B={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};u=document.querySelector("#canvas").getContext("webgl");r=twgl.createProgramInfo(u,["vs","fs"]);j=twgl.createBufferInfoFromArrays(u,B);u.useProgram(r.program);twgl.setBuffersAndAttributes(u,r,j);requestAnimationFrame(x)}function al(){y=!y;if(y){T.style.display="none";m.style.opacity=1;c.innerHTML="<B>SHOW</B>";s.style.display="none";z.style.display="none";N.style.display="none"}else{T.style.display="inline-block";m.style.opacity=0.5;c.innerHTML="<B>HIDE</B>";s.style.display="block";z.style.display="block";N.style.display="block"}}function ae(){c.style.display="block";c.onclick=al;s.onclick=G;z.onclick=ak;N.onclick=i;G()}function G(){s.style.color="white";layer_grid.style.display="block";z.style.color="gray";shader_grid.style.display="none";N.style.color="gray";device_grid.style.display="none"}function ak(){s.style.color="gray";layer_grid.style.display="none";z.style.color="white";shader_grid.style.display="block";N.style.color="gray";device_grid.style.display="none"}function i(){s.style.color="gray";layer_grid.style.display="none";z.style.color="gray";shader_grid.style.display="none";N.style.color="white";device_grid.style.display="block"}ae()};