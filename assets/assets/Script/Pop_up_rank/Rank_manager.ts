import { _decorator, Component, debug, instantiate, Node, Prefab, random, randomRange, Sprite, SpriteFrame, UITransform, Vec2 } from 'cc';
import { Rank_user } from './Rank_user';
const { ccclass, property } = _decorator;

@ccclass('Rank_manager')
export class Rank_manager extends Component {
    

    @property({type:Prefab})
    prefabs_user:Prefab;
    @property({type:Node})
    view:Node;


    @property({type:Number})
    number_user:number;

    @property({type:Node})
    list_user:Node[]=[];
    
    @property({type:String})
    list_name:string[]=[];

    @property({type:SpriteFrame})
    list_avatar:SpriteFrame[]=[];

    @property({type:Number})
    list_score:number[]=[];


    @property({type:Node})
    scroll_view:Node;



    @property({type:Node})
    panel_ranking:Node;


    @property({type:SpriteFrame})
    list_sprite_rank:SpriteFrame[]=[];


    protected onLoad(): void {
        this.set_up();
    }

    start() {


      

    }

    public set_up()
    { let numb=0;
      for(let i=0;i<this.number_user;i++)
      {
            let a=randomRange(0,this.list_avatar.length);
            let b=randomRange(0,this.list_name.length);
            let c=randomRange(0,this.list_score.length);

            let a1=this.list_avatar[ parseInt(a.toString())];
            let b1=this.list_name[ parseInt(b.toString())];
           // let c1=this.list_score[ parseInt(c.toString())];


            let c1=(10000-i*100);


            let a2=this.list_avatar[i];
            let b2=this.list_name[i];
            let c2=this.list_score[i];
            
           if(i<=3)
           { 
             numb=i;
           }
           else numb=4;
          

          // let d=  this.list_user[i].getComponent(Rank_user).set_data(a,b,c,(i+1));

           let d=   instantiate(this.prefabs_user);
          // d.getComponent(Rank_user).set_data(a2,b2,c2,(i+1));

          d.getComponent(Rank_user).set_data(a1,b1,c1,(i+1),this.list_sprite_rank[numb]);
           d.setParent(this.view);

           this.scroll_view.getComponent(UITransform).setContentSize(this.scroll_view.getComponent(UITransform).contentSize.x,this.scroll_view.getComponent(UITransform).contentSize.y+135);
           
           this.list_user.push(d);

      }
    }



    public onclick_open_panel_ranking()
    {
     this.panel_ranking.active=true;
    }

    public onclick_close_panel_ranking()
    {
        this.panel_ranking.active=false;
    }

}

