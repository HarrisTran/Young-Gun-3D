import { _decorator, CCString, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('itemData')
export class itemData{
    @property
   id = 0;

   @property
   itemPrice = 0;

   @property(SpriteFrame)
   iconSF : SpriteFrame = null;

   @property(CCString)
   itemName = ""
}

