<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green title fan-fon">{{ msg }}</h1>
    <h3 class="kiwi-fon subtitle">Try Fruit Party slot online for free!</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.title {
  animation: shadow 1.3s linear infinite;
  color: #ffffff;
  animation-iteration-count: infinite;
}
.subtitle{
  color: #FFFFFF;
 
text-shadow: #474747 3px 5px 2px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

@keyframes shadow {
  from {
     color: #FFFFFF;
 
text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;
  }

  to {
    text-shadow: #fff 0px 0px 5px, #fff 0px 0px 10px, #fff 0px 0px 15px,
      #ff2d95 0px 0px 20px, #ff2d95 0px 0px 30px, #ff2d95 0px 0px 40px,
      #ff2d95 0px 0px 50px, #ff2d95 0px 0px 75px;
  }
}
</style>
