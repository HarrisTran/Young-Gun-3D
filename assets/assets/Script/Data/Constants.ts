import { _decorator, Component, MainFlow, math, MathBase, Node, SpriteFrame, Vec2 } from 'cc';
import Enemy from '../Enemy';
import { Weapon } from '../Weapon/common/Weapon';
const { ccclass, property } = _decorator;


export enum EventName {
    GAME_START = 'game-start',
    GAME_OVER = 'game-over',
    NEW_LEVEL = 'new_level'
}

export enum BGM_AudioSource {
}



export class Constants {
    public static EventName = EventName;
    public static AudioSource = BGM_AudioSource;
    
    public static UIPage = {
        LOADING_UI: 'Loading',
        START_UI: 'start',
        PLAY_UI: 'MainGameMap1',
        OPPONENT_UI : '"SceneOpponent"',
        MAP_UI: 'MapMenunew'
    };

    public static Popup = {
        RANKING: 'ui/popup/rank/rankingPopup',
        SETTING: 'ui/popup/setting/settingPopup',
        INVENTORY: 'ui/popup/inventory/inventoryPopup',
        SHOP: 'ui/popup/shop/shopPopup',
        WIN: 'ui/popup/result/winPopup',
        LOSE: 'ui/popup/result/losePopup',
    }

    public static PlayerConfigID = 'playerInfo';
    public static MaxLevel = 20;
}

export interface LevelInstance{
    bg: SpriteFrame
    enemy: Enemy,
    weapon: Weapon
}

export interface LevelInfo {
    level: number,
    isPassed: boolean
    EnemyLevel: number,
    WeaponLevel: number
}

export interface PlayerInfo {
    currentLevel: number;
    currentWeapon : number
}

export interface EnemyInfo {
    id: number,
    name: string
}

export interface WeaponInfo {
    id: number,
    name: string
}

export interface MapInfo {
    levelList: LevelInfo[]
}