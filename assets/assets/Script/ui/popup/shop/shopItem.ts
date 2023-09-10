import { _decorator, Button, CCBoolean, CCInteger, Component, Label, log, Node, Sprite, SpriteFrame, sys } from 'cc';
import { itemData } from './itemData';
import { Data_manager } from '../../../MapMenu/Data_manager';
const { ccclass, property } = _decorator;


@ccclass('shopItem')
export class shopItem extends Component {

    @property(Sprite)
    weaponSprite : Sprite = null;

    @property(CCInteger)
    price : number;
    @property({type:CCBoolean})
    isBuy:boolean=false;

    itemName: string ;
    
    @property({type:Node})
    But:Node;
    @property(CCInteger)
    index : number;
   

    protected start(): void {
      //  this.getComponentInChildren(Button).node.on(Button.EventType.CLICK,this.onClickBuyItem,this);
      //  this.But=this.getComponentInChildren(Button).node;
        // Data_manager.instance.GetBuyWeapon(this.itemName);
        
    }


    init(data: itemData,price:number){
        this.weaponSprite.spriteFrame = data.iconSF;
        this.node.getChildByName("priceBtn").getComponentInChildren(Label).string = `${data.itemPrice}`;
        this.itemName = data.itemName;
        this.price=price;
        
        this.isBuy=Data_manager.instance.GetBuyWeapon(this.index);
        this.setup();
    }


    public setup()
    { 
        this.isBuy=Data_manager.instance.GetBuyWeapon(this.index);
        if(this.isBuy==true)
        {
            this.But.active=false;
        }
    }
    onClickBuyItem() {
        //EventManager.emitEvent(Constants.EventName.BUY_ITEM,this.itemName);
        this.isBuy=Data_manager.instance.GetBuyWeapon(this.index);

        if(Data_manager.instance.Money>=this.price)
        {

        if(this.isBuy==false)
        {
             Data_manager.instance.decrease_data_money(this.price);
             Data_manager.instance.SetBuyWeapon(this.index);
             this.isBuy=true;
             this.But.active=false;
        }
        else
        {
            this.But.active=false;

        }
    }
    }

}

