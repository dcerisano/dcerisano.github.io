function rgb_led_matrix_init(){var ae=false,P="localhost:8080",W=null,m=1,I=false,af=false,S=1,ad=null,b=true,ax=document.getElementById("canvas"),D=document.getElementById("ui"),l=document.getElementById("menu"),az=document.getElementById("show_button"),ab=document.getElementById("layer_button"),n=document.getElementById("shader_button"),o=document.getElementById("device_button"),H=document.getElementById("layer_grid"),an=document.getElementById("shader_grid"),ao=document.getElementById("device_grid"),al=document.getElementById("fs"),r=document.getElementById("vs"),at=true,p=null,av=null,Q=null,X=null,d=null,G=null,V=null,aj=8,k=1,B=0,C=0,g=0,s=0,t=0,U=0,J=0,h=null,aw=null,ai=null,ay=false,w=false,x=[],z=8080,q=8443,W=null,ak=null;function i(aA){ae&&console.log("WEBSOCKET: CONNECT");if(w&&W!=null){ae&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");O(W)}else{y()}}function u(){ae&&console.log("WEBSOCKET: OPEN");socket=this;v()}function e(aB){ae&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+aB.data.toString());var aA=JSON.parse(aB.data.toString());var aD=aA.method;var aC=aA.params;switch(aD){case"set_colors_ack":ak=aC;break;case"get_shaders_ack":shaders=aC;break;case"get_devices_ack":devices=aC;break;case"get_images_ack":images=aC;break;case"get_webgl_ack":f(aC.vertex_shader,aC.fragment_shader);break;default:}}function E(aA){ae&&console.log("WEBSOCKET: ONCLOSE");aa()}function Z(aA){ae&&console.log("WEBSOCKET: ONERROR")}function a(aB,aA){ae&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+K(aB,aA));if(socket.readyState===socket.OPEN){socket.send(K(aB,aA))}}function K(aC,aB){var aA={method:aC,params:aB};return JSON.stringify(aA)}function y(){try{ay=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var aA=new RTCPeerConnection({iceServers:[]});aA.createDataChannel("");aA.createOffer(aA.setLocalDescription.bind(aA),ah);aA.onicecandidate=am}catch(aB){console.log(aB.message)}}function am(aA){if(!aA||!aA.candidate||!aA.candidate.candidate){return}var aB=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(aA.candidate.candidate)[1];this.onicecandidate=ah;ip=aB.split(".")[0]+"."+aB.split(".")[1]+"."+aB.split(".")[2];setTimeout(M,5000);scan_counter=0;setTimeout(L,20)}function L(){scan_counter++;if(scan_counter<255){var aA=ip+"."+scan_counter;aq(aA);setTimeout(L,20)}}function ah(){}function M(){ae&&console.log("DISCOVER TIMEOUT");ay=false;if(!w){}}function T(){for(var aA=0;aA<x.length;++aA){x.shift().abort()}}function aq(aA){ag(aA).then(function(aB){O(aB);T()},function(aB){})}function ag(aA){return new Promise(function(aC,aB){try{var aE=new XMLHttpRequest();x.push(aE);aE.ip=aA;aE.timeout=1000;aE.open("GET","http://"+aA+":"+z,true);aE.ontimeout=function(aF){aB(Error("NA"))};aE.onerror=function(){aB(Error("NA"))};aE.onload=function(aF){if(aE.readyState===4){if(aE.status===200){console.log("FOUND SERVER: "+this.ip);w=true;W="ws://"+this.ip+":"+z;aC(W)}}};aE.send()}catch(aD){console.log(aD.message)}})}function O(aA){try{socket=new WebSocket(aA);socket.onopen=u;socket.onclose=E;socket.onerror=Z;socket.onmessage=function(aC){e(aC)}}catch(aB){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(aB.message)}}function ap(){if(ak&&ak.shader_params&&ak.shader_params.width&&ak.shader_params.height&&ak.colors&&ak.colors.data){aj=ak.shader_params.width;k=ak.shader_params.height;if(ak.colors){ad=ak.colors.data}}else{aj=8;k=8;ad=new Uint8Array(aj*k*3).fill(32)}const aB=twgl.createTexture(X,{width:aj,height:k,internalFormat:X.RGB,min:X.NEAREST,mag:X.NEAREST,src:ad});twgl.resizeCanvasToDisplaySize(X.canvas,window.devicePixelRatio);X.viewport(0,0,X.canvas.width,X.canvas.height);const aA={time:Math.random()/5,canvas_resolution:[X.canvas.width,X.canvas.height],texture_resolution:[aj,k],tex:aB};if(k*aj*3!=ad.length){return}twgl.setUniforms(d,aA);twgl.drawBufferInfo(X,V);X.deleteTexture(aB);requestAnimationFrame(ap)}function au(){ak=null}"use strict";function Y(aA){}j();function j(){ae&&console.log("UI INIT");ar()}function ar(){if(!af){i("ws://"+P)}}function v(){ae&&console.log("UI CONNECTED");af=true}function aa(){ae&&console.log("UI DISCONNECTED");af=false;au();ar()}function f(aB,aA){r.text=aB;al.text=aA;G={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};X=document.querySelector("#canvas").getContext("webgl");d=twgl.createProgramInfo(X,["vs","fs"]);V=twgl.createBufferInfoFromArrays(X,G);X.useProgram(d.program);twgl.setBuffersAndAttributes(X,d,V);requestAnimationFrame(ap)}function ac(aD){var aA=this.getRowValues(aD);aA.name=aA.name;var aC=0;for(var aB=0;aB<this.getRowCount();aB++){aC=Math.max(aC,parseInt(this.getRowId(aB))+1)}this.insertAfter(aD,aC,aA)}function F(){at=!at;if(at){D.style.display="none";ax.style.opacity=1;az.innerHTML="<B>SHOW</B>";ab.style.display="none";n.style.display="none";o.style.display="none"}else{D.style.display="inline-block";ax.style.opacity=0.5;az.innerHTML="<B>HIDE</B>";ab.style.display="block";n.style.display="block";o.style.display="block"}}function N(){p=new EditableGrid("Layers");p.tableLoaded=function(){p.duplicate=ac;this.setCellRenderer("action",new CellRenderer({render:function(aA,aB){var aC=p.getRowId(aA.rowIndex);aA.innerHTML='<a onclick="if (layerGrid.data.length>1) layerGrid.remove('+aA.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';aA.innerHTML+='&nbsp;<a onclick="layerGrid.duplicate('+aA.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("layer_grid","grid")};p.loadJSON("data/layers.json");av=new EditableGrid("Shaders");av.tableLoaded=function(){av.duplicate=ac;this.setCellRenderer("action",new CellRenderer({render:function(aA,aB){var aC=av.getRowId(aA.rowIndex);aA.innerHTML='<a onclick="if (shaderGrid.data.length>1) shaderGrid.remove('+aA.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';aA.innerHTML+='&nbsp;<a onclick="shaderGrid.duplicate('+aA.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("shader_grid","grid")};av.loadJSON("data/shaders.json");Q=new EditableGrid("Devices");Q.tableLoaded=function(){Q.duplicate=ac;this.setCellRenderer("action",new CellRenderer({render:function(aA,aB){var aC=Q.getRowId(aA.rowIndex);aA.innerHTML='<a onclick="if (deviceGrid.data.length>1) deviceGrid.remove('+aA.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';aA.innerHTML+='&nbsp;<a onclick="deviceGrid.duplicate('+aA.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("device_grid","grid")};Q.loadJSON("data/devices.json");az.style.display="block";az.onclick=F;ab.onclick=A;n.onclick=c;o.onclick=R;A()}function A(){ab.style.color="white";H.style.display="block";n.style.color="gray";an.style.display="none";o.style.color="gray";ao.style.display="none"}function c(){ab.style.color="gray";H.style.display="none";n.style.color="white";an.style.display="block";o.style.color="gray";ao.style.display="none"}function R(){ab.style.color="gray";H.style.display="none";n.style.color="gray";an.style.display="none";o.style.color="white";ao.style.display="block"}N()};