<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">管理者</h1>
    </div>
    <div class="container">
      <h1>管理者さま、こんにちは</h1>
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
</style>
