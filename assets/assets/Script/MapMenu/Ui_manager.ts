import { _decorator, CCFloat, Component, director, easing, find, instantiate, Label, log, Node, Prefab, RichText, tween, Tween, Vec2, Vec3 } from 'cc';
import { Data_manager } from './Data_manager';
import { Mapmenu } from './Mapmenu';
import { OpponentSlotMachine } from '../Opponent_screen/OpponentSlotMachine';
import { UIManager } from '../Common/UIManager';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('Ui_manager')
export class Ui_manager extends Component {

    public static instance:Ui_manager;

    @property({type:Node})
    Panel_start_game:Node

    @property({type:Node})
    Panel_pick_map:Node
    
    //button
    @property({type:Node})
    button_start:Node


    @property({type:Node})
    panel_Opponent_screen:Node

    @property(Label)
    text_money_menu_map: Label
    
    @property({type:Node})
    button_start_pick_map:Node
  
    @property({type:Label})
    text_lv:Label
    
   
    
    @property({type:Node})
    panel_start_credit:Node

    @property({type:OpponentSlotMachine})
    SlotMachine:OpponentSlotMachine;
    

    @property({type:CCFloat})
    CurrTime:number;
    @property({type:CCFloat})
    DeltaTime:number;
    @property({type:CCFloat})
    MaxTimeOppoenetStart:number;


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    


    
    start() {
        Ui_manager.instance=this;
        // this.Panel_start_game.active=true;
        // this.Panel_pick_map.active=false;
        // let a=this.tween_button_scale(this.button_start,1,1);
        // this.button_start_pick_map.active=false;
        // a.start();
        this.SlotMachine.setava();
        this.SlotMachine.setAdsBanner();
       // this.SlotMachine.scrollto();
       
       
       this.text_lv.string="Level: "+Data_manager.instance.get_data_lv();
    }


    public onclick_hide_start_game()
    {
        this.Panel_start_game.active=false;
        this.Panel_pick_map.active=true;
    }


    public tween_button_scale(gameobj:Node,time:number,scale_ratio:number):Tween<Node>
    {
        let a= tween(gameobj).to(time,{scale:new Vec3(scale_ratio,scale_ratio,1)})
        let b= tween(gameobj).to(time,{scale:new Vec3(1.2,1.2,1)})
        let c= tween(gameobj).sequence(a,b).repeatForever();
       // .to(time,{scale:new Vec3(1,1)},{easing:'sineIn'});
        return c;
    }


    public onclick_quit_map()
    {
        this.Panel_start_game.active=true;
        this.Panel_pick_map.active=false;
    }


    public onclick_start_Opponent_screen()
    {
        director.loadScene("SceneOpponent");
      //  this.panel_Opponent_screen.active=true;
     //   this.SlotMachine.scrollto();
    }
    
    public onclick_quit_Opponent_screen	()
    {
        director.loadScene("MapMenunew");
      //  this.panel_Opponent_screen.active=false;
      //  this.SlotMachine.scrollToTop();
    }

    
    public onclick_button_start	()
    {
       
        this.button_start_pick_map.active=true;

        // director.loadScene("SceneOpponent");
    }

    public onclick_off_button_start	()
    {
       
       this.button_start_pick_map.active=false;
   //   director.loadScene("MapMenunew");
    }


    public onclick_button_credit	()
    {
       
        this.panel_start_credit.active=true;
    }

    public onclick_off_button_credit()
    {
       
        this.panel_start_credit.active=false;
    }

    public onclickStart()
    {
        director.loadScene("start");
    }


    public show_ui()
    {
        this.text_money_menu_map.string=Data_manager.instance.get_data_money().toString();
       // this.text_lv.string="Level: "+Mapmenu.instance.test_numb;
    }


    update(deltaTime: number) {
        this.show_ui();
    }

    onClickSettingPopup(){
        find("Canvas").getChildByName("settingPopup").active = true;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   

}

