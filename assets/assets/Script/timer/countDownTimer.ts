import { _decorator, Component, Label, EventTarget, director, log} from 'cc';
import { SliderView } from '../Slider';
import { AudioManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('countDownTimer')
export class countDownTimer extends Component {

  @property(Label)
  private label: Label = null;

  @property(Number)
  private timeLeft: number = 0; // 1 minute in seconds

  @property(SliderView)
  private slider: SliderView;


  protected onLoad(): void {
    this.slider.winPrefab.active = false;
    this.slider.losePrefab.active = false;
    this.timeLeft = 3;
    this.node.active = true;
  }

  start(): void {
    this.label.string = this.timeLeft.toString();
    this.startCountdown();
  }

  startCountdown(): void {
    this.slider.isClick = false;
    this.slider.resumeSlider();
    this.timeLeft = 3;
    // let intervalID = setInterval(() => {
    //   this.label.string = this.timeLeft.toString();

    //   if (this.timeLeft > 0) {
    //     AudioManager.instance.playSound("tick");
    //     this.timeLeft--;
    //   } else {
    //     AudioManager.instance.playSound("tick_finish");
    //     clearInterval(intervalID);
    //     this.hide();
    //     this.slider.show();
    //     setTimeout(() => {
    //       this.slider.isClick = true;
    //     }, 500)
    //   }

    // }, 1000);

    const x = this.schedule(()=>{
      this.label.string = this.timeLeft.toString();

      if (this.timeLeft > 0) {
        AudioManager.instance.playSound("tick");
        this.timeLeft--;
      } else {
        AudioManager.instance.playSound("tick_finish");
        this.unscheduleAllCallbacks();
        this.hide();
        this.slider.show();
        setTimeout(() => {
          this.slider.isClick = true;
        }, 500)
      }
    },1)
  
  }

  hide() {
    this.node.active = false;
  }

}

