<template>
  <div class="form">
    <label for="estatename">物件名：</label>
    <input
     type="text"
     v-model="estate.estateName"
    >
    <label for="image">画像：</label>
    <input
     v-if="reset"
     @change="upload"
     type="file"
    >
    <label for="description">物件概要：</label>
    <input
     type="text"
     v-model="estate.description"
    >
    <button @click="entryEstate()" class="button is-info">登録</button>
    <br /><br />
    <div v-if="entryDocId">
      Firestoreに登録しました。<br>
      DocId：{‌{ entryDocId }}<br>
      物件名：{‌{ estate.estateName }}<br>
      物件概要：{{ estate.description }}
    </div>
    <div v-if="errorMessage">
      <p>エラーメッセージ：{‌{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){ 
    return{
      estate: {
        estateName: "",
        image: '',
        description: "",
      },
      entryDocId: "",
      errorMessage: "",
      reset: true,
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
            estateName: this.estate.estateName,
            description: this.estate.description,
            image: this.estate.image
          })
          .then((docRef) => {
            console.log(docRef.id);
            this.entryDocId = docRef.id
            this.estate.estateName = ''
            this.estate.description = ''
            
            this.estate.image = ''
            this.inputFileReset()
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error
          })
    },
    upload(e) {
      const file = e.target.files[0]
 
      if (!file.type.includes('image')) {
        this.errorMessage = '画像を指定してください'
        this.inputFileReset()
        return
      }
 
      const storageRef = firebase.storage().ref(file.name)
      storageRef.put(file).then(() => {
        firebase
          .storage()
          .ref(file.name)
          .getDownloadURL()
          .then((url) => {
            this.estate.image = url
          })
          .catch((err) => {
            this.errorMessage = err
          })
      })
    },
    inputFileReset() {
      this.reset = false
      this.$nextTick(function () {
        this.reset = true
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
