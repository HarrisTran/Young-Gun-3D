import { _decorator, Button, Color, Component, EventHandle, Label, Node, Sprite, SpriteFrame, Vec2 } from 'cc';
import { Mapmenu } from './Mapmenu';
import { Data_manager } from './Data_manager';
import { Ui_manager } from './Ui_manager';
const { ccclass, property } = _decorator;

@ccclass('Button_level')
export class Button_level extends Component {

    @property({type:Number})
    but_lv:number
    @property({type:Number})
    index_enemy_in_level:number
    @property({type:Boolean})
    is_pass:boolean;


    @property({type:Node})
    mark:Node; 

    @property({type:SpriteFrame})
    normal_sprite:SpriteFrame; 
    @property({type:SpriteFrame})
    passed_sprite:SpriteFrame; 
    
    @property({type:SpriteFrame})
    lock_sprite:SpriteFrame; 
    @property({type:SpriteFrame})
    unlock_sprite:SpriteFrame; 

    @property({type:Number})
    money_earn:number
    
    
    
  
   

    protected onLoad(): void {
      this.set_sprite();
      this.getComponentInChildren(Label).string=this.but_lv.toString();
    }  
    start() {
      this.getComponent(Button).node.on(Button.EventType.CLICK,this.click_map,this);

      this.getComponentInChildren(Label).string=this.but_lv.toString();
      
    }
   
    public set_lv(lv:number)
    {
       this.but_lv=lv;
       this.getComponentInChildren(Label).string=this.but_lv.toString();
    }
    

    public click_map()
    {
      Data_manager.instance.set_up_data();
      if(this.but_lv<=Data_manager.instance.max_lv)
      {
       
      Mapmenu.instance.set_pick_map(this.but_lv);
      Data_manager.instance.set_data_lv(this.but_lv);
     Data_manager.instance.set_data_enemy(this.index_enemy_in_level);
     
     Mapmenu.instance.index_enemy_choose=this.index_enemy_in_level;

     // Data_manager.instance.increase_data_money(this.money_earn);
      // Data_manager.instance.up_data_max_lv(this.but_lv);
      
      }
      if( this.but_lv<=  Data_manager.instance.max_lv)
      {
        Ui_manager.instance.onclick_button_start();
      }
      else  Ui_manager.instance.onclick_off_button_start();


      Mapmenu.instance.test_numb = Data_manager.instance.get_data_lv();

      Mapmenu.instance.check_lv_per_stage();
      
     
    
    }


    public set_sprite()
    {
      if( this.but_lv<=  Data_manager.instance.max_lv)
      {
        this.getComponent(Sprite).spriteFrame=this.unlock_sprite;
          this.mark.getComponent(Sprite).spriteFrame=this.normal_sprite;
          if(this.but_lv!=  Data_manager.instance.curr_lv)
          {
            this.mark.getComponent(Sprite).spriteFrame=this.normal_sprite;
          }
          else this.mark.getComponent(Sprite).spriteFrame=this.passed_sprite;
          this.getComponentInChildren(Label).color=Color.BLACK;
      }
     
      else {
        this.getComponentInChildren(Label).color=Color.WHITE;
        this.getComponent(Sprite).spriteFrame=this.lock_sprite;
        this.mark.getComponent(Sprite).spriteFrame=null;
      }
         
    }

    update(deltaTime: number) {
      this.set_sprite();
    }
}

