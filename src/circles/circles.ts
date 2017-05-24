import Material from "./material";

class Circles
{
    protected stage:createjs.Stage;
    protected objects:Material[] = [];

    protected framerate:number = 60;
    protected maxObjectNum:number = 50;

    public constructor()
    {
        this.setUp();
    }

    protected createObjects():void
    {
        if (this.objects.length > this.maxObjectNum) return;

        let count = this.maxObjectNum - this.objects.length;

        for (let i = 0; i < count; i ++)
        {
            this.createObject();
        }
    }

    /**
     * オブジェクトの作成
     * @param initX
     * @param initY
     */
    protected createObject():void
    {
        let material = new Material();
        this.objects.push(material);
        this.stage.addChild(material.getShape());
    }

    protected setUp():void
    {
        this.stage = new createjs.Stage("canvas");

        this.createObjects();

        this.update();

        createjs.Ticker.framerate = this.framerate;
        createjs.Ticker.on("tick", this.update, this);

    }

    protected update():void
    {
        this.updateObjects();
        this.stage.update();
    }

    /**
     * オブジェクトの更新
     */
    protected updateObjects():void
    {
        let newArray:Material[] = [];
        for (let i = 0; i < this.objects.length; i ++)
        {
            if (this.objects[i].update())
            {
                newArray.push(this.objects[i]);
            }
            else
            {
                this.stage.removeChild(this.objects[i].getShape());
            }
        }
        this.objects = newArray;

        this.createObjects();
    }


}

window.onload = () => {
    new Circles();
};