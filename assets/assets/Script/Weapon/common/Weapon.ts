import { _decorator, animation, CCBoolean, ccenum, Component, Node, Skeleton, Sprite, SpriteFrame } from 'cc';
import Enemy from '../../Enemy';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {
    @property({ type: animation.AnimationController })
    animationWeapon: animation.AnimationController;

    public fire() {
        this.animationWeapon.setValue("isShoot", true);
    }
    

}

