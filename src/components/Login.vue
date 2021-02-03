<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">ログイン</h1>
    </div>
    <div class="container">
      <div class="form">
        <label for="email">メールアドレス：</label>
        <input 
          id="email"
          type="email"
          v-model="email"
          class="input"
        >
        <label for="password">パスワード</label>
        <input 
          id="password"
          type="password"
          v-model="password"
          class="input"
        >
        <button @click="login" class="button is-info">ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });
            this.email = '';
            this.password = '';
        }
    }
}
</script>

<style scoped>
  .fv_image{
    background-image: url('../assets/pixta_64405275_M.jpg');
  }
</style>