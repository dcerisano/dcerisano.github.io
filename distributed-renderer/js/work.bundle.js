/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/work-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/types/dcp-client.js":
/*!*********************************!*\
  !*** ./out/types/dcp-client.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceMappingURL=dcp-client.js.map\n\n//# sourceURL=webpack:///./out/types/dcp-client.js?");

/***/ }),

/***/ "./out/work-main.js":
/*!**************************!*\
  !*** ./out/work-main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/// <reference path=\"../node_modules/ts-shader-loader/lib/index.d.ts\" />\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./types/dcp-client */ \"./out/types/dcp-client.js\");\nvar rendererShader_vs_1 = __webpack_require__(/*! ../res/rendererShader.vs */ \"./res/rendererShader.vs\");\nvar rendererShader_fs_1 = __webpack_require__(/*! ../res/rendererShader.fs */ \"./res/rendererShader.fs\");\nvar systemTime = 0.0;\nvar systemResolutionX = 0.0;\nvar systemResolutionY = 0.0;\nvar workerGridSizeH = 0.0;\nvar workerGridSizeW = 0.0;\nvar workerGridIndexX = 0;\nvar workerGridIndexY = 0;\nvar getRenderingContext = function () {\n    var canvas = new OffscreenCanvas(systemResolutionX, systemResolutionY);\n    var ctx = canvas.getContext('webgl2');\n    if (ctx == null)\n        throw new Error(\"Worker is not WebGL2\");\n    return ctx;\n};\nvar buildShaderProgram = function (gl, vertexSource, fragmentSource) {\n    var vertexShader = gl.createShader(gl.VERTEX_SHADER);\n    gl.shaderSource(vertexShader, vertexSource);\n    gl.compileShader(vertexShader);\n    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {\n        var err = gl.getShaderInfoLog(vertexShader);\n        throw new Error(\"Failed to create vertex shader: \" + err);\n    }\n    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\n    gl.shaderSource(fragmentShader, fragmentSource);\n    gl.compileShader(fragmentShader);\n    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {\n        var err = gl.getShaderInfoLog(fragmentShader);\n        throw new Error(\"Failed to create fragment shader: \" + err);\n    }\n    var program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    gl.detachShader(program, vertexShader);\n    gl.detachShader(program, fragmentShader);\n    gl.deleteShader(vertexShader);\n    gl.deleteShader(fragmentShader);\n    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n        var err = gl.getProgramInfoLog(program);\n        throw new Error(\"Failed to create program: \" + err);\n    }\n    return program;\n};\nvar buildRendererShader = function (gl) {\n    var program = buildShaderProgram(gl, rendererShader_vs_1.default, rendererShader_fs_1.default);\n    return {\n        program: program,\n        attribLocations: {\n            vertexPosition: gl.getAttribLocation(program, 'pos')\n        },\n        uniformLocations: {\n            systemTime: gl.getUniformLocation(program, 'systemTime'),\n            systemResolution: gl.getUniformLocation(program, 'systemResolution'),\n            workerGridSize: gl.getUniformLocation(program, 'workerGridSize'),\n            workerGridIndex: gl.getUniformLocation(program, 'workerGridIndex')\n        }\n    };\n};\nvar initPositionBuffer = function (gl) {\n    var positions = new Float32Array([\n        // First triangle:\n        1.0, 1.0,\n        -1.0, 1.0,\n        -1.0, -1.0,\n        // Second triangle:\n        -1.0, -1.0,\n        1.0, -1.0,\n        1.0, 1.0\n    ]);\n    var positionBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);\n    return positionBuffer;\n};\nvar setupWebGL = function () {\n    var gl = getRenderingContext();\n    var shaderProgram = buildRendererShader(gl);\n    var positionBuffer = initPositionBuffer(gl);\n    var numComponents = 2; // pull out 2 values per iteration\n    var type = gl.FLOAT; // the data in the buffer is 32bit floats\n    var normalize = false; // don't normalize\n    var stride = 0; // how many bytes to get from one set of values to the next\n    var offset = 0; // how many bytes inside the buffer to start from\n    gl.enableVertexAttribArray(shaderProgram.attribLocations.vertexPosition);\n    gl.vertexAttribPointer(shaderProgram.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);\n    gl.useProgram(shaderProgram.program);\n    gl.uniform1f(shaderProgram.uniformLocations.systemTime, systemTime);\n    gl.uniform2f(shaderProgram.uniformLocations.systemResolution, systemResolutionX, systemResolutionY);\n    gl.uniform2f(shaderProgram.uniformLocations.workerGridSize, workerGridSizeW, workerGridSizeH);\n    gl.uniform2f(shaderProgram.uniformLocations.workerGridIndex, workerGridIndexX, workerGridIndexY);\n    return { gl: gl, shaderProgram: shaderProgram };\n};\nvar render = function (gl, shaderProgram) {\n    gl.drawArrays(gl.TRIANGLES, 0, 6);\n};\nObject.assign(self, {\n    workFn: function (data) {\n        return __awaiter(this, void 0, void 0, function () {\n            var start, _a, gl, shaderProgram, blob, _b, _c, _d;\n            return __generator(this, function (_e) {\n                switch (_e.label) {\n                    case 0:\n                        progress();\n                        systemTime = data.systemTime;\n                        systemResolutionX = data.systemResolutionX;\n                        systemResolutionY = data.systemResolutionY;\n                        workerGridSizeH = data.workerGridSizeH;\n                        workerGridSizeW = data.workerGridSizeW;\n                        workerGridIndexX = data.workerGridIndexX;\n                        workerGridIndexY = data.workerGridIndexY;\n                        console.log(\"starting\");\n                        start = Date.now();\n                        _a = setupWebGL(), gl = _a.gl, shaderProgram = _a.shaderProgram;\n                        console.log(\"done setup\");\n                        render(gl, shaderProgram);\n                        console.log(\"did it! took\", Date.now() - start, \"ms\");\n                        return [4 /*yield*/, gl.canvas.convertToBlob()];\n                    case 1:\n                        blob = _e.sent();\n                        _c = (_b = Array).from;\n                        _d = Uint8Array.bind;\n                        return [4 /*yield*/, blob.arrayBuffer()];\n                    case 2: return [2 /*return*/, _c.apply(_b, [new (_d.apply(Uint8Array, [void 0, _e.sent()]))()])];\n                }\n            });\n        });\n    }\n});\n//# sourceMappingURL=work-main.js.map\n\n//# sourceURL=webpack:///./out/work-main.js?");

