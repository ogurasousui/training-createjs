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
	var map_1 = __webpack_require__(6);
	var character_1 = __webpack_require__(7);
	var Scroll = (function (_super) {
	    __extends(Scroll, _super);
	    function Scroll() {
	        var _this = _super.call(this) || this;
	        _this.images = {};
	        _this.loadAsset();
	        return _this;
	    }
	    Scroll.prototype.loadAsset = function () {
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
	    Scroll.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        this.map = new map_1.default();
	        this.character = new character_1.default();
	        this.stage.addChild(this.map.getMap());
	        this.startTick();
	    };
	    Scroll.prototype.update = function () {
	        this.map.update();
	        this.character.update();
	        _super.prototype.update.call(this);
	    };
	    return Scroll;
	}(stage_1.default));
	window.onload = function () {
	    new Scroll();
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
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tile_1 = __webpack_require__(8);
	var Map = (function () {
	    function Map() {
	        this.tile = [];
	        this.map = new createjs.Container();
	        this.createInit();
	    }
	    Map.prototype.createInit = function () {
	        this.fillTile();
	    };
	    Map.prototype.fillTile = function () {
	        for (var i = 0; i < 30; i++) {
	            this.tile[i] = [];
	            for (var j = 0; j < 12; j++) {
	                this.tile[i][j] = new tile_1.default(i, j, 0);
	                this.map.addChild(this.tile[i][j].getObject());
	            }
	        }
	    };
	    Map.prototype.update = function () {
	    };
	    Map.prototype.scroll = function () {
	    };
	    Map.prototype.putObject = function () {
	    };
	    Map.prototype.createObject = function () {
	    };
	    Map.prototype.getMap = function () {
	        return this.map;
	    };
	    return Map;
	}());
	exports.default = Map;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Character = (function () {
	    function Character() {
	    }
	    Character.prototype.update = function () {
	    };
	    return Character;
	}());
	exports.default = Character;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Tile = (function () {
	    function Tile(x, y, type) {
	        if (type === void 0) { type = 0; }
	        this.typeMap = {
	            0: 'createNone',
	            1: 'createWall',
	            2: 'createBlock',
	            3: 'createItemBlock',
	        };
	        this.type = type;
	        this.posX = x;
	        this.posY = y;
	        // for test
	        this[this.typeMap[this.random(2)]]();
	        this.setObject();
	    }
	    Tile.prototype.random = function (max, min) {
	        if (min === void 0) { min = 0; }
	        return Math.floor(Math.random() * (max + 1 - min)) + min;
	    };
	    Tile.prototype.calcPosition = function () {
	        return {
	            x: 32 * this.posX,
	            y: 32 * this.posY
	        };
	    };
	    Tile.prototype.setObject = function () {
	    };
	    Tile.prototype.getObject = function () {
	        return this.object;
	    };
	    Tile.prototype.createNone = function () {
	        var graphics = new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, 32, 32);
	        this.object = new createjs.Shape(graphics);
	        var pos = this.calcPosition();
	        this.object.x = pos.x;
	        this.object.y = pos.y;
	    };
	    Tile.prototype.createBlock = function () {
	        var graphics = new createjs.Graphics().beginFill("#FF0000").drawRect(0, 0, 32, 32);
	        this.object = new createjs.Shape(graphics);
	        var pos = this.calcPosition();
	        this.object.x = pos.x;
	        this.object.y = pos.y;
	    };
	    Tile.prototype.createWall = function () {
	        var graphics = new createjs.Graphics().beginFill("#0000FF").drawRect(0, 0, 32, 32);
	        this.object = new createjs.Shape(graphics);
	        var pos = this.calcPosition();
	        this.object.x = pos.x;
	        this.object.y = pos.y;
	    };
	    Tile.prototype.update = function () {
	    };
	    return Tile;
	}());
	exports.default = Tile;


/***/ })
/******/ ]);
//# sourceMappingURL=scroll.bundle.js.map