import { _decorator, Component, director, Node, ProgressBar } from 'cc';
import { Constants } from '../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('loadingUI')
export class loadingUI extends Component {
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    totalTime: number = 0;

    protected update(dt: number): void {
        this.totalTime += dt;
        this.progressBar.progress = this.totalTime/5;
        if(this.progressBar.progress >= 1){
            director.loadScene(Constants.UIPage.START_UI);
            return;
        }
    }
}

