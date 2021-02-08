<template>
  <div>
    <div class="fv_image">
      <h1 class="fv_image_title">新規登録</h1>
    </div>
    <div class="container">
      <div class="form">
        <label for="displayName">アカウント名：</label>
        <input 
          id="displayName"
          type="displayName"
          v-model="displayName"
          class="input"
        >
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
        <button @click="register" class="button is-info">ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            displayName: '',
            email: '',
            password: ''
        }
    },
    methods:{
        register(){
            this.$store.dispatch('register', {
                displayName: this.displayName,
                email: this.email,
                password: this.password
            });
            this.displayName = '',
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