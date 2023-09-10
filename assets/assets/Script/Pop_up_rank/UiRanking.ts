import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UiRanking')
export class UiRanking extends Component {
    start() {

    }
   

    public OnclickExit()
    {
        director.loadScene("start");
    }

}

