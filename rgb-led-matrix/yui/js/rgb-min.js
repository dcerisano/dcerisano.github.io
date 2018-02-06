var layerGrid={};var shaderGrid={};var deviceGrid={};var layer_grid=document.getElementById("layer_grid");var shader_grid=document.getElementById("shader_grid");var device_grid=document.getElementById("device_grid");function rgb_led_matrix_init(){var af=false,Q="localhost:8080",X=null,n=1,J=false,ag=false,S=1,ae=null,b=true,av=document.getElementById("canvas"),F=document.getElementById("ui"),m=document.getElementById("menu"),ax=document.getElementById("show_button"),ac=document.getElementById("layer_button"),o=document.getElementById("shader_button"),p=document.getElementById("device_button"),c=document.getElementById("connect_button"),am=document.getElementById("fs"),r=document.getElementById("vs"),ar=true,Y=null,e=null,I=null,W=null,ak=8,l=1,D=0,E=0,h=0,s=0,t=0,U=0,K=0,i=null,au=null,aj=null,aw=false,w=false,x=[],A=8080,q=8443,X=null,al=null;function j(ay){af&&console.log("WEBSOCKET: CONNECT");if(w&&X!=null){af&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");P(X)}else{z()}}function u(){af&&console.log("WEBSOCKET: OPEN");socket=this;v()}function f(az){af&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+az.data.toString());var ay=JSON.parse(az.data.toString());var aB=ay.method;var aA=ay.params;switch(aB){case"set_colors_ack":al=aA;break;case"get_data_ack":B(aA);break;case"get_webgl_ack":g(aA.vertex_shader,aA.fragment_shader);break;default:}}function G(ay){af&&console.log("WEBSOCKET: ONCLOSE");ab()}function aa(ay){af&&console.log("WEBSOCKET: ONERROR")}function a(az,ay){af&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+L(az,ay));if(socket.readyState===socket.OPEN){socket.send(L(az,ay))}}function L(aA,az){var ay={method:aA,params:az};console.log(JSON.stringify(ay));return JSON.stringify(ay)}function z(){try{aw=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var ay=new RTCPeerConnection({iceServers:[]});ay.createDataChannel("");ay.createOffer(ay.setLocalDescription.bind(ay),ai);ay.onicecandidate=an}catch(az){console.log(az.message)}}function an(ay){if(!ay||!ay.candidate||!ay.candidate.candidate){return}var az=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ay.candidate.candidate)[1];this.onicecandidate=ai;ip=az.split(".")[0]+"."+az.split(".")[1]+"."+az.split(".")[2];setTimeout(N,5000);scan_counter=0;setTimeout(M,20)}function M(){scan_counter++;if(scan_counter<255){var ay=ip+"."+scan_counter;ap(ay);setTimeout(M,20)}}function ai(){}function N(){af&&console.log("DISCOVER TIMEOUT");aw=false;if(!w){}}function T(){for(var ay=0;ay<x.length;++ay){x.shift().abort()}}function ap(ay){ah(ay).then(function(az){P(az);T()},function(az){})}function ah(ay){return new Promise(function(aA,az){try{var aC=new XMLHttpRequest();x.push(aC);aC.ip=ay;aC.timeout=1000;aC.open("GET","http://"+ay+":"+A,true);aC.ontimeout=function(aD){az(Error("NA"))};aC.onerror=function(){az(Error("NA"))};aC.onload=function(aD){if(aC.readyState===4){if(aC.status===200){console.log("FOUND SERVER: "+this.ip);w=true;X="ws://"+this.ip+":"+A;aA(X)}}};aC.send()}catch(aB){"XHR:"+console.log(aB.message)}})}function P(ay){try{socket=new WebSocket(ay);socket.onopen=u;socket.onclose=G;socket.onerror=aa;socket.onmessage=function(aA){f(aA)}}catch(az){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(az.message)}}function ao(){if(al&&al.shader_params&&al.shader_params.width&&al.shader_params.height&&al.colors&&al.colors.data){ak=al.shader_params.width;l=al.shader_params.height;if(al.colors){ae=al.colors.data}}else{ak=8;l=8;ae=new Uint8Array(ak*l*3).fill(32)}const az=twgl.createTexture(Y,{width:ak,height:l,internalFormat:Y.RGB,min:Y.NEAREST,mag:Y.NEAREST,src:ae});twgl.resizeCanvasToDisplaySize(Y.canvas,window.devicePixelRatio);Y.viewport(0,0,Y.canvas.width,Y.canvas.height);const ay={time:Math.random()/5,canvas_resolution:[Y.canvas.width,Y.canvas.height],texture_resolution:[ak,l],tex:az};if(l*ak*3!=ae.length){return}twgl.setUniforms(e,ay);twgl.drawBufferInfo(Y,W);Y.deleteTexture(az);requestAnimationFrame(ao)}function at(){al=null}function Z(ay){}k();function k(){af&&console.log("UI INIT");aq()}function aq(){ax.style.color="red";if(!ag){j("ws://"+Q)}}function v(){af&&console.log("UI CONNECTED");ag=true;ax.style.color="green";a("get_data_req",null)}function ab(){af&&console.log("UI DISCONNECTED");ag=false;at();aq()}function g(az,ay){r.text=az;am.text=ay;I={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};Y=document.querySelector("#canvas").getContext("webgl");e=twgl.createProgramInfo(Y,["vs","fs"]);W=twgl.createBufferInfoFromArrays(Y,I);Y.useProgram(e.program);twgl.setBuffersAndAttributes(Y,e,W);requestAnimationFrame(ao)}function ad(aB){var ay=this.getRowValues(aB);ay.name=ay.name;var aA=0;for(var az=0;az<this.getRowCount();az++){aA=Math.max(aA,parseInt(this.getRowId(az))+1)}this.insertAfter(aB,aA,ay);y()}function H(){ar=!ar;if(ar){F.style.display="none";av.style.opacity=1;ax.innerHTML="<B>SHOW</B>";ac.style.display="none";o.style.display="none";p.style.display="none"}else{F.style.display="inline-block";av.style.opacity=0.5;ax.innerHTML="<B>HIDE</B>";ac.style.display="block";o.style.display="block";p.style.display="block"}}function O(){layerGrid=new EditableGrid("layerGrid");console.log(layerGrid.name);layerGrid.modelChanged=y;layerGrid.tableLoaded=function(){layerGrid.duplicate=ad;this.setCellRenderer("action",new CellRenderer({render:function(ay,az){ay.innerHTML=V(layerGrid,ay.rowIndex)}}));this.renderGrid("layer_grid","grid")};shaderGrid=new EditableGrid("shaderGrid");shaderGrid.modelChanged=y;shaderGrid.tableLoaded=function(){shaderGrid.duplicate=ad;this.setCellRenderer("action",new CellRenderer({render:function(ay,az){ay.innerHTML=V(shaderGrid,ay.rowIndex)}}));this.renderGrid("shader_grid","grid")};deviceGrid=new EditableGrid("deviceGrid");deviceGrid.modelChanged=y;deviceGrid.tableLoaded=function(){deviceGrid.duplicate=ad;this.setCellRenderer("action",new CellRenderer({render:function(ay,az){ay.innerHTML=V(deviceGrid,ay.rowIndex)}}));this.renderGrid("device_grid","grid")};ax.style.display="block";ax.onclick=H;ac.onclick=C;o.onclick=d;p.onclick=R;C()}function V(aA,az){var ay;ay='<a onclick="if ('+layerGrid.name+".data.length>1) "+layerGrid.name+".remove("+az+"); "+y.name+'(); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';ay+='&nbsp;<a onclick="'+layerGrid.name+".duplicate("+az+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>';return ay}function B(ay){console.log("GET DATA ACK");layerGrid.processJSON(ay.layers);layerGrid.tableLoaded();shaderGrid.processJSON(ay.shaders);shaderGrid.tableLoaded();deviceGrid.processJSON(ay.devices);deviceGrid.tableLoaded()}function y(){al={};al.layers={};al.layers.data=[];for(var ay=0;ay<layerGrid.data.length;ay++){al.layers.data[ay]={};al.layers.data[ay].id=layerGrid.data[ay].id;al.layers.data[ay].values={};al.layers.data[ay].values.zone=layerGrid.data[ay].columns[0];al.layers.data[ay].values.device=layerGrid.data[ay].columns[1];al.layers.data[ay].values.shader=layerGrid.data[ay].columns[2]}console.log("SET DATA REQ");a("set_data_req",al)}function C(){ac.style.color="white";layer_grid.style.display="block";o.style.color="gray";shader_grid.style.display="none";p.style.color="gray";device_grid.style.display="none"}function d(){ac.style.color="gray";layer_grid.style.display="none";o.style.color="white";shader_grid.style.display="block";p.style.color="gray";device_grid.style.display="none"}function R(){ac.style.color="gray";layer_grid.style.display="none";o.style.color="gray";shader_grid.style.display="none";p.style.color="white";device_grid.style.display="block"}O()};