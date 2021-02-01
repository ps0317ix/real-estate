<template>
  <div class="container">
    <h1>Home</h1>
    <div class="form">
      <label for="name">名前：</label>
      <input 
        id="name"
        type="text"
        v-model="name"
      >
      <label for="comment">コメント：</label>
      <textarea 
        id="comment" 
        v-model="comment"></textarea>
      <button @click="createComment">コメントをサーバーに送る</button>
      <h2>掲示板</h2>
      <div v-for="post in posts" :key="post.name">
        <div>
          名前：{{ post.fields.name.stringValue }}
          コメント：{{ post.fields.comment.stringValue }}
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
        comment: "",
        posts: []
      }
  },
  created() {
      axios.get(
        '/comments',{
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      }).then(response => {
        this.posts = response.data.documents;
        console.log(response.data.documents);
      });
  },
  methods: {
    createComment() {
      axios
        .post(
          '/comments',
          {
            fields: {
              name: {
                stringValue: this.name
              },
              comment: {
                stringValue: this.comment
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
        this.comment = "";
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
</style>
