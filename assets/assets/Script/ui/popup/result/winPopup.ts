import { _decorator, Component, director, Label, log, native, Node } from 'cc';
import { UIManager } from '../../../Common/UIManager';
import { Constants, EventName } from '../../../Data/Constants';
import { MapManager } from '../../../Common/MapManager';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { AudioManager } from '../../../Common/SoundManager';
import { RewardManager } from '../reward/RewardManager';
const { ccclass, property } = _decorator;

export const dataConfig: Map<number, any> = new Map([]);

dataConfig.set(4,{
    index: 0,
    nameW: "Rifle1"
})

dataConfig.set(10,{
    index: 0,
    nameW: "Rifle1"
})

dataConfig.set(30,{
    index: 1,
    nameW: "Rifle2"
})

dataConfig.set(39,{
    index: 2,
    nameW: "Shotgun"
})
@ccclass('winPopup')
export class winPopup extends Component {
    @property(Label)
    scoreLb: Label = null;

    @property(Label)
    earnedLb: Label = null;

    @property(Label)
    levelLb: Label = null;

    @property(RewardManager)
    rewardNode: RewardManager = null;

    private raiseReward: boolean;

    protected onLoad(): void {
        AudioManager.instance.playSound("win");
        Data_manager.instance.increase_data_money(100);
        this.scoreLb.string = `Score: 100`;
        this.levelLb.string = `Level ${Data_manager.instance.curr_lv}`;
    }

    protected start(): void {
        const currLevel = Data_manager.instance.get_data_lv();
        if(dataConfig.has(currLevel)){
            this.raiseReward = true;
        }

        if(Data_manager.instance.isFirstPlayer){
            Data_manager.instance.isFirstPlayer = false;
        }

    }

    onClickNextLevelBtn(){
        const currLevel = Data_manager.instance.get_data_lv();
        if(dataConfig.has(currLevel)){
            this.raiseReward = true;
        }
        //UIManager.instance.hidePrefabNode(Constants.Popup.WIN);
        if(this.raiseReward){
            let getData = dataConfig.get(currLevel);
            this.rewardNode.node.active = true;
            this.rewardNode.createUI(getData.index,getData.nameW);
        } else {
            // if (currLevel > 1) {
               
            // } else {
            //     director.loadScene("SceneOpponent");
            // }
            try {
                native.reflection.callStaticMethod("com/cocos/game/AdsGgActivity", "interstitial", "()V");
            } catch (error) {
                console.log("error interstitial", JSON.stringify(error));
                director.loadScene("SceneOpponent");
            }
        }
        let currentLevel = Data_manager.instance.get_data_lv();
        Data_manager.instance.up_data_max_lv(currentLevel);
        currentLevel += 1;
        Data_manager.instance.set_data_lv(currentLevel);
    }

    onClickReturnBtn(){
        //UIManager.instance.hidePrefabNode(Constants.Popup.WIN);
        director.loadScene(Constants.UIPage.MAP_UI);
        var currentLevel = Data_manager.instance.get_data_lv();
        Data_manager.instance.up_data_max_lv(currentLevel);
    }

    onClickWatchAds()
    {
        this.rewardNode.showAdLoading();
        this.rewardNode.agree();
    }

    onClickNext()
    {
        this.rewardNode.hide();
    }

    public static moveScreen() {
        console.log("moveScreen");
        director.loadScene("SceneOpponent");
    }
}

window.winPopup = winPopup;

