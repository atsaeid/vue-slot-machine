<!-- eslint-disable prettier/prettier -->
<template>
  <div class="control-parent">
    <div class="slot-controller">
      <div class="controller-box">
        <div class="ctrl-item main-left">
          <span class="slot-bet">{{bet}}</span>
          <span class="slot-win">
           {{win}}</span>
        </div>
        <div class="ctrl-item">
          <a href="#" class="starter" ref="gameStarter" :class="{isRuning:'runing'}" @click="setSpin()">SPIN</a>
        </div>
        <div class="ctrl-item main-right">
          <span class="slot-cashout" @click="checkout()">CASH<br />OUT</span>
          <span class="slot-balance"><p class="sb">{{credit}}</p></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useSlot } from "@/store/useSlot";
export default {
  data() {
    return {
      isRuning: false,
    };
  },
  computed: {
    bet() {
      return this.balanceStore.getCurrnetBet;
    },
    win() {
      return this.balanceStore.getWinRate;
    },
    credit() {
      return this.balanceStore.balance;
    },
  },
  methods: {
    ...mapActions(useSlot, ["setSpin", "checkout"]),
  },
  setup() {
    const _balancer = useSlot();
    return { balanceStore: _balancer };
  },
};
</script>
<style scoped>
.controller-box {
  display: flex;
  width: 100%;
  align-content: space-between;
}

.ctrl-item {
  flex: 1;
}

.ctrl-item .slot-bet {
  font-size: 25px;
  font-weight: bolder;
  font-family: "Boldies Regular" !important;
  margin-left: 66px;
  margin-top: 56px;
  position: absolute;
  color: #ffffff;
  text-shadow: 0px 1px 10px #444444;
  cursor: default;
}

.ctrl-item .slot-win {
  font-size: 25px;
  font-weight: bolder;
  font-family: "Boldies Regular" !important;
  margin-left: 93px;
  margin-top: 111px;
  position: absolute;
  color: #ffffff;
  text-shadow: 0px 1px 10px #444444;
  cursor: default;
}
.ctrl-item .starter {
  font-size: 48px;
  font-weight: bolder;
  font-family: "Free Pokies Regular" !important;
  margin-left: 71px;
  margin-top: 67px;
  position: absolute;
  color: #ffffff;
  text-shadow: 0px 1px 10px #444444;
  cursor: pointer;
}
.ctrl-item .slot-cashout {
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
  font-family: "Free Pokies Regular" !important;
  margin-left: 25px;
  margin-top: 77px;
  position: absolute;
  color: #ffffff;
  text-shadow: 0px 1px 10px #444444;
  cursor: pointer;
}

.ctrl-item .slot-balance {
  text-align: center;
  font-size: 26px;
  font-weight: bolder;
  font-family: "Free Pokies Regular" !important;
  margin-left: 133px;
  margin-top: 84px;
  position: absolute;
  color: #fcff42;
  text-shadow: 0px 1px 10px #444444;
  cursor: default;
  width: 77px;
}
.ctrl-item a.starter:not(.runing):hover {
  color: #c04c4c;
  text-shadow: 0px 1px 10px #050404;
}

.ctrl-item a.starter:not(.runing):active {
  color: #f78b8b;
  text-shadow: 0px 1px 10px red;
}

.ctrl-item a.starter.runing {
  color: #b32222;
  text-shadow: 0px 1px 10px #b32222;
}
.control-parent {
  margin-left: 15px;
  margin-bottom: 5px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  height: auto;
  position: fixed;
}
.slot-controller {
  background-attachment: inherit;
  width: 751px;
  background-position-y: bottom;
  background-image: url("@/assets/img/control.png");

  background-repeat: no-repeat;

  display: flex;
  align-self: flex-end;
  height: 213px;
}
</style>
