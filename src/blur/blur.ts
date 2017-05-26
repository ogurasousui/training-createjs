import Stage from "../stage";
import Character from "./character";

class Blur extends Stage
{
    protected images:any = {};
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

        this.character = new Character(this.images.tori, 320, 240);

        this.stage.addChild(this.character.getCharacter());

        this.startTick();
    }

    protected update():void
    {
        this.character.setTarget(this.stage.mouseX, this.stage.mouseY);
        this.character.update();
        super.update();
    }

}

window.onload = () => {
    new Blur();
};