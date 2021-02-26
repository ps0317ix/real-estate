<template>
   <div>
    <h1>csvファイル firebaseインポートツール</h1>
    <p>選択したcsvファイルをfirebaseにインポートします（開発者用）</p>
    <br>
    <input type="file" @change="fileChange">
    <ul v-for="object in objects" v-bind:key="object">
      <li>{{ object[0] }}</li>
      <li>{{ object[1] }}</li>
      <li>{{ object[2] }}</li>
      <li>{{ object[3] }}</li>
      <li>{{ object[4] }}</li>
    </ul>
    <ul v-for="errormessage in errormessages" :key="errormessage.index">
        <li><p>{{errormessage}}</p></li>
      </ul>
   </div>
</template>

<script>
import firebase from 'firebase';
import Encoding from 'encoding-japanese';


export default {
  data: function(){
    return{
      errormessages: [],
      index: 1,
      gyouNum: 30,
      fileData: [],
      csvData: [],
      widthArr: [],
      colorArr: [],
      matchNum: 0,
      objects: []
    };
  },
  computed: {
    pageLength() {
        return Math.ceil(this.csvData.length / this.gyouNum);
    },
   },
  methods: {
    fileChange: function(e) {
        // let self = this
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          var codes = new Uint8Array(e.target.result);
          var encoding = Encoding.detect(codes);
          var unicodeString = Encoding.convert(codes, {
              to: 'unicode',
              from: encoding,
              type: 'string'
          });
          var arr = unicodeString.trim().replace("\"", "").split("\n");
          var fileData = arr.map(v => v.split(","));

          const db = firebase.firestore()
          const dbEstate = db.collection('stations')
          fileData.forEach(element => {
            dbEstate.add({
              pref_code: Number(element[0]),
              prefectures: element[1],
              station_code: Number(element[2]),
              station_name: element[3],
              station_yomi: element[4],
              station_note: element[5],
              station_lat: Number(element[6]),
              station_lon: Number(element[7]),
              line_code: Number(element[8]),
              line_name: element[9],
              order: Number(element[10]),
              company_code: Number(element[11]),
              company_name: element[12],
            }).then((docRef) => {
              console.log(docRef.id);
            }).catch((error) => {
            console.log(error);
            self.errormessages.push(error)
          })

          });
          // const db = firebase.firestore()
          // const dbEstate = db.collection('places')
          
        };
      reader.readAsArrayBuffer(file);   
    },
  }
}
</script>

<style scoped>

.fv_image{
  background-image: url('../assets/pixta_64405275_M.jpg');
}

.form_facilities_content{
  display: flex;
  flex-wrap: wrap;
}

.form input.checkbox {
  width: 20px;
  margin: 5px 3px 5px 8px;
}

.form_facilities_content label{
  padding: 0px;
}

.csv-container{
  margin: 10px 0px;
}
</style>
