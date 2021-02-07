<template>
  <table class="estate-table">
    <tr v-for="estate in estates" :key="estate.index">
      <td style="padding: 10px;">物件id</td>
      <td style="padding: 10px;">画像</td>
      <td style="padding: 10px;"><p>物件名</p></td>
      <td style="padding: 10px;"><p>物件概要</p></td>
    </tr>
    <tr class="estate-tr" v-for="estate in estates" :key="estate.index">
      <td><p>{{index}}</p></td>
      <td><img :src="estate.image" v-bind:alt="estate.estateName"></td>
      <td><p>{{estate.estateName}}</p></td>
      <td><p>{{estate.description}}</p></td>
    </tr>
  </table>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
      return{
        estates: [],
        name: "",
        contactEmail: "",
        detail: "",
        posts: [],
      }
  },
  created() {
    const db = firebase.firestore()
    const dbEstate = db.collection('estate')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
        const data = doc.data()
        const estate = {
          image: data.image,
          estateName: data.estateName,
          description: data.description,
        }
        console.log(estate);
        this.estates.push(estate)
      })
    })
  },
  methods: {
    
  },
}
</script>

<style scoped>

.estate-tr{
  height: 100px;
}

td img{
  height: 100px;
  object-fit: cover;
}
</style>
