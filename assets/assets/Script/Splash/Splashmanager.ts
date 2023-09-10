import { _decorator, CCBoolean, CCFloat, Component, director, easing, Node, sys, tween, Tween, Vec3 } from 'cc';
import { DataLoadingScene } from '../Loading_Scene/DataLoadingScene';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('Splashmanager')
export class Splashmanager extends Component {
   
    @property(Node)
    logo2: Node = null;

    @property(CCFloat)
    curr_time_logo: number=0;

    @property(CCFloat)
    max_time_logo: number;

    @property(CCFloat)
    max_time: number;

    @property(CCFloat)
    delta_time: number;

    @property(CCFloat)
    time_tween: number;

    @property(CCFloat)
    scale_tween: number;

    @property(CCBoolean)
    is_done_tween1: boolean;


    is_loading_scene: boolean;



    start() {
        director.preloadScene(Constants.UIPage.LOADING_UI);
        let b = this.run_tween(this.logo2);
        b.start();
    }


    public run_tween(target: Node): Tween<Node> {
        return tween(target).to(this.time_tween, { scale: new Vec3(this.scale_tween, this.scale_tween) }, { easing: 'bounceOut' });
    }

    public cal_time() {
        if (this.curr_time_logo >= this.max_time) {
           
            if (this.is_loading_scene == false) {
                DataLoadingScene.Instance.IndexScene=1;
                director.loadScene("Loading");
                this.is_loading_scene = true;
            }
        }
        else this.is_loading_scene = false;
    }

    update(deltaTime: number) {
        this.delta_time=deltaTime;
       
        this.curr_time_logo +=deltaTime;
        this.cal_time();
    }
}

