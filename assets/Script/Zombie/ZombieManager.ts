// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private zombieMap: Array<Array<object>> = Array(5);
  // onLoad () {}

  start() {
    for (let i = 0; i < 5; i++) {
      this.zombieMap[i] = Array();
    }
  }

  /*该行是否有僵尸
   */
  hasZombieInRow(row: number): boolean {
    return false;
  }
  hasZombieInPosition(pos: cc.Vec2): boolean {
    return false;
  }
  /*植物前方是否有僵尸
   */
  hasZombieInFrontOfPlant(pos: cc.Vec2): boolean {
    return false;
  }
  // update (dt) {}
}
