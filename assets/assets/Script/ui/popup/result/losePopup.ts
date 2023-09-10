import { _decorator, Component, director, Label, Node } from 'cc';
import { UIManager } from '../../../Common/UIManager';
import { Constants } from '../../../Data/Constants';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { AudioManager } from '../../../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('losePopup')
export class losePopup extends Component {
    @property(Label)
    scoreLb: Label = null;

    @property(Label)
    earnedLb: Label = null;

    @property(Label)
    levelLb: Label = null;

    protected onLoad(): void {
        
        //AudioManager.instance.Bgm2.stop();
        this.scoreLb.string = `Score: 0`;
        this.levelLb.string = `Level ${Data_manager.instance.curr_lv}`;
    }

    onClickReplayBtn(){
        //UIManager.instance.hidePrefabNode(Constants.Popup.LOSE);
        director.loadScene(Constants.UIPage.PLAY_UI);
    }

    onClickReturnBtn(){
        //UIManager.instance.hidePrefabNode(Constants.Popup.LOSE);
        director.loadScene(Constants.UIPage.MAP_UI);
    }

}

