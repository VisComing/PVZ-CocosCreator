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
  @property(cc.Animation)
  ani = null;
  chomperState: string = "normal";
  // LIFE-CYCLE CALLBACKS:
  digestTime: number = 0;
  // onLoad () {}

  start() {}

  update(dt) {
    if (
      this.chomperState == "normal" &&
      Global.getZombieManagerTS().hasZombieInBoundingBox(
        this.node.getBoundingBoxToWorld()
      )
    ) {
      this.chomperState = "digest";
      let ani = this.node
        .getChildByName(this.node.name)
        .getComponent(cc.Animation);
      ani.stop();
      ani.play("ChomperDigest");
      Global.getZombieManagerTS().zombieAteDie(
        Global.getZombieManagerTS().getBoundingZombie(
          this.node.getBoundingBoxToWorld()
        )
      );
    }
    if (this.chomperState == "digest") {
      this.digestTime++;
      if (this.digestTime == 500) {
        this.digestTime = 0;
        this.chomperState = "normal";
        let ani = this.node
          .getChildByName(this.node.name)
          .getComponent(cc.Animation);
        ani.stop();
        ani.play("Chomper");
      }
    }
  }
}
