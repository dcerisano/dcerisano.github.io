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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/main.js":
/*!*********************!*\
  !*** ./out/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://stackoverflow.com/questions/11089732/display-image-from-blob-using-javascript-and-websockets\n// public method for encoding an Uint8Array to base64\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar _this = this;\nvar systemTime = (Math.random() * 2 * Math.PI).toFixed(1); // Limit precision for low end GPUs.\nvar systemResolutionX = 8000;\nvar systemResolutionY = 4000;\nvar workerGridSizeH = 4;\nvar workerGridSizeW = 4;\nvar canvas_ctx = null;\nvar encode = function (input) {\n    var keyStr = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\";\n    var output = \"\";\n    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;\n    var i = 0;\n    while (i < input.length) {\n        chr1 = input[i++];\n        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index \n        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here\n        enc1 = chr1 >> 2;\n        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);\n        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);\n        enc4 = chr3 & 63;\n        if (isNaN(chr2)) {\n            enc3 = enc4 = 64;\n        }\n        else if (isNaN(chr3)) {\n            enc4 = 64;\n        }\n        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +\n            keyStr.charAt(enc3) + keyStr.charAt(enc4);\n    }\n    return output;\n};\nvar buildWorkFn = function () { return __awaiter(_this, void 0, void 0, function () {\n    var workBundle;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, fetch('js/work.bundle.js')];\n            case 1: return [4 /*yield*/, (_a.sent()).text()];\n            case 2:\n                workBundle = _a.sent();\n                return [2 /*return*/, \"(...args) => {\\n        \" + workBundle + \"\\n        return self.workFn(...args);\\n    } \"];\n        }\n    });\n}); };\nvar noop = function () { return __awaiter(_this, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        return [2 /*return*/];\n    });\n}); };\nvar deployJob = function (job) { return __awaiter(_this, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                job.public.name = 'Distributed Renderer (8K Raytracing)';\n                job.requirements.environment.offscreenCanvas = true;\n                job.requirements.details.offscreenCanvas.bigTexture32768 = true;\n                job.on('accepted', function () { return console.log(\"Job accepted\", job.id); });\n                job.on('status', console.log);\n                job.on('error', noop);\n                job.work.on('console', console.log);\n                job.work.on('uncaughtException', noop);\n                //Draw returned worker cell on main image (position calculated from slice)\n                job.on('result', function (ev) {\n                    return __awaiter(this, void 0, void 0, function () {\n                        var img, imageLoadPromise, w, h, sx, sy;\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    console.log(\" - Received result for slice \" + ev.sliceNumber);\n                                    img = new Image();\n                                    imageLoadPromise = new Promise(function (resolve) {\n                                        img.onload = resolve;\n                                        img.src = 'data:image/png;base64,' + encode(new Uint8Array(ev.result));\n                                    });\n                                    return [4 /*yield*/, imageLoadPromise];\n                                case 1:\n                                    _a.sent();\n                                    w = systemResolutionX / workerGridSizeW;\n                                    h = systemResolutionY / workerGridSizeH;\n                                    sx = (ev.sliceNumber - Math.floor(ev.sliceNumber / workerGridSizeW) * workerGridSizeW) * w;\n                                    sy = (systemResolutionY - h) - Math.floor(ev.sliceNumber / workerGridSizeW) * h;\n                                    console.log(sx + \" \" + sy);\n                                    canvas_ctx.drawImage(img, sx, sy, w, h, sx, sy, w, h);\n                                    return [2 /*return*/];\n                            }\n                        });\n                    });\n                });\n                return [4 /*yield*/, job.exec()];\n            case 1: return [2 /*return*/, _a.sent()];\n        }\n    });\n}); };\nvar main = function () { return __awaiter(_this, void 0, void 0, function () {\n    var compute, canvas, workFn, data, i, job, results;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                compute = dcp.compute;\n                document.getElementById('start-button').style.display = \"none\";\n                document.body.style.backgroundImage = \"none\";\n                document.body.style.backgroundColor = \"#000\";\n                document.body.style.backgroundSize = \"200px 200px\";\n                document.body.style.backgroundRepeat = \"repeat\";\n                document.body.style.backgroundImage = \"linear-gradient(to right, white 4px, transparent 4px), linear-gradient(to bottom, white 4px, transparent 4px)\";\n                canvas = document.createElement('canvas');\n                canvas.id = \"myCanvas\";\n                canvas.width = systemResolutionX;\n                canvas.height = systemResolutionY;\n                canvas.style.position = \"absolute\";\n                document.body.appendChild(canvas);\n                canvas_ctx = canvas.getContext('2d');\n                return [4 /*yield*/, buildWorkFn()];\n            case 1:\n                workFn = _a.sent();\n                data = [];\n                for (i = 0; i < workerGridSizeW * workerGridSizeH; i++) {\n                    data[i] =\n                        { systemTime: systemTime,\n                            systemResolutionX: systemResolutionX,\n                            systemResolutionY: systemResolutionY,\n                            workerGridSizeH: workerGridSizeH,\n                            workerGridSizeW: workerGridSizeW,\n                            workerGridIndexX: i - Math.floor(i / workerGridSizeW) * workerGridSizeW,\n                            workerGridIndexY: Math.floor(i / workerGridSizeW)\n                        };\n                }\n                console.log(\"Deploying job with \" + data.length + \" slices...\");\n                job = compute.for(data, workFn);\n                Object.assign(window, { job: job });\n                return [4 /*yield*/, deployJob(job)];\n            case 2:\n                results = _a.sent();\n                console.log(\"Done!\", Array.from(results));\n                return [2 /*return*/];\n        }\n    });\n}); };\nwindow.addEventListener('DOMContentLoaded', function () {\n    document.getElementById('start-button').addEventListener('click', main);\n});\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack:///./out/main.js?");

/***/ })

/******/ });