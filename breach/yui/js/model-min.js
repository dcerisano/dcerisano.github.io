model_init();function model_init(){var k=5000;var b=null;var o=null;var c=null;var l=null;self.addEventListener("connect",function(p){b=p.ports[0];b.addEventListener("message",function(q){if(q.data.method=="ready"){m(q.data.params)}if(q.data.method=="open"){f(q.data.params)}if(q.data.method=="send"){d(q.data.params)}if(q.data.method=="close"){n()}},false);b.start()},false);function m(p){if(p==atob(atob("WkdWelpYSjA="))){b.postMessage("ready")}}function f(q){if(l!=null){clearTimeout(l)}l=setTimeout(h,k);var r=q.split("/")[0];if(r=="ws"||r=="wss"){try{c=new WebSocket(q)}catch(p){websocket_onerror(p)}if(c==null){websocket_onerror(p)}c.onopen=e;c.onclose=g;c.onmessage=a;c.onerror=j}else{try{o=new XMLHttpRequest();o.onload=i;o.onerror=j;o.open("GET",q,true);o.send()}catch(p){xhr_onerror()}}}function d(p){if(c!=null){c.send(p)}else{b.postMessage("error")}}function n(){clearTimeout(l);b.postMessage("close")}function e(){clearTimeout(l);b.postMessage("open")}function a(p){clearTimeout(l);b.postMessage(p.data)}function g(p){clearTimeout(l);b.postMessage("close")}function i(){clearTimeout(l);b.postMessage("open");b.postMessage(this.responseText)}function j(p){clearTimeout(l);b.postMessage("error")}function h(){clearTimeout(l);b.postMessage("timeout")}};