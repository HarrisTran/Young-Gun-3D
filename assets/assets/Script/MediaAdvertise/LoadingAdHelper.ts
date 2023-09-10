import { _decorator, Button, CCInteger, Component, Node, sp, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingAdHelper')
export class LoadingAdHelper extends Component {
    @property(Node)
    circleLoading: Node = null;

    exitButton() {
        this.node.active = false;
    }

}

