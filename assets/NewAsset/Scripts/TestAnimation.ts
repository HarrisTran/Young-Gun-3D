import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestAnimation')
export class TestAnimation extends Component {

    @property({type:SkeletalAnimation})
     ani:SkeletalAnimation;
    start() {
        this.ani=this.getComponent(SkeletalAnimation);

       this.ani.play(this.ani.clips[1].name.toString())

       this.scheduleOnce(this.playclip,5);


    } 


    

    public playclip()
    {
         this.ani.play(this.ani.clips[0].name.toString());
    }
}

