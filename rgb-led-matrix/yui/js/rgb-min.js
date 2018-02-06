var layer_grid=document.getElementById("layer_grid");var shader_grid=document.getElementById("shader_grid");var device_grid=document.getElementById("device_grid");function rgb_led_matrix_init(){var ah=false,R="localhost:8080",Z=null,n=1,K=false,ai=false,U=1,ag=null,b=true,ay=document.getElementById("canvas"),G=document.getElementById("ui"),m=document.getElementById("menu"),aA=document.getElementById("show_button"),ae=document.getElementById("layer_button"),o=document.getElementById("shader_button"),p=document.getElementById("device_button"),c=document.getElementById("connect_button"),ao=document.getElementById("fs"),s=document.getElementById("vs"),au=true,q={},aw={},S={},aa=null,e=null,J=null,Y=null,am=8,l=1,E=0,F=0,h=0,t=0,u=0,X=0,L=0,i=null,ax=null,al=null,az=false,x=false,y=[],B=8080,r=8443,Z=null,an=null;function j(aB){ah&&console.log("WEBSOCKET: CONNECT");if(x&&Z!=null){ah&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");Q(Z)}else{A()}}function v(){ah&&console.log("WEBSOCKET: OPEN");socket=this;w()}function f(aC){ah&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+aC.data.toString());var aB=JSON.parse(aC.data.toString());var aE=aB.method;var aD=aB.params;switch(aE){case"set_colors_ack":an=aD;break;case"get_data_ack":C(aD);break;case"get_webgl_ack":g(aD.vertex_shader,aD.fragment_shader);break;default:}}function H(aB){ah&&console.log("WEBSOCKET: ONCLOSE");ad()}function ac(aB){ah&&console.log("WEBSOCKET: ONERROR")}function a(aC,aB){ah&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+M(aC,aB));if(socket.readyState===socket.OPEN){socket.send(M(aC,aB))}}function M(aD,aC){var aB={method:aD,params:aC};console.log(JSON.stringify(aB));return JSON.stringify(aB)}function A(){try{az=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var aB=new RTCPeerConnection({iceServers:[]});aB.createDataChannel("");aB.createOffer(aB.setLocalDescription.bind(aB),ak);aB.onicecandidate=ap}catch(aC){console.log(aC.message)}}function ap(aB){if(!aB||!aB.candidate||!aB.candidate.candidate){return}var aC=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(aB.candidate.candidate)[1];this.onicecandidate=ak;ip=aC.split(".")[0]+"."+aC.split(".")[1]+"."+aC.split(".")[2];setTimeout(O,5000);scan_counter=0;setTimeout(N,20)}function N(){scan_counter++;if(scan_counter<255){var aB=ip+"."+scan_counter;ar(aB);setTimeout(N,20)}}function ak(){}function O(){ah&&console.log("DISCOVER TIMEOUT");az=false;if(!x){}}function W(){for(var aB=0;aB<y.length;++aB){y.shift().abort()}}function ar(aB){aj(aB).then(function(aC){Q(aC);W()},function(aC){})}function aj(aB){return new Promise(function(aD,aC){try{var aF=new XMLHttpRequest();y.push(aF);aF.ip=aB;aF.timeout=1000;aF.open("GET","http://"+aB+":"+B,true);aF.ontimeout=function(aG){aC(Error("NA"))};aF.onerror=function(){aC(Error("NA"))};aF.onload=function(aG){if(aF.readyState===4){if(aF.status===200){console.log("FOUND SERVER: "+this.ip);x=true;Z="ws://"+this.ip+":"+B;aD(Z)}}};aF.send()}catch(aE){"XHR:"+console.log(aE.message)}})}function Q(aB){try{socket=new WebSocket(aB);socket.onopen=v;socket.onclose=H;socket.onerror=ac;socket.onmessage=function(aD){f(aD)}}catch(aC){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(aC.message)}}function aq(){if(an&&an.shader_params&&an.shader_params.width&&an.shader_params.height&&an.colors&&an.colors.data){am=an.shader_params.width;l=an.shader_params.height;if(an.colors){ag=an.colors.data}}else{am=8;l=8;ag=new Uint8Array(am*l*3).fill(32)}const aC=twgl.createTexture(aa,{width:am,height:l,internalFormat:aa.RGB,min:aa.NEAREST,mag:aa.NEAREST,src:ag});twgl.resizeCanvasToDisplaySize(aa.canvas,window.devicePixelRatio);aa.viewport(0,0,aa.canvas.width,aa.canvas.height);const aB={time:Math.random()/5,canvas_resolution:[aa.canvas.width,aa.canvas.height],texture_resolution:[am,l],tex:aC};if(l*am*3!=ag.length){return}twgl.setUniforms(e,aB);twgl.drawBufferInfo(aa,Y);aa.deleteTexture(aC);requestAnimationFrame(aq)}function av(){an=null}function ab(aB){}k();function k(){ah&&console.log("UI INIT");at()}function at(){aA.style.color="red";if(!ai){j("ws://"+R)}}function w(){ah&&console.log("UI CONNECTED");ai=true;aA.style.color="green";a("get_data_req",null)}function ad(){ah&&console.log("UI DISCONNECTED");ai=false;av();at()}function g(aC,aB){s.text=aC;ao.text=aB;J={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};aa=document.querySelector("#canvas").getContext("webgl");e=twgl.createProgramInfo(aa,["vs","fs"]);Y=twgl.createBufferInfoFromArrays(aa,J);aa.useProgram(e.program);twgl.setBuffersAndAttributes(aa,e,Y);requestAnimationFrame(aq)}function af(aE){var aB=this.getRowValues(aE);aB.name=aB.name;var aD=0;for(var aC=0;aC<this.getRowCount();aC++){aD=Math.max(aD,parseInt(this.getRowId(aC))+1)}this.insertAfter(aE,aD,aB);z()}function I(){au=!au;if(au){G.style.display="none";ay.style.opacity=1;aA.innerHTML="<B>SHOW</B>";ae.style.display="none";o.style.display="none";p.style.display="none"}else{G.style.display="inline-block";ay.style.opacity=0.5;aA.innerHTML="<B>HIDE</B>";ae.style.display="block";o.style.display="block";p.style.display="block"}}function P(){q=new EditableGrid("layerGrid");console.log(q.name);q.modelChanged=z;q.tableLoaded=function(){q.duplicate=af;this.setCellRenderer("action",new CellRenderer({render:function(aB,aC){aB.innerHTML=V(q,aB.rowIndex)}}));this.renderGrid("layer_grid","grid")};aw=new EditableGrid("shaderGrid");aw.modelChanged=z;aw.tableLoaded=function(){aw.duplicate=af;this.setCellRenderer("action",new CellRenderer({render:function(aB,aC){aB.innerHTML=V(aw,aB.rowIndex)}}));this.renderGrid("shader_grid","grid")};S=new EditableGrid("deviceGrid");S.modelChanged=z;S.tableLoaded=function(){S.duplicate=af;this.setCellRenderer("action",new CellRenderer({render:function(aB,aC){aB.innerHTML=V(aw,aB.rowIndex)}}));this.renderGrid("device_grid","grid")};aA.style.display="block";aA.onclick=I;ae.onclick=D;o.onclick=d;p.onclick=T;D()}function V(aD,aC){var aB;aB='<a onclick="if ('+q.name+".data.length>1) "+q.name+".remove("+aC+"); "+z.name+'(); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';aB+='&nbsp;<a onclick="'+q.name+".duplicate("+aC+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>';return aB}function C(aB){console.log("GET DATA ACK");q.processJSON(aB.layers);q.tableLoaded();aw.processJSON(aB.shaders);aw.tableLoaded();S.processJSON(aB.devices);S.tableLoaded()}function z(){an={};an.layers={};an.layers.data=[];for(var aB=0;aB<q.data.length;aB++){an.layers.data[aB]={};an.layers.data[aB].id=q.data[aB].id;an.layers.data[aB].values={};an.layers.data[aB].values.zone=q.data[aB].columns[0];an.layers.data[aB].values.device=q.data[aB].columns[1];an.layers.data[aB].values.shader=q.data[aB].columns[2]}console.log("SET DATA REQ");a("set_data_req",an)}function D(){ae.style.color="white";layer_grid.style.display="block";o.style.color="gray";shader_grid.style.display="none";p.style.color="gray";device_grid.style.display="none"}function d(){ae.style.color="gray";layer_grid.style.display="none";o.style.color="white";shader_grid.style.display="block";p.style.color="gray";device_grid.style.display="none"}function T(){ae.style.color="gray";layer_grid.style.display="none";o.style.color="gray";shader_grid.style.display="none";p.style.color="white";device_grid.style.display="block"}P()};