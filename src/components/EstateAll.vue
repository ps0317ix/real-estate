<template>
  <div class="table__wrapper">
    <table class="table is-bordered pricing__table is-fullwidth">
      <tr>
        <td style="padding: 10px;"><p>物件id</p></td>
        <td style="padding: 10px;"><p>画像</p></td>
        <td style="padding: 10px;"><p>物件名</p></td>
        <td style="padding: 10px;"><p>都道府県</p></td>
        <td style="padding: 10px;"><p>市区町村</p></td>
        <td style="padding: 10px;"><p>町名</p></td>
        <td style="padding: 10px;"><p></p></td>
        <td style="padding: 10px;"><p></p></td>
      </tr>
      <tr class="estate-tr" v-for="estate in estates" :key="estate.index">
        <td><p>{{estate.entryDocId}}</p></td>
        <td><img :src="estate.image" v-bind:alt="estate.estateName"></td>
        <td><p>{{estate.estateName}}</p></td>
        <td><p>{{estate.prefecture}}</p></td>
        <td><p>{{estate.municipalities}}</p></td>
        <td><p>{{estate.address}}</p></td>
        <td><router-link :to='linktoopen(estate.entryDocId)' class="button is-success">公開</router-link></td>
        <td><router-link :to='linktoedit(estate.entryDocId)' class="button is-info">編集</router-link></td>
        <td><router-link :to='linktodelete(estate.entryDocId)' class="button is-danger">削除</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
      return{
        estates: [],
      }
  },
  created() {
    const db = firebase.firestore()
    const dbEstate = db.collection('estate')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const estate = {
          entryDocId: doc.id,
          image: data.image,
          estateName: data.estateName,
          prefecture: data.prefecture,
          municipalities: data.municipalities,
          address: data.address,
          description: data.description,
          time: data.time,
        }
        console.log(estate);
        this.estates.push(estate)
      })
    })
  },
  methods: {
    linktoedit(link){
      var editlink = '/administrator/estateedit/' + link
      return editlink
    },
    linktodelete(link){
      // alert(link+'を本当に削除しますか？')
      var deletelink = '/administrator/estatedelete/' + link
      return deletelink
    }
  },
}
</script>

<style scoped>

.estate-tr{
  height: 100px;
}

td{
  padding: 10px;
}

td img{
  height: 100px;
  object-fit: cover;
}
</style>
