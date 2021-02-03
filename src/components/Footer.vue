<template>
  <footer>
    <h1><router-link to="/" class="footer-link">{{ msg }}</router-link></h1>
    <ul>
      <li>
        <router-link to="/about" class="footer-text-link">About</router-link>
      </li>
      <template v-if="isAuthenticated">
        <li>
          <a @click="logout" class="footer-text-link">ログアウト</a>
        </li>
      </template>
      <template v-if="!isAuthenticated">
        <li>
          <router-link to="/login" class="header-text-link">ログイン</router-link>
        </li>
        <li>
          <router-link to="/register" class="header-text-link">新規登録</router-link>
        </li>
        <li>
          <router-link to="/register" class="header-text-link">管理者ログイン</router-link>
        </li>
      </template>
    </ul>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
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
footer{
  display: flex;
  width: 100%;
  padding: 0px 10px;
}

.footer-link{
  line-height: 84px;
  font-size: 28px;
}

footer ul {
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

footer ul li{
  font-weight: 900;
}

a {
  color: #42b983;
  text-decoration: none;
}

.footer-text-link{
  display: block;
  margin: 30px 0px;
}
</style>
