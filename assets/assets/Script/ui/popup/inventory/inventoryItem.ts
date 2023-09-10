import { _decorator, Color, color, Component, Node, Sprite, SpriteFrame } from 'cc';
import { Constants } from '../../../Data/Constants';
import { Data_manager } from '../../../MapMenu/Data_manager';
import { shopPopup } from '../shop/shopPopup';
const { ccclass, property } = _decorator;

@ccclass('inventoryItem')
export class inventoryItem extends Component {
    @property(Sprite)
    imgSprite: Sprite = null;

    itemName : string;
    @property({type:Number})
    Index:number;

    

    init(itemName: string, itemSpriteFrame: SpriteFrame){
        this.itemName = itemName;
        this.imgSprite.spriteFrame = itemSpriteFrame;
        this.setup();
    }


    protected start(): void {
       // this.setup();
    }

    public setup()
    {
        for(let i=0;i<Data_manager.instance.isBuy.length;i++)
        {
            if(i==this.Index)
            {
                if(Data_manager.instance.isBuy[this.Index]==true)
                {
                this.imgSprite.color=Color.WHITE;
                }
                else
              { this.imgSprite.color=Color.BLACK;
              }
               
            }
        }
    }

    onClickChooseWeapon(){
        //EventManager.emitEvent(Constants.EventName.REPLACE_CURRENT_WEAPON,this.itemName);

        if(Data_manager.instance.isBuy[this.Index]==true)
        {
          Data_manager.instance.SetEquipWeapon(this.Index);
        }
    }
}

