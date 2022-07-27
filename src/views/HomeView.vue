<script setup>
import { RouterLink } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
</script>

<template>
  <main>
    <header>
      <div class="wrapper home">
        <HelloWorld msg="Play Fruit Party!" />
        <nav>
          <RouterLink to="/game" class="get-started"
            >Let's get this game started</RouterLink>
        </nav>
      </div>
    </header>
    <img
      alt="Game Banner"
      class="home-banner hidden-mobile"
      src="@/assets/img/banner.png"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.home-banner {
  position: fixed;
  right: 65px;
  max-width: 483px;
  bottom: 10px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1.1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.get-started {
      backface-visibility: hidden;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  background: linear-gradient(180deg,#ce8 0%,#592 100%);
  border-radius: 100px;
  border: 0.5px solid #8c4;
  border-width: 0.5px 0.5px 0.5px 0.5px;
  padding: 7px 20px 9px 20px;
  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6),0px 1px 2px rgba(0,0,0,0.5);
    color: #372;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5)
}

.get-started:hover {
  box-shadow: inset 0px 1px 10px rgba(255,255,255,0.6),0px 1px 12px rgba(0,0,0,0.5);
    color: rgb(24, 85, 9);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
