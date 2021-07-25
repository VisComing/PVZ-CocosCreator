// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  Zombie: cc.Prefab = null;
  // LIFE-CYCLE CALLBACKS:
  private zombieMap: Array<Array<cc.Node>> = Array(5);
  onLoad() {
    for (let i = 0; i < 5; i++) {
      this.zombieMap[i] = Array();
    }
  }

  start() {}
  initZombie() {
    let zom = cc.instantiate(this.Zombie);
    zom.parent = this.node;
    zom.position = cc.v3(300, -280);
    this.zombieMap[0].push(zom);
  }
  /*该行是否有僵尸
   */
  hasZombieInRow(row: number): boolean {
    if (this.zombieMap[row].length > 0) {
      return true;
    }
    return false;
  }

  //判断是否和僵尸碰撞
  hasZombieInBoundingBox(rect: cc.Rect): boolean {
    let plantRow = Utils.getRow(
      cc.v2((rect.xMax + rect.xMin) / 2, (rect.yMax + rect.yMin) / 2)
    );
    for (let i = 0; i < this.zombieMap[plantRow].length; i++) {
      let rectPlant = this.zombieMap[plantRow][i].getBoundingBoxToWorld();
      if (rectPlant.xMax > rect.xMin && rectPlant.xMin < rect.xMin) {
        return true;
      }
    }
    return false;
  }

  //碰撞时攻击僵尸
  attackZombieInBounding(rect: cc.Rect, attack: number): void {
    if (this.hasZombieInBoundingBox(rect)) {
      let zombie: cc.Node = null;
      let plantRow = Utils.getRow(
        cc.v2((rect.xMax + rect.xMin) / 2, (rect.yMax + rect.yMin) / 2)
      );
      for (let i = 0; i < this.zombieMap[0].length; i++) {
        let rectPlant = this.zombieMap[plantRow][i].getBoundingBoxToWorld();
        if (rectPlant.xMax > rect.xMin && rectPlant.xMin < rect.xMin) {
          zombie = this.zombieMap[plantRow][i];
          break;
        }
      }
      if (!zombie) {
        cc.error("zombie is null!\n");
      } else {
        zombie.getComponent("ZombieBaseInfo").HP -= Utils.caculMinusHP(
          attack,
          zombie.getComponent("ZombieBaseInfo").defence
        );
      }
    }
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
