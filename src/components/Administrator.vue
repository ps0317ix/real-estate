<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">管理者</h1>
    </div>
    <transition
       name="fade"
       appear
      >
    <div class="container">
      <ul class="admin-text-links">
        <li><router-link to="/administrator/adminhome" class="admin-text-link">管理者ホーム</router-link></li>
        <li><router-link to="/administrator/estateall" class="admin-text-link">不動産情報一覧(編集・削除)</router-link></li>
        <li><router-link to="/administrator/estatecreate" class="admin-text-link">不動産情報登録</router-link></li>
        <li><router-link to="/administrator/importcsv" class="admin-text-link">CSVインポート</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
    </transition>
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

<style scoped>

.fv_image{
  background-image: url('../assets/pixta_64405275_M.jpg');
}

.admin-text-links{
  display: flex;
  margin: 20px 0px;
}

.admin-text-link{
  padding: 10px;
  border: 1px solid #3273dc;
  border-radius: 10px;
  margin: 10px;
}
</style>
