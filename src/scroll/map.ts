import Tile from "./tile";

export default class Map
{
    protected map:createjs.Container;

    protected tile:any = [];


    public constructor()
    {
        this.map = new createjs.Container();
        this.createInit();
    }

    protected createInit():void
    {
        this.fillTile();
    }

    protected fillTile():void
    {
        for (let i = 0; i < 30; i++)
        {
            this.tile[i] = [];
            for (let j = 0; j < 12; j++)
            {
                this.tile[i][j] = new Tile(i, j, 0);
                this.map.addChild(this.tile[i][j].getObject());
            }
        }
    }

    public update():void
    {

    }

    protected scroll():void
    {

    }

    protected putObject():void
    {

    }

    protected createObject():void
    {

    }

    public getMap():createjs.Container
    {
        return this.map;
    }
}