import { _decorator, Component, debug, director, game, Game, instantiate, log, Node, Prefab, Scene, sys } from 'cc';
import { test_enemy } from './test_enemy';
import { AudioManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Data_manager')
export class Data_manager extends Component {

   public static  instance:Data_manager;
  

   //data_menu_ondevice
   @property({type:Number})   
   public curr_lv:number;
   
   @property({type:Number})   
   public max_lv:number=1;



   @property({type:Number})   
   public Money:number;
   //data_gameplay
      @property({type:Prefab})  
      public list_enemy:Prefab[]=[];
      @property({type:Number})  
      public index_enemy:number;

    
      @property({type:Number})  
      public index_map:number;
      
      @property({type:Prefab})
      all_map:Prefab[]=[]; 
       
      @property({type:Number})  
      public index_weapon:number;

      @property({type:Boolean})  
       isBuy:boolean[]=[];
       
       @property({type:Number})  
       listprice:number[]=[0,1000,2000,3000];


       private startTimeToPlay: number ;

       public isFirstPlayer: boolean;

       public levelingReward : {
        level16: boolean;
        level27: boolean;
        level35: boolean;
       };
    
    public set_data_lv(lv:number)
    {
      sys.localStorage.setItem("lv",lv.toString());
     
      this.curr_lv=parseInt (sys.localStorage.getItem("lv"));
       
      


    }

    public get_data_lv():number
    {   
      this.curr_lv=parseInt (sys.localStorage.getItem("lv"));
      return this.curr_lv;
    }




    public set_data_max_lv()
    {
    //   // sys.localStorage.setItem("max_lv",this.get_data_lv().toString());
       
      
    //   if(this.get_data_lv()>=parseInt(sys.localStorage.getItem("max_lv")))
    // // if(this.get_data_lv()>=this.max_lv)
    //   {
       
    //   sys.localStorage.setItem("max_lv",this.get_data_lv().toString());
    //   this.max_lv=parseInt( sys.localStorage.getItem("max_lv"));



    //  // this.max_lv=this.get_data_lv();
        
     
    //   }
    }

    public up_data_max_lv(curr_button_lv:number)
    {
     
      if(curr_button_lv>=this.max_lv)
       this.max_lv=(curr_button_lv+1);
       sys.localStorage.setItem("max_lv",this.max_lv.toString());
      
    
      this.max_lv=parseInt( sys.localStorage.getItem("max_lv"));
    }

    
   

   

    public Get_data_max_lv():number
    {
      return this.max_lv;
    }



   //func money
   public increase_data_money(money:number)
    {
     
      this.Money+=money;
     
        sys.localStorage.setItem("money",this.Money.toString());
     
       this.Money=parseInt (sys.localStorage.getItem("money"));

    }

    public decrease_data_money(money:number)
    {
     
      this.Money-=money;
     
        sys.localStorage.setItem("money",this.Money.toString());
     
       this.Money=parseInt (sys.localStorage.getItem("money"));

    }
    




    public get_data_money():number
    {
     
        return this.Money;
    }


//func enemy

public set_data_enemy(index:number)
{
  this.index_enemy=index;
 
 

}

public get_data_enemy():number
{
    return this.index_enemy;
}



public setenemy():Node
{

let  a= instantiate (this.list_enemy[this.index_enemy]);

return a;

    
}

//shop
public SetBuyWeapon(indexwp:number)
{
  sys.localStorage.setItem("shop"+indexwp,"1");
  this.isBuy[indexwp]=true;
}

public GetBuyWeapon(indexwp:number):boolean
{
  return  this.isBuy[indexwp];
}

//inven
public SetEquipWeapon(index:number)
{
  sys.localStorage.setItem("inventory",index.toString())
  this.index_weapon=index;
}

public getEquipWeapon():number
{
  var a= sys.localStorage.getItem("inventory");
  this.index_weapon=parseInt(a);
  return parseInt(a);
}



    public set_up_data()
    {
    
      if(sys.localStorage.getItem("lv")!=null) this.curr_lv=parseInt (sys.localStorage.getItem("lv"));
      else this.curr_lv=1;

      // if(sys.localStorage.getItem("max_lv")!=null) this.max_lv=parseInt (sys.localStorage.getItem("max_lv"));
      // else this.max_lv=0;

      if(sys.localStorage.getItem("money")!=null) this.Money=parseInt (sys.localStorage.getItem("money"));
      else this.Money=0;
      
      if( sys.localStorage.getItem("inventory")==null) this.index_weapon=0;

    this.setupBuy();
      
    
      
    }

    public setupBuy()
    {

      this.isBuy[0]=true;

      for(let i=1;i<this.isBuy.length;i++)
      { 
       
        var a=sys.localStorage.getItem("shop"+i);
        if(a=="1")
        this.isBuy[i]=true;
        else 
        this.isBuy[i]=false;
      }
    }


  start() {
    Data_manager.instance = this;

    director.addPersistRootNode(this.node);
    if(sys.localStorage.getItem("max_lv")!=null) this.max_lv=parseInt (sys.localStorage.getItem("max_lv"));
    else this.max_lv=1;


    if (!sys.localStorage.getItem("StartPlay")){
      let timeStamp = new Date().getTime();
      this.startTimeToPlay = timeStamp;
      this.isFirstPlayer = true;
      sys.localStorage.setItem("StartPlay", this.startTimeToPlay.toString());

      this.levelingReward = {
        level16: false,
        level27: false,
        level35: false,
      }
      sys.localStorage.setItem("LevelingReward",JSON.stringify(this.levelingReward));
    }else{
      this.isFirstPlayer = false;
      this.levelingReward = JSON.parse(sys.localStorage.getItem("LevelingReward"));
    }

    this.setupBuy();
  }

  public getStartTimeToPlay(){
    return this.startTimeToPlay;
  }

  public getCounterDays() : number
  {
    let currentTime = new Date();
    let lastTime = new Date(parseInt(sys.localStorage.getItem("StartPlay")));
    
    return currentTime.getDate() - lastTime.getDate();
  }

  public resetStartPlay(){
    this.startTimeToPlay = new Date().getTime();
    sys.localStorage.setItem("StartPlay", this.startTimeToPlay.toString());
  }

  public isCanRaisePromote(){
    let timeLeft = Math.floor(game.totalTime / 60000);
    let hourCondition = (timeLeft == 30) || (timeLeft == 60) || (timeLeft == 90);
    let levelCondition = (this.max_lv == 16 && !this.levelingReward.level16) || (this.max_lv == 27 && !this.levelingReward.level27) || (this.max_lv == 35 && !this.levelingReward.level35);
    return hourCondition || levelCondition || (this.getCounterDays() >= 259200);
  }


}

