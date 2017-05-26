import Stage from "../stage";

class Filter extends Stage
{
    protected images:any = {};

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
                src: "../img/hito.png",
                id : "hito"
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

        let bmp = new createjs.Bitmap(this.images.hito);
        bmp.filters = [
            // new createjs.ColorFilter(0, 0, 0, 1, -255, -255, -255, 0)
            new createjs.BlurFilter(10, 10, 0)
        ];
        bmp.cache(0, 0, 528, 528);

        this.stage.addChild(bmp);
        this.stage.update();
    }
}

window.onload = () => {
    new Filter();
};