// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  mapArray: Array<Array<boolean>> = new Array(5);

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    for (let i = 0; i < this.mapArray.length; i++) {
      this.mapArray[i] = new Array(9);
    }
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 9; j++) this.mapArray[i][j] = false;
  }

  // update (dt) {}
}
