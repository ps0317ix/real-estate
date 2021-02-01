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

.fv_image{
  height: 400px;
  background-position: center;
}

.fv_image h1{
  margin: 0px;
  text-align: center;
  text-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}

.fv_image_title{
  line-height: 400px;
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
  width: 600px;
  margin: auto;
  padding: 30px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}

.form label{
  display: block;
  padding: 20px 0px 0px 0px;
}

.form input{
  display: block;
  width: 300px;
}

.form textarea{
  display: block;
}

.form button{
  margin: 10px 0px;
}

</style>
