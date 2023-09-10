import { _decorator, AudioSource, Camera, Canvas, Component, Constraint, Node, log, UI, director, Label, find} from 'cc';
import { UIManager } from '../Common/UIManager';
import { Constants } from '../Data/Constants';
import { Data_manager } from '../MapMenu/Data_manager';
import { Ui_manager } from '../MapMenu/Ui_manager';
import { AudioManager } from '../Common/SoundManager';

const { ccclass, property } = _decorator;

@ccclass('startUI')
export class startUI extends Component {

    @property(Label)
    moneyLb: Label  = null;

    protected onLoad(): void {
        if(!AudioManager.instance.isBGMPlaying()){
            AudioManager.instance.playMusic();
          }
        Data_manager.instance.set_up_data();
        this.moneyLb.string = Data_manager.instance.get_data_money()+'';
    }

    onClickSettingPopupButton(){
        //UIManager.Instance.onClickSettingButton();
        find("Canvas").getChildByName("settingPopup").active = true;
    }

    onClickRankPopupButton(){
        director.loadScene("sceneRanking");
        //UIManager.instance.loadPrefabNode(Constants.Popup.RANKING);
    }

    onClickStartBtn(){
        director.loadScene("MapMenunew");
    }

    onClickShopPopupBtn(){
        find("Canvas").getChildByName("shopPopup").active = true;
    }
}

