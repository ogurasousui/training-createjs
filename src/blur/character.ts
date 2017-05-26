import Shadow from "./shadow";
export default class Character
{
    protected image:any;
    protected character:createjs.Container;
    protected characterShape:createjs.Shape;
    protected characterSprite:createjs.Sprite;
    protected nowDirection:string = null;

    protected targetX:number = 0;
    protected targetY:number = 0;

    protected moving:boolean = false;

    protected shadows:Shadow[] = [];

    protected shadowInterval:number = 3;
    protected shadowIntervalCount:number = 0;

    public constructor(image:any, setX:number = 0, setY:number = 0)
    {
        this.image = image;
        this.createCharacter(setX, setY);
    }

    protected createCharacter(setX:number = 0, setY:number = 0):void
    {
        let data:any = {};
        data.images = [this.image];
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
        let character = new createjs.Sprite(spriteSheet, "stand");

        character.mouseEnabled = false;

        character.scaleX = character.scaleY = 2;

        let graphics = new createjs.Graphics().beginFill('#FFFFFF').drawRect(0, 0, 64, 64);
        let shape = new createjs.Shape(graphics);
        shape.regX = 32;
        shape.regY = 64;
        shape.alpha = 0.01;

        this.characterShape = shape;
        this.characterSprite = character;

        let container = new createjs.Container();
        container.addChild(character);
        container.addChild(shape);

        container.x = setX;
        container.y = setY;

        this.character = container;
    }

    public getCharacter():createjs.Container
    {
        return this.character;
    }

    public getCharacterShape():createjs.Shape
    {
        return this.characterShape;
    }

    public getCharacterSprite():createjs.Sprite
    {
        return this.characterSprite;
    }

    public setTarget(setX:number, setY:number):void
    {
        this.targetX = setX;
        this.targetY = setY;
    }

    public update():void
    {
        this.move();
        if (this.isMoving())
        {
            this.checkShadow();
        }
        this.updateShadow();
    }

    protected updateShadow():void
    {
        let newArray:Shadow[] = [];
        for (let i = 0; i < this.shadows.length; i ++)
        {
            this.shadows[i].update();
            if (this.shadows[i].isAlive())
            {
                newArray.push(this.shadows[i]);
            }
            else
            {
                this.character.parent.removeChild(this.shadows[i].getCharacter());
            }
        }
        this.shadows = newArray;
    }

    protected checkShadow():void
    {
        let character = this.getCharacter();
        if (++this.shadowIntervalCount > this.shadowInterval)
        {
            this.shadowIntervalCount = 0;
            let shadow = new Shadow(this.image, character.x, character.y, this.nowDirection);
            this.shadows.push(shadow);
            character.parent.addChild(shadow.getCharacter());
            character.parent.swapChildren(this.getCharacter(), shadow.getCharacter());
        }
    }

    protected move():void
    {
        let object = this.getCharacter();

        let targetX = this.targetX;
        let targetY = this.targetY;

        let beforeX = object.x;
        let beforeY = object.y;

        let distance = Math.sqrt((targetX-beforeX)*(targetX-beforeX)+(targetY-beforeY)*(targetY-beforeY));

        this.moving = false;
        if (distance >= 5)
        {
            this.moving = true;
            object.x += (targetX-beforeX) / distance * 5;
            object.y += (targetY-beforeY) / distance * 5;

            this.changeDirection(beforeX, beforeY, object.x, object.y);
        }
    }

    protected changeDirection(beforeX:number, beforeY:number, afterX:number, afterY:number):void
    {
        let diffX = Math.abs(beforeX - afterX);
        let diffY = Math.abs(beforeY - afterY);

        let setPos = 'stand';

        if (beforeY - afterY < 0)
        {
            setPos = 'down';
            if (diffX > diffY)
            {
                if (beforeX - afterX < 0)
                {
                    // みぎ
                    setPos = 'right';
                }
                else if (beforeX - afterX > 0)
                {
                    // ひだり
                    setPos = 'left';
                }
            }

        }
        else if (beforeY - afterY > 0)
        {
            setPos = 'up';
            if (diffX > diffY)
            {
                if (beforeX - afterX < 0)
                {
                    // みぎ
                    setPos = 'right';
                }
                else if (beforeX - afterX > 0)
                {
                    // ひだり
                    setPos = 'left';
                }
            }
        }

        if (this.nowDirection != setPos)
        {
            this.nowDirection = setPos;
            this.characterSprite.gotoAndPlay(setPos);
        }
    }

    protected isMoving():boolean
    {
        return this.moving;
    }
}