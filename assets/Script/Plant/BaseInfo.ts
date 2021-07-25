// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import * as Utils from "../Utils/Utils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  HP = 1000;
  @property(cc.Integer)
  defence = 10;
  @property(cc.Integer)
  attack = 0;
  @property(cc.Integer)
  money = 50;
  @property(cc.Node)
  shadow = null;
  @property(cc.Integer)
  row = 0;
  @property(cc.Integer)
  column = 0;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt) {
    if (this.HP < 0) {
      Utils.default.setMapPlace(
        this.node.convertToWorldSpaceAR(this.node.getPosition()),
        false
      );
      this.node.destroy();
    }
  }
}
