import { _decorator, Component, Mesh, Node, SkinnedMeshBatchRenderer, SkinnedMeshRenderer } from 'cc';
import { Data_manager } from '../../../assets/Script/MapMenu/Data_manager';
import { test_enemy } from '../../../assets/Script/MapMenu/test_enemy';
const { ccclass, property } = _decorator;

@ccclass('InitEnemy')
export class InitEnemy extends Component {

    enemy:Node;

    protected onLoad(): void {

       let a= Data_manager.instance.setenemy();
       a.setParent(this.node);
        this.getComponent(SkinnedMeshRenderer).mesh=a.getComponent(test_enemy).SetMesh();
    }
    start() {
       
    }

}

