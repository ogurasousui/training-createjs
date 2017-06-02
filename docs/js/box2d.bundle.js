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
	var Box = (function (_super) {
	    __extends(Box, _super);
	    function Box() {
	        var _this = _super.call(this) || this;
	        _this.images = {};
	        _this.gravityVertical = 15;
	        _this.velocityIterations = 8;
	        _this.positionIterations = 3;
	        _this.standardRadius = 20;
	        _this.floor = new createjs.Rectangle();
	        _this.SCALE = 1 / 30;
	        _this.loadAsset();
	        return _this;
	    }
	    Box.prototype.loadAsset = function () {
	        var _this = this;
	        var loader = new createjs.LoadQueue(false);
	        loader.loadManifest([
	            {
	                src: "../img/maru.png",
	                id: "maru"
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
	    Box.prototype.setup = function () {
	        _super.prototype.setup.call(this);
	        this.stageWidth = this.canvas['width'];
	        this.stageHeight = this.canvas['height'];
	        this.floor.width = this.stageWidth * 0.8;
	        this.floor.x = (this.stageWidth - this.floor.width) / 2;
	        var gravity = new Box2D.Common.Math.b2Vec2(0, this.gravityVertical);
	        this.initializeBox2D(gravity, this.stageWidth, this.stageHeight);
	        this.createImage();
	        createjs.Ticker.on("tick", this.updateStage, this);
	    };
	    Box.prototype.initializeBox2D = function (gravity, stageWidth, stageHeight) {
	        this.world = new Box2D.Dynamics.b2World(gravity, true);
	        var floorShape = this.createStaticFloor(stageWidth / 2, stageHeight - this.standardRadius, this.floor.width, this.standardRadius, "#CCCCCC");
	        this.stage.addChild(floorShape);
	    };
	    /**
	     * 床の作成
	     * @param nX
	     * @param nY
	     * @param nWidth
	     * @param nHeight
	     * @param color
	     * @returns {createjs.Shape}
	     */
	    Box.prototype.createStaticFloor = function (nX, nY, nWidth, nHeight, color) {
	        var staticBody = Box2D.Dynamics.b2Body.b2_staticBody;
	        var bodyDef = this.defineBody(nX, nY, staticBody);
	        var floorShape = this.createVisualFloor(nWidth, nHeight, color, bodyDef);
	        var boxShape = new Box2D.Collision.Shapes.b2PolygonShape();
	        var fixtureDef = this.defineFixture(boxShape);
	        boxShape.SetAsBox(nWidth / 2 * this.SCALE, nHeight / 2 * this.SCALE);
	        this.createBody(this.world, bodyDef, fixtureDef);
	        return floorShape;
	    };
	    /**
	     * 見える床の作成
	     * @param nWidth
	     * @param nHeight
	     * @param color
	     * @param bodyDef
	     * @returns {createjs.Shape}
	     */
	    Box.prototype.createVisualFloor = function (nWidth, nHeight, color, bodyDef) {
	        var floorShape = new createjs.Shape();
	        floorShape.regX = nWidth / 2;
	        floorShape.regY = nHeight / 2;
	        floorShape.graphics
	            .beginFill(color)
	            .drawRect(0, 0, nWidth, nHeight);
	        bodyDef.userData = floorShape;
	        return floorShape;
	    };
	    /**
	     * 画像を作成してステージに配置する
	     */
	    Box.prototype.createImage = function () {
	        this.image = this.images.maru;
	        this.imageRadius = this.image.width / 2;
	        var bmp = this.crateDynamicImage(this.stageWidth / 2, -this.imageRadius, this.imageRadius);
	        this.stage.addChild(bmp);
	    };
	    /**
	     * うごくやつの作成
	     * @param nX
	     * @param nY
	     * @param radius
	     * @returns {createjs.Bitmap}
	     */
	    Box.prototype.crateDynamicImage = function (nX, nY, radius) {
	        var dynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody;
	        var bodyDef = this.defineBody(nX, nY, dynamicBody);
	        var image = this.createVisualImage(radius, bodyDef);
	        var circleShape = new Box2D.Collision.Shapes.b2CircleShape(radius * this.SCALE);
	        var fixtureDef = this.defineFixture(circleShape);
	        this.setFixture(fixtureDef, 1, 0.1, 0.8);
	        this.createBody(this.world, bodyDef, fixtureDef);
	        return image;
	    };
	    /**
	     * 見える画像の作成
	     * @param radius
	     * @param bodyDef
	     * @returns {createjs.Bitmap}
	     */
	    Box.prototype.createVisualImage = function (radius, bodyDef) {
	        var bpm = new createjs.Bitmap(this.image);
	        bpm.regX = this.image.width / 2;
	        bpm.regY = this.image.height / 2;
	        bpm.scaleX = bpm.scaleY = radius / this.imageRadius;
	        bodyDef.userData = bpm;
	        return bpm;
	    };
	    Box.prototype.setFixture = function (fixtureDef, density, friction, restitution) {
	        fixtureDef.density = density;
	        fixtureDef.friction = friction;
	        fixtureDef.restitution = restitution;
	    };
	    /**
	     * 材質を決める
	     * @param myShape
	     * @returns {Box2D.Dynamics.b2FixtureDef}
	     */
	    Box.prototype.defineFixture = function (myShape) {
	        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
	        fixtureDef.shape = myShape;
	        return fixtureDef;
	    };
	    Box.prototype.createBody = function (world, bodyDef, fixtureDef) {
	        var body = world.CreateBody(bodyDef);
	        body.CreateFixture(fixtureDef);
	    };
	    Box.prototype.defineBody = function (nX, nY, bodyType) {
	        var bodyDef = new Box2D.Dynamics.b2BodyDef();
	        bodyDef.position.Set(nX * this.SCALE, nY * this.SCALE);
	        bodyDef.type = bodyType;
	        return bodyDef;
	    };
	    Box.prototype.updateStage = function (event) {
	        var delta = event.delta;
	        this.updateObject(delta);
	        this.stage.update();
	    };
	    Box.prototype.updateObject = function (delta) {
	        this.world.Step(delta / 1000, this.velocityIterations, this.positionIterations);
	        var body = this.world.GetBodyList();
	        while (body) {
	            var myObject = body.GetUserData();
	            if (myObject) {
	                var position = body.GetPosition();
	                myObject.x = position.x / this.SCALE;
	                myObject.y = position.y / this.SCALE;
	                myObject.rotation = body.GetAngle() / createjs.Matrix2D.DEG_TO_RAD;
	            }
	            body = body.GetNext();
	        }
	    };
	    return Box;
	}(stage_1.default));
	window.onload = function () {
	    new Box();
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
	        this.canvas = document.getElementById("canvas");
	        this.stage = new createjs.Stage(this.canvas);
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
//# sourceMappingURL=box2d.bundle.js.map