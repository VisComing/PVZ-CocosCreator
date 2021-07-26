// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../Utils";
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
  @property(cc.Integer)
  speed = 10;
  row = 0;
  column = 0;
  pos: cc.Vec2 = cc.v2(0, 0);

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt) {
    this.pos = this.node.getPosition();
    this.row = Utils.getRow(this.node.convertToWorldSpaceAR(this.pos));
    this.column = Utils.getColumn(this.node.convertToWorldSpaceAR(this.pos));
  }
}
