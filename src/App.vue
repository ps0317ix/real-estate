<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Header msg="Welcome to Your Vue.js App"/>
    <button>Home</button>
    <button>About</button>
    <component :is=""></component>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

export default {
  data(){
    return(){
      number: 14,
      currentComponent: "Home"

    };
  },
  components: {
    Header,
    Home,
    About
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
