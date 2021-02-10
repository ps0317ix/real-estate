<template>
  <div class="estateedit">
    <h1>物件情報編集</h1>
    <div class="table__wrapper">
      <table class="table is-bordered pricing__table is-fullwidth">
      <tr>
        <td><h2>物件ID：</h2></td>
        <td><p>{{ $route.params.id }}</p></td>
      </tr>
      <tr>
        <td><h2>物件画像：</h2></td>
        <td><img :src="image"></td>
      </tr>
      <tr>
        <td><h2>物件名：</h2></td>
        <td><input type="text" :value="estateName" class="input"></td>
      </tr>
      <tr>
        <td><h2>物件概要：</h2></td>
        <td><textarea type="text" :value="description" class="textarea"></textarea></td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      props: ["id"],
      estateName: '',
      image: '',
      description: ''
    }
  },
  created(){
    let self = this
    const db = firebase.firestore()
    const dbEstate = db.collection('estate').doc(this.$route.params.id)
    dbEstate.get().then(function(doc) {
      if (doc.exists){
        var data = doc.data();
        self.estateName = data.estateName
        self.image = data.image
        self.description = data.description
      } else {
        console.log("No such document!");
      }}).catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    estateupdate() {
      const db = firebase.firestore()
      const dbEstate = db.collection('estate')
      dbEstate.update()
    }
  },
}
</script>

<style scoped>

.estateedit{
  margin: 50px 0px;
}

h1{
  font-size: 32px;
}

.estate-tr{
  height: 100px;
}

h2, img, p{
  margin: 10px;
}

tr{
  padding: 10px;
}

td{
  padding: 0px 10px;
}

td img{
  height: 100px;
  object-fit: cover;
}
</style>
