model_init();function model_init(){var i=5000;var b=null;var l=null;var j=null;self.addEventListener("connect",function(n){b=n.ports[0];b.addEventListener("message",function(o){if(o.data.method=="ready"){k(o.data.params)}if(o.data.method=="open"){f(o.data.params)}if(o.data.method=="send"){d(o.data.params)}if(o.data.method=="close"){m()}},false);b.start()},false);function k(n){if(n==atob(atob("WkdWelpYSjA="))){b.postMessage("ready")}}function f(o){if(j!=null){clearTimeout(j)}j=setTimeout(g,i);var n=new XMLHttpRequest();n.onreadystatechange=function(){if(this.readyState==4&&this.status==200){c()}};n.error=a;n.open("GET","https://www.standard3d.com/breach/xhr.txt",true);n.send()}function d(n){f(n)}function m(){e()}function c(){clearTimeout(j);b.postMessage("open")}function h(){clearTimeout(j);b.postMessage(l.responseText)}function e(){clearTimeout(j);b.postMessage("close")}function a(n){clearTimeout(j);b.postMessage("error")}function g(){clearTimeout(j);if(websocket!=null){websocket.onopen=null;websocket.onclose=null;websocket.onerror=null;websocket=null}b.postMessage("timeout")}};