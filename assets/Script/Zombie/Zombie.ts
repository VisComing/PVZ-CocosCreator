// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import Global from "../Global";
import Utils from "../Utils";
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  speed: number = 10;
  distance = 1000;
  // LIFE-CYCLE CALLBACKS:
  animation: cc.Animation = null;

  zombieState: string = "";
  onLoad() {
    this.animation = this.node
      .getChildByName(this.node.name)
      .getComponent(cc.Animation);
    this.animation.play("Zombie");

    //当所有动画结束时，也就是僵尸被炸死时
    this.animation.on("finished", this.onBoomDie, this);
  }

  zombieWalk(): void {
    this.zombieState = "WALK";
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
    this.zombieState = "WALK";
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

  //僵尸受到攻击，如果僵尸死了返回true
  zombieUnderAttack(attack: number): boolean {
    this.node.getComponent("ZombieBaseInfo").HP -= Utils.caculMinusHP(
      attack,
      this.node.getComponent("ZombieBaseInfo").defence
    );
    const zombieHP = this.node.getComponent("ZombieBaseInfo").HP;
    if (zombieHP <= 50) {
      if (this.zombieState == "WALK") {
        this.zombieState = "NOHEADWALK";
        this.zombiePlayLostHead();
      } else if (this.zombieState == "ATTACK") {
        this.zombieState = "NOHEADATTACK";
        this.animation.stop();
        this.animation.play("ZombieHead");
        this.animation.play("ZombieLostHeadAttack");
      }
    }
    if (zombieHP > 0) {
      return false;
    }
    this.animation.play("ZombieDie");
    return true;
  }

  zombieBoomDie(): void {
    this.animation.stop();
    this.node.stopAllActions();
    this.animation.play("ZombieBoomDie");
  }

  onBoomDie(): void {
    cc.log("on boom die");
    this.node.destroy();
  }
  start() {}

  update(dt) {
    const zombieHP: number = this.node.getComponent("ZombieBaseInfo").HP;
    if (
      //更改这函数里的判定攻击逻辑。
      Global.getPlantManagerTS().hasPlantInBoundingBox(
        this.node.getBoundingBoxToWorld(),
        this.node.convertToWorldSpaceAR(this.node.parent.getPosition())
      )
    ) {
      //攻击
      //改变僵尸状态
      if (this.zombieState == "WALK") {
        this.zombieState = "ATTACK";
        this.zombieStopWalk();
        this.zombiePlayAttack();
      } else if (this.zombieState == "NOHEADWALK") {
        this.zombieState = "NOHEADATTACK";
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
      if (this.zombieState == "ATTACK") {
        this.zombieState = "WALK";
        this.zombieResumeWalk();
        this.zombiePlayWalk();
      } else if (this.zombieState == "NOHEADATTACK") {
        this.zombieState = "NOHEADWALK";
        this.zombieResumeWalk();
        this.zombiePlayLostHead();
      } else {
        //正常行走
      }
    }

    if (zombieHP <= 0) {
      this.animation.stop();
      this.animation.play("ZombieDie");
    }
  }
}
