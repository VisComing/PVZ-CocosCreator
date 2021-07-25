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
  speed: number = 10;
  distance = 1000;
  // LIFE-CYCLE CALLBACKS:
  animation: cc.Animation = null;
  onLoad() {
    this.animation = this.node
      .getChildByName(this.node.name)
      .getComponent(cc.Animation);
    this.animation.play("Zombie");
    cc.tween(this.node)
      .by(this.distance / this.speed, {
        position: cc.v3(-this.distance, this.node.y),
      })
      .start();
  }

  start() {}

  update(dt) {
    //cc.log(this.node.getComponent("ZombieBaseInfo").HP);
    // if (this.node.getComponent("ZombieBaseInfo").HP < 0) {
    //   this.node.destroy();
    // }
  }
}
