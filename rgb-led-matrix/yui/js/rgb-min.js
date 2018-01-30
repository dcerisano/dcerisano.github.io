function rgb_led_matrix_init(){var M=false,w=null,L=null,h=null,an={},o={},I="localhost:8080",ab=null,ad=1,s=false,C=false,Y=1,S=null,m=document.getElementById("canvas"),P=document.getElementById("ui"),ah=document.getElementById("menu"),v=true,F=null,D=null,al=m.getContext("2d"),a=8,d=1,X=0,q=0,B=0,ak=0,W=0,g=0,e=0,ag=null,n=null,c=null,z=false,am=false,N=[],U=8080,ab=null;function Q(ao,aq,ap){M&&console.log("WEBSOCKET: CONNECT");if(am&&ab!=null){M&&console.log("WEBSOCKET: ATTEMPTING TO REUSE");p(ab)}else{k()}}function aa(){M&&console.log("WEBSOCKET: OPEN");socket=this;t()}function K(ap){M&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+ap.data.toString());var ao=JSON.parse(ap.data.toString());var ar=ao.method;var aq=ao.params;switch(ar){case"set_colors_ack":u(aq);aj(aq);break;case"get_shaders_ack":w=aq;break;case"get_devices_ack":L=aq;break;case"get_images_ack":h=aq;break;default:}}function A(ao){M&&console.log("WEBSOCKET: ONCLOSE");O()}function l(ao){M&&console.log("WEBSOCKET: ONERROR")}function H(ap,ao){M&&console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+V(ap,ao));if(socket.readyState===socket.OPEN){socket.send(V(ap,ao))}}function V(aq,ap){var ao={method:aq,params:ap};return JSON.stringify(ao)}function k(){try{z=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var ao=new RTCPeerConnection({iceServers:[]});ao.createDataChannel("");ao.createOffer(ao.setLocalDescription.bind(ao),ae);ao.onicecandidate=T}catch(ap){console.log(ap.message)}}function T(ao){if(!ao||!ao.candidate||!ao.candidate.candidate){return}var ap=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ao.candidate.candidate)[1];this.onicecandidate=ae;ip=ap.split(".")[0]+"."+ap.split(".")[1]+"."+ap.split(".")[2];setTimeout(R,5000);scan_counter=0;setTimeout(ai,20)}function ai(){scan_counter++;if(scan_counter<255){var ao=ip+"."+scan_counter;r(ao);setTimeout(ai,20)}}function ae(){}function R(){M&&console.log("DISCOVER TIMEOUT");z=false;if(!am){}}function y(){for(var ao=0;ao<N.length;++ao){N.shift().abort()}}function r(ao){ac(ao).then(function(ap){p(ap);y()},function(ap){})}function ac(ao){return new Promise(function(aq,ap){try{var at=new XMLHttpRequest();N.push(at);at.ip=ao;at.timeout=1000;at.open("GET","http://"+ao+":"+U,true);at.ontimeout=function(au){ap(Error("NA"))};at.onerror=function(){ap(Error("NA"))};at.onload=function(au){if(at.readyState===4){if(at.status===200){console.log("FOUND SERVER: "+this.ip);am=true;ab="ws://"+this.ip+":"+U;aq(ab)}}};at.send()}catch(ar){console.log(ar.message)}})}function p(ao){try{socket=new WebSocket(ao);socket.onopen=aa;socket.onclose=A;socket.onerror=l;socket.onmessage=function(aq){K(aq)}}catch(ap){SIGNAL_DEBUG&&console.log("DISCOVERY ERROR");SIGNAL_DEBUG&&console.log(ap.message)}}function aj(ao){}G();function G(){M&&console.log("UI INIT");x()}function x(){if(!C){Q("ws://"+I,t,O)}}function t(){M&&console.log("UI CONNECTED");C=true}function O(){M&&console.log("UI DISCONNECTED");C=false;u(null);x()}function J(ar){var ao=this.getRowValues(ar);ao.name=ao.name;var aq=0;for(var ap=0;ap<this.getRowCount();ap++){aq=Math.max(aq,parseInt(this.getRowId(ap))+1)}this.insertAfter(ar,aq,ao)}function Z(){document.getElementsByTagName("BODY")[0].onresize=u;ah.onclick=af;F=new EditableGrid("Layers");F.tableLoaded=function(){F.duplicate=J;this.setCellRenderer("action",new CellRenderer({render:function(ao,ap){var aq=F.getRowId(ao.rowIndex);ao.innerHTML='<a ondblclick="if (layerGrid.data.length>1) layerGrid.remove('+ao.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';ao.innerHTML+='&nbsp;<a ondblclick="layerGrid.duplicate('+ao.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("layers","grid")};F.loadJSON("data/layers.json");D=new EditableGrid("Properties");D.tableLoaded=function(){D.duplicate=J;this.setCellRenderer("action",new CellRenderer({render:function(ao,ap){var aq=D.getRowId(ao.rowIndex);ao.innerHTML='<a ondblclick="if (propertyGrid.data.length>1) propertyGrid.remove('+ao.rowIndex+'); " style="cursor:pointer"><img src="img/delete.png" border="0" alt="delete" title="Delete row"/></a>';ao.innerHTML+='&nbsp;<a ondblclick="propertyGrid.duplicate('+ao.rowIndex+');" style="cursor:pointer"><img src="img/duplicate.png" border="0" alt="duplicate" title="Duplicate row"/></a>'}}));this.renderGrid("properties","grid")};D.loadJSON("data/properties.json")}function af(){console.log("TOGGLE");if(location.hostname=="standard3d.com"){return}v=!v;if(v){P.style.display="none";m.style.opacity=1}else{P.style.display="inline-block";m.style.opacity=0.5}}Z();function u(ap){if(ap&&ap.shader_params&&ap.shader_params.width&&ap.shader_params.height&&ap.colors&&ap.colors.data){a=ap.shader_params.width;d=ap.shader_params.height;if(ap.colors){S=ap.colors.data}}else{a=8;d=1;S=new Uint8Array(24).fill(0)}b(ap);M&&console.log("drawMatrix");if(d*a*3!=S.length){return}for(i=0;i<a;i++){for(j=0;j<d;j++){var ao=B*(i+1),aq=ak*(j+1);f(ao,aq,W,E(i,j))}}}function b(){M&&console.log("resizeMatrix");X=window.innerWidth;q=window.innerHeight;g=0;e=0;m.width=X;m.height=q;m.style.width=X;m.style.height=q;B=X/(a+1);ak=q/(d+1);if(B>ak){B=ak}else{ak=B}e=(q-ak*(d+1))/2;g=(X-B*(a+1))/2;W=B*0.4}function E(ap,at){var ar=S[(at*a+ap)*3+0],aq=S[(at*a+ap)*3+1],ao=S[(at*a+ap)*3+2];if(typeof ar!=="undefined"&&aq!=="undefined"&&ao!=="undefined"){return"rgba("+ar+","+aq+","+ao+", 1.0)"}else{return null}}function f(ap,ar,ao,aq){if(aq){al.beginPath();al.arc(ap+g,ar+e,ao,0,2*Math.PI,false);al.fillStyle=aq;al.fill();al.lineWidth=1;al.strokeStyle="#101010";al.stroke()}}};