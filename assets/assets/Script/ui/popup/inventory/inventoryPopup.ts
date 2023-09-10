import { _decorator, Component, log, Node } from 'cc';
import { UIManager } from '../../../Common/UIManager';
import { Constants } from '../../../Data/Constants';
import { MapManager } from '../../../Common/MapManager';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { inventoryItem } from './inventoryItem';
const { ccclass, property } = _decorator;

@ccclass('inventoryPopup')
export class inventoryPopup extends Component {

    @property({type:inventoryItem})
     listitem:inventoryItem[]=[];
    onClickChooseWeapon(event: Event, data: string){
        // MapManager._currentLevel.WeaponLevel = +data;
        // log(MapManager._currentLevel);
    }

    onQuitPopup(){
        //UIManager.instance.hidePrefabNode(Constants.Popup.INVENTORY);
        this.node.active = false;
    }


    public setupitem()
    {
     for(let i=0;i<this.listitem.length;i++)
     {
        this.listitem[i].setup();
     }
    }

    protected start(): void {
        Data_manager.instance.getEquipWeapon();
    }
}

