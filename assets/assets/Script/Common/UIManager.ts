import { _decorator, Component, Node, find, log, Prefab, instantiate, AssetManager, assetManager, resources, isValid, director } from "cc";
const { ccclass, property } = _decorator;

interface IPanel extends Component{
    show? : Function,
    hide? : Function,
}

@ccclass("UIManager")
export class UIManager extends Component{

    static Instance : UIManager = null;

    @property(Prefab)
    settingPrefab: Prefab = null;

    @property(Prefab)
    inventoryPrefab: Prefab = null;

    @property(Prefab)
    shopPrefab: Prefab = null;

    @property(Prefab)
    rankPrefab: Prefab = null;


    protected onLoad(): void {
        UIManager.Instance = this;
        director.addPersistRootNode(this.node);
    }

    onClickSettingButton(){
        const canvasPanel = find("Canvas");
        const panel = instantiate(this.settingPrefab!);
        panel.setPosition(0, 0, 0);
        canvasPanel.addChild(panel);
    }

    onClickInventoryButton(){
        const canvasPanel = find("Canvas");
        const panel = instantiate(this.inventoryPrefab!);
        panel.setPosition(0, 0, 0);
        canvasPanel.addChild(panel);
    }

    onClickShopButton(){
        const canvasPanel = find("Canvas");
        const panel = instantiate(this.shopPrefab!);
        panel.setPosition(0, 0, 0);
        canvasPanel.addChild(panel);
    }

    onClickRankButton(){
        const canvasPanel = find("Canvas");
        const panel = instantiate(this.rankPrefab!);
        panel.setPosition(0, 0, 0);
        canvasPanel.addChild(panel);
    }

    quitSettingPopup(){
        const canvasPanel = find("Canvas");
        const popup = canvasPanel.getChildByName(this.settingPrefab.name);
        canvasPanel.removeChild(popup);
    }

    quitInventoryPopup(){
        const canvasPanel = find("Canvas");
        const popup = canvasPanel.getChildByName(this.inventoryPrefab.name);
        canvasPanel.removeChild(popup);
    }

    quitShopPopup(){
        const canvasPanel = find("Canvas");
        const popup = canvasPanel.getChildByName(this.shopPrefab.name);
        canvasPanel.removeChild(popup);
    }

    quitRankPopup(){
        const canvasPanel = find("Canvas");
        const popup = canvasPanel.getChildByName(this.rankPrefab.name);
        canvasPanel.removeChild(popup);
    }

    loadSceneRanking(){
        director.loadScene("sceneRanking");
    }

    // _dictPanel = new Map<string, Node>();
    // _dictLoading = new Map<string, boolean>();

    // static _instance: UIManager;

    // static get instance(){
    //     if(this._instance){
    //         return this._instance;
    //     }
    //     this._instance = new UIManager();
    //     return this._instance;
    // }

    // showDialog(nameUI : string){
    //     const parent = find("Canvas");
    //     const childNodeLst = parent.children;
    //     childNodeLst.forEach(ui=>{
    //         ui.active = false;
    //     })
    //     parent.getChildByName(nameUI).active = true;
    // }

    // showPopup(popupUI: string){
    //     const parent = find("Canvas");
    //     parent.getChildByName(popupUI).active = true;
    // }

    // hidePopup(popupUI: string){
    //     const parent = find("Canvas");
    //     parent.getChildByName(popupUI).active = false;
    // }


    // loadPrefabNode(panelPath: string, cb?: Function, ...args: []){
        
    //     if(this._dictLoading.get(panelPath)){
    //         return;
    //     }

    //     let idxSplit = panelPath.lastIndexOf('/');
    //     let scriptName = panelPath.slice(idxSplit+1);
    //     log(scriptName);

    //     if(!args){
    //         args = [];
    //     }

    //     if(this._dictPanel.has(panelPath)){
    //         const panel = this._dictPanel.get(panelPath)!;
    //         panel.parent = find('Canvas');
    //         panel.active = true;
    //         const script = panel.getComponent(scriptName) as IPanel;
    //         if(script.show){
    //             script.show.apply(script,args);
    //         }

    //         if(cb){
    //             cb();
    //         }

    //         return;
    //     }

    //     this._dictLoading.set(panelPath,true);
    //     resources.load(panelPath, Prefab,(err,prefab)=>{ 
    //         if(err){
    //             console.error(err);
    //             return;
    //         }

    //         const panel = instantiate(prefab!);
    //         panel.setPosition(0,0,0);

    //         const parentNode = find("Canvas");
    //         parentNode.addChild(panel);
            
    //         this._dictPanel.set(panelPath,panel!);
    //         const script = panel!.getComponent(scriptName)! as IPanel;
    //         if(script.show){
    //             script.show.apply(script,args);
    //         }

    //         if(cb){
    //             cb();
    //         }
    //     })
    // }

    // hidePrefabNode(panelPath: string, cb?: Function){
    //     if(this._dictPanel.has(panelPath)){
    //         let panel = this._dictPanel.get(panelPath);
    //         if(panel  && isValid(panel)){
    //             const parentNode = find("Canvas");
    //             parentNode.removeChild(panel);
    //             if(cb){
    //                 cb();
    //             }
    //         }
    //     }

    //     this._dictLoading.set(panelPath,false);
    // }
}
