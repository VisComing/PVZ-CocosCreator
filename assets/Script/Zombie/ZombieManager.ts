// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils/Utils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private zombieMap: Array<Array<cc.Node>> = Array(5);
  // onLoad () {}

  start() {
    for (let i = 0; i < 5; i++) {
      this.zombieMap[i] = Array();
    }
  }

  /*该行是否有僵尸
   */
  hasZombieInRow(row: number): boolean {
    if (this.zombieMap[row].length > 0) {
      return true;
    }
    return false;
  }

  hasZombieInBoundingBox(rect: cc.Rect): boolean {
    let plantRow = Utils.getRow(
      cc.v2((rect.xMax + rect.xMin) / 2, (rect.yMax + rect.yMin) / 2)
    );
    for (let i = 0; i < this.zombieMap[0].length; i++) {
      let rectPlant = this.zombieMap[plantRow][i].getBoundingBoxToWorld();
      if (rectPlant.xMax > rect.xMin && rectPlant.xMin < rect.xMin) {
        return true;
      }
    }
    return false;
  }
  /*植物前方是否有僵尸
   */
  hasZombieInFrontOfPlant(location: cc.Vec2): boolean {
    const plantRow = Utils.getRow(location);
    for (let i = 0; i < this.zombieMap[plantRow].length; i++) {
      const pos = this.zombieMap[plantRow][i].convertToWorldSpaceAR(
        this.zombieMap[plantRow][i].parent.getPosition()
      );
      if (location.x < pos.x) {
        return true;
      }
    }
    return false;
  }
  // update (dt) {}
}
