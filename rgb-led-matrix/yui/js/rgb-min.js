function init(){rgb_led_matrix_init()}function rgb_led_matrix_init(){var e=false,x=null,k=8,g=1,y=1,A=false,l=new Uint8Array(k*g*3),f=document.getElementById("matrix"),b=f.getContext("2d"),z=window.innerWidth,a=window.innerHeight,w=z/(k+1),m=a/(g+1),h=w*0.4,o=0,n=0;function c(){z=window.innerWidth;a=window.innerHeight;console.log(z);o=0;n=0;f.width=z;f.height=a;f.style.width=z;f.style.height=a;w=z/(k+1);m=a/(g+1);if(w>m){w=m}else{m=w}n=(a-m*(g+1))/2;o=(z-w*(k+1))/2;h=w*0.4}function t(){b.clearRect(0,0,z,a);for(i=0;i<g;i++){for(j=0;j<k;j++){var B=w*(j+1),C=m*(i+1);r(B,C,h,d(j,i))}}}function d(D,G){var F=l[(G*g+D)*3+0],E=l[(G*g+D)*3+1],B=l[(G*g+D)*3+2],C=B|(E<<8)|(F<<16);return"#"+C.toString(16)}function r(C,E,B,D){b.beginPath();b.arc(C+o,E+n,B,0,2*Math.PI,false);b.fillStyle=D;b.fill();b.lineWidth=2;b.strokeStyle="#111111";b.stroke()}function u(B){try{x=new WebSocket(B);x.binaryType="arraybuffer";x.onopen=v;x.onclose=q;x.onerror=s;x.onmessage=function(D){p(D)}}catch(C){e&&console.log("WEBSOCKET CONNECT ERROR");e&&console.log(C.message)}}function v(){e&&console.log("WEBSOCKET OPEN");x=this}function p(B){e&&console.log("WEBSOCKET ONMESSAGE");l=new Uint8Array(B.data);t()}function q(B){e&&console.log("WEBSOCKET ONCLOSE");x=null}function s(B){e&&console.log("WEBSOCKET ONERROR");e&&console.log(B.message)}c();t();document.getElementsByTagName("BODY")[0].onresize=c;u("ws://localhost:8080")};