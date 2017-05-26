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
	var tama_1 = __webpack_require__(5);
	var Distance = (function (_super) {
	    __extends(Distance, _super);
	    function Distance() {
	        var _this = _super.call(this) || this;
	        _this.images = {};
	        _this.tamas = [];
	        _this.fireInterval = 60;
	        _this.fireIntervalCount = 0;
	        _this.loadAsset();
	        return _this;
	    }
	    Distance.prototype.loadAsset = function () {
	        var _this = this;
	        var loader = new createjs.LoadQueue(false);
	        loader.loadManifest([
	            {
	                src: "../img/tori.png",
	                id: "tori"
	            },
	            {
	                src: "../img/crash.png",
	                id: "crash"
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
	    Distance.prototype.createSprite = function () {
	        var data = {};
	        data.images = [this.images.tori];
	        data.frames = {
	            width: 32,
	            height: 32,
	            regX: 16,
	            regY: 32
	        };
	        data.animations = {
	            stand: [0, 2, 'stand', 0.5],
	            damaged: {
	                frames: [
	                    3, 4, 3, 4
	                ],
	                speed: 0.3,
	                next: 'stand'
	            },
	        };
	        var spriteSheet = new createjs.SpriteSheet(data);
	        var character = new createjs.Sprite(spriteSheet, "stand");
	        character.mouseEnabled = false;
	        character.scaleX = character.scaleY = 2;
	        var graphics = new createjs.Graphics().beginFill('#FFFFFF').drawRect(0, 0, 64, 64);
	        var shape = new createjs.Shape(graphics);
	        shape.regX = 32;
	        shape.regY = 64;
	        shape.alpha = 0.01;
	        this.characterShape = shape;
	        this.characterSprite = character;
	        var container = new createjs.Container();
	        container.addChild(character);
	        container.addChild(shape);
	        container.x = 320;
	        container.y = 240;
	        this.character = container;
	        this.stage.addChild(container);
	    };
	    Distance.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        var container = new createjs.Container();
	        var graphics = new createjs.Graphics().beginFill('#FFFFFF').drawRect(0, 0, 640, 480);
	        var shape = new createjs.Shape(graphics);
	        shape.alpha = 0.01;
	        container.addChild(shape);
	        this.stage.addChild(container);
	        this.createSprite();
	        this.startTick();
	    };
	    Distance.prototype.update = function () {
	        this.checkFire();
	        this.updateTamas();
	        _super.prototype.update.call(this);
	    };
	    Distance.prototype.checkFire = function () {
	        if (++this.fireIntervalCount > this.fireInterval) {
	            this.fireIntervalCount = 0;
	            this.fireTama();
	        }
	    };
	    Distance.prototype.updateTamas = function () {
	        var newArray = [];
	        for (var i = 0; i < this.tamas.length; i++) {
	            if (this.tamas[i].isHit(this.characterShape)) {
	                this.stage.removeChild(this.tamas[i].getObject());
	                this.createCrash(this.tamas[i].getObject().x, this.tamas[i].getObject().y);
	                this.characterSprite.gotoAndPlay('damaged');
	            }
	            else {
	                this.tamas[i].update();
	                newArray.push(this.tamas[i]);
	            }
	        }
	        this.tamas = newArray;
	    };
	    Distance.prototype.fireTama = function () {
	        console.log('fire tama');
	        var tama = new tama_1.default(this.stage.mouseX, this.stage.mouseY);
	        this.stage.addChild(tama.getObject());
	        this.tamas.push(tama);
	    };
	    Distance.prototype.createCrash = function (setX, setY) {
	        var _this = this;
	        var data = {};
	        data.images = [this.images.crash];
	        data.frames = {
	            width: 64,
	            height: 64,
	            regX: 32,
	            regY: 32
	        };
	        data.animations = {
	            crash: [0, 63],
	        };
	        var spriteSheet = new createjs.SpriteSheet(data);
	        var crash = new createjs.Sprite(spriteSheet, "crash");
	        crash.x = setX;
	        crash.y = setY;
	        this.stage.addChild(crash);
	        crash.on('animationend', function () {
	            _this.stage.removeChild(crash);
	        }, this, true);
	    };
	    return Distance;
	}(stage_1.default));
	window.onload = function () {
	    new Distance();
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
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Tama = (function () {
	    function Tama(setX, setY) {
	        this.createObject(setX, setY);
	    }
	    Tama.prototype.getObject = function () {
	        return this.object;
	    };
	    Tama.prototype.createObject = function (setX, setY) {
	        var graphics = new createjs.Graphics().beginFill('#000000').drawCircle(0, 0, 10);
	        var object = new createjs.Shape(graphics);
	        object.x = setX;
	        object.y = setY;
	        this.object = object;
	    };
	    Tama.prototype.move = function () {
	        var object = this.getObject();
	        var targetX = 320;
	        var targetY = 240 - 32;
	        var bulletX = object.x;
	        var bulletY = object.y;
	        var distance = Math.sqrt((targetX - bulletX) * (targetX - bulletX) + (targetY - bulletY) * (targetY - bulletY));
	        object.x += (targetX - bulletX) / distance * 2;
	        object.y += (targetY - bulletY) / distance * 2;
	    };
	    Tama.prototype.update = function () {
	        this.move();
	    };
	    Tama.prototype.isHit = function (character) {
	        var point = this.getObject().localToLocal(0, 0, character);
	        return character.hitTest(point.x, point.y);
	    };
	    return Tama;
	}());
	exports.default = Tama;


/***/ })
/******/ ]);
//# sourceMappingURL=distance.bundle.js.map