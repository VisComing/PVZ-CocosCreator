// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils";
const { ccclass, property } = cc._decorator;
import Global from "../Global";
@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  staticPrefab: cc.Prefab = null;
  @property(cc.Integer)
  sunCoins: number = 0;

  // LIFE-CYCLE CALLBACKS:
  sunCoinNums: number = 0;
  // onLoad () {}
  myNode: cc.Node = null;
  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancle, this);
  }

  onTouchStart(e: cc.Event.EventTouch) {
    this.sunCoinNums = Global.getSunCoinNumsTS().getSunCoinNums();

    cc.log(this.sunCoinNums);

    if (this.sunCoins > this.sunCoinNums) {
      //金币不足，无法创建
      cc.log("coin not enough");
      return;
    } else {
      this.myNode = cc.instantiate(this.staticPrefab);
      this.myNode.parent = this.node.parent.parent;
      this.myNode.setPosition(
        this.myNode.parent.convertToNodeSpaceAR(e.getLocation())
      );
    }
  }

  onTouchMove(e: cc.Event.EventTouch) {
    if (!this.myNode || !this.myNode.active) return;
    cc.log("move");
    this.myNode.setPosition(
      this.myNode.parent.convertToNodeSpaceAR(e.getLocation())
    );
    if (Utils.canPlacePlant(e.getLocation())) {
      const pos: cc.Vec2 = Utils.getPlantRightPlace(
        this.myNode.parent.convertToWorldSpaceAR(this.myNode.getPosition())
      );
      this.myNode
        .getChildByName("Shadow")
        .setPosition(this.myNode.convertToNodeSpaceAR(pos));
    } else {
      this.myNode.getChildByName("Shadow").setPosition(0, 0);
    }
  }

  onTouchEnd(e: cc.Event.EventTouch) {
    if (!this.myNode || !this.myNode.active) return;
    //判断位置是否合法
    if (Utils.canPlacePlant(e.getLocation())) {
      cc.log(this.myNode.name);
      Global.getPlantManagerTS().newPlant(this.myNode.name, e.getLocation());
    }
    this.myNode.destroy();
  }

  onTouchCancle(e: cc.Event.EventTouch) {
    this.onTouchEnd(e);
  }
  // update (dt) {}
}
