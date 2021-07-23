// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Integer)
    coinNum = 25;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("sunCoinNumsPlus", this.onSunCoinNumsPlus, this);
        if(this.label == null) {
            cc.error("label is null!\n");
        } 
    }

    start () {

    }

    onSunCoinNumsPlus(e: cc.Event.EventCustom) {
        e.stopPropagation();
        this.label.string = (parseInt(this.label.string) + this.coinNum).toString();
    }
    // update (dt) {}
}
