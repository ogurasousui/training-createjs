class Circle
{
    protected stage:createjs.Stage;
    protected object:createjs.Shape;

    protected framerate:number = 60;

    protected degree:number = 0;

    public constructor()
    {
        this.setUp();
    }

    /**
     * オブジェクトの作成
     * @param initX
     * @param initY
     */
    protected createObject(initX:number = 0, initY:number = 0):void
    {
        let graphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 10);
        this.object = new createjs.Shape(graphics);
        this.object.x = initX;
        this.object.y = initY;
    }

    protected setUp():void
    {
        this.createObject();

        this.stage = new createjs.Stage("canvas");
        this.stage.addChild(this.object);

        this.update();

        createjs.Ticker.framerate = this.framerate;
        createjs.Ticker.on("tick", this.update, this);

    }

    protected update():void
    {
        this.updateObject();
        this.stage.update();
    }

    /**
     * オブジェクトの更新
     */
    protected updateObject():void
    {
        this.object.x += 1;
        this.degree += 10;
        let rad = this.degree * Math.PI / 180;
        let y = Math.sin(rad) * 30;

        this.object.y = 240 + y;
    }
}

window.onload = () => {
    new Circle();
};