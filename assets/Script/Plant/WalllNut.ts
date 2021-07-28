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
  private animation: cc.Animation = null;
  private wallNutPlayAnimation: string = "WallNut";
  onLoad() {
    this.animation = this.node
      .getChildByName("WallNut")
      .getComponent(cc.Animation);
  }

  start() {}

  update(dt) {
    const nowHP = this.node.getComponent("BaseInfo").HP;
    if (
      nowHP < this.cracked1HP &&
      nowHP > this.cracked2HP &&
      this.wallNutPlayAnimation == "WallNut"
    ) {
      this.animation.stop();
      this.animation.play("WallNutCracked1");
      this.wallNutPlayAnimation = "WallNutCracked1";
    } else if (
      nowHP <= this.cracked2HP &&
      this.wallNutPlayAnimation == "WallNutCracked1"
    ) {
      this.animation.stop();
      this.animation.play("WallNutCracked2");
      this.wallNutPlayAnimation = "WallNutCracked2";
    }
  }
}
