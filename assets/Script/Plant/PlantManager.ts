// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils";
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
  private plantMap: Array<Array<cc.Node>> = new Array(5);
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
    } else if (plantName == "PeaShooter") {
      myNode = cc.instantiate(this.PeaShooter);
    }
    if (!myNode) return;
    myNode.parent = this.node;
    myNode.setPosition(
      myNode.parent.convertToNodeSpaceAR(Utils.getPlantRightPlace(location))
    );
    let anim = myNode.getChildByName(myNode.name).getComponent(cc.Animation);
    //会播放默认动画
    anim.play();
    //设置shadow可用
    myNode.getChildByName("Shadow").active = true;

    Utils.setMapPlace(location, true);

    //设置植物的行列
    myNode.getComponent("BaseInfo").row = Utils.getRow(location);
    myNode.getComponent("BaseInfo").row = Utils.getColumn(location);

    Global.getSunCoinNumsTS().sunCoinNumsMinus(
      myNode.getComponent("BaseInfo").money
    );
    //加入植物数组
    this.plantMap[Utils.getRow(location)][Utils.getColumn(location)] = myNode;
  }

  removePlant(row: number, column: number): void {
    let rePlant = this.plantMap[row][column];
    rePlant.destroy();
    this.plantMap[row][column] = null;
  }

  hasPlantRowAndColumn(row: number, column: number): boolean {
    for (let i = 0; i < this.plantMap.length; i++) {
      for (let j = 0; j < this.plantMap[i].length; j++) {
        if (
          this.plantMap[i][j].getComponent("BaseInfo").row == row &&
          this.plantMap[i][j].getComponent("BaseInfo").column == column
        ) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 该行是否有植物
   * @param row 行号
   * @returns boolean
   */
  hasPlantRow(row: number): boolean {
    for (let i = 0; i < this.plantMap.length; i++) {
      for (let j = 0; j < this.plantMap[i].length; j++) {
        if (this.plantMap[i][j].getComponent("BaseInfo").row == row) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 僵尸是否与植物相交
   * @param rect 僵尸的boundingbox世界坐标
   * @returns boolean
   */
  hasPlantInBoundingBox(rect: cc.Rect): boolean {
    let zombieRow = Utils.getRow(
      cc.v2((rect.xMax + rect.xMin) / 2, (rect.yMax + rect.yMin) / 2)
    );
    for (let i = 0; i < this.plantMap[0].length; i++) {
      let rectPlant = this.plantMap[zombieRow][i].getBoundingBoxToWorld();
      if (rectPlant.xMax > rect.xMin && rectPlant.xMin < rect.xMin) {
        return true;
      }
    }
    return false;
  }
  // update (dt) {}
}
