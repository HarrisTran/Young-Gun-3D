import { _decorator, Component, director, Label, log, native, Node, Sprite, SpriteFrame } from 'cc';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { dataConfig } from '../result/winPopup';
import { Constants } from '../../../Data/Constants';
import { UIManager } from '../../../Common/UIManager';
import { LoadingAdHelper } from '../../../MediaAdvertise/LoadingAdHelper';
const { ccclass, property } = _decorator;


@ccclass('RewardManager')
export class RewardManager extends Component {

    @property([SpriteFrame])
    listWeapon: SpriteFrame[] = [];

    @property(Sprite)
    weaponSprite: Sprite = null;

    @property(Label)
    nameWeapon: Label = null;

    @property(LoadingAdHelper)
    adLoading: LoadingAdHelper = null;

    public static instance : RewardManager;

    private chosenIndex: number = 0;

    protected start(): void {
        RewardManager.instance = this;
    }

    createUI(index: number, nameW: string){
        this.chosenIndex = index;
        this.weaponSprite.spriteFrame  = this.listWeapon[index];
        this.nameWeapon.string =`You have a chance to have a free trial with ${nameW}.\nDo you want to go for it?`;
    }

    hide(){
        director.loadScene("SceneOpponent");
    }

    getNewWeapon(){
        Data_manager.instance.SetEquipWeapon(Math.min(this.chosenIndex+1,3));
    }

    agree() {
        this.adLoading.node.active = true;
        try {
            native.reflection.callStaticMethod("com/cocos/game/AdsGgActivity", "interstitial", "()V");
        } catch (error) {
            console.log("error interstitial", JSON.stringify(error));
            this.adLoading.node.getChildByName("frame").active = true;
            //director.loadScene("SceneOpponent");
        }
    }

    public showAdLoading(){
        this.adLoading.node.active = true;
    }

    public static onWeaponReward(isError = false) {
        if (isError) {
            this.instance.adLoading.node.getChildByName("frame").active = true;
            return;
        }
        this.instance.node.active = false;
        Data_manager.instance.SetEquipWeapon(Math.min(this.instance.chosenIndex + 1, 3));
        director.loadScene("SceneOpponent");
    }
}

window.RewardManager = RewardManager;

