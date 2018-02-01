function rgb_led_matrix_init(){var O=false,x=null,N=null,g=null,ar={},m={},K="localhost:8080",af=null,ah=1,r=false,E=false,ac=1,V=null,aq=true,k=document.getElementById("canvas"),S=document.getElementById("ui"),al=document.getElementById("menu"),I=document.getElementById("fs"),u=document.getElementById("vs"),w=true,G=null,F=null,s=null,q=null,z=null,i=null,a=8,d=1,ab=0,o=0,D=0,ao=0,Z=0,f=0,e=0,ak=null,l=null,c=null,B=false,ap=false,P=[],X=8080,af=null,b=null;function T(at){O&&console.log("WEBSOCKET: CONNECT");if(ap&&af!=null){O&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");n(af)}else{h()}}function ae(){O&&console.log("WEBSOCKET: OPEN");socket=this;t()}function M(au){O&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+au.data.toString());var at=JSON.parse(au.data.toString());var aw=at.method;var av=at.params;switch(aw){case"set_colors_ack":b=av;break;case"get_shaders_ack":x=av;break;case"get_devices_ack":N=av;break;case"get_images_ack":g=av;break;case"get_webgl_ack":aa(av.vertex_shader,av.fragment_shader);break;default:}}function C(at){O&&console.log("WEBSOCKET: ONCLOSE");R()}function j(at){O&&console.log("WEBSOCKET: ONERROR")}function J(au,at){O&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+Y(au,at));if(socket.readyState===socket.OPEN){socket.send(Y(au,at))}}function Y(av,au){var at={method:av,params:au};return JSON.stringify(at)}function h(){try{B=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var at=new RTCPeerConnection({iceServers:[]});at.createDataChannel("");at.createOffer(at.setLocalDescription.bind(at),ai);at.onicecandidate=W}catch(au){console.log(au.message)}}function W(at){if(!at||!at.candidate||!at.candidate.candidate){return}var au=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(at.candidate.candidate)[1];this.onicecandidate=ai;ip=au.split(".")[0]+"."+au.split(".")[1]+"."+au.split(".")[2];setTimeout(U,5000);scan_counter=0;setTimeout(am,20)}function am(){scan_counter++;if(scan_counter<255){var at=ip+"."+scan_counter;p(at);setTimeout(am,20)}}function ai(){}function U(){O&&console.log("DISCOVER TIMEOUT");B=false;if(!ap){}}function A(){for(var at=0;at<P.length;++at){P.shift().abort()}}function p(at){ag(at).then(function(au){n(au);A()},function(au){})}function ag(at){return new Promise(function(av,au){try{var ax=new XMLHttpRequest();P.push(ax);ax.ip=at;ax.timeout=1000;ax.open("GET","http://"+at+":"+X,true);ax.ontimeout=function(ay){au(Error("NA"))};ax.onerror=function(){au(Error("NA"))};ax.onload=function(ay){if(ax.readyState===4){if(ax.status===200){console.log("FOUND SERVER: "+this.ip);ap=true;af="ws://"+this.ip+":"+X;av(af)}}};ax.send()}catch(aw){console.log(aw.message)}})}function n(at){try{socket=new WebSocket(at);socket.onopen=ae;socket.onclose=C;socket.onerror=j;socket.onmessage=function(av){M(av)}}catch(au){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(au.message)}}function an(at){}H();function H(){O&&console.log("UI INIT");y()}function y(){if(!E){T("ws://"+K)}}function t(){O&&console.log("UI CONNECTED");E=true}function R(){O&&console.log("UI DISCONNECTED");E=false;Q();y()}function aa(au,at){u.text=au;I.text=at;z={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};s=document.querySelector("#canvas").getContext("webgl");q=twgl.createProgramInfo(s,["vs","fs"]);i=twgl.createBufferInfoFromArrays(s,z);s.useProgram(q.program);twgl.setBuffersAndAttributes(s,q,i);requestAnimationFrame(v)}function L(aw){var at=this.getRowValues(aw);at.name=at.name;var av=0;for(var au=0;au<this.getRowCount();au++){av=Math.max(av,parseInt(this.getRowId(au))+1)}this.insertAfter(aw,av,at)}function aj(){if(window.location.hostname==="standard3d.com"){return}w=!w;if(w){S.style.display="none";k.style.opacity=1;al.innerHTML="<b>SHOW</b>";al.style.color="gray"}else{S.style.display="inline-block";k.style.opacity=0.5;al.innerHTML="<b>HIDE&nbsp;&nbsp;&nbsp;&nbsp;SAVE&nbsp;&nbsp;&nbsp;&nbsp;LOAD&nbsp;&nbsp;&nbsp;&nbsp;UNDO</b>";al.style.color="white"}}function ad(){G=new EditableGrid("Layers");G.tableLoaded=function(){G.duplicate=L;this.setCellRenderer("action",new CellRenderer({render:function(at,au){var av=G.getRowId(at.rowIndex);at.innerHTML='<a onclick="if (layerGrid.data.length>1) layerGrid.remove('+at.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';at.innerHTML+='&nbsp;<a onclick="layerGrid.duplicate('+at.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("layers","grid")};G.loadJSON("data/layers.json");F=new EditableGrid("Properties");F.tableLoaded=function(){F.duplicate=L;this.setCellRenderer("action",new CellRenderer({render:function(at,au){var av=F.getRowId(at.rowIndex);at.innerHTML='<a onclick="if (propertyGrid.data.length>1) propertyGrid.remove('+at.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';at.innerHTML+='&nbsp;<a onclick="propertyGrid.duplicate('+at.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("properties","grid")};F.loadJSON("data/properties.json");al.onclick=aj}ad();function v(){if(b&&b.shader_params&&b.shader_params.width&&b.shader_params.height&&b.colors&&b.colors.data){a=b.shader_params.width;d=b.shader_params.height;if(b.colors){V=b.colors.data}}else{a=8;d=8;V=new Uint8Array(a*d*3).fill(32)}const au=twgl.createTexture(s,{width:a,height:d,internalFormat:s.RGB,min:s.NEAREST,mag:s.NEAREST,src:V});twgl.resizeCanvasToDisplaySize(s.canvas);s.viewport(0,0,s.canvas.width,s.canvas.height);const at={time:Math.random(),canvas_resolution:[s.canvas.width,s.canvas.height],texture_resolution:[a,d],tex:au};if(d*a*3!=V.length){return}twgl.setUniforms(q,at);twgl.drawBufferInfo(s,i);s.deleteTexture(au);requestAnimationFrame(v)}function Q(){b=null}};