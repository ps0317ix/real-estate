<template>
  <div class="container">
    <h1>新規登録</h1>
    <div class="form">
      <label for="email">メールアドレス：</label>
      <input 
        id="email"
        type="email"
        v-model="email"
      >
      <label for="password">パスワード</label>
      <input 
        id="password"
        type="password"
        v-model="password">
      <button @click="register">ログイン</button>
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
        register(){
            this.$store.dispatch('register', {
                email: this.email,
                password: this.password
            });
            this.email = '';
            this.password = '';
        }
    }
}
</script>