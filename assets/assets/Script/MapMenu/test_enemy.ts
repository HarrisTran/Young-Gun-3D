import { _decorator, animation, AnimationComponent, Component, Mesh, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test_enemy')
export class test_enemy extends Component {
   @property({type:SpriteFrame})
   avatar_enemy:SpriteFrame;

   @property({type:Number})
   hp:number;
   @property({type:Boolean})
   is_die:boolean;
  
   @property({type:animation.AnimationController})
   public ani:animation.AnimationController;

   @property({type:Mesh})
   public mesh:Mesh;

    start() {
    // this.ani=this.getComponent(animation.AnimationController)
    // this.ani=this.getComponent(Animation);

    }
   
    public take_dmg()
    {
        this.ani=this.getComponent(animation.AnimationController);
        this.is_die=true;
        this.ani.setValue("Is_die",true);
        
       
    }
    
    public check_status()
    {
        if(this.hp<=0)
        {
              this.is_die=true;
        }
    }

    public SetSprite():SpriteFrame
    {
        return this.avatar_enemy;
    }


    public SetMesh():Mesh
    {
        return this.mesh;
    }

    update(deltaTime: number) {
        
     //   this.check_status();
    }
}

