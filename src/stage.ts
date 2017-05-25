export default class Stage
{
    protected stage:createjs.Stage;
    protected framerate:number = 60;

    protected setup():void
    {
        this.stage = new createjs.Stage("canvas");
    }

    protected startTick():void
    {
        createjs.Ticker.framerate = this.framerate;
        createjs.Ticker.on("tick", this.update, this);
    }

    protected update():void
    {
        this.stage.update();
    }
}