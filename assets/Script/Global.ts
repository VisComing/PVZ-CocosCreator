// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import SunCoinNums from "./SunCoinNums/SunCoinNums";
@ccclass
export default class Global extends cc.Component {
  //该类用于管理需要在其他ts文件中调用的ts文件
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}
  static getSunCoinNumsTS(): SunCoinNums {
    return cc
      .find("Canvas/BgMap/SeedBank/SunCoinNums")
      .getComponent("SunCoinNums");
  }
  // update (dt) {}
}
