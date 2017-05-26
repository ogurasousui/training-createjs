import Character from "./character";

export default class Shadow
{
    protected image:any;
    protected character:createjs.Container;
    protected characterSprite:createjs.Sprite;
    protected nowDirection:string = null;

    protected life:number = 20;
    protected alive:boolean = true;

    public constructor(image:any, setX:number = 0, setY:number = 0, direction:string)
    {
        this.image = image;
        this.createCharacter(setX, setY, direction);
    }

    protected createCharacter(setX:number = 0, setY:number = 0, direction:string):void
    {
        let bmp = new createjs.Bitmap(this.image);
        bmp.filters = [
            new createjs.ColorFilter(0, 0, 0, 1, -255, -255, -255, 0)
            // new createjs.BlurFilter(10, 10, 0)
        ];
        bmp.cache(0, 0, 192, 96);

        let data:any = {};
        data.images = [bmp.cacheCanvas];
        data.frames = {
            width:32,
            height:32,
            regX:16,
            regY:32
        };
        data.animations = {
            stand:  [0, 2, 'stand', 0.3],
            up:     [9, 11, 'up', 0.3],
            down:   [6, 8, 'down', 0.3],
            right:  [15, 17, 'right', 0.3],
            left:   [12, 14, 'left', 0.3],
            damaged: {
                frames:[
                    3, 4, 3, 4
                ],
                speed: 0.3,
                next: 'stand'
            },
        };
        let spriteSheet = new createjs.SpriteSheet(data);
        let character = new createjs.Sprite(spriteSheet, direction);

        character.mouseEnabled = false;

        character.scaleX = character.scaleY = 2;

        this.characterSprite = character;

        let container = new createjs.Container();
        container.addChild(character);
        // container.addChild(bmp);

        container.x = setX;
        container.y = setY;

        this.character = container;

    }

    public getCharacter():createjs.Container
    {
        return this.character;
    }

    public getCharacterSprite():createjs.Sprite
    {
        return this.characterSprite;
    }

    public update():void
    {
        if (--this.life < 0)
        {
            this.alive = false;
        }
    }

    public isAlive():boolean
    {
        return this.alive;
    }

}