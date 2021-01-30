<template>
  <div class="container">
    <h1>ログイン</h1>
    <div>
      <label for="email">メールアドレス：</label>
      <input 
        id="email"
        type="email"
        v-model="email"
      >
      <label for="password">パスワード</label>
      <textarea 
        id="password"
        type="password"
        v-model="password"></textarea>
      <button @click="login">ログイン</button>
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