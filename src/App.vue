<template>
  <div id="app">
    <Header msg="Real estate App"/>
    <router-view></router-view>
    <Footer msg="Real estate App"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

.container{
  width: 95%;
  max-width: 1200px;
  margin: auto;
}

body{
  margin: 0px;
}

.form{
  display: block;
  width: 350px;
  margin: auto;
  padding: 30px 0px;
}

.form label{
  display: block;
  padding: 20px 0px 0px 0px;
}

.form input{
  display: block;
  width: 300px;
  margin: auto;
}

.form textarea{
  display: block;
}

.form button{
  margin: 10px 0px;
}

</style>
