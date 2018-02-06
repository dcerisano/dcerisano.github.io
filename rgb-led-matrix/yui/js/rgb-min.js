function rgb_led_matrix_init(){var ai=false,S="localhost:8080",aa=null,n=1,L=false,aj=false,V=1,ah=null,b=true,aB=document.getElementById("canvas"),G=document.getElementById("ui"),m=document.getElementById("menu"),aD=document.getElementById("show_button"),af=document.getElementById("layer_button"),o=document.getElementById("shader_button"),p=document.getElementById("device_button"),c=document.getElementById("connect_button"),K=document.getElementById("layer_grid"),ar=document.getElementById("shader_grid"),at=document.getElementById("device_grid"),ap=document.getElementById("fs"),s=document.getElementById("vs"),ax=true,q=null,az=null,T=null,ab=null,e=null,J=null,Z=null,an=8,l=1,E=0,F=0,h=0,t=0,u=0,Y=0,M=0,i=null,aA=null,am=null,aC=false,x=false,y=[],B=8080,r=8443,aa=null,ao=null;function j(aE){ai&&console.log("WEBSOCKET: CONNECT");if(x&&aa!=null){ai&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");R(aa)}else{A()}}function v(){ai&&console.log("WEBSOCKET: OPEN");socket=this;w()}function f(aF){ai&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+aF.data.toString());var aE=JSON.parse(aF.data.toString());var aH=aE.method;var aG=aE.params;switch(aH){case"set_colors_ack":ao=aG;break;case"get_data_ack":C(aG);break;case"get_webgl_ack":g(aG.vertex_shader,aG.fragment_shader);break;default:}}function H(aE){ai&&console.log("WEBSOCKET: ONCLOSE");ae()}function ad(aE){ai&&console.log("WEBSOCKET: ONERROR")}function a(aF,aE){ai&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+N(aF,aE));if(socket.readyState===socket.OPEN){socket.send(N(aF,aE))}}function N(aG,aF){var aE={method:aG,params:aF};console.log(JSON.stringify(aE));return JSON.stringify(aE)}function A(){try{aC=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var aE=new RTCPeerConnection({iceServers:[]});aE.createDataChannel("");aE.createOffer(aE.setLocalDescription.bind(aE),al);aE.onicecandidate=aq}catch(aF){console.log(aF.message)}}function aq(aE){if(!aE||!aE.candidate||!aE.candidate.candidate){return}var aF=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(aE.candidate.candidate)[1];this.onicecandidate=al;ip=aF.split(".")[0]+"."+aF.split(".")[1]+"."+aF.split(".")[2];setTimeout(P,5000);scan_counter=0;setTimeout(O,20)}function O(){scan_counter++;if(scan_counter<255){var aE=ip+"."+scan_counter;av(aE);setTimeout(O,20)}}function al(){}function P(){ai&&console.log("DISCOVER TIMEOUT");aC=false;if(!x){}}function X(){for(var aE=0;aE<y.length;++aE){y.shift().abort()}}function av(aE){ak(aE).then(function(aF){R(aF);X()},function(aF){})}function ak(aE){return new Promise(function(aG,aF){try{var aI=new XMLHttpRequest();y.push(aI);aI.ip=aE;aI.timeout=1000;aI.open("GET","http://"+aE+":"+B,true);aI.ontimeout=function(aJ){aF(Error("NA"))};aI.onerror=function(){aF(Error("NA"))};aI.onload=function(aJ){if(aI.readyState===4){if(aI.status===200){console.log("FOUND SERVER: "+this.ip);x=true;aa="ws://"+this.ip+":"+B;aG(aa)}}};aI.send()}catch(aH){"XHR:"+console.log(aH.message)}})}function R(aE){try{socket=new WebSocket(aE);socket.onopen=v;socket.onclose=H;socket.onerror=ad;socket.onmessage=function(aG){f(aG)}}catch(aF){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(aF.message)}}function au(){if(ao&&ao.shader_params&&ao.shader_params.width&&ao.shader_params.height&&ao.colors&&ao.colors.data){an=ao.shader_params.width;l=ao.shader_params.height;if(ao.colors){ah=ao.colors.data}}else{an=8;l=8;ah=new Uint8Array(an*l*3).fill(32)}const aF=twgl.createTexture(ab,{width:an,height:l,internalFormat:ab.RGB,min:ab.NEAREST,mag:ab.NEAREST,src:ah});twgl.resizeCanvasToDisplaySize(ab.canvas,window.devicePixelRatio);ab.viewport(0,0,ab.canvas.width,ab.canvas.height);const aE={time:Math.random()/5,canvas_resolution:[ab.canvas.width,ab.canvas.height],texture_resolution:[an,l],tex:aF};if(l*an*3!=ah.length){return}twgl.setUniforms(e,aE);twgl.drawBufferInfo(ab,Z);ab.deleteTexture(aF);requestAnimationFrame(au)}function ay(){ao=null}"use strict";function ac(aE){}k();function k(){ai&&console.log("UI INIT");aw()}function aw(){aD.style.color="red";if(!aj){j("ws://"+S)}}function w(){ai&&console.log("UI CONNECTED");aj=true;aD.style.color="green";a("get_data_req",null)}function ae(){ai&&console.log("UI DISCONNECTED");aj=false;ay();aw()}function g(aF,aE){s.text=aF;ap.text=aE;J={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};ab=document.querySelector("#canvas").getContext("webgl");e=twgl.createProgramInfo(ab,["vs","fs"]);Z=twgl.createBufferInfoFromArrays(ab,J);ab.useProgram(e.program);twgl.setBuffersAndAttributes(ab,e,Z);requestAnimationFrame(au)}function ag(aH){var aE=this.getRowValues(aH);aE.name=aE.name;var aG=0;for(var aF=0;aF<this.getRowCount();aF++){aG=Math.max(aG,parseInt(this.getRowId(aF))+1)}this.insertAfter(aH,aG,aE);z()}function I(){ax=!ax;if(ax){G.style.display="none";aB.style.opacity=1;aD.innerHTML="<B>SHOW</B>";af.style.display="none";o.style.display="none";p.style.display="none"}else{G.style.display="inline-block";aB.style.opacity=0.5;aD.innerHTML="<B>HIDE</B>";af.style.display="block";o.style.display="block";p.style.display="block"}}function Q(){q=new EditableGrid("layerGrid");q.modelChanged=z;q.tableLoaded=function(){q.duplicate=ag;this.setCellRenderer("action",new CellRenderer({render:function(aE,aF){aE.innerHTML=W(q,aE.rowIndex)}}));this.renderGrid("layer_grid","grid")};az=new EditableGrid("shaderGrid");az.modelChanged=z;az.tableLoaded=function(){az.duplicate=ag;this.setCellRenderer("action",new CellRenderer({render:function(aE,aF){aE.innerHTML=W(az,aE.rowIndex)}}));this.renderGrid("shader_grid","grid")};T=new EditableGrid("deviceGrid");T.modelChanged=z;T.tableLoaded=function(){T.duplicate=ag;this.setCellRenderer("action",new CellRenderer({render:function(aE,aF){aE.innerHTML=W(az,aE.rowIndex)}}));this.renderGrid("device_grid","grid")};aD.style.display="block";aD.onclick=I;af.onclick=D;o.onclick=d;p.onclick=U;D()}function W(aG,aF){var aE;aE='<a onclick="if ('+q.name+".data.length>1) "+q.name+".remove("+aF+"); "+z.name+'(); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';aE+='&nbsp;<a onclick="'+q.name+".duplicate("+aF+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>';return aE}function C(aE){console.log("GET DATA ACK");q.processJSON(aE.layers);q.tableLoaded();az.processJSON(aE.shaders);az.tableLoaded();T.processJSON(aE.devices);T.tableLoaded()}function z(){ao={};ao.layers={};ao.layers.data=[];for(var aE=0;aE<q.data.length;aE++){ao.layers.data[aE]={};ao.layers.data[aE].id=q.data[aE].id;ao.layers.data[aE].values={};ao.layers.data[aE].values.zone=q.data[aE].columns[0];ao.layers.data[aE].values.device=q.data[aE].columns[1];ao.layers.data[aE].values.shader=q.data[aE].columns[2]}console.log("SET DATA REQ");a("set_data_req",ao)}function D(){af.style.color="white";K.style.display="block";o.style.color="gray";ar.style.display="none";p.style.color="gray";at.style.display="none"}function d(){af.style.color="gray";K.style.display="none";o.style.color="white";ar.style.display="block";p.style.color="gray";at.style.display="none"}function U(){af.style.color="gray";K.style.display="none";o.style.color="gray";ar.style.display="none";p.style.color="white";at.style.display="block"}Q()};