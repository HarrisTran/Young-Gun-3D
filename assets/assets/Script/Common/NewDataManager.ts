import { _decorator, Component, director, EventHandler, instantiate, log, Node, Prefab, SpriteFrame } from 'cc';
import Enemy from '../Enemy';
import { Weapon } from '../Weapon/common/Weapon';
const { ccclass, property } = _decorator;

@ccclass('NewDataManager')
export class NewDataManager extends Component {

    @property([SpriteFrame])
    private mapBackgroundList: SpriteFrame[] = [];

    @property([Prefab])
    public enemyList: Prefab[] = [];

    @property([Prefab])
    public weaponList: Prefab[] = [];

    private static _instance: NewDataManager;

    protected onLoad(): void {
        director.addPersistRootNode(this.node);
        NewDataManager._instance = this;
    }

    static get instance(){
        if(this._instance){
            return this._instance;
        }
        this._instance = new NewDataManager();
        return this._instance;
    }

    public getEnemy(id: number): Enemy{
        if(this.enemyList && this.enemyList.length > 0){
            const enemyNode =  instantiate(this.enemyList[id]);
            return enemyNode.getComponent(enemyNode.name) as Enemy;
        }
    }

    public getWeapon(id: number): Weapon{
        if(this.weaponList && this.weaponList.length > 0){
            const weaponNode = instantiate(this.weaponList[id]);
            return weaponNode.getComponent(weaponNode.name) as Weapon;
        }
    }

    public getBackground(id: number){
        if(this.mapBackgroundList && this.mapBackgroundList.length > 0){
            return this.mapBackgroundList[id];
        }
        return this.mapBackgroundList[0];
    }


    
}

