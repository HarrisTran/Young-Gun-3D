import { Button, Component, Label, Node, Prefab, Sprite, System, _decorator, director, instantiate, log, repeat, sys, tween, v3} from 'cc';
import { SliderView} from '../Slider';
import { UIManager } from '../Common/UIManager';
import { countDownTimer } from '../timer/countDownTimer';
import { Data_manager } from '../MapMenu/Data_manager';
import { AudioManager } from '../Common/SoundManager';
import { BloodProgress } from '../BloodProgress';
const { ccclass, property } = _decorator;

@ccclass('playUI')
export class playUI extends Component {

    @property(Node)
    bgTutorial: Node = null;

    @property(Label)
    moneyLb: Label = null;

    @property(Label)
    levelLb: Label = null;

    @property(SliderView)
    sliderViewCpn: SliderView = null;

    protected onLoad(): void {
        this.unscheduleAllCallbacks();

        // setTimeout(() => {
        //     if(Data_manager.instance.get_data_lv()===1 && Data_manager.instance.Get_data_max_lv()===1){
        //         this.bgTutorial.active = true;
        //         tween(this.bgTutorial.getChildByName("Hand"))
        //         .sequence(
        //             tween(this.bgTutorial.getChildByName("Hand")).to(0.5,{scale: v3(0.7,0.7,1)}),
        //             tween(this.bgTutorial.getChildByName("Hand")).to(0.4,{scale: v3(1,1,1)}),
        //         )
        //         .repeat(100)
        //         .start();
        //     }else{
        //         this.bgTutorial.active = false;
        //     }
        // }, 4000);

        if(Data_manager.instance.isFirstPlayer){
            
            setTimeout(()=>{
                this.bgTutorial.active = true;
            },4000);
            tween(this.bgTutorial.getChildByName("Hand"))
            .delay(4)
            .sequence(
                tween(this.bgTutorial.getChildByName("Hand")).to(0.5,{scale: v3(0.7,0.7,1)}),
                tween(this.bgTutorial.getChildByName("Hand")).to(0.4,{scale: v3(1,1,1)}),
            )
            .repeat(100)
            .start();
        }else{
            this.bgTutorial.active = false;
        }

        
       // AudioManager.instance.stopMusic();
        AudioManager.instance.playFightingMusic();

        this.levelLb.string = `Level ${Data_manager.instance.curr_lv}`;
        this.moneyLb.string = Data_manager.instance.get_data_money().toString();
        this.sliderViewCpn.hide();
    }

    onQuitTutorial(){
        this.bgTutorial.active = false;
    }

    onClickSettingPopupButton(){
        UIManager.Instance.onClickSettingButton();
    }
}

