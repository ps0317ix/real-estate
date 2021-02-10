<template>
  <div>
    <div class="container">
      <h2>管理者画面です</h2>
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
  margin: 20px 0px;
}

.admin-text-link{
  padding: 10px;
}
</style>
