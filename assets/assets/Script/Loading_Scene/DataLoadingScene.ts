import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataLoadingScene')
export class DataLoadingScene extends Component {

  public  static Instance:DataLoadingScene;
  
  @property({type:Number})
  IndexScene:number;
  protected onLoad(): void {
      DataLoadingScene.Instance=this;
  }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

