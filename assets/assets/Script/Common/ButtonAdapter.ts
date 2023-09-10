import { _decorator, Button, CCBoolean, CCInteger, CCString, Component, Node } from 'cc';
import { AudioManager } from './SoundManager';
const { ccclass, property, disallowMultiple, requireComponent } = _decorator;

@ccclass('ButtonAdapter')
@requireComponent(Button)
@disallowMultiple
export class ButtonAdapter extends Component {

    @property(CCString)
    clickSoundName = 'click';

    protected start(): void {
        const button = this.node.getComponent(Button)!;
        this.node.on('click',()=>{
            AudioManager.instance.playSound(this.clickSoundName);
        })
    }
}

