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
  HP = 1000;
  @property(cc.Integer)
  defence = 10;
  @property(cc.Integer)
  attack = 0;
  @property(cc.Integer)
  money = 50;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}
}
