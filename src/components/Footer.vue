<template>
  <footer>
    <h1><router-link to="/" class="footer-link">{{ msg }}</router-link></h1>
    <ul>
      <template v-if="!isAuthenticated">
        <li>
          <router-link to="/about" class="footer-text-link">About</router-link>
        </li>
      </template>
      <template v-if="isAuthenticated">
        <template v-if="isAdministrator=='true'">
          <li>
            <router-link to="/administrator" class="footer-text-link">管理者ホーム</router-link>
          </li>
          <li>
            <router-link to="/administrator/estateall" class="footer-text-link">不動産情報一覧(編集・削除)</router-link>
          </li>
          <li>
            <router-link to="/administrator/estatecreate" class="footer-text-link">不動産情報登録</router-link>
          </li>
        </template>
        <template v-if="isAdministrator!='true'">
          <li>
            <router-link to="/user" class="footer-text-link">ユーザー</router-link>
          </li>
        </template>
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
    },
    isAdministrator(){
      const admin = localStorage.getItem('admin')
      return admin
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
