import { _decorator, Component, instantiate, log, Node, Prefab, SpriteFrame } from 'cc';
import { UIManager } from '../../../Common/UIManager';
import { Constants } from '../../../Data/Constants';
import { itemTemplate } from './itemTemplate';
const { ccclass, property } = _decorator;

@ccclass('rankingPopup')
export class rankingPopup extends Component {

    @property(Node)
    content: Node = null;

    @property(Prefab)
    itemTemplate: Prefab = null;

    @property([SpriteFrame])
    medalList : SpriteFrame[] = [];

    readonly data: ItemRow[] = [
        {
            name: 'victor_provip123',
            money: 2000
        },
        {
            name: 'mini_young',
            money: 2000
        },
        {
            name: 'susu777',
            money: 2002
        },
        {
            name: 'metroTower',
            money: 2000
        },
        {
            name: 'logitech55_xxx',
            money: 2003
        },
    ]

    protected onLoad(): void {
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            let item = instantiate(this.itemTemplate).getComponent("itemTemplate") as itemTemplate;
            item.initData(element,i);
            
            this.content.addChild(instantiate(item.node));
        }
    }

    quitPopup(){
        UIManager.Instance.quitRankPopup();
    }
}

export interface ItemRow {
    name: string,
    money: number
}

