// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import Global from "../Global";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  speed: number = 10;
  distance = 1000;
  // LIFE-CYCLE CALLBACKS:
  animation: cc.Animation = null;
  State = {
    WALK: 1,
    ATTACK: 2,
    NOHEADWALK: 3,
    NOHEADATTACK: 4,
  };
  zombieState;
  onLoad() {
    this.animation = this.node
      .getChildByName(this.node.name)
      .getComponent(cc.Animation);
    this.animation.play("Zombie");
  }

  zombieWalk(): void {
    this.zombieState = this.State.WALK;
    cc.tween(this.node)
      .by(this.distance / this.speed, {
        position: cc.v3(-this.distance, 0),
      })
      .start();
  }

  zombieStopWalk(): void {
    this.node.stopAllActions();
  }

  zombieResumeWalk(): void {
    this.zombieState = this.State.WALK;
    cc.tween(this.node)
      .by(this.distance / this.speed, {
        position: cc.v3(-this.distance, 0),
      })
      .start();
  }

  zombiePlayWalk(): void {
    this.animation.stop();
    this.animation.play("Zombie");
  }

  zombiePlayAttack(): void {
    this.animation.stop();
    this.animation.play("ZombieAttack");
  }

  zombiePlayLostHead(): void {
    this.animation.stop();
    this.animation.play("ZombieHead");
    this.animation.play("ZombieLostHead");
  }

  zombiePlayLostHeadAttack(): void {
    this.animation.stop();
    this.animation.play("ZombieLostHeadAttack");
  }

  zombiePlayDie(): void {
    this.animation.stop();
    this.animation.play("ZombieDie");
  }

  start() {}

  update(dt) {
    if (
      //更改这函数里的判定攻击逻辑。
      Global.getPlantManagerTS().hasPlantInBoundingBox(
        this.node.getBoundingBoxToWorld(),
        this.node.convertToWorldSpaceAR(this.node.parent.getPosition())
      )
    ) {
      //攻击
      //改变僵尸状态
      if (this.zombieState == this.State.WALK) {
        this.zombieState = this.State.ATTACK;
        this.zombieStopWalk();
        this.zombiePlayAttack();
      } else if (this.zombieState == this.State.NOHEADWALK) {
        this.zombieState = this.State.NOHEADATTACK;
        this.zombieStopWalk();
        this.zombiePlayLostHeadAttack();
      } else {
        //攻击状态
      }
      Global.getPlantManagerTS().attackPlantInBouding(
        this.node.getBoundingBoxToWorld(),
        this.node.convertToWorldSpaceAR(this.node.parent.getPosition()),
        this.node.getComponent("ZombieBaseInfo").attack
      );
    } else {
      if (this.zombieState == this.State.ATTACK) {
        this.zombieState = this.State.WALK;
        this.zombieResumeWalk();
        this.zombiePlayWalk();
      } else if (this.zombieState == this.State.NOHEADATTACK) {
        this.zombieState = this.State.NOHEADWALK;
        this.zombieResumeWalk();
        this.zombiePlayLostHead();
      } else {
        //正常行走
      }
    }
  }
}
