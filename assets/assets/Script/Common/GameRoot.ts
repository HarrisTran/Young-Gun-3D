import { _decorator, Component, AudioSource, assert, director, sys, log} from 'cc';
import { AudioManager } from './SoundManager';


const { ccclass, property } = _decorator;

@ccclass('GameRoot')
export class GameRoot extends Component {
    
    @property(AudioSource)
    private _audioSource: AudioSource = null!;

    onLoad () {
        if(sys.os === sys.OS.IOS){

        }else{
            
        }
        const audioSource = this.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource = audioSource;
        director.addPersistRootNode(this.node);

        // init AudioManager
        //AudioManager.init(audioSource);
    }
}