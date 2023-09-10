import { _decorator, CircleCollider2D, Collider, Collider2D, Component, Contact2DType, director, ICollisionEvent, log, Node, Slider, tween, UIOpacity, UITransform, v3, Vec2, Vec3 } from 'cc';
import { EnemyAnima } from '../../NewAsset/Scripts/Enemy/EnemyAnima';
import { math } from 'cc';
import { Data_manager } from './MapMenu/Data_manager';
import { Mapmenu } from './MapMenu/Mapmenu';
import { BloodProgress } from './BloodProgress';
import { Weapon } from './Weapon/common/Weapon';
import { AudioManager } from './Common/SoundManager';
import { Util } from './Common/Util';
const { ccclass, property } = _decorator;

@ccclass('SliderView')
export class SliderView extends Component {

    @property(BloodProgress)
    Health: BloodProgress  = null;

    @property(UIOpacity)
    bgHit : UIOpacity = null;

    @property(EnemyAnima)
    enemyAnimation : EnemyAnima = null;

    @property(Weapon)
    weaponAnimation: Weapon = null;

    @property(Node)
    targetNode : Node = null;

    @property(Slider)
    slide: Slider = null;

    @property(Node)
    handler: Node = null;
    
    @property(Node)
    winPrefab: Node = null;

    @property(Node)
    losePrefab: Node = null;

    public isClick = false;

    private elapsedTime = 0;
    private elapsedTargetTime = 0;

    private triggleHandler = false;
    private triggleTarget = false;
    private _currentLevel: number = 0;
    private _barRange: number = 0;

    protected onLoad(): void {
        this.unscheduleAllCallbacks();
        this.slide.progress = math.random();
        this.targetNode.setPosition(this.slide.handle.node.getPosition());
        this._barRange = this.slide.getComponent(UITransform).contentSize.width;
        const currLevel = Data_manager.instance.get_data_lv();
        if(currLevel>=30){
            let complexityScale = 2.4 - 0.05*currLevel;
            this.targetNode.setScale(v3(complexityScale,1,1));
        }
    }

    protected start(): void {
        this._currentLevel = Data_manager.instance.get_data_lv();
    }


    resumeSlider() {
        this.triggleHandler = false;
        this.triggleTarget = false;

        if(this.Health.getBloodRange()<=0){
            this.winPrefab.active = false;
            this.losePrefab.active = true;
            return ;
        }
        else if(this.Health.getBloodRange()>0 && this.enemyAnimation.Isdie){
            this.node.active = false;
            setTimeout(() => {
                if(director.getScene().name === "MainGameMap1"){
                    this.winPrefab.active = true;
                    this.losePrefab.active = false;
                }
            }, 7000);
        }
        else if(this.Health.getBloodRange()>0 && !this.enemyAnimation.Isdie){
            this.triggleHandler = true;
            this.triggleTarget = true;
        }

    }

    onClickShooting(){
        if (!this.isClick) return;
        this.isClick = false;
        AudioManager.instance.playSound("shoot");
        this.weaponAnimation.fire();
        
        this.triggleHandler  = false;
        this.triggleTarget = false;

        const targetSize  = this.targetNode.getComponent(UITransform).getBoundingBox().width;
        if(Vec2.distance(this.handler.position,this.targetNode.position) < targetSize/2){
            this.enemyAnimation.fire();
        }else{
            const probToHit = math.randomRange(0,100);

            if (probToHit < 70) {

                tween(this.bgHit)
                    .to(0, { opacity: 0 })
                    .to(0.2, { opacity: 255 })
                    .to(0.4, { opacity: 0 })
                .start();

                this.Health.decreaseBlood();
            }
        };

        setTimeout(()=>{
            this.resumeSlider();
            setTimeout(()=>{
                this.isClick = true;
            },500);
        },1000)
    }


    hide(){
        this.node.active = false;
    }

    show(){
        this.node.active = true;
    }

    protected update(dt: number): void {
        if(this.triggleHandler){
            this.elapsedTime += 0.005*( 1 + Mapmenu.instance.speed/100) ;
            // //this.slide.progress = Util.pingPong(this.elapsedTime,1);
            const x = this._barRange * (Util.pingPong(this.elapsedTime,1) - 0.5);
            this.getComponent(Slider).handle.node.setPosition(new Vec3(x));
        }
        if (this.triggleTarget) {
            const atLevel = this._currentLevel;
            if (atLevel >= 5) {
                this.elapsedTargetTime += 0.01 / 7;
                const barRange = this._barRange;
                const x = barRange * (Util.pingPong(this.elapsedTargetTime, 1) - 0.5);
                this.targetNode.setPosition(new Vec3(x));
            }
        }
    }

    
}

export const SliderViewEvent = {
    HIT: 'HIT',
    MISS: 'MISS'
}