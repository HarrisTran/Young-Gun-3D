import { _decorator, AnimationClip, Component, Label, log, Node, Sprite, SpriteAtlas, SpriteFrame } from 'cc';
import { ItemRow } from './rankingPopup';
const { ccclass, property } = _decorator;

@ccclass('itemTemplate')
export class itemTemplate extends Component {

    @property(Sprite)
    orderSp: Sprite = null;

    @property(Label)
    orderLb: Label = null;

    @property(Label)
    nameLb: Label = null;

    @property(Label)
    moneyLb: Label = null;

    initData(item: ItemRow, order: number){
        
        this.nameLb.string = item.name;
        this.moneyLb.string = item.money.toString();

    }


}

