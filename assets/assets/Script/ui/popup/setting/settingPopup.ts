import { _decorator, Component, director, Node, Slider } from 'cc';
import { UIManager } from '../../../Common/UIManager';
import { AudioManager } from '../../../Common/SoundManager';
import { Constants } from '../../../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('settingPopup')
export class settingPopup extends Component {

    @property(Slider)
    soundSlider : Slider = null;

    @property(Slider)
    SFKSlider : Slider = null;

    @property(Slider)
    musicSlider : Slider = null;

    protected onLoad(): void {
        this.musicSlider.node.on('slide',this.updateMusicVolume,this);
        this.SFKSlider.node.on('slide',this.updateSFKVolume,this);

        this.musicSlider.progress = AudioManager.instance.bgmVolume;
        this.SFKSlider.progress = AudioManager.instance.sfxVolume;
    }


    quitPopup(){
        this.node.active = false;
    }


    updateMusicVolume(){
        AudioManager.instance.setBgmVolume(this.musicSlider.progress);
    }

    updateSFKVolume(){
        AudioManager.instance.setSfXVolume(this.SFKSlider.progress);
    }

    public openCredit()
    {
        director.loadScene("NewCredit");
    }
}

