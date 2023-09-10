import { _decorator, Component, native, Node, VideoPlayer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VideoAd')
export class VideoAd extends Component {
    @property(VideoPlayer) private video: VideoPlayer;

    start() {
        console.log('create screen video');
        // this.loadVideo();
    }

    update(deltaTime: number) {
        
    }

    loadVideo() {
        native.reflection.callStaticMethod("com/cocos/game/RewardActivity", "showRewardedAds", "()V");
        console.log("result")
    }
}

