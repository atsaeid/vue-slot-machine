<template lang="">
  <canvas id="slotcancas" ref="slotcancas" width="440" height="202"></canvas>
</template>

<style scoped>
#slot {
  background-color: rgb(218, 131, 19);
}
</style>

<script setup>
import Resources from "../../utils/resources";
import Slot from "../../utils/slot";
import range from "../../utils/ranger";
import { useSlot } from "@/store/useSlot";

</script>
<script>
export default {
  data() {
    return {
      _slotConfig: {},
      _balancer: useSlot(),
    };
  },
  mounted() {
    const conf = {
      fps: 60,
      img: [],
      width: 420 + 20,
      height: 202,
      canvas: document.querySelector("#slotcancas"),
      roll: {
        width: 125,
        height: 125,
        xOffsets: [0, 145, 305].map((x) => x + 10),
        animTimes: [20, 30, 40].map((x) => x * 100),
      },
      pSkip: 40,
      imgMap: ["Lemon", "Orange", "Watermelon", "Cherry"],
      imgStartPts: [...range(-2, 2)],
      player: {
        money: 10,
      },
      imgDot: null,
      autoModeDelay: 3000,
      sound: {
        win: new Audio("/src/assets/sound/win.mp3"),
        spin: new Audio("/src/assets/sound/spin.mp3"),
      },
      startSpinFunc: null,
    };

    Resources(
      "/src/assets/img/lemon.png",
      "/src/assets/img/orange.png",
      "/src/assets/img/watermelon.png",
      "/src/assets/img/cherry.png"
    ).onLoad(function (_resList, names) {
      if (_resList instanceof Array) {
        conf.imgMap.forEach((i, j) => (conf.img[i] = _resList[j]));
      }

      //sounds load
      conf.sound.win.load();
      conf.sound.spin.load();
      //instantiation the game
      (function (_slot) {
        let fps = conf.fps,
          interval = 1000 / fps,
          delta,
          lastpUpdate = 0;
        conf.startSpinFunc = _slot.spin;

        //init game
        _slot.start();
        //core function of the game
        (function update(now) {
          delta = now - lastpUpdate;
          if (delta > interval) {
            lastpUpdate = now - (delta % interval);
            _slot.loop(now);
          }
          window.requestAnimationFrame(update);
        })();
      })(new Slot(conf.canvas.getContext("2d"), conf));
    });
    this._slotConfig = conf;
  },
  methods: {},
  watch: {
    _balancer: {
      handler(val) {
        const blc = val.balance;
        const isOrder = val.getStatus;
        if (blc >= 0 && isOrder) {
          this._slotConfig.startSpinFunc();
        }
      },
      deep: true,
    },
  },
};
</script>
