<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">User</h1>
    </div>
    <div class="container">
      <h1>{{ displayName }}さま、こんにちは</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      displayName: ''
    }
  },
  created() {
    this.displayName = localStorage.getItem('displayName');
  },
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
