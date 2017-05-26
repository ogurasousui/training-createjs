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
/***/ (function(module, exports) {

	var Circle = (function () {
	    function Circle() {
	        this.framerate = 60;
	        this.degree = 0;
	        this.setUp();
	    }
	    /**
	     * オブジェクトの作成
	     * @param initX
	     * @param initY
	     */
	    Circle.prototype.createObject = function (initX, initY) {
	        if (initX === void 0) { initX = 0; }
	        if (initY === void 0) { initY = 0; }
	        var graphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 10);
	        this.object = new createjs.Shape(graphics);
	        this.object.x = initX;
	        this.object.y = initY;
	    };
	    Circle.prototype.setUp = function () {
	        this.createObject();
	        this.stage = new createjs.Stage("canvas");
	        this.stage.addChild(this.object);
	        this.update();
	        createjs.Ticker.framerate = this.framerate;
	        createjs.Ticker.on("tick", this.update, this);
	    };
	    Circle.prototype.update = function () {
	        this.updateObject();
	        this.stage.update();
	    };
	    /**
	     * オブジェクトの更新
	     */
	    Circle.prototype.updateObject = function () {
	        this.object.x += 1;
	        this.degree += 10;
	        var rad = this.degree * Math.PI / 180;
	        var y = Math.sin(rad) * 30;
	        this.object.y = 240 + y;
	    };
	    return Circle;
	}());
	window.onload = function () {
	    new Circle();
	};


/***/ })
/******/ ]);
//# sourceMappingURL=circle.bundle.js.map