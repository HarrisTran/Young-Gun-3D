import { _decorator, Component, Node } from 'cc';
import { Data_manager } from '../../../assets/Script/MapMenu/Data_manager';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {

    @property({type:Node})
    ListMap:Node[]=[];
    
    protected onLoad(): void {
        this.Setmap();
    }

    start() {

    }

    public Setmap()
    {

        for(let i=0;i<this.ListMap.length;i++)
        {
            this.ListMap[i].active=false;
        }


        for(let i=0;i<this.ListMap.length;i++)
        {
            if(Data_manager.instance.curr_lv<=10) this.ListMap[0].active=true;
            else if(Data_manager.instance.curr_lv>10&&Data_manager.instance.curr_lv<=20) this.ListMap[1].active=true;
            else if(Data_manager.instance.curr_lv>20&&Data_manager.instance.curr_lv<=30)this.ListMap[2].active=true;
            else if(Data_manager.instance.curr_lv>30)this.ListMap[3].active=true;
        }
    }
}

