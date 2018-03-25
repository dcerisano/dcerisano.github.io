function rgb_led_matrix_init(){var ab=false,l=1,I=false,ac=false,Q=1,aa=null,a=true,ar=document.getElementById("canvas"),E=document.getElementById("ui"),k=document.getElementById("menu"),au=document.getElementById("show_button"),Z=document.getElementById("server_button"),Y=document.getElementById("layer_button"),m=document.getElementById("shader_button"),n=document.getElementById("device_button"),b=document.getElementById("connect_button"),ai=document.getElementById("fs"),p=document.getElementById("vs"),an=true,U=null,d=null,H=null,T=null,ag=8,j=1,C=0,D=0,g=0,q=0,r=0,S=0,J=0,h=null,aq=null,af=null,at=false,u=false,w=[],z=8080,o=8443,x=[],ah=null,v=0,M=null;function A(){ab&&console.log("WEBSOCKET: CONNECT");if(u&&websocket!=null){ab&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");O(websocket)}else{y()}}function s(){ab&&console.log("WEBSOCKET: OPEN");socket=this;t()}function e(aw){ab&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+aw.data.toString());var av=JSON.parse(aw.data.toString());var ay=av.method;var ax=av.params;switch(ay){case"set_colors_ack":ah=ax;break;case"get_data_ack":get_data_ack(ax);break;case"get_webgl_ack":f(ax.vertex_shader,ax.fragment_shader);break;default:}}function F(av){ab&&console.log("WEBSOCKET: ONCLOSE");X()}function W(av){ab&&console.log("WEBSOCKET: ONERROR")}function y(){try{at=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var av=new RTCPeerConnection({iceServers:[]});av.createDataChannel("");av.createOffer(av.setLocalDescription.bind(av),ae);av.onicecandidate=aj}catch(aw){console.log(aw.message)}}function aj(av){if(!av||!av.candidate||!av.candidate.candidate){return}var aw=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(av.candidate.candidate)[1];this.onicecandidate=ae;ip=aw.split(".")[0]+"."+aw.split(".")[1]+"."+aw.split(".")[2];setTimeout(L,5000);scan_counter=0;setTimeout(K,20)}function K(){scan_counter++;if(scan_counter<255){var av=ip+"."+scan_counter;al(av);setTimeout(K,20)}}function ae(){}function L(){ab&&console.log("DISCOVER TIMEOUT");at=false;if(!u){}}function R(){for(var av=0;av<w.length;++av){w.shift().abort()}}function al(av){ad(av).then(function(aw){O(aw);R()},function(aw){})}function ad(av){return new Promise(function(ax,aw){try{var az=new XMLHttpRequest();w.push(az);az.ip=av;az.timeout=1000;az.open("GET","http://"+av+":"+z,true);az.ontimeout=function(aA){aw(Error("NA"))};az.onerror=function(){aw(Error("NA"))};az.onload=function(aB){if(az.readyState===4){if(az.status===200){console.log("FOUND SERVER: "+this.ip);u=true;var aA={};aA.ws="ws://"+this.ip+":"+z;aA.ip=this.ip;ax(aA)}}};az.send()}catch(ay){"XHR:"+console.log(ay.message)}})}function O(av){M.data[v]={};M.data[v].id=v+1;M.data[v].values={};M.data[v].values.address=av.ip;v++;try{socket=new WebSocket(av.ws);socket.onopen=s;socket.onclose=F;socket.onerror=W;socket.onmessage=function(ax){e(ax)}}catch(aw){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(aw.message)}}function ak(){if(ah&&ah.shader_params&&ah.shader_params.width&&ah.shader_params.height&&ah.colors&&ah.colors.data){ag=ah.shader_params.width;j=ah.shader_params.height;if(ah.colors){aa=ah.colors.data}}else{ag=8;j=8;aa=new Uint8Array(ag*j*3).fill(32)}const aw=twgl.createTexture(U,{width:ag,height:j,internalFormat:U.RGB,min:U.NEAREST,mag:U.NEAREST,src:aa});twgl.resizeCanvasToDisplaySize(U.canvas,window.devicePixelRatio);U.viewport(0,0,U.canvas.width,U.canvas.height);const av={time:Math.random()/5,canvas_resolution:[U.canvas.width,U.canvas.height],texture_resolution:[ag,j],tex:aw};if(j*ag*3!=aa.length){return}twgl.setUniforms(d,av);twgl.drawBufferInfo(U,T);U.deleteTexture(aw);requestAnimationFrame(ak)}function ap(){ah=null}function V(av){}function i(){ab&&console.log("UI INIT");am()}function am(){au.style.color="red";if(!ac){A()}}function t(){ab&&console.log("UI CONNECTED");ac=true;au.style.color="green";socket_send("get_data_req",null)}function X(){ab&&console.log("UI DISCONNECTED");an=false;G();ac=false;ap();am()}function f(aw,av){p.text=aw;ai.text=av;H={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};U=document.querySelector("#canvas").getContext("webgl");d=twgl.createProgramInfo(U,["vs","fs"]);T=twgl.createBufferInfoFromArrays(U,H);U.useProgram(d.program);twgl.setBuffersAndAttributes(U,d,T);requestAnimationFrame(ak)}function G(){if(!ac){return}an=!an;if(an){E.style.display="none";ar.style.opacity=1;au.innerHTML="<B>Show</B>";Z.style.display="none";Y.style.display="none";m.style.display="none";n.style.display="none"}else{E.style.display="inline-block";ar.style.opacity=0.5;au.innerHTML="<B>Hide</B>";Z.style.display="block";Y.style.display="block";m.style.display="block";n.style.display="block"}}function N(){init_grids();au.style.display="block";au.onclick=G;Z.onclick=ao;Y.onclick=B;m.onclick=c;n.onclick=P;ao()}function ao(){Z.style.color="white";server_grid.style.display="block";Y.style.color="gray";layer_grid.style.display="none";m.style.color="gray";shader_grid.style.display="none";n.style.color="gray";device_grid.style.display="none"}function B(){Y.style.color="white";layer_grid.style.display="block";Z.style.color="gray";server_grid.style.display="none";m.style.color="gray";shader_grid.style.display="none";n.style.color="gray";device_grid.style.display="none"}function c(){m.style.color="white";shader_grid.style.display="block";Y.style.color="gray";layer_grid.style.display="none";n.style.color="gray";device_grid.style.display="none"}function P(){Z.style.color="gray";server_grid.style.display="none";Y.style.color="gray";layer_grid.style.display="none";m.style.color="gray";shader_grid.style.display="none";n.style.color="white";device_grid.style.display="block"}N();i()};