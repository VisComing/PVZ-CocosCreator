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
  zom: cc.Node = null;
  initZombie() {
    cc.log("init zombie");
    this.zom = cc.instantiate(this.Zombie);
    this.zom.parent = this.node;
    this.zom.setPosition(300, -200);
    this.zombieMap[0].push(this.zom);
    this.zom.getComponent("Zombie").zombieWalk();
  }
  stopAllAction() {
    this.zom.getComponent("Zombie").zombieStopWalk();
  }
  removeZombie(zombie: cc.Node): void {
    for (let i = 0; i < this.zombieMap.length; i++) {
      for (let j = 0; j < this.zombieMap[i].length; j++) {
        if (this.zombieMap[i][j] == zombie) {
          this.zombieMap[i].splice(j, 1);
          zombie.destroy();
          return;
        }
      }
    }
    cc.error("no zombie to remove!");
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

  //获取碰撞的僵尸
  getBoundingZombie(rect: cc.Rect): cc.Node {
    if (this.hasZombieInBoundingBox(rect)) {
      let zombie: cc.Node = null;
      let plantRow = Utils.getRow(
        cc.v2((rect.xMax + rect.xMin) / 2, (rect.yMax + rect.yMin) / 2)
      );
      for (let i = 0; i < this.zombieMap[plantRow].length; i++) {
        let rectPlant = this.zombieMap[plantRow][i].getBoundingBoxToWorld();
        if (rectPlant.xMax > rect.xMin && rectPlant.xMin < rect.xMin) {
          zombie = this.zombieMap[plantRow][i];
          break;
        }
      }
      if (!zombie) {
        cc.error("zombie is null!\n");
        return null;
      }
      return zombie;
    }
    return null;
  }

  //碰撞时攻击僵尸
  attackZombieInBounding(rect: cc.Rect, attack: number): void {
    let zombie = this.getBoundingZombie(rect);
    zombie.getComponent("ZombieBaseInfo").HP -= Utils.caculMinusHP(
      attack,
      zombie.getComponent("ZombieBaseInfo").defence
    );
    if (zombie.getComponent("ZombieBaseInfo").HP <= 0) {
      this.removeZombie(zombie);
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

  controlZombieState(): void {
    for (let i = 0; i < this.zombieMap.length; i++) {
      for (let j = 0; j < this.zombieMap[i].length; j++) {
        let zombie = this.zombieMap[i][j];
        if (!zombie || zombie.active) {
          cc.error("zombie is null or is not active");
        }
      }
    }
  }
  zombieBoomDie(zombie: cc.Node): void {}
  zombieAteDie(zombie: cc.Node): void {}
}
