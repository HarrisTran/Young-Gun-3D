import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pausemanager')
export class Pausemanager extends Component {
   
    @property({type:Node})
    PanelPause:Node;

    start() {
        this.PanelPause.active=false;
    }

    public ShowPanelPause()
    {
        this.PanelPause.active=true;
    }


    public Quit()
    {
        director.loadScene("MapMenunew");
    }
   
    public Back()
    {
        this.PanelPause.active=false;
    }


}

