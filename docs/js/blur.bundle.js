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
	var character_1 = __webpack_require__(2);
	var Blur = (function (_super) {
	    __extends(Blur, _super);
	    function Blur() {
	        var _this = _super.call(this) || this;
	        _this.images = {};
	        _this.loadAsset();
	        return _this;
	    }
	    Blur.prototype.loadAsset = function () {
	        var _this = this;
	        var loader = new createjs.LoadQueue(false);
	        loader.loadManifest([
	            {
	                src: "../img/tori.png",
	                id: "tori"
	            },
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
	    Blur.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        this.character = new character_1.default(this.images.tori, 320, 240);
	        this.stage.addChild(this.character.getCharacter());
	        this.startTick();
	    };
	    Blur.prototype.update = function () {
	        this.character.setTarget(this.stage.mouseX, this.stage.mouseY);
	        this.character.update();
	        _super.prototype.update.call(this);
	    };
	    return Blur;
	}(stage_1.default));
	window.onload = function () {
	    new Blur();
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var shadow_1 = __webpack_require__(3);
	var Character = (function () {
	    function Character(image, setX, setY) {
	        if (setX === void 0) { setX = 0; }
	        if (setY === void 0) { setY = 0; }
	        this.nowDirection = null;
	        this.targetX = 0;
	        this.targetY = 0;
	        this.moving = false;
	        this.shadows = [];
	        this.shadowInterval = 3;
	        this.shadowIntervalCount = 0;
	        this.movingCount = 0;
	        this.speed = 5;
	        this.image = image;
	        this.createCharacter(setX, setY);
	    }
	    Character.prototype.createCharacter = function (setX, setY) {
	        if (setX === void 0) { setX = 0; }
	        if (setY === void 0) { setY = 0; }
	        var data = {};
	        data.images = [this.image];
	        data.frames = {
	            width: 32,
	            height: 32,
	            regX: 16,
	            regY: 32
	        };
	        data.animations = {
	            stand: [0, 2, 'stand', 0.3],
	            up: [9, 11, 'up', 0.3],
	            down: [6, 8, 'down', 0.3],
	            right: [15, 17, 'right', 0.3],
	            left: [12, 14, 'left', 0.3],
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
	        container.x = setX;
	        container.y = setY;
	        this.character = container;
	    };
	    Character.prototype.getCharacter = function () {
	        return this.character;
	    };
	    Character.prototype.getCharacterShape = function () {
	        return this.characterShape;
	    };
	    Character.prototype.getCharacterSprite = function () {
	        return this.characterSprite;
	    };
	    Character.prototype.setTarget = function (setX, setY) {
	        this.targetX = setX;
	        this.targetY = setY;
	    };
	    Character.prototype.update = function () {
	        this.move();
	        if (this.isMoving()) {
	            this.checkShadow();
	        }
	        this.updateShadow();
	    };
	    Character.prototype.updateShadow = function () {
	        var newArray = [];
	        for (var i = 0; i < this.shadows.length; i++) {
	            this.shadows[i].update();
	            if (this.shadows[i].isAlive()) {
	                newArray.push(this.shadows[i]);
	            }
	            else {
	                this.character.parent.removeChild(this.shadows[i].getCharacter());
	            }
	        }
	        this.shadows = newArray;
	    };
	    Character.prototype.checkShadow = function () {
	        var character = this.getCharacter();
	        if (++this.shadowIntervalCount > this.shadowInterval) {
	            this.shadowIntervalCount = 0;
	            this.character.cache(-32, -64, 64, 64);
	            var shadow = new shadow_1.default(this.character.cacheCanvas, character.x, character.y);
	            this.shadows.push(shadow);
	            character.parent.addChild(shadow.getCharacter());
	            character.parent.swapChildren(this.getCharacter(), shadow.getCharacter());
	            this.character.uncache();
	        }
	    };
	    Character.prototype.move = function () {
	        var object = this.getCharacter();
	        var targetX = this.targetX;
	        var targetY = this.targetY;
	        var beforeX = object.x;
	        var beforeY = object.y;
	        var distance = Math.sqrt((targetX - beforeX) * (targetX - beforeX) + (targetY - beforeY) * (targetY - beforeY));
	        this.moving = false;
	        if (distance >= 5) {
	            this.moving = true;
	            object.x += (targetX - beforeX) / distance * (this.speed + (this.movingCount / 3));
	            object.y += (targetY - beforeY) / distance * (this.speed + (this.movingCount / 3));
	            this.changeDirection(beforeX, beforeY, object.x, object.y);
	        }
	    };
	    Character.prototype.changeDirection = function (beforeX, beforeY, afterX, afterY) {
	        var diffX = Math.abs(beforeX - afterX);
	        var diffY = Math.abs(beforeY - afterY);
	        var setPos = 'stand';
	        if (beforeY - afterY < 0) {
	            setPos = 'down';
	            if (diffX > diffY) {
	                if (beforeX - afterX < 0) {
	                    // みぎ
	                    setPos = 'right';
	                }
	                else if (beforeX - afterX > 0) {
	                    // ひだり
	                    setPos = 'left';
	                }
	            }
	        }
	        else if (beforeY - afterY > 0) {
	            setPos = 'up';
	            if (diffX > diffY) {
	                if (beforeX - afterX < 0) {
	                    // みぎ
	                    setPos = 'right';
	                }
	                else if (beforeX - afterX > 0) {
	                    // ひだり
	                    setPos = 'left';
	                }
	            }
	        }
	        if (this.nowDirection != setPos) {
	            this.movingCount = 0;
	            this.nowDirection = setPos;
	            this.characterSprite.gotoAndPlay(setPos);
	        }
	        else {
	            this.movingCount++;
	        }
	    };
	    Character.prototype.isMoving = function () {
	        return this.moving;
	    };
	    return Character;
	}());
	exports.default = Character;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Shadow = (function () {
	    function Shadow(image, setX, setY) {
	        if (setX === void 0) { setX = 0; }
	        if (setY === void 0) { setY = 0; }
	        this.life = 30;
	        this.alive = true;
	        this.image = image;
	        this.createCharacter(setX, setY);
	    }
	    Shadow.prototype.createCharacter = function (setX, setY) {
	        if (setX === void 0) { setX = 0; }
	        if (setY === void 0) { setY = 0; }
	        var matrix = new createjs.ColorMatrix();
	        matrix.adjustHue(240);
	        var bmp = new createjs.Bitmap(this.image);
	        bmp.alpha = 0.8;
	        var bmp2 = new createjs.Bitmap(this.image);
	        bmp2.filters = [
	            // new createjs.ColorMatrixFilter(matrix)
	            new createjs.ColorFilter(0, 0, 1, 1, 96, 25, 134, 0)
	        ];
	        bmp2.cache(0, 0, 64, 64);
	        var container = new createjs.Container();
	        container.addChild(bmp);
	        container.addChild(bmp2);
	        container.x = setX - 32;
	        container.y = setY - 64;
	        // container.alpha = 0.7;
	        this.character = container;
	    };
	    Shadow.prototype.getCharacter = function () {
	        return this.character;
	    };
	    Shadow.prototype.update = function () {
	        if (--this.life < 0) {
	            this.alive = false;
	        }
	        this.character.alpha -= 0.02;
	    };
	    Shadow.prototype.isAlive = function () {
	        return this.alive;
	    };
	    return Shadow;
	}());
	exports.default = Shadow;


/***/ })
/******/ ]);
//# sourceMappingURL=blur.bundle.js.map