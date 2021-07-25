// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils/Utils";
import Global from "../Global";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  SunFlower: cc.Prefab = null;
  @property(cc.Prefab)
  WallNut: cc.Prefab = null;
  @property(cc.Prefab)
  PotatoMine: cc.Prefab = null;
  @property(cc.Prefab)
  PeaShooter: cc.Prefab = null;
  private plantMap: Array<Array<object>> = new Array(5);
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    for (let i = 0; i < 9; i++) {
      this.plantMap[i] = new Array(9);
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 9; j++) {
        this.plantMap[i][j] = null;
      }
    }
  }
  newPlant(plantName: string, location: cc.Vec2): void {
    let myNode: cc.Node = null;
    if (plantName == "SunFlower") {
      myNode = cc.instantiate(this.SunFlower);
    } else if (plantName == "WallNut") {
      myNode = cc.instantiate(this.WallNut);
    } else if (plantName == "PotatoMine") {
      myNode = cc.instantiate(this.PotatoMine);
    }
    if (!myNode) return;
    myNode.parent = this.node;
    myNode.setPosition(
      myNode.parent.convertToNodeSpaceAR(Utils.getPlantRightPlace(location))
    );
    let anim = myNode.getChildByName(myNode.name).getComponent(cc.Animation);
    //会播放默认动画
    anim.play();
    //设置plantshadow节点不可用
    myNode.getChildByName("PlantShadow").active = false;
    //设置shadow可用
    myNode.getChildByName("Shadow").active = true;

    Utils.setMapPlace(location, true);

    //设置植物的行列
    myNode.getComponent("BaseInfo").row = Utils.getRow(location);
    myNode.getComponent("BaseInfo").row = Utils.getColumn(location);

    Global.getSunCoinNumsTS().sunCoinNumsMinus(
      myNode.getComponent("BaseInfo").money
    );
  }
  removePlant(row: number, column: number): void {}
  hasPlantRowAndColumn(row: number, column: number): boolean {
    return false;
  }
  hasPlantRow(row: number): boolean {
    return false;
  }
  hasPlantInPosition(pos: cc.Vec2): boolean {
    return false;
  }
  // update (dt) {}
}