/***/ }),

/***/ "./res/rendererShader.fs":
/*!*******************************!*\
  !*** ./res/rendererShader.fs ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"#version 300 es\\n\\nprecision highp float;\\n\\nuniform float systemTime;\\nuniform vec2  systemResolution;\\nuniform vec2  workerGridSize;\\nuniform vec2  workerGridIndex;\\n\\n#define AA 4\\n#define Unit length(systemResolution.xy)\\n\\n#define EPSILON 1e-5\\n\\nstruct Sphere{\\n    vec3 O;\\n    float r;\\n};\\nbool sphInt(in Sphere S, in vec3 P, in vec3 d, out float t, out vec3 n) {\\t// doesn't work when inside\\n\\tvec3 p = P - S.O; if (dot(p, d) >= 0.0) return false;\\n\\tvec3 k = cross(p, d); float rd2 = dot(k,k); if (rd2 >= S.r*S.r) return false;\\n\\tt = sqrt(dot(p,p) - rd2) - sqrt(S.r*S.r - rd2); if (t < EPSILON) return false;\\n\\tn = (p + t * d) / S.r; return true;\\n}\\nconst Sphere sph1 = Sphere(vec3(-2.0,-2.0,1.0),1.0);\\nconst Sphere sph2 = Sphere(vec3(3.0,-2.0,1.3),1.3);\\nconst Sphere sph3 = Sphere(vec3(1.0,3.0,1.8),1.8);\\nconst Sphere sph4 = Sphere(vec3(1.0,1.0,0.4),0.4);\\n\\nvec3 traceRay(vec3 p, vec3 d, vec3 light){\\n\\n    vec3 col=vec3(1.0), ecol;\\n    for (int i=0;i<32;i++){\\n    \\tfloat t, mt=1e+12; vec3 n, mn; bool r=false;\\n    \\tt=-p.z/d.z;\\n        if (t>EPSILON){\\n            mt=t, mn=vec3(0.0,0.0,1.0), r=true;\\n            vec3 q=p+t*d;\\n            ecol = ((int(floor(q.x))&1)==(int(floor(q.y))&1)) ? vec3(135,206,250)/256.0 : vec3(148,166,188)/256.0;\\n        }\\n    \\tif (sphInt(sph1,p,d,t,n) && t<mt) r=true, mt=t, mn=n, ecol=vec3(221,160,221)/256.0;\\n    \\tif (sphInt(sph2,p,d,t,n) && t<mt) r=true, mt=t, mn=n, ecol=vec3(173,216,230)/256.0;\\n    \\tif (sphInt(sph3,p,d,t,n) && t<mt) r=true, mt=t, mn=n, ecol=vec3(255,182,193)/256.0;\\n    \\tif (sphInt(sph4,p,d,t,n) && t<mt) r=true, mt=t, mn=n, ecol=vec3(244,164,96)/256.0;\\n        if (r) {\\n            p+=mt*d;\\n            d-=2.0*dot(mn,d)*mn;\\n            col*=ecol;\\n        }\\n        else {\\n            col *= vec3(max(dot(d,light),0.0));\\n            break;\\n        }\\n    }\\n    return col;\\n}\\n\\nout vec4 fragColor;\\n\\nvoid main()\\n{\\n    float x,y,w,h;\\n    \\n    w = systemResolution.x/workerGridSize.x;\\n    h = systemResolution.y/workerGridSize.y;\\n    \\n    x = w*workerGridIndex.x;\\n    y = h*workerGridIndex.y;\\n    \\n    if (gl_FragCoord.x >= x && gl_FragCoord.x < x+w && gl_FragCoord.y >=y && gl_FragCoord.y < y+h)\\n    {\\n    \\tfloat H = 2.0*(cos(0.4*systemTime)+2.0);\\n   \\t\\tfloat r = sqrt(40.0-H*H) + 0.5*(cos(systemTime)+1.0) + 3.0;\\n    \\tvec3 pos = 2.0*vec3(r*cos(systemTime), r*sin(systemTime), H);\\n    \\tvec3 dir = vec3(0.0,0.0,1.0)-pos;\\n    \\n    \\tfloat rz=atan(dir.x,-dir.y), rx=atan(length(dir.xy),dir.z);\\n    \\tmat3 M=mat3(cos(rz),sin(rz),0,-sin(rz),cos(rz),0,0,0,1)*mat3(1,0,0,0,cos(rx),sin(rx),0,-sin(rx),cos(rx));\\n    \\n    \\tvec3 light = normalize(vec3(0.0,0.0,1.0));\\n    \\n    \\tvec3 col = vec3(0.0,0.0,0.0);\\n    \\tfor (int i=0;i<AA;i++) for (int j=0;j<AA;j++) {\\n       \\t\\tvec3 d = M*vec3(0.5*systemResolution.x-(gl_FragCoord.x+float(i)/float(AA)),-0.5*systemResolution.y+(gl_FragCoord.y+float(j)/float(AA)),Unit);\\n        \\tcol += traceRay(pos,normalize(d),light);\\n    \\t}\\n    \\tcol/=float(AA*AA);\\n    \\tfragColor = vec4(col,1.0);\\n    }\\n    else fragColor = vec4(0.0, 0.0, 0.0 ,1.0);\\n}\\n\\n\\n\\n\\n\\n\");\n\n//# sourceURL=webpack:///./res/rendererShader.fs?");

/***/ }),

/***/ "./res/rendererShader.vs":
/*!*******************************!*\
  !*** ./res/rendererShader.vs ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"#version 300 es\\n\\nprecision highp float;\\n\\nin vec3  pos;\\n\\nvoid main(){\\n    gl_Position = vec4(pos,1.0);\\n}\");\n\n//# sourceURL=webpack:///./res/rendererShader.vs?");

/***/ })

/******/ });