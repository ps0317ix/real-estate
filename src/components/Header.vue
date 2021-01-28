<template>
  <div class="header">
    <ul>
      <li><h1>{{ msg }}</h1></li>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <input
       type="text"
       :value="message"
       @input="updateMessage"
      >
    </ul>
  
    
  </div>
</template>

<script>
import {mapAction} from 'vuex';

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapAction(["doubleCount"]),
    message(){
      return this.$store.getters.message;
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  display: flex;
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
