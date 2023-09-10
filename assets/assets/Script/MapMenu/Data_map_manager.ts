import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Data_map_manager')
export class Data_map_manager extends Component {
      public static instance:Data_map_manager;

    @property({type:SpriteFrame})
   public list_sprite:SpriteFrame[]=[];
    
   @property({type:SpriteFrame})
   public list_enemy:SpriteFrame[]=[];
  

    start() {
      Data_map_manager.instance=this;
    }

}

