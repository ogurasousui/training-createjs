import Material from "./material";
import Stage from "../stage";

class Circles extends Stage
{
    protected objects:Material[] = [];
    protected maxObjectNum:number = 50;

    public constructor()
    {
        super();
        this.setup();
    }

    protected createObjects():void
    {
        if (this.objects.length > this.maxObjectNum) return;

        let count = this.maxObjectNum - this.objects.length;

        for (let i = 0; i < count; i ++)
        {
            this.createObject();
        }
    }

    /**
     * オブジェクトの作成
     * @param initX
     * @param initY
     */
    protected createObject():void
    {
        let material = new Material();
        this.objects.push(material);
        this.stage.addChild(material.getShape());
    }

    protected setup():void
    {
        super.setup();

        this.createObjects();

        this.update();

        this.startTick();
    }

    protected update():void
    {
        this.updateObjects();
        super.update();
    }

    /**
     * オブジェクトの更新
     */
    protected updateObjects():void
    {
        let newArray:Material[] = [];
        for (let i = 0; i < this.objects.length; i ++)
        {
            if (this.objects[i].update())
            {
                newArray.push(this.objects[i]);
            }
            else
            {
                this.stage.removeChild(this.objects[i].getShape());
            }
        }
        this.objects = newArray;

        this.createObjects();
    }


}

window.onload = () => {
    new Circles();
};