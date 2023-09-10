import { _decorator, AudioSource, color, Color, ColorKey, Component, Node, ProgressBar, tween } from 'cc';
import { AudioManager } from './Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('BloodProgress')
export class BloodProgress extends Component {
    @property(ProgressBar)
    bloodProgress : ProgressBar = null;

    private bloodRange : number = 3;


    protected onLoad(): void {
        this.bloodRange = 3;
        this.updateProgress(this.bloodRange);
    }

    decreaseBlood(){
        this.bloodRange--;
        AudioManager.instance.playSound("ouch");
        this.updateProgress(this.bloodRange);
    }

    getBloodRange(){
        return this.bloodRange;
    }

    updateProgress(healthLevel: number){
        tween(this.bloodProgress)
            .to(0.15,{progress: healthLevel/3},{easing: "elasticOut"})
            .start();
        switch (healthLevel) {
            case 1:
                this.bloodProgress.barSprite.color = color("#D31C1C");
                break;
            case 2:
                this.bloodProgress.barSprite.color = color("#FAFA00");
                break;
            case 3:
                this.bloodProgress.barSprite.color = color("#00C510");
                break;
            default:
                break;
        }

    }
}

