import { _decorator,sys } from 'cc';
import { LevelInfo, MapInfo } from '../Data/Constants';
const { ccclass, property } = _decorator;


@ccclass('LocalStorageManager')
export class LocalStorageManager{

    public static setMap(data: LevelInfo[]){
        const newMapInfo : MapInfo = {levelList: data};
        sys.localStorage.setItem("map_DG1",JSON.stringify(newMapInfo));
    }

    public static async getMap(): Promise<MapInfo> {

        return Promise.resolve(<MapInfo>{
            levelList: [
                {
                    level: 1,
                    isPassed: true,
                    EnemyLevel: 0,
                    WeaponLevel: 0
                }, {
                    level: 2,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 1
                },{
                    level: 3,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 4
                },{
                    level: 4,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 5
                },{
                    level: 5,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 2
                },{
                    level: 6,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 5
                },{
                    level: 7,
                    isPassed: false,
                    EnemyLevel: 0,
                    WeaponLevel: 5
                },


            ]
        }) 
    }

}

