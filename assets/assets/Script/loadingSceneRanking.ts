import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadingSceneRanking')
export class loadingSceneRanking extends Component {
    onClickLoadingRanking(){
        director.loadScene("sceneRanking");
    }
}

