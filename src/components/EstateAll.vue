<template>
  <div class="table__wrapper">
    <table class="table is-bordered pricing__table is-fullwidth">
      <tr>
        <td style="padding: 10px;"><p>物件id</p></td>
        <!-- <td style="padding: 10px;"><p>画像</p></td> -->
        <td style="padding: 10px;"><p>物件名</p></td>
        <td style="padding: 10px;"><p>都道府県</p></td>
        <td style="padding: 10px;"><p>市区町村</p></td>
        <td style="padding: 10px;"><p>町名</p></td>
        <td style="padding: 10px;"><p></p></td>
        <td style="padding: 10px;"><p></p></td>
      </tr>
      <tr class="estate-tr" v-for="estate in estates" :key="estate.index">
        <td><p>{{estate.entryDocId}}</p></td>
        <!-- <td><img :src="estate.image" v-bind:alt="estate.estateName"></td> -->
        <td><p>{{estate.estateName}}</p></td>
        <td><p>{{estate.prefecture}}</p></td>
        <td><p>{{estate.municipalities}}</p></td>
        <td><p>{{estate.address}}</p></td>
        <td><button @click='linktoopen(estate.entryDocId)' class="button is-success">{{estate.openorclose}}</button></td>
        <td><router-link :to='linktoedit(estate.entryDocId)' class="button is-info">編集</router-link></td>
        <td><router-link :to='linktodelete(estate.entryDocId)' class="button is-danger">削除</router-link></td>
      </tr>
    </table>
    <ul v-for="errormessage in errormessages" :key="errormessage.index">
        <li><p>{{errormessage}}</p></li>
      </ul>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      estates: [],
      errormessages: [],
    }
  },
  created() {
    const db = firebase.firestore()
    let dbEstate = db.collection('estate')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        let estate = {
          entryDocId: doc.id,
          image: data.image,
          estateName: data.estateName,
          prefecture: data.prefecture,
          municipalities: data.municipalities,
          address: data.address,
          description: data.description,
          openclose: data.openclose,
          time: data.time,
          openorclose: ""
        }
        if(estate.openclose=="open"){
          estate.openorclose = "公開"
        }else{
          estate.openorclose = "非公開"
        }
        this.estates.push(estate)
      })
    })
  },
  methods: {
    linktoopen(docId){
      let self = this
      if(self.openorclose=="公開"){
        self.estates.openclose = 'close'
      }else{
        self.estates.openclose = 'open'
      }
      const db = firebase.firestore()
      const dbEstate = db.collection('estate').doc(docId)
      dbEstate.update({
        openclose: self.estates.openclose
      }).catch((error) => {
          console.log(error);
          self.errormessages.push(error)
        })
    },
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
