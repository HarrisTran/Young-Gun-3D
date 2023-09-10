import {_decorator, AudioClip, AudioSource, clamp01, Component, director, log, resources, sys, warn} from "cc";
const {ccclass, property} = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component{
    static instance: AudioManager;

    @property(AudioSource)
    private Bgm: AudioSource;

    @property(AudioSource)
    private Bgm2 : AudioSource;

    @property(AudioSource)
    private Bgm3 : AudioSource;

    @property
    bgmVolume = 1;

    @property(AudioSource)
    private Sfx: AudioSource;

    @property
    sfxVolume = 1;

    @property([AudioClip])
    private bgmList: AudioClip[] = [];


    @property([AudioClip])
    private sfxList: AudioClip[] = [];

    bgmVolumeKey = 'bgmVolume';

    sfxVolumeKey = 'sfxVolume';

    
    protected onLoad(): void {
        AudioManager.instance = this;
        director.addPersistRootNode(this.node);
    }

    protected start(): void {
        const bgmVolumeData = sys.localStorage.getItem(this.bgmVolumeKey);
        const sfxVolumeData = sys.localStorage.getItem(this.sfxVolumeKey);

        if(bgmVolumeData){
            this.bgmVolume = parseFloat(bgmVolumeData);
        }
        if(sfxVolumeData){
            this.sfxVolume = parseFloat(sfxVolumeData);
        }

        this.setBgmVolume(this.bgmVolume);
        this.setSfXVolume(this.sfxVolume);
    }


    setBgmVolume(volume: number){
        this.bgmVolume = volume;
        this.Bgm.volume = volume;
        this.Bgm2.volume = volume;
        this.Bgm3.volume = volume;
        sys.localStorage.setItem(this.bgmVolumeKey,volume.toString());
    }

    setSfXVolume(volume: number){
        this.sfxVolume = volume;
        this.Sfx.volume = volume;
        sys.localStorage.setItem(this.sfxVolumeKey,volume.toString());
    }

    stopMusic(){
        this.Bgm2.stop();
        this.Bgm3.stop();
    }

    playMusic(){
        if(this.Bgm2.playing){
            this.Bgm2.stop();
            this.Bgm3.stop();
        }
        this.Bgm.loop = true;
        this.Bgm.stop();
        this.Bgm.clip = this.bgmList[0];
        // switch (name) {
        //     case "bgm": 
        //         this.Bgm.clip = this.bgmList[0];
        //         break;
        //     case "bgm_Play":
        //         this.Bgm2.stop();
        //         this.Bgm2.clip = this.bgmList[3];
        //         this.Bgm2.play();
        //         this.Bgm.clip = this.bgmList[2];
        //         break;
        //     default:
        //         break;
        // }
        this.Bgm.play();
    }

    playFightingMusic(){
        if(this.Bgm.playing){
            this.Bgm.stop();
            this.Bgm2.clip = this.bgmList[2];
            this.Bgm2.loop = true;
            this.Bgm3.clip = this.bgmList[1];
            this.Bgm3.loop = true;
        }
        this.Bgm2.play();
        this.Bgm3.play();
    }

    isBGMPlaying(){
        return this.Bgm.playing;
    }

    playSound(name: string){
        switch (name) {
            case 'click':
                this.Sfx.playOneShot(this.sfxList[0]);
                break;
            case 'lastShoot':
                this.Sfx.playOneShot(this.sfxList[1]);
                break;
            case 'ouch':
                this.Sfx.playOneShot(this.sfxList[2]);
                break;
            case 'shoot':
                this.Sfx.playOneShot(this.sfxList[3]);
                break;
            case 'win':
                this.Sfx.playOneShot(this.sfxList[4]);
                break;
            case 'CasinoGambling':
                this.Sfx.playOneShot(this.sfxList[5]);
                break;
            case "tick":
                this.Sfx.playOneShot(this.sfxList[6]);
                break;
            case "tick_finish":
                this.Sfx.playOneShot(this.sfxList[7]);
                break;
            default:
                break;
        }
    }

}