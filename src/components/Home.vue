<template>
  <div class="">
    <div class="fv_image">
      <h1 class="fv_image_title">Home</h1>
    </div>
    <div class="container">
      <transition
       name="fade"
       appear
      >
        <div class="our_service">
          <h2>OUR SERVICE</h2>
        </div>
      </transition>
      
      <div class="form">
        <h2>お問い合わせ</h2>
        <label for="name">名前：</label>
        <input 
          id="name"
          type="text"
          v-model="name"
          class="input"
        >
        <label for="contactEmail">メールアドレス：</label>
        <input 
          id="email"
          type="email"
          v-model="contactEmail"
          class="input"
        >
        <label for="detail">問い合わせ内容：</label>
        <textarea 
          id="detail" 
          v-model="detail"
          class="textarea"
        ></textarea>
        <button @click="createContacts" class="button is-info">送信</button>
        
        <div v-for="post in posts" :key="post.name">
          <h2>問い合わせ内容</h2>
          <div>
            名前：{{ post.fields.name.stringValue }}
            メールアドレス：{{ post.fields.contactEmail.stringValue }}
            問い合わせ内容：{{ post.fields.detail.stringValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'Home',
    props: {
      msg: String
  },
    data(){
      return{
        name: "",
        contactEmail: "",
        detail: "",
        posts: []
      }
  },
  created() {
      axios.get(
        '/contact',{
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      }).then(response => {
        this.posts = response.data.documents;
        console.log(response.data.documents);
      });
  },
  methods: {
    createContacts() {
      axios
        .post(
          '/contact',
          {
            fields: {
              name: {
                stringValue: this.name
              },
              contactEmail: {
                stringValue: this.contactEmail
              },
              detail: {
                stringValue: this.detail
              }
            }
          },
          {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
       )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        this.name = "";
        this.contactEmail = "";
        this.detail = "";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fv_image{
  background-image: url('../assets/pixta_64405275_M.jpg');
}

.our_service{
  width: 100%;
  margin: -50px 0px 0px 0px;
  background: #fff;
  line-height: 100px;
  padding: 0px 0px 0px 10px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}
</style>
