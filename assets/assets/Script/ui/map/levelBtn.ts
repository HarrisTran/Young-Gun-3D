import { _decorator, CCBoolean, CCInteger, Component, Label, log, Node, Sprite, SpriteFrame, Toggle } from 'cc';
import { MapManager } from '../../Common/MapManager';
import { LevelInfo } from '../../Data/Constants';
const { ccclass, property } = _decorator;

@ccclass('levelBtn')
export class levelBtn extends Component {

    @property(Toggle)
    isPassedToggle : Toggle = null;

    @property(CCInteger)
    levelIndex = 0 ;

    @property(Label)
    levelIndexLb: Label = null;

    @property(CCInteger)
    enemyIndex = 0 ;

    @property(CCInteger)
    weaponIndex = 0 ;

    @property(SpriteFrame)
    markSF: SpriteFrame = null;

    @property(SpriteFrame)
    passedSF: SpriteFrame = null;


    protected onLoad(): void {
        this.levelIndexLb.string = this.levelIndex.toString();
    }


    initLevel(levelInfo: LevelInfo){
        this.levelIndex = levelInfo.level;
        this.levelIndexLb.string = levelInfo.level.toString();
        this.isPassedToggle.isChecked = levelInfo.isPassed;
        this.isPassedToggle.interactable = !levelInfo.isPassed;
        this.enemyIndex = levelInfo.EnemyLevel;
        this.weaponIndex = levelInfo.WeaponLevel;
    }

    onClickLevel(){
        this.isPassedToggle.checkMark.spriteFrame = this.markSF;
        MapManager.setCurrentLevel(<LevelInfo>{
            level: this.levelIndex,
            isPassed: false,
            EnemyLevel: this.enemyIndex,
            WeaponLevel: this.weaponIndex
        });
    }


}

