<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">管理者</h1>
    </div>
    <div class="container">
      <ul class="admin-text-links">
        <li><router-link to="/administrator/estatecreate" class="admin-text-link">不動産情報登録</router-link></li>
        <li><router-link to="/administrator/estateedit" class="admin-text-link">不動産情報編集</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
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
  margin: 10px 0px;
}

.admin-text-link{
  padding: 10px;
}
</style>
