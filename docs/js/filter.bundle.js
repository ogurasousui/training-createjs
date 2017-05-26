/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var stage_1 = __webpack_require__(1);
	var Filter = (function (_super) {
	    __extends(Filter, _super);
	    function Filter() {
	        var _this = _super.call(this) || this;
	        _this.images = {};
	        _this.loadAsset();
	        return _this;
	    }
	    Filter.prototype.loadAsset = function () {
	        var _this = this;
	        var loader = new createjs.LoadQueue(false);
	        loader.loadManifest([
	            {
	                src: "../img/hito.png",
	                id: "hito"
	            }
	        ]);
	        loader.load();
	        loader.on('fileload', function (evt) {
	            if (evt.item.type == "image") {
	                _this.images[evt.item.id] = evt.result;
	            }
	        }, this);
	        loader.on('complete', function () {
	            _this.setup();
	        }, this, true);
	    };
	    Filter.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        var bmp = new createjs.Bitmap(this.images.hito);
	        bmp.filters = [
	            // new createjs.ColorFilter(0, 0, 0, 1, -255, -255, -255, 0)
	            new createjs.BlurFilter(10, 10, 0)
	        ];
	        bmp.cache(0, 0, 528, 528);
	        this.stage.addChild(bmp);
	        this.stage.update();
	    };
	    return Filter;
	}(stage_1.default));
	window.onload = function () {
	    new Filter();
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Stage = (function () {
	    function Stage() {
	        this.framerate = 60;
	    }
	    Stage.prototype.setup = function () {
	        this.stage = new createjs.Stage("canvas");
	    };
	    Stage.prototype.startTick = function () {
	        createjs.Ticker.framerate = this.framerate;
	        createjs.Ticker.on("tick", this.update, this);
	    };
	    Stage.prototype.update = function () {
	        this.stage.update();
	    };
	    return Stage;
	}());
	exports.default = Stage;


/***/ })
/******/ ]);
//# sourceMappingURL=filter.bundle.js.map