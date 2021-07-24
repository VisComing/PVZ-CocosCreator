// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  growTime: number = 10;

  nowTime: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.schedule(this.onTimer, 1);
  }

  start() {
    this.nowTime = 0;
  }
  onTimer() {
    this.nowTime++;
    if (this.nowTime == this.growTime) {
      const ani = this.node
        .getChildByName("PotatoMine")
        .getComponent(cc.Animation);
      ani.play("PotatoMine");
      this.unschedule(this.onTimer);
    }
  }
  // update (dt) {}
}
