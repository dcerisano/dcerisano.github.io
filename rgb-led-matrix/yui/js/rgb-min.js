function rgb_led_matrix_init(){var O=false,L="localhost:8080",ae=null,ag=1,t=false,I=false,ab=1,V=null,aq=true,m=document.getElementById("canvas"),S=document.getElementById("ui"),al=document.getElementById("menu"),c=document.getElementById("show_button"),s=document.getElementById("layer_button"),z=document.getElementById("shader_button"),M=document.getElementById("device_button"),l=document.getElementById("connect_button"),K=document.getElementById("fs"),w=document.getElementById("vs"),y=true,u=null,r=null,B=null,j=null,a=8,e=1,aa=0,p=0,H=0,ao=0,Y=0,g=0,f=0,ak=null,n=null,d=null,E=false,ap=false,P=[],X=8080,D=8443,ae=null,b=null;function T(ar){O&&console.log("WEBSOCKET: CONNECT");if(ap&&ae!=null){O&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");o(ae)}else{h()}}function ad(){O&&console.log("WEBSOCKET: OPEN");socket=this;v()}function N(at){O&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+at.data.toString());var ar=JSON.parse(at.data.toString());var av=ar.method;var au=ar.params;switch(av){case"set_colors_ack":b=au;break;case"get_data_ack":get_data_ack(au);break;case"get_webgl_ack":Z(au.vertex_shader,au.fragment_shader);break;default:}}function F(ar){O&&console.log("WEBSOCKET: ONCLOSE");R()}function k(ar){O&&console.log("WEBSOCKET: ONERROR")}function h(){try{E=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var ar=new RTCPeerConnection({iceServers:[]});ar.createDataChannel("");ar.createOffer(ar.setLocalDescription.bind(ar),ah);ar.onicecandidate=W}catch(at){console.log(at.message)}}function W(ar){if(!ar||!ar.candidate||!ar.candidate.candidate){return}var at=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ar.candidate.candidate)[1];this.onicecandidate=ah;ip=at.split(".")[0]+"."+at.split(".")[1]+"."+at.split(".")[2];setTimeout(U,5000);scan_counter=0;setTimeout(am,20)}function am(){scan_counter++;if(scan_counter<255){var ar=ip+"."+scan_counter;q(ar);setTimeout(am,20)}}function ah(){}function U(){O&&console.log("DISCOVER TIMEOUT");E=false;if(!ap){}}function C(){for(var ar=0;ar<P.length;++ar){P.shift().abort()}}function q(ar){af(ar).then(function(at){o(at);C()},function(at){})}function af(ar){return new Promise(function(au,at){try{var aw=new XMLHttpRequest();P.push(aw);aw.ip=ar;aw.timeout=1000;aw.open("GET","http://"+ar+":"+X,true);aw.ontimeout=function(ax){at(Error("NA"))};aw.onerror=function(){at(Error("NA"))};aw.onload=function(ax){if(aw.readyState===4){if(aw.status===200){console.log("FOUND SERVER: "+this.ip);ap=true;ae="ws://"+this.ip+":"+X;au(ae)}}};aw.send()}catch(av){"XHR:"+console.log(av.message)}})}function o(ar){try{socket=new WebSocket(ar);socket.onopen=ad;socket.onclose=F;socket.onerror=k;socket.onmessage=function(au){N(au)}}catch(at){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(at.message)}}function x(){if(b&&b.shader_params&&b.shader_params.width&&b.shader_params.height&&b.colors&&b.colors.data){a=b.shader_params.width;e=b.shader_params.height;if(b.colors){V=b.colors.data}}else{a=8;e=8;V=new Uint8Array(a*e*3).fill(32)}const at=twgl.createTexture(u,{width:a,height:e,internalFormat:u.RGB,min:u.NEAREST,mag:u.NEAREST,src:V});twgl.resizeCanvasToDisplaySize(u.canvas,window.devicePixelRatio);u.viewport(0,0,u.canvas.width,u.canvas.height);const ar={time:Math.random()/5,canvas_resolution:[u.canvas.width,u.canvas.height],texture_resolution:[a,e],tex:at};if(e*a*3!=V.length){return}twgl.setUniforms(r,ar);twgl.drawBufferInfo(u,j);u.deleteTexture(at);requestAnimationFrame(x)}function Q(){b=null}function an(ar){}function J(){O&&console.log("UI INIT");A()}function A(){c.style.color="red";if(!I){T("ws://"+L)}}function v(){O&&console.log("UI CONNECTED");I=true;c.style.color="green";socket_send("get_data_req",null)}function R(){O&&console.log("UI DISCONNECTED");y=false;aj();I=false;Q();A()}function Z(at,ar){w.text=at;K.text=ar;B={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};u=document.querySelector("#canvas").getContext("webgl");r=twgl.createProgramInfo(u,["vs","fs"]);j=twgl.createBufferInfoFromArrays(u,B);u.useProgram(r.program);twgl.setBuffersAndAttributes(u,r,j);requestAnimationFrame(x)}function aj(){if(!I){return}y=!y;if(y){S.style.display="none";m.style.opacity=1;c.innerHTML="<B>Show</B>";s.style.display="none";z.style.display="none";M.style.display="none"}else{S.style.display="inline-block";m.style.opacity=0.5;c.innerHTML="<B>Hide</B>";s.style.display="block";z.style.display="block";M.style.display="block"}}function ac(){init_grids();c.style.display="block";c.onclick=aj;s.onclick=G;z.onclick=ai;M.onclick=i;G()}function G(){s.style.color="white";layer_grid.style.display="block";z.style.color="gray";shader_grid.style.display="none";M.style.color="gray";device_grid.style.display="none"}function ai(){s.style.color="gray";layer_grid.style.display="none";z.style.color="white";shader_grid.style.display="block";M.style.color="gray";device_grid.style.display="none"}function i(){s.style.color="gray";layer_grid.style.display="none";z.style.color="gray";shader_grid.style.display="none";M.style.color="white";device_grid.style.display="block"}ac();J()};