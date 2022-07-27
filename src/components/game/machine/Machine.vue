<script setup>
import RollsBoard from "./slot-parts/RollsBoard.vue";
import ControlBoard from "./slot-parts/ControlBoard.vue";
</script>
<template lang="">
  <div class="main-parent">
    <div class="main-left"></div>
    <div class="main-machine">
      <div class="slot-main">
        <div class="machine">
          <div class="machine-box">
            <RollsBoard></RollsBoard>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right"></div>
  </div>
  <ControlBoard></ControlBoard>
</template>
<script></script>
<style>
.main-parent {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.main-left,
.main-right {
  flex-grow: 1;
  flex-basis: 0;
}

.slot-main {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  height: 100vh;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.slot-main .machine {
  display: flex;

  flex-direction: column-reverse;
  height: 100vh;
}

.slot-main .machine-box {
  background-attachment: inherit;
  width: 769px;
  background-position-y: bottom;
  background-image: url("./src/assets/img/machine.png");
  background-repeat: no-repeat;
  height: 851px;
  flex: auto;

  display: flex;

  flex-direction: column-reverse;
}

.bg-machine {
  width: 100%;
  margin: auto auto 0 auto;
}
</style>
