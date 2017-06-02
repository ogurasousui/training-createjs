export default class Tile
{
    protected type:number;
    protected object:any;
    protected posX:number;
    protected posY:number;

    protected typeMap:any = {
        0: 'createNone',
        1: 'createWall',
        2: 'createBlock',
        3: 'createItemBlock',
    };

    protected random(max:number, min:number = 0):number
    {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    public constructor(x:number, y:number, type:number = 0)
    {
        this.type = type;
        this.posX = x;
        this.posY = y;

        // for test
        this[this.typeMap[this.random(2)]]();

        this.setObject();
    }

    protected calcPosition()
    {
        return {
            x: 32 * this.posX,
            y: 32 * this.posY
        };
    }

    public setObject():void
    {

    }

    public getObject()
    {
        return this.object;
    }

    protected createNone():void
    {
        let graphics = new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, 32, 32);
        this.object = new createjs.Shape(graphics);

        let pos = this.calcPosition();
        this.object.x = pos.x;
        this.object.y = pos.y;

    }

    protected createBlock():void
    {
        let graphics = new createjs.Graphics().beginFill("#FF0000").drawRect(0, 0, 32, 32);
        this.object = new createjs.Shape(graphics);

        let pos = this.calcPosition();
        this.object.x = pos.x;
        this.object.y = pos.y;
    }

    protected createWall():void
    {
        let graphics = new createjs.Graphics().beginFill("#0000FF").drawRect(0, 0, 32, 32);
        this.object = new createjs.Shape(graphics);

        let pos = this.calcPosition();
        this.object.x = pos.x;
        this.object.y = pos.y;
    }

    public update():void
    {

    }
}