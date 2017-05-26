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
	var material_1 = __webpack_require__(4);
	var stage_1 = __webpack_require__(1);
	var Circles = (function (_super) {
	    __extends(Circles, _super);
	    function Circles() {
	        var _this = _super.call(this) || this;
	        _this.objects = [];
	        _this.maxObjectNum = 50;
	        _this.setup();
	        return _this;
	    }
	    Circles.prototype.createObjects = function () {
	        if (this.objects.length > this.maxObjectNum)
	            return;
	        var count = this.maxObjectNum - this.objects.length;
	        for (var i = 0; i < count; i++) {
	            this.createObject();
	        }
	    };
	    /**
	     * オブジェクトの作成
	     * @param initX
	     * @param initY
	     */
	    Circles.prototype.createObject = function () {
	        var material = new material_1.default();
	        this.objects.push(material);
	        this.stage.addChild(material.getShape());
	    };
	    Circles.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        this.createObjects();
	        this.update();
	        this.startTick();
	    };
	    Circles.prototype.update = function () {
	        this.updateObjects();
	        _super.prototype.update.call(this);
	    };
	    /**
	     * オブジェクトの更新
	     */
	    Circles.prototype.updateObjects = function () {
	        var newArray = [];
	        for (var i = 0; i < this.objects.length; i++) {
	            if (this.objects[i].update()) {
	                newArray.push(this.objects[i]);
	            }
	            else {
	                this.stage.removeChild(this.objects[i].getShape());
	            }
	        }
	        this.objects = newArray;
	        this.createObjects();
	    };
	    return Circles;
	}(stage_1.default));
	window.onload = function () {
	    new Circles();
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


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Material = (function () {
	    function Material() {
	        this.degree = 0;
	        this.createObject();
	    }
	    Material.prototype.random = function (max, min) {
	        if (min === void 0) { min = 0; }
	        return Math.floor(Math.random() * (max + 1 - min)) + min;
	    };
	    Material.prototype.createObject = function () {
	        var hue = 360 * Math.random();
	        var color = "hsl(" + hue + ", 100%, 50%)";
	        var graphics = new createjs.Graphics().beginFill(color).drawCircle(0, 0, this.random(50, 10));
	        var object = new createjs.Shape(graphics);
	        object.x = -200;
	        object.y = this.initY = this.random(480);
	        this.lifeMax = this.life = this.random(300);
	        this.gainDegree = this.random(20, 5);
	        this.gainX = this.random(10, 1);
	        this.shape = object;
	    };
	    Material.prototype.getShape = function () {
	        return this.shape;
	    };
	    Material.prototype.update = function () {
	        var shape = this.getShape();
	        shape.x += this.gainX;
	        this.degree += this.gainDegree;
	        var rad = this.degree * Math.PI / 180;
	        var y = Math.sin(rad) * 30;
	        shape.y = this.initY + y;
	        shape.alpha = (this.life / this.lifeMax);
	        return (--this.life > 0);
	    };
	    Material.prototype.isAlive = function () {
	        return (this.life > 0);
	    };
	    return Material;
	}());
	exports.default = Material;


/***/ })
/******/ ]);
//# sourceMappingURL=circles.bundle.js.map