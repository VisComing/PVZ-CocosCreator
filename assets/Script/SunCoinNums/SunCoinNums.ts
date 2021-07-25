// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SunCoinNums extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {
  // }

  start() {}

  sunCoinNumsPlus(num: number) {
    this.node.getComponent(cc.Label).string = (
      parseInt(this.node.getComponent(cc.Label).string) + num
    ).toString();
  }
  sunCoinNumsMinus(num: number) {
    this.sunCoinNumsPlus(-num);
  }
  getSunCoinNums(): number {
    return parseInt(this.node.getComponent(cc.Label).string);
  }

  // update (dt) {}
}
