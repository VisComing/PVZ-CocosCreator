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
  @property(cc.Integer)
  interval = 10;

  // LIFE-CYCLE CALLBACKS:

  //   onLoad() {
  //   }

  start() {
    this.schedule(this.onTimer, this.interval);
  }

  onTimer() {
    let sun = cc.instantiate(this.sunPrefab);
    if (sun == null) {
      cc.error("sun is null!\n");
      return;
    }
    sun.parent = this.node;
    cc.tween(sun)
      .to(8, {}) //超过8秒还没有被点击，那就销毁
      .call(() => {
        sun.destroy();
      })
      .tag(ConstProperty.SUN_DROP_ACTION)
      .start();
  }
  // update (dt) {}
}
