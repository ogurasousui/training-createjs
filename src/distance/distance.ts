import Stage from "../stage";
import Tama from "./tama";

class Distance extends Stage
{
    protected images:any = {};
    protected character:createjs.Container;
    protected characterShape:createjs.Shape;
    protected characterSprite:createjs.Sprite;

    protected tamas:Tama[] = [];

    protected fireInterval:number = 60;
    protected fireIntervalCount:number = 0;

    public constructor()
    {
        super();
        this.loadAsset();
    }

    protected loadAsset():void
    {
        let loader = new createjs.LoadQueue(false);
        loader.loadManifest([
            {
                src: "../img/tori.png",
                id : "tori"
            },
            {
                src: "../img/crash.png",
                id : "crash"
            }
        ]);
        loader.load();

        loader.on('fileload', (evt:createjs.Event) => {
            if (evt.item.type == "image") {
                this.images[evt.item.id] = evt.result;
            }
        }, this);

        loader.on('complete', () => {
            this.setup();
        }, this, true);
    }

    protected createSprite():void
    {
        let data:any = {};
        data.images = [this.images.tori];
        data.frames = {
            width:32,
            height:32,
            regX:16,
            regY:32
        };
        data.animations = {
            stand:  [0, 2, 'stand', 0.5],
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

        container.x = 320;
        container.y = 240;

        this.character = container;
        this.stage.addChild(container);
    }

    protected setup():void
    {
        super.setup();

        let container = new createjs.Container();
        let graphics = new createjs.Graphics().beginFill('#FFFFFF').drawRect(0, 0, 640, 480);
        let shape = new createjs.Shape(graphics);
        shape.alpha = 0.01;
        container.addChild(shape);

        this.stage.addChild(container);

        this.createSprite();

        this.startTick();
    }

    protected update():void
    {
        this.checkFire();
        this.updateTamas();
        super.update();
    }

    protected checkFire():void
    {
        if (++this.fireIntervalCount > this.fireInterval)
        {
            this.fireIntervalCount = 0;
            this.fireTama();
        }
    }

    protected updateTamas():void
    {
        let newArray:Tama[] = [];
        for (let i = 0; i < this.tamas.length; i ++)
        {
            if (this.tamas[i].isHit(this.characterShape))
            {
                this.stage.removeChild(this.tamas[i].getObject());
                this.createCrash(this.tamas[i].getObject().x, this.tamas[i].getObject().y);
                this.characterSprite.gotoAndPlay('damaged');
            }
            else
            {
                this.tamas[i].update();
                newArray.push(this.tamas[i]);
            }
        }

        this.tamas = newArray;
    }


    protected fireTama():void
    {
        console.log('fire tama');
        let tama = new Tama(this.stage.mouseX, this.stage.mouseY);
        this.stage.addChild(tama.getObject());
        this.tamas.push(tama);
    }

    protected createCrash(setX, setY):void
    {

        let data:any = {};
        data.images = [this.images.crash];
        data.frames = {
            width:64,
            height:64,
            regX:32,
            regY:32
        };
        data.animations = {
            crash:  [0, 63],
        };
        let spriteSheet = new createjs.SpriteSheet(data);
        let crash = new createjs.Sprite(spriteSheet, "crash");

        crash.x = setX;
        crash.y = setY;

        this.stage.addChild(crash);

        crash.on('animationend', () => {
            this.stage.removeChild(crash);
        }, this, true);
    }
}

window.onload = () => {
    new Distance();
};