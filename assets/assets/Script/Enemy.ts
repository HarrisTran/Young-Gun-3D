import { _decorator, Component, animation, Animation} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('Enemy')
export default class Enemy extends Component {

    @property(Animation)
    bloodBurstAnimation : Animation = null;

    @property({type: animation.AnimationController})
    private animCtrl: animation.AnimationController = null;

    protected onLoad(): void {
        //this.animCtrl = this.node.getComponent(animation.AnimationController);
    }

    hit(){
        this.scheduleOnce(()=>{
            this.bloodBurstAnimation.play("blood_burst");
            this.animCtrl.setValue("isHit",true);
        },0.7)
    }
    
}

