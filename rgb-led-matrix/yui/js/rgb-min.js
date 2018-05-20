function rgb_led_matrix_init(){var F=false,Q=1,M=1,G=null,X=true,v=true,Y=null,r=null,q=null,x=null,k=null,a=8,d=1,L=0,o=0,B=0,W=0,J=0,g=0,e=0,U=null,m=null,c=null,I=8080,y=8443,f=[],b=[];function O(){F&&console.log("WEBSOCKET: OPEN");t();this.send(json("get_webgl_req"));this.send(json("get_info_req"))}function E(ab){F&&console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+ab.data.toString());var aa=servers.data[selected_server].values.address==new URL(ab.origin).hostname;var Z=JSON.parse(ab.data.toString());var ad=Z.method;var ac=Z.params;switch(ad){case"discover_server_ack":D(ac);break;case"get_info_ack":s(ac);break;case"set_colors_ack":if(aa){Y=ac}break;case"get_data_ack":if(aa){get_data_ack(ac)}break;case"get_webgl_ack":if(aa){K(ac.vertex_shader,ac.fragment_shader)}break;default:}}function z(Z){F&&console.log("WEBSOCKET: ONCLOSE");data_close(new URL(this.url).hostname);update_server_menu();if(!connected){layers.data=null;shaders.data=null;devices.data=null;layerGrid.processJSON(layers);layerGrid.tableLoaded();shaderGrid.processJSON(shaders);shaderGrid.tableLoaded();deviceGrid.processJSON(devices);deviceGrid.tableLoaded();Y.width=1;Y.height=1;sahder_patams.colors.data=[0,0,0];u()}}function l(Z){F&&console.log("WEBSOCKET: ONERROR ")}function i(){try{discovering=true;window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var Z=new RTCPeerConnection({iceServers:[]});Z.createDataChannel("");Z.createOffer(Z.setLocalDescription.bind(Z),R);Z.onicecandidate=H}catch(aa){console.log(aa.message)}}function R(){}function H(Z){if(!Z||!Z.candidate||!Z.candidate.candidate){return}var aa=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(Z.candidate.candidate)[1];this.onicecandidate=R;ip=aa.split(".")[0]+"."+aa.split(".")[1]+"."+aa.split(".")[2];scan_counter=0;setTimeout(V,20)}function V(){scan_counter++;if(scan_counter<255){var Z=ip+"."+scan_counter;p(Z);setTimeout(V,20)}}function p(Z){P(Z).then(function(aa){n(aa)},function(aa){})}function P(Z){return new Promise(function(ab,aa){var ac=new XMLHttpRequest();ac.ip=Z;ac.timeout=1000;ac.open("GET","http://"+Z+":"+I,true);ac.ontimeout=function(ad){aa(Error("NA"))};ac.onerror=function(ad){console.clear();aa(Error("NA"))};ac.onload=function(ae){if(ac.readyState===4){if(ac.status===200){console.log("FOUND SERVER: "+this.ip);var ad={};ad.ws="ws://"+this.ip+":"+I;ad.ip=this.ip;ab(ad)}}};ac.send()})}function n(ab){try{var Z=new WebSocket(ab.ws);Z.onopen=O;Z.onclose=z;Z.onerror=l;Z.onmessage=E;var ac=false;if(num_servers>0){for(var aa=0;aa<num_servers;aa++){if(ab.ip===servers.data[aa].values.address){console.log("FOUND "+ab.ip);servers.data[aa].socket=Z;if(selected_server==-1){selected_server=aa}ac=true}}}if(selected_server==-1){selected_server=0}if(!ac){servers.data[num_servers]={};servers.data[num_servers].socket=Z;servers.data[num_servers].id=num_servers+1;servers.data[num_servers].values={};servers.data[num_servers].values.address=ab.ip;if(num_servers==0){servers.data[num_servers].values.selected=true}num_servers++}else{servers.data[selected_server].values.selected=true;update_server_menu();serverGrid.processJSON(servers);serverGrid.tableLoaded()}}catch(ad){console.log("DISCOVERY ERROR");console.log(ad.message)}}function s(aa){for(var Z=0;Z<num_servers;Z++){if(aa.ip===servers.data[Z].values.address){servers.data[Z].values.hostname=aa.hostname;servers.data[Z].values.platform=aa.platform;servers.data[Z].values.status=aa.status;servers.data[Z].projects=aa.projects}}update_server_menu();serverGrid.processJSON(servers);serverGrid.tableLoaded()}function D(aa){var Z={};Z.ws="ws://"+aa.ip+":"+I;Z.ip=aa.ip;n(Z)}function t(){socket_send(selected_server,"get_data_req",null);connected=true}function w(){if(!connected){i()}}setInterval(w,5000);function u(){if(Y&&Y.width&&Y.height&&Y.colors&&Y.colors.data){G=Y.colors.data;const aa=twgl.createTexture(r,{width:Y.width,height:Y.height,internalFormat:r.RGB,min:r.NEAREST,mag:r.NEAREST,src:G});twgl.resizeCanvasToDisplaySize(r.canvas,window.devicePixelRatio);r.viewport(0,0,r.canvas.width,r.canvas.height);const Z={time:Math.random()/5,canvas_resolution:[r.canvas.width,r.canvas.height],texture_resolution:[Y.width,Y.height],tex:aa};twgl.setUniforms(q,Z);twgl.drawBufferInfo(r,k);r.deleteTexture(aa)}requestAnimationFrame(u)}function C(){F&&console.log("UI INIT");w()}function w(){show_button.style.color="red";if(!connected){i()}}function t(){F&&console.log("UI CONNECTED");connected=true;show_button.style.color="green";socket_send(selected_server,"get_data_req",null)}function K(aa,Z){vs.text=aa;fs.text=Z;x={position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]};r=document.querySelector("#canvas").getContext("webgl");q=twgl.createProgramInfo(r,["vs","fs"]);k=twgl.createBufferInfoFromArrays(r,x);r.useProgram(q.program);twgl.setBuffersAndAttributes(r,q,k);requestAnimationFrame(u)}function T(){v=!v;if(v){ui.style.display="none";canvas.style.opacity=1;show_button.innerHTML="<B>Show</B>";server_button.style.display="none";layer_button.style.display="none";shader_button.style.display="none";device_button.style.display="none";server_config.style.display="none"}else{ui.style.display="inline-block";canvas.style.opacity=0.5;show_button.innerHTML="<B>Hide</B>";server_button.style.display="block";layer_button.style.display="block";shader_button.style.display="block";device_button.style.display="block";server_config.style.display="flex"}}function N(){var Z=document.createElement("option");Z.text="None";server_menu.add(Z);init_grids();show_button.style.display="block";show_button.onclick=T;server_button.onclick=h;layer_button.onclick=A;shader_button.onclick=S;device_button.onclick=j;server_menu.onchange=server_menu_onchange;v=true;T();h()}function h(){server_button.style.color="white";server_grid.style.display="block";layer_button.style.color="gray";layer_grid.style.display="none";shader_button.style.color="gray";shader_grid.style.display="none";device_button.style.color="gray";device_grid.style.display="none"}function A(){server_button.style.color="gray";server_grid.style.display="none";layer_button.style.color="white";layer_grid.style.display="block";shader_button.style.color="gray";shader_grid.style.display="none";device_button.style.color="gray";device_grid.style.display="none"}function S(){server_button.style.color="gray";server_grid.style.display="none";shader_button.style.color="white";shader_grid.style.display="block";layer_button.style.color="gray";layer_grid.style.display="none";device_button.style.color="gray";device_grid.style.display="none"}function j(){server_button.style.color="gray";server_grid.style.display="none";layer_button.style.color="gray";layer_grid.style.display="none";shader_button.style.color="gray";shader_grid.style.display="none";device_button.style.color="white";device_grid.style.display="block"}N();C()};