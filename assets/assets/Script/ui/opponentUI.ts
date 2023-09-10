import { _decorator, Component, director, Node } from 'cc';
import { UIManager } from '../Common/UIManager';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('opponentUI')
export class opponentUI extends Component {

    onClickSettingPopupButton(){
        //UIManager.instance.loadPrefabNode(Constants.Popup.SETTING);
    }

    onClickQuitBtn(){
        director.loadScene(Constants.UIPage.MAP_UI);
    }

    onClickPlayBtn(){
        director.loadScene(Constants.UIPage.PLAY_UI);
    }

    
}
