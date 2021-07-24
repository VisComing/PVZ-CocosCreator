// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // onLoad () {}

  start() {}
  static getSunCoinNums(): number {
    return parseInt(
      cc.find("Canvas/BgMap/SeedBank/SunCoinNums").getComponent(cc.Label).string
    );
  }
  //pos: 世界坐标，一般为e.getLocation()
  static canPlacePlant(pos: cc.Vec2): boolean {
    let x = pos.x;
    let y = pos.y;
    const arr = cc.find("Canvas/BgMap").getComponent("MapProperty").mapArray;

    if (x < 1000 && x > 236 && y < 510 && y > 30) {
      if (x > 236 && x < 333) x = 289;
      else if (x < 405) x = 372;
      else if (x < 493) x = 456;
      else if (x < 574) x = 535;
      else if (x < 652) x = 619;
      else if (x < 734) x = 695;
      else if (x < 815) x = 774;
      else if (x < 896) x = 857;
      else if (x < 1000) x = 945;
      if (y > 30 && y < 129) y = 80;
      else if (y < 219) y = 175;
      else if (y < 320) y = 274;
      else if (y < 419) y = 375;
      else if (y < 510) y = 475;
      if (arr[Math.floor((x - 200) / 90)][Math.floor(y / 100)] == false)
        return true;
      else return false;
    }
    return false;
  }
  //pos：世界坐标
  //返回世界坐标
  static getPlantRightPlace(pos: cc.Vec2): cc.Vec2 {
    let x = pos.x;
    let y = pos.y;
    const arr = cc.find("Canvas/BgMap").getComponent("MapProperty").mapArray;

    if (x < 1000 && x > 236 && y < 510 && y > 30) {
      if (x > 236 && x < 333) x = 289;
      else if (x < 405) x = 372;
      else if (x < 493) x = 456;
      else if (x < 574) x = 535;
      else if (x < 652) x = 619;
      else if (x < 734) x = 695;
      else if (x < 815) x = 774;
      else if (x < 896) x = 857;
      else if (x < 1000) x = 945;
      if (y > 30 && y < 129) y = 80;
      else if (y < 219) y = 175;
      else if (y < 320) y = 274;
      else if (y < 419) y = 375;
      else if (y < 510) y = 475;
      if (arr[Math.floor((x - 200) / 90)][Math.floor(y / 100)] == false)
        return cc.v2(x, y);
      else return cc.v2(0, 0);
    }
    return cc.v2(0, 0);
  }
  static canPlaceZombie(pos: cc.Vec2): boolean {
    return false;
  }
  // update (dt) {}
}
