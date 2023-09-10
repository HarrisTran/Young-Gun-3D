import { _decorator, Component, Node } from 'cc';
import { Data_manager } from '../../../assets/Script/MapMenu/Data_manager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends Component {
    
    @property({type:Node})
    Listweapon:Node[]=[];
    start() {
           this.setWeapon();
    }

    public setWeapon()
    {
        for(let i=0;i<this.Listweapon.length;i++)
        {
            if(i==Data_manager.instance.index_weapon)
            {
                this.Listweapon[i].active=true;
            }
        }
    }

    update(deltaTime: number) {
        
    }
}

