import Character from "./character";

export default class Shadow
{
    protected image:any;
    protected character:createjs.Container;

    protected life:number = 30;
    protected alive:boolean = true;

    public constructor(image:any, setX:number = 0, setY:number = 0)
    {
        this.image = image;
        this.createCharacter(setX, setY);
    }

    protected createCharacter(setX:number = 0, setY:number = 0):void
    {
        let matrix = new createjs.ColorMatrix();
        matrix.adjustHue(240);

        let bmp = new createjs.Bitmap(this.image);
        bmp.alpha = 0.8;

        let bmp2 = new createjs.Bitmap(this.image);
        bmp2.filters = [
            // new createjs.ColorMatrixFilter(matrix)
            new createjs.ColorFilter(0, 0, 1, 1, 96, 25, 134, 0)
        ];
        bmp2.cache(0, 0, 64, 64);

        let container = new createjs.Container();
        container.addChild(bmp);
        container.addChild(bmp2);

        container.x = setX - 32;
        container.y = setY - 64;
        // container.alpha = 0.7;

        this.character = container;

    }

    public getCharacter():createjs.Container
    {
        return this.character;
    }

    public update():void
    {
        if (--this.life < 0)
        {
            this.alive = false;
        }
        this.character.alpha -= 0.02;
    }

    public isAlive():boolean
    {
        return this.alive;
    }

}