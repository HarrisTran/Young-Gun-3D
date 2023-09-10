import { _decorator, Button, Component, director, EventHandler, instantiate, log, Node, Prefab, sys } from 'cc';
import { UIManager } from '../../Common/UIManager';
import { Constants} from '../../Data/Constants';
import { levelBtn } from './levelBtn';
import { LocalStorageManager } from '../../Common/LocalStorageManager';
import { MapManager } from '../../Common/MapManager';
const { ccclass, property } = _decorator;

@ccclass('mapUI')
export class mapUI extends Component {

    @property(Node)
    mapDiagram: Node = null;

    @property(Button)
    goBtn: Button = null;

    protected onLoad(): void {
        this.loadMap();
    }

    protected start(): void {
        this.mapDiagram.children.forEach(node=>node.on('click',()=>{
            this.triggleOnClickLevel();
        }))
    }

    loadMap(){
        this.goBtn.node.active = false;
        const childMapNode = this.mapDiagram.children;
        MapManager._levelList.forEach((level,i)=>{
            (childMapNode[i].getComponent("levelBtn") as levelBtn).initLevel(level);
        })
    }

    triggleOnClickLevel(){
        this.goBtn.interactable = true;
        this.goBtn.node.active = true;
    }

    onClickGoBtn(){
        director.loadScene(Constants.UIPage.OPPONENT_UI);
    }

    onClickInventoryBtn(){
        //UIManager.instance.loadPrefabNode(Constants.Popup.INVENTORY);
    }

    onClickSettingBtn(){
        //UIManager.instance.loadPrefabNode(Constants.Popup.SETTING);
    }

    onClickShopBtn(){
        //UIManager.instance.loadPrefabNode(Constants.Popup.SHOP);
    }

    onClickQuitBtn(){
        director.loadScene(Constants.UIPage.START_UI);
    }
}

