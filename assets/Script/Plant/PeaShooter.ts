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
  // LIFE-CYCLE CALLBACKS:
  @property(cc.Prefab)
  bulletPea: cc.Prefab = null;
  @property(cc.Integer)
  interval: number = 1;
  onLoad() {
    this.schedule(this.onTimer, this.interval);
  }

  start() {}

  onTimer() {
    if (
      Global.getZombieManagerTS().hasZombieInFrontOfPlant(
        this.node.convertToWorldSpaceAR(this.node.parent.getPosition())
      )
    ) {
      let pea = cc.instantiate(this.bulletPea);
      pea.parent = this.node.parent;
      pea.position = this.node.position;
      //对准枪口
      pea.setPosition(pea.position.x + 10, pea.position.y + 20);
      cc.log("peapea");
    }
  }
}
