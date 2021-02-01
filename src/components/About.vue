<template>
  <div class="container">
    <h1>About</h1>
    <router-link to="/about/1">About1</router-link>
    <router-link to="/about/2">About2</router-link>
    <p>{{ id }}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: ["id"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
