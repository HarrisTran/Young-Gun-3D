import { _decorator, Animation, animation, AudioSource, CCInteger, Component, Node, ProgressBar } from 'cc';
import Bullet from '../../../assets/Script/Bullet';
import { BloodProgress } from '../../../assets/Script/BloodProgress';
import { AudioManager } from '../../../assets/Script/Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyAnima')
export class EnemyAnima extends Component {

    @property(BloodProgress)
    bloodProgress: BloodProgress = null;


    @property(Animation)
    bloodAnim: Animation;

    @property(Bullet)
    bulletNode: Bullet = null;

    @property({ type: animation.AnimationController })
    anima: animation.AnimationController;

    @property({ type: CCInteger })
    public Hp: number = 3;

    public Isdie: boolean;

    //public slotShooting = 3;

    @property({ type: CCInteger })
    index: number;

    start() {
        this.bloodAnim.node.active = false;
        this.anima = this.getComponent(animation.AnimationController);
        this.Hp = 3;
        this.bloodProgress.updateProgress(this.Hp);
        //this.slotShooting = 3;
    }

    // public controller()
    // {
    //       switch(this.index)
    //       {
    //         case 1:{this.anima.setValue("IHit",true);break};
    //         case 2:{this.anima.setValue("IDie",true);break};
    //         case 3:{ this.anima.setValue("IHit",false); break;}
    //       }
    // }

    public fire() {
        if (!this.Isdie) {
            
            this.Hp -= 1;
            if (this.Hp == 0) {
                this.anima.setValue("IHitTrigger", false);
                this.bloodAnim.node.active = false;
            }
            else {
                this.anima.setValue("IHitTrigger", true);
                this.bloodAnim.node.active = true;
                this.bloodAnim.play();
            }

            this.bloodProgress.updateProgress(this.Hp);
        }
        
    }

    public Check() {
        if (!this.Isdie) {
            if (this.Hp <= 0) {
                AudioManager.instance.stopMusic();
                this.bloodProgress.node.active = false;
                this.bulletNode.playSlowmotionScene();
                setTimeout(()=>AudioManager.instance.playSound("lastShoot"),3000);
                this.Isdie = true;
            }
        }
    }

    update(deltaTime: number) {
        // this.controller();
        this.Check();
    }
}

