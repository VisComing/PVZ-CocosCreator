// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils/Utils";
const { ccclass, property } = cc._decorator;
import Global from "../Global";
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
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancle, this);
  }

  onTouchStart(e: cc.Event.EventTouch) {
    let sunCoinNums = Global.getSunCoinNumsTS().getSunCoinNums();

    cc.log(sunCoinNums);

    this.myNode = cc.instantiate(this.scriptPrefab);
    if (this.myNode == null) {
      cc.error("myNode is null!\n");
      return;
    }
    cc.log(this.myNode.getComponent("BaseInfo").money);
    if (this.myNode.getComponent("BaseInfo").money > sunCoinNums) {
      //金币不足，无法创建
      cc.log("coin not enough");
      this.myNode.destroy();
      return;
    }
    this.myNode.parent = this.node.getParent().getParent();
    this.myNode.setPosition(
      this.myNode.parent.convertToNodeSpaceAR(e.getLocation())
    );
  }

  onTouchMove(e: cc.Event.EventTouch) {
    cc.log("move");
    if (!this.myNode || !this.myNode.isValid || !this.myNode.parent) return;
    this.myNode.setPosition(
      this.myNode.parent.convertToNodeSpaceAR(e.getLocation())
    );
    if (Utils.canPlacePlant(e.getLocation())) {
      const pos: cc.Vec2 = Utils.getPlantRightPlace(
        this.myNode.parent.convertToWorldSpaceAR(this.myNode.getPosition())
      );
      this.myNode
        .getChildByName("PlantShadow")
        .setPosition(this.myNode.convertToNodeSpaceAR(pos));
    } else {
      this.myNode.getChildByName("PlantShadow").setPosition(0, 0);
    }
  }

  onTouchEnd(e: cc.Event.EventTouch) {
    if (!this.myNode || !this.myNode.isValid || !this.myNode.parent) return;
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
