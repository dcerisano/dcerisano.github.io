function rgb_led_matrix_init(){var N=false,w=null,M=null,f=null,aq={},l={},J="localhost:8080",ad=null,ag=1,q=false,D=false,aa=1,T=null,ap=true,j=document.getElementById("canvas"),Q=document.getElementById("ui"),ak=document.getElementById("menu"),H=document.getElementById("fs"),t=document.getElementById("vs"),v=true,F=null,E=null,r=null,p=null,y=null,h=null,a=8,c=1,Z=0,n=0,C=0,an=0,X=0,e=0,d=0,aj=null,k=null,b=null,A=false,ao=false,O=[],V=8080,ad=null,af=[];function R(ar){N&&console.log("WEBSOCKET: CONNECT");if(ao&&ad!=null){N&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");m(ad)}else{g()}}function ac(){N&&console.log("WEBSOCKET: OPEN");socket=this;s()}function L(at){N&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+at.data.toString());var ar=JSON.parse(at.data.toString());var av=ar.method;var au=ar.params;switch(av){case"set_colors_ack":af.push(au);break;case"get_shaders_ack":w=au;break;case"get_devices_ack":M=au;break;case"get_images_ack":f=au;break;case"get_webgl_ack":Y(au.vertex_shader,au.fragment_shader);break;default:}}function B(ar){N&&console.log("WEBSOCKET: ONCLOSE");P()}function i(ar){N&&console.log("WEBSOCKET: ONERROR")}function I(at,ar){N&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+W(at,ar));if(socket.readyState===socket.OPEN){socket.send(W(at,ar))}}function W(au,at){var ar={method:au,params:at};return JSON.stringify(ar)}function g(){try{A=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var ar=new RTCPeerConnection({iceServers:[]});ar.createDataChannel("");ar.createOffer(ar.setLocalDescription.bind(ar),ah);ar.onicecandidate=U}catch(at){console.log(at.message)}}function U(ar){if(!ar||!ar.candidate||!ar.candidate.candidate){return}var at=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ar.candidate.candidate)[1];this.onicecandidate=ah;ip=at.split(".")[0]+"."+at.split(".")[1]+"."+at.split(".")[2];setTimeout(S,5000);scan_counter=0;setTimeout(al,20)}function al(){scan_counter++;if(scan_counter<255){var ar=ip+"."+scan_counter;o(ar);setTimeout(al,20)}}function ah(){}function S(){N&&console.log("DISCOVER TIMEOUT");A=false;if(!ao){}}function z(){for(var ar=0;ar<O.length;++ar){O.shift().abort()}}function o(ar){ae(ar).then(function(at){m(at);z()},function(at){})}function ae(ar){return new Promise(function(au,at){try{var aw=new XMLHttpRequest();O.push(aw);aw.ip=ar;aw.timeout=1000;aw.open("GET","http://"+ar+":"+V,true);aw.ontimeout=function(ax){at(Error("NA"))};aw.onerror=function(){at(Error("NA"))};aw.onload=function(ax){if(aw.readyState===4){if(aw.status===200){console.log("FOUND SERVER: "+this.ip);ao=true;ad="ws://"+this.ip+":"+V;au(ad)}}};aw.send()}catch(av){console.log(av.message)}})}function m(ar){try{socket=new WebSocket(ar);socket.onopen=ac;socket.onclose=B;socket.onerror=i;socket.onmessage=function(au){L(au)}}catch(at){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(at.message)}}function am(ar){}G();function G(){N&&console.log("UI INIT");x()}function x(){if(!D){R("ws://"+J)}}function s(){N&&console.log("UI CONNECTED");D=true}function P(){N&&console.log("UI DISCONNECTED");D=false;var ar={};ar.shader_params={};ar.shader_params.width=8;ar.shader_params.height=1;ar.colors={};ar.colors.data=new Uint8Array(24).fill(0);af.push(ar);u();x()}function Y(at,ar){t.text=at;H.text=ar;y={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};r=document.querySelector("#canvas").getContext("webgl");p=twgl.createProgramInfo(r,["vs","fs"]);h=twgl.createBufferInfoFromArrays(r,y);r.useProgram(p.program);twgl.setBuffersAndAttributes(r,p,h);requestAnimationFrame(u)}function K(av){var ar=this.getRowValues(av);ar.name=ar.name;var au=0;for(var at=0;at<this.getRowCount();at++){au=Math.max(au,parseInt(this.getRowId(at))+1)}this.insertAfter(av,au,ar)}function ai(){if(window.location.hostname==="standard3d.com"){return}v=!v;if(v){Q.style.display="none";j.style.opacity=1;ak.innerHTML="<b>SHOW</b>";ak.style.color="gray"}else{Q.style.display="inline-block";j.style.opacity=0.5;ak.innerHTML="<b>HIDE&nbsp;&nbsp;&nbsp;&nbsp;SAVE&nbsp;&nbsp;&nbsp;&nbsp;LOAD&nbsp;&nbsp;&nbsp;&nbsp;UNDO</b>";ak.style.color="white"}}function ab(){F=new EditableGrid("Layers");F.tableLoaded=function(){F.duplicate=K;this.setCellRenderer("action",new CellRenderer({render:function(ar,at){var au=F.getRowId(ar.rowIndex);ar.innerHTML='<a onclick="if (layerGrid.data.length>1) layerGrid.remove('+ar.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';ar.innerHTML+='&nbsp;<a onclick="layerGrid.duplicate('+ar.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("layers","grid")};F.loadJSON("data/layers.json");E=new EditableGrid("Properties");E.tableLoaded=function(){E.duplicate=K;this.setCellRenderer("action",new CellRenderer({render:function(ar,at){var au=E.getRowId(ar.rowIndex);ar.innerHTML='<a onclick="if (propertyGrid.data.length>1) propertyGrid.remove('+ar.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';ar.innerHTML+='&nbsp;<a onclick="propertyGrid.duplicate('+ar.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("properties","grid")};E.loadJSON("data/properties.json");ak.onclick=ai}ab();function u(){var at=null;if(af&&af.length>0){at=af.shift()}if(at==null){requestAnimationFrame(u);return}if(at.shader_params&&at.shader_params.width&&at.shader_params.height&&at.colors&&at.colors.data){a=at.shader_params.width;c=at.shader_params.height;if(at.colors){T=at.colors.data}}const au=twgl.createTexture(r,{width:a,height:c,internalFormat:r.RGB,min:r.NEAREST,mag:r.NEAREST,src:T});twgl.resizeCanvasToDisplaySize(r.canvas);r.viewport(0,0,r.canvas.width,r.canvas.height);const ar={canvas_resolution:[r.canvas.width,r.canvas.height],texture_resolution:[a,c],tex:au};if(c*a*3!=T.length){return}twgl.setUniforms(p,ar);twgl.drawBufferInfo(r,h);r.deleteTexture(au);requestAnimationFrame(u)}};