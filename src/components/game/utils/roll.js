import { useSlot } from "@/store/useSlot";
import  "./helper";
const Roll = function (canvas, offsetX = 0, conf) {
  const balanceStore = useSlot();
  //generate img objects for a roll
  this.rollMap = conf.imgMap.shuffle().map((text, index) => ({
    offsetY: conf.roll.height * conf.imgStartPts[index],
    key: text,
  }));
  this.fnc = null;
  this.spinning = false;
  this.finalAnimation = false;
  this.clickTime = 0;
  this.showedLastAnim = false;
  this.clicked = false;
  // this.mode = 'random';
  this.fixedPlace = "middle";
  this.fixedImg = "Lemon";
  this.finalShapes = [];
  //clear whole roll
  const clear = function () {
    canvas.clearRect(offsetX, conf.height, conf.roll.width, conf.height);
  };

  //draw image to specific point
  const draw = function (key = "Lemon", offsetY = 0, blur = 0) {
    if (conf.img.hasOwnProperty(key)) {
      clear();

      canvas.strokeStyle = "#3E1A42";
      canvas.filter = `blur(${blur}px)`;
      canvas.lineWidth = 4;
      canvas.fillRect(offsetX, offsetY, conf.roll.width, conf.roll.height);
      canvas.strokeRect(offsetX, offsetY, conf.roll.width, conf.roll.height);
      canvas.drawImage(conf.img[key], offsetX, offsetY);
      canvas.filter = "none";
    }
  };

  this.spinAnimation = function (skip) {
    if (!this.spinning) return;

    this.rollMap.forEach((img) => {
      img.offsetY += conf.pSkip;
      //reset prev and jump very top
      if (img.offsetY >= conf.height) {
        img.offsetY = conf.roll.height * -3;
      }

      //draw img object
      draw(img.key, img.offsetY, 5);
    });
  };

  this.generateRollShapesFixed = function () {
    let imgMp = conf.imgMap.filter((x) => x !== this.fixedImg);
    let rndImg2 = imgMp.rnd();
    imgMp.splice(imgMp.indexOf(rndImg2), 1);
    let rndImg3 = imgMp.rnd();
    return [
      {
        offsetY: -120,
        key: rndImg2,
        stop: -60,
      },
      {
        offsetY: -60,
        key: this.fixedImg,
        stop: 60,
      },
      {
        offsetY: 120,
        key: rndImg3,
        stop: 180,
      },
    ];
  };

  this.generateRollShapesRandom = function () {
    let imgMp = conf.imgMap.map((x) => x);
    let rndImg1 = imgMp.rnd();
    imgMp.splice(imgMp.indexOf(rndImg1), 1);
    let rndImg2 = imgMp.rnd();
    imgMp.splice(imgMp.indexOf(rndImg2), 1);
    let rndImg3 = imgMp.rnd();

    let rnd = 0; //[0, 60].rnd();
    return [
      {
        offsetY: -205 + rnd,
        key: rndImg1,
        stop: -60 + rnd,
      },
      {
        offsetY: -80 + rnd,
        key: rndImg2,
        stop: 60 + rnd,
      },
      {
        offsetY: 60 + rnd,
        key: rndImg3,
        stop: 180 + rnd,
      },
    ];
  };

  this.setFinalShapes = function () {
    return this.generateRollShapesRandom();
  };

  this.spin2point = function () {
    if (!this.finalAnimation) {
      if (typeof this.fnc === "function") {
        this.fnc();
        this.fnc = null;
      }

      return;
    }

    let stopPt;
    this.finalShapes.forEach((img) => {
      if (img.hasOwnProperty("stop")) {
        stopPt = img.stop;
      }
      let inx = 6;
      if (img.offsetY + inx === stopPt) {
        this.finalAnimation = false;
      }
      img.offsetY += inx;

      //draw img object
      draw(img.key, img.offsetY);
    });
  };

  this.done = function (fn) {
    this.fnc = fn;
    balanceStore.setStatus(false);
  };
};

export default Roll;
