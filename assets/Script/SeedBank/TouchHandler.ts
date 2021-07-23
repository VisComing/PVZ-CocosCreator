// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  scriptPrefab: cc.Prefab = null;

  myNode: cc.Node = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(e: cc.Event.EventTouch) {
    let sunCoinNums = parseInt(
      cc.find("Canvas/BgMap/SeedBank/SunCoinNums").getComponent(cc.Label).string
    );
    cc.log(sunCoinNums);

    this.myNode = cc.instantiate(this.scriptPrefab);
    cc.log(this.myNode.getComponent("BaseInfo").money);
    if (this.myNode.getComponent("BaseInfo").money > sunCoinNums) {
      //金币不足，无法创建
      this.myNode.destroy();
      this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      return;
    }
    let designSize = cc.view.getDesignResolutionSize();
    this.myNode.parent = this.node.getParent().getParent();
    this.myNode.setPosition(
      e.getLocation().x - designSize.width / 2,
      e.getLocation().y - designSize.height / 2
    );
  }

  onTouchMove(e: cc.Event.EventTouch) {
    let designSize = cc.view.getDesignResolutionSize();
    this.myNode.setPosition(
      e.getLocation().x - designSize.width / 2,
      e.getLocation().y - designSize.height / 2
    );
  }

  onTouchEnd(e: cc.Event.EventTouch) {}
  // update (dt) {}
}
