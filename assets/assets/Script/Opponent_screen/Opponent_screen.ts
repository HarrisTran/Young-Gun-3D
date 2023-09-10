import { _decorator, CCFloat, Component, instantiate, log, Node, Prefab, Sprite } from 'cc';
import { Data_manager } from '../MapMenu/Data_manager';

import { Mapmenu } from '../MapMenu/Mapmenu';

import { Data_map_manager } from '../MapMenu/Data_map_manager';
import { test_enemy } from '../MapMenu/test_enemy';
import { AudioManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Opponent_screen')
export class Opponent_screen extends Component {
   
   
    @property({type:Node})
    avatar_enemy:Node;

    @property({type:Node})
    screen_map:Node;
    
    @property({type:Number})
    number_map:number;

    @property({type:Node})
    enemy:Node;
    
   
    @property({type:CCFloat})
    CurrTime:number;
    @property({type:CCFloat})
    DeltaTime:number;
    @property({type:CCFloat})
    MaxTimeOpponentStart:number;
    @property({type:Node})
    ButtonStart:Node;
    
   
    
    


    start() {
        if(!AudioManager.instance.isBGMPlaying()){
            AudioManager.instance.playMusic();
        }
        // let a =Data_map_manager.instance.list_enemy[Mapmenu.instance.index_enemy_choose];
        // this.avatar_enemy.getComponent(Sprite).spriteFrame=a;
        this.ButtonStart.active=false;
        this.CurrTime=this.MaxTimeOpponentStart;

         // this.enemy=instantiate(Data_manager.instance.list_enemy[0]);
          this.show_ui();

          let currentLevel = Data_manager.instance.get_data_lv();
          if(currentLevel==7 || currentLevel == 13 || currentLevel == 33){
            let weaponUsing = Data_manager.instance.getEquipWeapon();
            if(!Data_manager.instance.GetBuyWeapon(weaponUsing)){
                Data_manager.instance.SetEquipWeapon(0);
            }
          }
         

    }
    

    public CallTimeButton()
    {
        this.CurrTime-=this.DeltaTime;
        if(this.CurrTime<0)
        {
            this.ButtonStart.active=true;
            this.CurrTime=0;
        }
    }



    public show_ui()
    {
        this.number_map= parseInt(((Mapmenu.instance.test_numb)/((Mapmenu.instance.lv_per_dif+1))).toString());
       
     this.screen_map.getComponent(Sprite).spriteFrame=Data_map_manager.instance.list_sprite[this.number_map];

     this.avatar_enemy.getComponent(Sprite).spriteFrame=Data_map_manager.instance.list_enemy[Mapmenu.instance.index_enemy_choose];
    
   
 
    }

    update(deltaTime: number) {
        this.DeltaTime=deltaTime;
        this.CallTimeButton();
      // this.show_ui();
    }
}

