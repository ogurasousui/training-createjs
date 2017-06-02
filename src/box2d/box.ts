import Stage from "../stage";

class Box extends Stage
{
    protected images: any = {};
    protected image;
    protected world: Box2D.Dynamics.b2World;

    protected stageWidth: number;
    protected stageHeight: number;
    protected imageRadius: number;

    protected gravityVertical: number = 15;
    protected velocityIterations: number = 8;
    protected positionIterations: number = 3;

    protected standardRadius = 20;
    protected floor = new createjs.Rectangle();

    protected SCALE = 1 / 30;

    public constructor()
    {
        super();
        this.loadAsset();
    }

    protected loadAsset(): void
    {
        let loader = new createjs.LoadQueue(false);
        loader.loadManifest([
            {
                src: "../img/maru.png",
                id : "maru"
            }
        ]);
        loader.load();

        loader.on('fileload', (evt: createjs.Event) => {
            if (evt.item.type == "image") {
                this.images[evt.item.id] = evt.result;
            }
        }, this);

        loader.on('complete', () => {
            this.setup();
        }, this, true);
    }

    protected setup(): void
    {
        super.setup();

        this.stageWidth = this.canvas['width'];
        this.stageHeight = this.canvas['height'];

        this.floor.width = this.stageWidth * 0.8;
        this.floor.x = (this.stageWidth - this.floor.width) / 2;

        let gravity = new Box2D.Common.Math.b2Vec2(0, this.gravityVertical);
        this.initializeBox2D(gravity, this.stageWidth, this.stageHeight);

        this.createImage();

        createjs.Ticker.on("tick", this.updateStage, this);
    }

    protected initializeBox2D(gravity: Box2D.Common.Math.b2Vec2, stageWidth: number, stageHeight: number): void
    {
        this.world = new Box2D.Dynamics.b2World(gravity, true);
        let floorShape: createjs.Shape = this.createStaticFloor(stageWidth / 2, stageHeight - this.standardRadius, this.floor.width, this.standardRadius, "#CCCCCC");
        this.stage.addChild(floorShape);
    }

    /**
     * 床の作成
     * @param nX
     * @param nY
     * @param nWidth
     * @param nHeight
     * @param color
     * @returns {createjs.Shape}
     */
    protected createStaticFloor(nX: number, nY: number, nWidth: number, nHeight: number, color: string): createjs.Shape
    {
        let staticBody = Box2D.Dynamics.b2Body.b2_staticBody;
        let bodyDef: Box2D.Dynamics.b2BodyDef = this.defineBody(nX, nY, staticBody);
        let floorShape = this.createVisualFloor(nWidth, nHeight, color, bodyDef);
        let boxShape = new Box2D.Collision.Shapes.b2PolygonShape();
        let fixtureDef = this.defineFixture(boxShape);
        boxShape.SetAsBox(nWidth / 2 * this.SCALE, nHeight / 2 * this.SCALE);
        this.createBody(this.world, bodyDef, fixtureDef);
        return floorShape;
    }

    /**
     * 見える床の作成
     * @param nWidth
     * @param nHeight
     * @param color
     * @param bodyDef
     * @returns {createjs.Shape}
     */
    protected createVisualFloor(nWidth: number, nHeight: number, color: string, bodyDef: Box2D.Dynamics.b2BodyDef): createjs.Shape
    {
        let floorShape = new createjs.Shape();
        floorShape.regX = nWidth / 2;
        floorShape.regY = nHeight / 2;
        floorShape.graphics
            .beginFill(color)
            .drawRect(0, 0, nWidth, nHeight);
        bodyDef.userData = floorShape;
        return floorShape;
    }

    /**
     * 画像を作成してステージに配置する
     */
    protected createImage(): void
    {
        this.image = this.images.maru;
        this.imageRadius = this.image.width / 2;
        let bmp = this.crateDynamicImage(this.stageWidth / 2, -this.imageRadius, this.imageRadius);
        this.stage.addChild(bmp);
    }

    /**
     * うごくやつの作成
     * @param nX
     * @param nY
     * @param radius
     * @returns {createjs.Bitmap}
     */
    protected crateDynamicImage(nX: number, nY: number, radius: number)
    {
        let dynamicBody: number = Box2D.Dynamics.b2Body.b2_dynamicBody;
        let bodyDef: Box2D.Dynamics.b2BodyDef = this.defineBody(nX, nY, dynamicBody);
        let image: createjs.Bitmap = this.createVisualImage(radius, bodyDef);

        let circleShape = new Box2D.Collision.Shapes.b2CircleShape(radius * this.SCALE);
        let fixtureDef = this.defineFixture(circleShape);
        this.setFixture(fixtureDef, 1, 0.1, 0.8);

        this.createBody(this.world, bodyDef, fixtureDef);

        return image;
    }

    /**
     * 見える画像の作成
     * @param radius
     * @param bodyDef
     * @returns {createjs.Bitmap}
     */
    protected createVisualImage(radius: number, bodyDef: Box2D.Dynamics.b2BodyDef): createjs.Bitmap
    {
        let bpm = new createjs.Bitmap(this.image);
        bpm.regX = this.image.width / 2;
        bpm.regY = this.image.height / 2;
        bpm.scaleX = bpm.scaleY = radius / this.imageRadius;
        bodyDef.userData = bpm;

        return bpm;
    }

    protected setFixture(fixtureDef, density, friction, restitution)
    {
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
    }

    /**
     * 材質を決める
     * @param myShape
     * @returns {Box2D.Dynamics.b2FixtureDef}
     */
    protected defineFixture(myShape)
    {
        let fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = myShape;
        return fixtureDef;
    }

    protected createBody(world: Box2D.Dynamics.b2World, bodyDef: Box2D.Dynamics.b2BodyDef, fixtureDef):void
    {
        let body = world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
    }

    protected defineBody(nX: number, nY: number, bodyType: number): Box2D.Dynamics.b2BodyDef
    {
        let bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position.Set(nX * this.SCALE, nY * this.SCALE);
        bodyDef.type = bodyType;
        return bodyDef;
    }

    protected updateStage(event: createjs.Event): void
    {
        let delta = event.delta;

        this.updateObject(delta);
        this.stage.update();
    }

    protected updateObject(delta: number): void
    {
        this.world.Step(delta / 1000, this.velocityIterations, this.positionIterations);

        let body = this.world.GetBodyList();
        while (body) {
            let myObject = body.GetUserData();
            if (myObject)
            {
                let position = body.GetPosition();
                myObject.x = position.x / this.SCALE;
                myObject.y = position.y / this.SCALE;
                myObject.rotation = body.GetAngle() / createjs.Matrix2D.DEG_TO_RAD;
            }
            body = body.GetNext();
        }
    }

}

window.onload = () => {
    new Box();
};