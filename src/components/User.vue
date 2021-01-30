<template>
  <div id="app">
    <div class="header">
    <ul>
      <li><h1>{{ msg }}</h1></li>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/user">新規登録</router-link>
      </li>
    </ul>
  </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
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
