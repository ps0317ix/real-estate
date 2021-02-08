<template>
  <div>
    <div>
      <h2>管理者さま、こんにちは</h2>
    </div>
    <div class="form">
      <label for="estatename">物件名：</label>
      <input
        type="text"
        v-model="estate.estateName"
        class="input"
      >
      <label for="image">画像：</label>
      <input
        v-if="reset"
        @change="upload"
        type="file"
      >
      <label for="address">住所：</label>
      <input
        type="text"
        v-model="estate.address"
        class="input"
      >
      <label for="station">最寄駅：</label>
      <input
        type="text"
        v-model="estate.address"
        class="input"
      >
      <label for="rent">賃料：</label>
      <input
        type="text"
        v-model="estate.rent"
        class="input"
      >
      <label for="manage">管理費・共益費：</label>
      <input
        type="text"
        v-model="estate.manage"
        class="input"
      >
      <label for="deposit">敷金・礼金：</label>
      <input
        type="text"
        v-model="estate.deposit"
        class="input"
      >
      <label for="description">物件概要：</label>
      <input
        type="text"
        v-model="estate.description"
        class="input"
      >
      <button @click="entryEstate()" class="button is-info">登録</button>
      <br /><br />
      <ul v-for="errormessage in errormessages" :key="errormessage.index">
        <li><p>{{errormessage}}</p></li>
      </ul>
      
      <div v-if="entryDocId">
        Firestoreに登録しました。<br>
        DocId：{‌{ entryDocId }}<br>
        物件名：{‌{ estate.estateName }}<br>
        物件概要：{{ estate.description }}
      </div>
      <div>
        <!-- <ul v-for="error in errors" :key="error.index">
          <li>{‌{ error }}</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      entryDocId: "",
      errormessages: [],
      reset: true,
      estate: {
        estateName: "",
        image: '',
        address: '',
        rent: '',
        manage: '',
        deposit: '',
        description: "",
      },
      errors: []
    }
  },
  methods: {
    upload(e) {
      const file = e.target.files[0]
 
      if (!file.type.includes('image')) {
        this.errormessages.push('画像を指定してください')
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
            this.errormessages.push(err)
          })
      })
    },
    inputFileReset() {
      this.reset = false
      this.$nextTick(function () {
        this.reset = true
      })
    },
    entryEstate() {
      let self = this
      if (!self.estate.estateName || !self.estate.description) {
        this.errormessages.push('物件名と物件概要は必須です')
        console.log(this.errormessages);
        return this.errormessages
      }
        const db = firebase.firestore()
        const dbEstate = db.collection('estate')
        dbEstate
          .add({
            estateName: self.estate.estateName,
            description: self.estate.description,
            image: self.estate.image,
            time: firebase.firestore.Timestamp.now()
          })
          .then((docRef) => {
            console.log(docRef.id);
            self.entryDocId = docRef.id
            self.estate.estateName = ''
            self.estate.description = ''
            
            self.estate.image = ''
            self.inputFileReset()
          })
          .catch((error) => {
            console.log(error);
            self.errormessages.push(error)
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
