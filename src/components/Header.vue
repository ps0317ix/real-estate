<template>
  <header>
    <h1><router-link to="/">{{ msg }}</router-link></h1>
    <ul>
      <li>
        <router-link to="/about" class="header-text-link">About</router-link>
      </li>
      <template v-if="isAuthenticated">
        <template v-if="isAdministrator">
          <li>
            <router-link to="/administrator" class="header-text-link">管理者ホーム</router-link>
          </li>
          <li>
            <router-link to="/administrator/estatecreate" class="header-text-link">不動産情報登録</router-link>
          </li>
        </template>
        <template v-if="!isAdministrator">
          <li>
            <router-link to="/user" class="header-text-link">ユーザー</router-link>
          </li>
        </template>
        <li>
          <a @click="logout" class="header-text-link">ログアウト</a>
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
    },
    isAdministrator(){
      const admin = localStorage.getItem('admin');
      return admin === 'true';
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
  position: fixed;
  width: 100%;
  height: 84px;
  padding: 0px 10px;
  background: #42b983;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  opacity: 1;
}

header ul {
  list-style-type: none;
  padding: 0px 40px;
  margin: 0px;
  position: absolute;
  right: 0;
}

h1{
  font-size: 32px;
  line-height: 84px;
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

.header-link{
  line-height: 84px;
  font-size: 32px;
}

.header-text-link{
  display: block;
  margin: 30px 0px;
}
</style>
