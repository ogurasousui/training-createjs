export default class Material
{
    protected shape:createjs.Shape;

    protected life:number;
    protected lifeMax:number;
    protected degree:number = 0;
    protected initY:number;
    protected gainX:number;
    protected gainDegree:number;

    public constructor()
    {
        this.createObject();
    }

    protected random(max:number, min:number = 0):number
    {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    protected createObject():void
    {
        let hue = 360 * Math.random();
        let color = "hsl(" + hue + ", 100%, 50%)";

        let graphics = new createjs.Graphics().beginFill(color).drawCircle(0, 0, this.random(50, 10));

        let object = new createjs.Shape(graphics);
        object.x = -200;
        object.y = this.initY = this.random(480);

        this.lifeMax = this.life = this.random(300);
        this.gainDegree = this.random(20, 5);
        this.gainX = this.random(10, 1);

        this.shape = object;
    }

    public getShape():createjs.Shape
    {
        return this.shape;
    }

    public update():boolean
    {
        let shape = this.getShape();
        shape.x += this.gainX;
        this.degree += this.gainDegree;
        let rad = this.degree * Math.PI / 180;
        let y = Math.sin(rad) * 30;
        shape.y = this.initY + y;
        shape.alpha = (this.life / this.lifeMax);

        return (--this.life > 0);
    }

    public isAlive():boolean
    {
        return (this.life > 0);
    }


}