import { _decorator, Component, director, instantiate, log, native, Node, Prefab, randomRange, Scene, ScrollView, Sprite, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { Loadingscene } from '../Loading_Scene/Loadingscene';
import { DataLoadingScene } from '../Loading_Scene/DataLoadingScene';
import { Data_manager } from '../MapMenu/Data_manager';
import { Data_map_manager } from '../MapMenu/Data_map_manager';
import { AudioManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('OpponentSlotMachine')
export class OpponentSlotMachine extends Component {
    

   
    @property({type:Node})
    ParentAva:Node;

    @property({type:Prefab})
    Pre:Prefab;
    
    @property({type:SpriteFrame})
    ListAva:SpriteFrame[]=[];
   
    @property({type:Number})
    NumberAva:number;

    @property({type:Number})
    dis:number;
    
    @property({type:ScrollView})
    scro:ScrollView;
    
    @property({type:Node})
    ListNode:Node[]=[];
    @property({type:Number})
    numb:number;
    @property({type:Number})
    time:number;

    @property({type:Number})
   numbcal: number;
   
   @property(Node)
   adNode: Node;


    public static instance:OpponentSlotMachine;
     

    start() {
        OpponentSlotMachine.instance=this;
       
        this.scrollto();
      
    //    this.cal();
    //     this.scro.scrollTo( new Vec2(0,this.numbcal),this.time);
    }

     public setava()
     {
        for(let i=0;i<this.NumberAva;i++)
        {   let ran=randomRange(0,this.ListAva.length-1);
           let a=instantiate(this.Pre);
           a.position=Vec3.ZERO;
        
            if(i<this.NumberAva)
            {
            a.getComponent(Sprite).spriteFrame=this.ListAva[Math.round(ran)];
            }
            // else if(i==this.NumberAva-1)
            // {
            //    a.getComponent(Sprite).spriteFrame=Data_map_manager.instance.list_sprite[Data_manager.instance.index_enemy];
            // }
            a.setParent(this.ParentAva);
            this.ListNode.push(a);
            this.ParentAva.getComponent(UITransform).setContentSize(this.ParentAva.getComponent(UITransform).contentSize.x,
            this.ParentAva.getComponent(UITransform).contentSize.y+this.dis);
           
            
        }
        // this.cal();
        // this.scro.scrollTo( new Vec2(0,this.numbcal),this.time);
   }
   
   public setAdsBanner() {
      console.log('result ads banner begin', "com/cocos/game/AdsGgActivity", "bannerads", "(Ljava/lang/String;)Ljava/lang/Strin", "banner");
      
      try {
         const result = native.reflection.callStaticMethod("com/cocos/game/AdsGgActivity", "bannerads", "(I)I", 3);
      } catch (error) {
         log(error);
      }
      
   }


     public scrollto()
     {
        AudioManager.instance.playSound("CasinoGambling");
        this.cal();
        this.scro.scrollTo( new Vec2(0,this.numbcal),this.time);
     }


     public scrollToTop()
     {
        this.scro.scrollToTop(0);
     }

     public cal()
     {
        this.numbcal=1-((this.dis*(this.numb))/(this.ParentAva.getComponent(UITransform).contentSize.y));
   
     }


    public loadScreenGame() {
       
     //let a=new Loadingscene();
     // a.index_scene=2;
      //a.load_scene(2);

      DataLoadingScene.Instance.IndexScene=2;
      director.loadScene('Loading');
    }
}