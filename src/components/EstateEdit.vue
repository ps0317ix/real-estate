<template>
  <table>
    <tr>
      <td><p>{{ $route.params.id }}</p></td>
    </tr>
    <tr>
      <td><p>{{ name }}</p></td>
    </tr>
  </table>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      props: ["id"],
      estates: [],
      estateName: "",
      contactEmail: "",
      detail: "",
      posts: [],
    }
  },
  created(){
    console.log(this.$route.params.id);
    const db = firebase.firestore()
    const dbEstate = db.collection('estate').doc(this.$route.params.id)
    dbEstate.get().then(function(doc) {
      if (doc.exists){
        // Convert to City object
        var data = doc.data();
        // Use a City instance method
        console.log(data);
        this.estateName = doc.estateName
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

.estate-tr{
  height: 100px;
}

td{
  padding: 0px 10px;
}

td img{
  height: 100px;
  object-fit: cover;
}
</style>
