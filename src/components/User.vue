<template>
  <div id="app">
    <div class="container">
      <h1>〜さま、こんにちは</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container{
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
</style>
