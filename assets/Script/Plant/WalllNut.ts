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
  cracked1HP = 3000;
  @property(cc.Integer)
  cracked2HP = 1000;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt) {
    const nowHP = this.node.getComponent("BaseInfo").HP;
    if (nowHP < this.cracked1HP && nowHP > this.cracked2HP) {
      let ani = this.node.getChildByName("WallNut").getComponent(cc.Animation);
      ani.play("WallNutCracked1");
    } else if (nowHP <= this.cracked2HP) {
      let ani = this.node.getChildByName("WallNut").getComponent(cc.Animation);
      ani.play("WallNutCracked2");
    }
  }
}