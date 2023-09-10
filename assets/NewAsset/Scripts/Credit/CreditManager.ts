import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CreditManager')
export class CreditManager extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    public QuitCredit()
    {
        director.loadScene("start");
    }
}

