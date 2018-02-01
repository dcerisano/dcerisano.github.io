function rgb_led_matrix_init(){var P=false,x=null,O=null,g=null,at={},m={},L="localhost:8080",ag=null,ai=1,r=false,F=false,ad=1,W=null,ar=true,k=document.getElementById("canvas"),T=document.getElementById("ui"),am=document.getElementById("menu"),J=document.getElementById("fs"),u=document.getElementById("vs"),w=true,H=null,G=null,s=null,q=null,z=null,i=null,a=8,d=1,ac=0,o=0,E=0,ap=0,aa=0,f=0,e=0,al=null,l=null,c=null,C=false,aq=false,Q=[],Y=8080,B=8443,ag=null,b=null;function U(au){P&&console.log("WEBSOCKET: CONNECT");if(aq&&ag!=null){P&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");n(ag)}else{h()}}function af(){P&&console.log("WEBSOCKET: OPEN");socket=this;t()}function N(av){P&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+av.data.toString());var au=JSON.parse(av.data.toString());var ax=au.method;var aw=au.params;switch(ax){case"set_colors_ack":b=aw;break;case"get_shaders_ack":x=aw;break;case"get_devices_ack":O=aw;break;case"get_images_ack":g=aw;break;case"get_webgl_ack":ab(aw.vertex_shader,aw.fragment_shader);break;default:}}function D(au){P&&console.log("WEBSOCKET: ONCLOSE");S()}function j(au){P&&console.log("WEBSOCKET: ONERROR")}function K(av,au){P&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+Z(av,au));if(socket.readyState===socket.OPEN){socket.send(Z(av,au))}}function Z(aw,av){var au={method:aw,params:av};return JSON.stringify(au)}function h(){try{C=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var au=new RTCPeerConnection({iceServers:[]});au.createDataChannel("");au.createOffer(au.setLocalDescription.bind(au),aj);au.onicecandidate=X}catch(av){console.log(av.message)}}function X(au){if(!au||!au.candidate||!au.candidate.candidate){return}var av=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(au.candidate.candidate)[1];this.onicecandidate=aj;ip=av.split(".")[0]+"."+av.split(".")[1]+"."+av.split(".")[2];setTimeout(V,5000);scan_counter=0;setTimeout(an,20)}function an(){scan_counter++;if(scan_counter<255){var au=ip+"."+scan_counter;p(au);setTimeout(an,20)}}function aj(){}function V(){P&&console.log("DISCOVER TIMEOUT");C=false;if(!aq){}}function A(){for(var au=0;au<Q.length;++au){Q.shift().abort()}}function p(au){ah(au).then(function(av){n(av);A()},function(av){})}function ah(au){return new Promise(function(aw,av){try{var ay=new XMLHttpRequest();Q.push(ay);ay.ip=au;ay.timeout=1000;ay.open("GET","http://"+au+":"+Y,true);ay.ontimeout=function(az){av(Error("NA"))};ay.onerror=function(){av(Error("NA"))};ay.onload=function(az){if(ay.readyState===4){if(ay.status===200){console.log("FOUND SERVER: "+this.ip);aq=true;ag="ws://"+this.ip+":"+Y;aw(ag)}}};ay.send()}catch(ax){console.log(ax.message)}})}function n(au){try{socket=new WebSocket(au);socket.onopen=af;socket.onclose=D;socket.onerror=j;socket.onmessage=function(aw){N(aw)}}catch(av){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(av.message)}}function ao(au){}I();function I(){P&&console.log("UI INIT");y()}function y(){if(!F){U("ws://"+L)}}function t(){P&&console.log("UI CONNECTED");F=true}function S(){P&&console.log("UI DISCONNECTED");F=false;R();y()}function ab(av,au){u.text=av;J.text=au;z={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};s=document.querySelector("#canvas").getContext("webgl");q=twgl.createProgramInfo(s,["vs","fs"]);i=twgl.createBufferInfoFromArrays(s,z);s.useProgram(q.program);twgl.setBuffersAndAttributes(s,q,i);requestAnimationFrame(v)}function M(ax){var au=this.getRowValues(ax);au.name=au.name;var aw=0;for(var av=0;av<this.getRowCount();av++){aw=Math.max(aw,parseInt(this.getRowId(av))+1)}this.insertAfter(ax,aw,au)}function ak(){if(window.location.hostname==="standard3d.com"){return}w=!w;if(w){T.style.display="none";k.style.opacity=1;am.innerHTML="<b>SHOW</b>";am.style.color="gray"}else{T.style.display="inline-block";k.style.opacity=0.5;am.innerHTML="<b>HIDE&nbsp;&nbsp;&nbsp;&nbsp;SAVE&nbsp;&nbsp;&nbsp;&nbsp;LOAD&nbsp;&nbsp;&nbsp;&nbsp;UNDO</b>";am.style.color="white"}}function ae(){H=new EditableGrid("Layers");H.tableLoaded=function(){H.duplicate=M;this.setCellRenderer("action",new CellRenderer({render:function(au,av){var aw=H.getRowId(au.rowIndex);au.innerHTML='<a onclick="if (layerGrid.data.length>1) layerGrid.remove('+au.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';au.innerHTML+='&nbsp;<a onclick="layerGrid.duplicate('+au.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("layers","grid")};H.loadJSON("data/layers.json");G=new EditableGrid("Properties");G.tableLoaded=function(){G.duplicate=M;this.setCellRenderer("action",new CellRenderer({render:function(au,av){var aw=G.getRowId(au.rowIndex);au.innerHTML='<a onclick="if (propertyGrid.data.length>1) propertyGrid.remove('+au.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';au.innerHTML+='&nbsp;<a onclick="propertyGrid.duplicate('+au.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("properties","grid")};G.loadJSON("data/properties.json");if(window.location.hostname==="standard3d.com"){am.style.display="none"}am.onclick=ak}ae();function v(){if(b&&b.shader_params&&b.shader_params.width&&b.shader_params.height&&b.colors&&b.colors.data){a=b.shader_params.width;d=b.shader_params.height;if(b.colors){W=b.colors.data}}else{a=8;d=8;W=new Uint8Array(a*d*3).fill(32)}const av=twgl.createTexture(s,{width:a,height:d,internalFormat:s.RGB,min:s.NEAREST,mag:s.NEAREST,src:W});twgl.resizeCanvasToDisplaySize(s.canvas,window.devicePixelRatio);s.viewport(0,0,s.canvas.width,s.canvas.height);const au={time:Math.random()/5,canvas_resolution:[s.canvas.width,s.canvas.height],texture_resolution:[a,d],tex:av};if(d*a*3!=W.length){return}twgl.setUniforms(q,au);twgl.drawBufferInfo(s,i);s.deleteTexture(av);requestAnimationFrame(v)}function R(){b=null}};