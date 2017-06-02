import Stage from "../stage";
import Map from "./map";
import Character from "./character";

class Scroll extends Stage
{
    protected images:any = {};
    protected map:Map;
    protected character:Character;

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

    protected setup():void
    {
        super.setup();

        this.map = new Map();
        this.character = new Character();

        this.stage.addChild(this.map.getMap());

        this.startTick();

    }

    public update():void
    {
        this.map.update();
        this.character.update();
        super.update();
    }


}

window.onload = () => {
    new Scroll();
};
