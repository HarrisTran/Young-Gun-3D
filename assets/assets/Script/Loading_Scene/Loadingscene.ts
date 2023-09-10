import { _decorator, CCBoolean, Component, Director, director, Enum, Node, Sprite } from 'cc';
import { DataLoadingScene } from './DataLoadingScene';
import { AudioManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Loadingscene')
export class Loadingscene extends Component {

  @property({ type: Sprite })
  sprite_loading: Sprite
  @property({ type: Number })
  curr_loading_value: number
  @property({ type: Number })
  max_loading_value: number
  @property({ type: Number })
  rate_loading_value: number
  @property({ type: Number })
  delta_time: number

  @property({ type: String })
  list_scene: string[] = []

  @property({ type: Number })
  index_scene: number

  
  @property({type:CCBoolean})
  Isload:boolean;

  // @property({type:enum})
  // all_scene:Director



  start() {
    if(!AudioManager.instance.isBGMPlaying()){
      AudioManager.instance.playMusic();
    }
    this.Isload=false;
    this.index_scene = DataLoadingScene.Instance.IndexScene;

    this.preload_scene(this.index_scene);
    
    
  }


  public preload_scene(index: number) {
    for (let i = 0; i < this.list_scene.length; i++) {
      if (i == index) {
        this.index_scene = i;
        director.preloadScene(this.list_scene[this.index_scene],
          (completedCount: number, totalCount: number, item: any) => {
            this.sprite_loading.fillRange = completedCount / totalCount;
          },
          () => {
            this.load_scene(this.index_scene);
            this.Isload=true;
          }
        );
      }
    }
  }


  public load_scene(index: number) {
    director.loadScene(this.list_scene[index]);
  }


}

