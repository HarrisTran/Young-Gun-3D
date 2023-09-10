import { _decorator, Component, log, Node, ScrollBar, ScrollView, Sprite, Vec2} from 'cc';
import { Util } from '../../../Common/Util';
const { ccclass, property } = _decorator;

@ccclass('sliderContent')
export class SliderContent extends Component {

    @property(ScrollView)
    scrollView: ScrollView = null;


    private numberOfOffset = 0;
    public currentIndex = 0;
    private itemList: Node[] = [];

    protected onEnable(): void {
        this.numberOfOffset = this.node.children.length - 1;
        this.itemList = this.node.children.map(node => node.getChildByName("item"));
    }

    protected update(dt: number): void {
        if (!this.scrollView.isScrolling()) {
            this.node.children.forEach((_, index) => {
                this.itemList[index].setScale(0.8, 0.8, 1);
                this.itemList[index].getComponent(Sprite).grayscale = true;
                if (Math.abs(this.getCurrentPercentScroll() * this.numberOfOffset - index) < 1 / 2) {
                    this.currentIndex = index;
                    let progressRatio = Util.lerp(this.getCurrentPercentScroll(), index / this.numberOfOffset, 0.1)
                    this.scrollView.scrollTo(new Vec2(progressRatio, 0), 0);
                    this.itemList[this.currentIndex].setScale(1.5, 1.5, 1);
                    this.itemList[this.currentIndex].getComponent(Sprite).grayscale = false;
                }
            })
        }
    }

    getCurrentPercentScroll() {
        const offset = this.scrollView.getMaxScrollOffset().x
        return (0-this.scrollView.getScrollOffset().x) / offset;
    }

   


}

