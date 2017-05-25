export default class Tama
{
    protected object:createjs.DisplayObject;

    public constructor(setX:number, setY:number)
    {
        this.createObject(setX, setY);
    }

    public getObject():createjs.DisplayObject
    {
        return this.object;
    }

    protected createObject(setX:number, setY:number):void
    {
        let graphics = new createjs.Graphics().beginFill('#000000').drawCircle(0, 0, 10);
        let object = new createjs.Shape(graphics);

        object.x = setX;
        object.y = setY;

        this.object = object;
    }

    protected move():void
    {
        let object = this.getObject();

        let targetX = 320;
        let targetY = 240 - 32;

        let bulletX = object.x;
        let bulletY = object.y;

        let distance = Math.sqrt((targetX-bulletX)*(targetX-bulletX)+(targetY-bulletY)*(targetY-bulletY));

        object.x += (targetX-bulletX) / distance * 2;
        object.y += (targetY-bulletY) / distance * 2;
    }

    public update():void
    {
        this.move();
    }

    public isHit(character:createjs.Shape):boolean
    {
        let point = this.getObject().localToLocal(0, 0, character);
        return character.hitTest(point.x, point.y);
    }

}