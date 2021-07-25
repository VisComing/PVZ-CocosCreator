// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import * as ConstProperty from "../ConstProperty";
const { ccclass, property } = cc._decorator;
import Global from "../Global";

@ccclass
export default class NewClass extends cc.Component {
  sprite: cc.Sprite = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.sprite = this.getComponent(cc.Sprite);
    if (this.sprite == null) {
      cc.error("get sun sprite failed!\n");
    }
  }

  start() {}

  onTouch(e: cc.Event.EventTouch) {
    //事件停止向父结点传递
    e.stopPropagation();
    this.node.stopActionByTag(ConstProperty.SUN_DROP_ACTION);
    cc.tween(this.node)
      .to(0.4, { position: cc.v3(-450, 210) })
      .call(this.destoryNode, this) //这里不要忘记写this
      .start();
  }

  destoryNode() {
    Global.getSunCoinNumsTS().sunCoinNumsPlus(
      this.node.getComponent("SunProperty").sunWorth
    );
    cc.log(this.node.getComponent("SunProperty").sunWorth);
    this.node.destroy();
  }
  // update (dt) {}
}
