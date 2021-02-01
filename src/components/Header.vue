<template>
  <header>
    <h1><router-link to="/" class="header-link">{{ msg }}</router-link></h1>
    <ul>
      <li>
        <router-link to="/about" class="header-text-link">About</router-link>
      </li>
      <template v-if="isAuthenticated">
        <li>
          <router-link @click="logout" class="header-text-link">ログアウト</router-link>
        </li>
      </template>
      <template v-if="!isAuthenticated">
        <li>
          <router-link to="/login" class="header-text-link">ログイン</router-link>
        </li>
        <li>
          <router-link to="/register" class="header-text-link">新規登録</router-link>
        </li>
      </template>
    </ul>
  </header>
</template>

<script>

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    isAuthenticated(){
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  display: flex;
  width: 100%;
  padding: 0px 10px;
  background: #42b983;
}

header ul {
  list-style-type: none;
  padding: 0px 40px;
  margin: 0px;
  position: absolute;
  right: 0;
}

li {
  display: inline-block;
  margin: 0 20px;
}

header ul li{
  font-weight: 900;
}

a {
  color: #fff;
  text-decoration: none;
}

.header-text-link{
  display: block;
  margin: 30px 0px;
}
</style>
