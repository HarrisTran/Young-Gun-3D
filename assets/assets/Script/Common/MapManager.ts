import { _decorator, Component, director, log, Node } from 'cc';
import { NewDataManager } from './NewDataManager';
import { EventName, LevelInfo, LevelInstance } from '../Data/Constants';
import { LocalStorageManager } from './LocalStorageManager';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
   
    static _currentLevel : LevelInfo = null;

    static _levelList: LevelInfo[] = [];

    async onLoad(){
        director.addPersistRootNode(this.node);
        MapManager._levelList = (await LocalStorageManager.getMap()).levelList;
    }

    static updateLevel(){
        let currLevel = this._currentLevel;
        this._levelList[currLevel.level-1].isPassed = true;
        this.setCurrentLevel(this._levelList[currLevel.level]);
    }

    static setCurrentLevel(level: LevelInfo){
        this._currentLevel = level;
    }

    static getInstanceCurrentLevel(): LevelInstance{
        const result = {
            enemy: NewDataManager.instance.getEnemy(this._currentLevel.EnemyLevel),
            weapon: NewDataManager.instance.getWeapon(this._currentLevel.WeaponLevel)
        } as LevelInstance;

        return result;
    }
}


