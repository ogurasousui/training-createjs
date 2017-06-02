export default class Stage
{
    protected canvas:HTMLElement;
    protected stage:createjs.Stage;
    protected framerate:number = 60;

    protected setup():void
    {
        this.canvas = document.getElementById("canvas");
        this.stage = new createjs.Stage(this.canvas);
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