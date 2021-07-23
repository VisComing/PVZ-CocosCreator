// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    sunPrefab: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:
    interval: number = 2;
    sunDropSpeed: number = 150;
    onLoad () {
        
    }

    start () {
        this.schedule(this.onTimer, this.interval);
    }

    onTimer() {
        let sun = cc.instantiate(this.sunPrefab);
        if(sun == null) {
            cc.error("sun is null!\n");
            return;
        }
        sun.parent = this.node;
        const x: number = cc.math.randomRangeInt(-400, 300);
        sun.setPosition(cc.v3(x, 330));
        const y: number = cc.math.randomRangeInt(-10, -240);
        cc.tween(sun)
            .to((330 - y) / this.sunDropSpeed, {position: cc.v3(x, y)})
            .start();
    }
    // update (dt) {}
}
