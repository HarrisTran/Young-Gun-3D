import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rank_user')
export class Rank_user extends Component {


    @property({type:Sprite})
    avatar:Sprite
    @property({type:String})
    name_user:string;
    @property({type:Number})
    score_user:number;
    @property({type:Number})
    number_ranking_user:number;


     @property({type:Label})
     text_name:Label;
     @property({type:Label})
     text_score:Label;
     @property({type:Label})
     text_rank:Label;

     @property({type:Sprite})
     sprite_rank:Sprite;


    start() {
   
    }

    public set_data(ava:SpriteFrame,name:string,score:number,rank:number,sprite_rank:SpriteFrame)
    {
      this.avatar.spriteFrame=ava;
      this.name_user=name;
      this.score_user=score;
      this.number_ranking_user=rank;

      this.text_name.string=this.name_user;


      if(rank<=3)
      {
        this.sprite_rank.spriteFrame=sprite_rank;
        this.sprite_rank.node.active=true;
          this.text_rank.node.active=false;
      }
      else
      {
   //  this.text_score.string=this.score_user.toString();
   this.text_rank.node.active=true;
     this.text_rank.string=this.number_ranking_user.toString();
       this.sprite_rank.node.active=false;
      }

      this.text_score.string=this.score_user.toString();


    }
}

