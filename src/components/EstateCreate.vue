<template>
  <div>
    物件名：<input type="text" v-model="estate.estateName" />
    <br />
    物件概要：<input type="text" v-model="estate.description" /> <br /><br />
    <button @click="entryEstate()">登録</button>
    <br /><br />
    <div v-if="entryDocId">
      FirestoreにDocId:{‌{ entryDocId }}で登録しました。
    </div>
    <div v-if="errorMessage">エラーメッセージ:{‌{ errorMessage }}</div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){ return{
    estate: {
      estateName: '',
      description: '',
    },
      entryDocId: '',
      errorMessage: '',
    }
  },
  methods: {
    entryEstate() {
      this.errorMessage = ''
      if (!this.estate.estateName || !this.estate.description) {
        this.errorMessage = '物件名と物件概要は必須です'
        return
      }
 
        const db = firebase.firestore()
        const dbEstate = db.collection('estate')
        dbEstate
          .add({
            estateName: this.estate.shopName,
            description: this.estate.description,
          })
          .then((ref) => {
            this.entryDocId = ref.id
            this.estate.shopName = ''
            this.estate.description = ''
          })
          .catch((err) => {
            this.errorMessage = err
          })
      },
  },
}
</script>

<style scoped>

.fv_image{
  background-image: url('../assets/pixta_64405275_M.jpg');
}
</style>
