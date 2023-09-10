import { _decorator, Component, instantiate, Label, log, Node, Prefab, SpriteFrame } from 'cc';
import { itemData } from './itemData';
import { UIManager } from '../../../Common/UIManager';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { shopItem } from './shopItem';
import { inventoryPopup } from '../inventory/inventoryPopup';
const { ccclass, property } = _decorator;


@ccclass('shopPopup')
export class shopPopup extends Component {

    @property(Node)
    content : Node = null;

    @property(Prefab)
    itemPrefab: Prefab = null;

    @property([itemData])
    items: itemData[] = [];


    @property({type:Node})
    listnode:Node[]=[];


    

    

    protected onLoad(): void {
        for(let i = 0; i < this.items.length; ++i){
            let item = instantiate(this.itemPrefab);
            (item.getComponent("shopItem") as shopItem).init(this.items[i],Data_manager.instance.listprice[i]);
            item.getComponent(shopItem).index=i;
            
            this.content.addChild(item);
            this.listnode.push(item);
        }
        Data_manager.instance.setupBuy();
    }

    public setupall()
    {
        for(let i = 0; i < this.items.length; ++i)
        {

           this.listnode[i].getComponent(shopItem).setup();
        }
    }

    quitPopup(){
        this.node.active = false;
    }
}

