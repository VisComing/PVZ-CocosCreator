// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import * as ConstProperty from "../ConstProperty";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  sunPrefab: cc.Prefab = null;
  // LIFE-CYCLE CALLBACKS:
  interval: number = 4;
  sunDropSpeed: number = 150;
  onLoad() {}

  start() {
    this.schedule(this.onTimer, this.interval);
  }

  onTimer() {
    cc.log("generate sun");
    let sun = cc.instantiate(this.sunPrefab);
    if (sun == null) {
      cc.error("sun is null!\n");
      return;
    }
    sun.parent = this.node;
    const x: number = cc.math.randomRangeInt(-400, 300);
    sun.setPosition(cc.v3(x, 330));
    const y: number = cc.math.randomRangeInt(-10, -240);
    cc.tween(sun)
      .to((330 - y) / this.sunDropSpeed, { position: cc.v3(x, y) })
      .to(sun.getComponent("SunProperty").sunDestroyTime, {}) //超过8秒还没有被点击，那就销毁
      .call(() => {
        sun.destroy();
      })
      .tag(ConstProperty.SUN_DROP_ACTION)
      .start();
  }
  // update (dt) {}
}
