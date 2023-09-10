import { _decorator, Component, director, find, instantiate, native, Node, Prefab, randomRange, sys, tween, v3 } from 'cc';
import { Button_level } from './Button_level';
import { Data_manager } from './Data_manager';
import { inventoryPopup } from '../ui/popup/inventory/inventoryPopup';
import { shopPopup } from '../ui/popup/shop/shopPopup';
import { AudioManager } from '../Common/SoundManager';
//import { ListDirection } from '../../../extensions/plugin-import-2x/static/migrate-resources/default-assets-2d/scripts/studio-component';
const { ccclass, property } = _decorator;


@ccclass('Mapmenu')


export class Mapmenu extends Component {

    public static instance: Mapmenu

    @property({ type: Number })
    Number_map: number
    @property({ type: Number })
    curr_lv: number
    @property({ type: Prefab })
    Button_map: Prefab;
    @property({ type: Node })
    holder_button_map: Node;


    @property({ type: Number })
    Max_x: number;
    @property({ type: Number })
    Min_x: number;


    @property({ type: Number })
    Lv_choose: number;


    @property({ type: Number })
    speed: number;
    @property({ type: Number })
    speed_per_dif: number;
    @property({ type: Number })
    lv_per_dif: number;
    @property({ type: Number })
    all_dif: number;




    @property({ type: Number })
    test_numb: number;

    //button position
    @property({ type: Number })
    number_x: number;
    @property({ type: Number })
    value_per_dis_x: number;
    @property({ type: Number })
    sign_x: number;
    @property({ type: Number })
    value_x: number;

    //enemy
    @property({ type: Number })
    value_enemy_per_level: number;

    @property({ type: Number })
    index_enemy_choose: number;


    // list_map
    @property({ type: Node })
    list_map: Node[] = [];
    @property({ type: Number })
    index_map: number;

    @property({ type: Number })
    index_screen_map: number;

    @property({type:inventoryPopup})
    inventory :inventoryPopup;
    @property({type:shopPopup})
    shop:shopPopup;

    @property(Node)
    rewardCoin: Node = null;

    protected onLoad(): void {
        if(!AudioManager.instance.isBGMPlaying()){
            AudioManager.instance.playMusic();
        }
        //AudioManager.instance.playMusic("Heroic Song");
    }

    start() {
        // Data_manager.instance.isCanRaisePromote();
        Mapmenu.instance = this;
        // this.create_map();
        this.value_enemy_per_level = 2;
        // this.create_map2();
        this.index_map = 0;
        Data_manager.instance.set_up_data();
        this.test_numb = Data_manager.instance.get_data_lv();

        if(Data_manager.instance.isCanRaisePromote()){
            this.rewardCoin.active = true;
            this.rewardCoin.getChildByName("AdLoading").active = false;
            tween(this.rewardCoin)
            .to(0,{scale: v3(0.5,0.5,1)})
            .to(0.75, {scale: v3(1,1,1)},{easing: "bounceOut"})
            .start();
        }else{
            this.rewardCoin.active = false;
        }
    }

    onClickHideReward(){
        this.rewardCoin.active = false;
    }

    //cocos call native
    onClickClaimReward(){
        this.rewardCoin.getChildByName("AdLoading").active = true;
        try {
            native.reflection.callStaticMethod("com/cocos/game/AdsGgActivity", "reward", "()V");
        } catch (error) {
            let adLoadingNode = this.rewardCoin.getChildByName('AdLoading');
            adLoadingNode.getChildByName("frame").active = true;
        }
    }

    exitFrameAdLoading() {
        
    }

    public create_map() {
        for (let i = 1; i <= this.Number_map; i++) {
            let ran_x = randomRange(this.Min_x, this.Max_x);
            let a = instantiate(this.Button_map)
            a.getComponent(Button_level).set_lv(i);
            a.setParent(this.holder_button_map);
            a.setPosition(ran_x, a.position.y)
        }
    }
    
    //native call response
    public static onReward(isError = false) {
        if (isError) {
            console.log("Reward error");
            //this.instance.rewardCoin.active = false;
            let adLoadingNode = this.instance.rewardCoin.getChildByName('AdLoading');
            adLoadingNode.getChildByName("frame").active = true;
            return;
        }
        this.instance.rewardCoin.active = false;
        Data_manager.instance.increase_data_money(50);
        if(Data_manager.instance.getCounterDays() >= 3){
            Data_manager.instance.resetStartPlay();
        }else{
            let maxLevel = Data_manager.instance.Get_data_max_lv();
            if(maxLevel == 16){
                Data_manager.instance.levelingReward.level16 = true;
            }
            else if(maxLevel == 27){
                Data_manager.instance.levelingReward.level27 = true;
            }
            else if(maxLevel == 35){
                Data_manager.instance.levelingReward.level35 = true;
            }
        }
    }

    public create_map2() {
        for (let i = 1; i <= this.Number_map; i++) {
            if (i % this.number_x == 0) this.sign_x *= -1;
            this.value_x += this.sign_x * (this.value_per_dis_x)
            let a = instantiate(this.Button_map)
            a.getComponent(Button_level).set_lv(i);
            a.setParent(this.holder_button_map);
            a.setPosition(this.value_x, a.position.y)
            a.getComponent(Button_level).index_enemy_in_level = 1;
        }
    }


    public show_map() {
        for (let i = 0; i < this.list_map.length; i++) {
            if (i == this.index_map) {
                this.list_map[i].active = true;
            }
            else if (i != this.index_map) this.list_map[i].active = false;
        }
    }





    public next_index() {
        if (this.index_map < (this.list_map.length - 1))
            this.index_map++;
            this.show_map();
    }

    public back_index() {
        if (this.index_map > 0)
            this.index_map--;
            this.show_map();
    }


    public set_pick_map(lv: number) {
        Mapmenu.instance.Lv_choose = lv;
        sys.localStorage.setItem("LV", this.Lv_choose.toString());
    }


    public check_lv_per_stage() {
        this.all_dif = parseInt(((this.Lv_choose) / (this.lv_per_dif)).toString());
        this.speed = this.all_dif * this.speed_per_dif;
    }

    protected onEnable(): void {
        this.show_map();
        this.check_lv_per_stage();
        this.test_numb = Data_manager.instance.get_data_lv();
    }
    
    onClickSettingPopupBtn(){
        find("Canvas").getChildByName("settingPopup").active = true;
    }

    onClickShopPopupBtn(){
        find("Canvas").getChildByName("shopPopup").active = true;
        this.shop.setupall();
    }

    onClickInventoryPopupBtn(){
        find("Canvas").getChildByName("inventoryPopup").active = true;
        this.inventory.setupitem();
    }
}

window.Mapmenu = Mapmenu;

