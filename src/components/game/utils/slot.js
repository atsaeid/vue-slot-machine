import range from "./ranger";
import Roll from "./roll";
import  "./helper";
import { useSlot } from "@/store/useSlot";

const Slot = function (canvas, conf) {
  const balanceStore = useSlot();

  this.canvas = canvas;
  let auto = false;
  let rolls = [...range(1, 3)].map(
    (i) => new Roll(canvas, conf.roll.xOffsets[i - 1], conf)
  );
  let delta = 0;
  let currentSpin = [];

  this.setCredits = function () {
    conf.player.money = balanceStore.balance;

    return this;
  };

  this.spin = function () {
    // conf.win.value = 0;
    conf.sound.spin.play();
    if (balanceStore.balance <= 0) {
      conf.sound.spin.currentTime = 0;
      conf.sound.spin.pause();
      alert("You dont have enough credits!");
      auto = false;

      return;
    }
    currentSpin = [];
    rolls.forEach((roll) => {
      roll.clicked = true;
      roll.finalAnimation = false;
      roll.finalShapes = roll.setFinalShapes();
      currentSpin.push(roll.finalShapes);
    });
  };

  this.loop = function (now) {
    rolls.forEach((roll, i) => {
      this.drawStopPoints();
      //init spin animation
      roll.spinAnimation();
      roll.spin2point();

      if (roll.clicked) {
        roll.clicked = false;
        roll.clickTime = now;
        roll.spinning = true;
      }

      delta = now - roll.clickTime;
      if (delta > conf.roll.animTimes[i] && roll.spinning) {
        roll.finalAnimation = true;
        roll.spinning = false;

        if (i === 2) {
          roll.done(() => {
            //reset sound and stop
            conf.sound.spin.currentTime = 0;
            conf.sound.spin.pause();
            check(currentSpin);
            // if (auto) {
            //   setTimeout(
            //     function () {
            //       conf.spinBtn.click();
            //     },
            //     won ? conf.autoModeDelay : 300
            //   );
            // }
          });
        }
      }
    });
  };

  this.start = function () {
    balanceStore.setStatus(true);
    conf.sound.win.volume = 1.0;
    conf.sound.spin.volume = 0.8;
    rolls.forEach((roll) => {
      roll.clicked = true;
      roll.finalAnimation = false;
      roll.finalShapes = roll.setFinalShapes();
    });
    rolls.forEach((roll, i) => {
      roll.clicked = false;
      roll.finalAnimation = true;
      roll.spinning = false;
    });
    return this;
  };

  this.drawStopPoints = function () {
    this.canvas.strokeStyle = "#3E1A42";
    this.canvas.strokeRect(0, 60, 5, 0);
    this.canvas.strokeRect(conf.width - 5, 60 - 2, 5, 0);
  };

  let check = function (rolls) {
    if (
      rolls[0][0].stop !== rolls[1][0].stop ||
      rolls[1][0].stop !== rolls[2][0].stop
    ) {
      //no win
      return;
    }

    let sum = {
      top: 0,
      middle: 0,
      bottom: 0,
    };

    //coefficient
    let bet = balanceStore.getCurrnetBet * 1;

    let highlightPts = [];
    //all rolls are aligned in one line
    for (let r = 0; r < rolls.length; r++) {
      let roll1 = rolls[0][r],
        roll2 = rolls[1][r],
        roll3 = rolls[2][r];
      let rollsStr = roll1.key + roll2.key + roll3.key;
      //middle line
      if (roll1.stop === 60) {
        if (rollsStr.match(/(Lemon){3}/g)) sum.middle += bet * 1;
        else if (rollsStr.match(/(Orange){3}/g)) sum.middle += bet * 1;
        else if (rollsStr.match(/(Watermelon){3}/g)) sum.middle += bet * 1;
        else if (rollsStr.match(/(Cherry){3}/g)) sum.middle += bet * 1;
        if (sum.middle !== 0) {
          highlightPts.push(60 + conf.roll.height / 2);
        }
      }
    }

    //heightlight winner row
    let margin = 10;
    highlightPts.forEach((i) => {
      canvas.beginPath();
      canvas.moveTo(margin, i - 2);
      canvas.lineTo(conf.width - margin, i - 2);
      canvas.strokeStyle = "#FF0000";
      canvas.stroke();
    });

    let totalSum = sum.top + sum.middle + sum.bottom;
    // conf.player.money += totalSum;
    if (totalSum !== 0) {
      conf.sound.win.play();
      balanceStore.setRate(totalSum);
      return true;
    }
    return false;
  };
};

export default Slot;
