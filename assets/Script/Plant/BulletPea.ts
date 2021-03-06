// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Global from "../Global";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  attack: number = 20;
  @property(cc.Integer)
  speed: number = 1000;
  // LIFE-CYCLE CALLBACKS:
  private distance = 2000;
  onLoad() {
    cc.tween(this.node)
      .by(this.distance / this.speed, {
        position: cc.v3(this.distance, this.node.y),
      })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  start() {}

  update(dt) {
    //判断是否与僵尸碰撞
    if (
      Global.getZombieManagerTS().hasZombieInBoundingBox(
        this.node.getBoundingBoxToWorld()
      )
    ) {
      //碰撞
      Global.getZombieManagerTS().attackZombieInBounding(
        this.node.getBoundingBoxToWorld(),
        this.attack
      );
      this.node.destroy();
    }
  }
}
