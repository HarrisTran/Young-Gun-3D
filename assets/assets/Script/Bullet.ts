import { _decorator, Camera, Component, director, Node, Skeleton, tween, v3, Vec3 } from 'cc';
import Enemy from './Enemy';
import { EnemyAnima } from '../../NewAsset/Scripts/Enemy/EnemyAnima';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export default class Bullet extends Component {

    @property(EnemyAnima)
    animEnemy: EnemyAnima = null;

    @property(Camera)
    cameraFollow: Camera = null;


    @property(Camera)
    cameraViewer: Camera = null;


    @property(Node)
    constPoint: Node = null;

    private _originalPos: Vec3;
    private _originalRot: Vec3;

    protected onLoad(): void {
        this._originalPos = this.cameraFollow.node.getPosition();
    }

    playSlowmotionScene(){
        this.node.active = true;
        this.cameraFollow.node.setParent(this.node.getChildByName("Torus"));
        this.cameraFollow.node.eulerAngles = v3(0,-90,0);
        this.cameraFollow.node.setPosition(-54.4,10.5,-5.4);
        this.scheduleOnce(()=>{
            tween(this.node)
            .parallel(
                tween()
                    .call(() => {
                        tween(this.constPoint)
                            .by(1/2, { eulerAngles: v3(0, -5, 0) })
                            .by(1 / 4, { eulerAngles: v3(0, -25, 0) })
                            .by(1 / 4, { eulerAngles: v3(0, -15, 0) })
                            .by(1/2, { eulerAngles: v3(0, -15, 0) })
                            .start()
                    }),
                tween(this.node)
                    .by(0.75, { position: v3(0, 0, -1) })
                    .by(0.4, { position: v3(0, 0, -3) })
                    .by(1.6, { position: v3(0, 0, -2 )})
                    .by(0.1, { position: v3(0, 0, -0.3)})
                    .by(0.1, { position: v3(0, 0, -0.3)})
                    .call(()=>{
                        //this.cameraFollow.node.setPosition(v3(-350));
                        //this.constPoint.eulerAngles = v3(0,0,0);
                        this.animEnemy.anima.setValue("IDie",true);
                    }),
                tween()
                    .call(() => {
                        this.cameraFollow.fov = 70;
                    })
            )
            .start();
        },0.04);

        setTimeout(()=>{
            this.cameraFollow.node.parent = director.getScene();
            this.cameraFollow.node.setPosition(v3(5.822,1.333,2.013));
            this.cameraFollow.node.setRotationFromEuler(v3(0, 0, 0));
            this.node.active = false;
        },3000)
        
    }

}