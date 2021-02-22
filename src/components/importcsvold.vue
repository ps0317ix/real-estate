<template>
   <div>
    <h1>csvファイル 検索ツール（簡易オートフィルタ）</h1>
    <input type="file" @change="fileChange">
    <ul v-for="object in objects" v-bind:key="object">
      <li>{{ object[0] }}</li>
      <li>{{ object[1] }}</li>
      <li>{{ object[2] }}</li>
      <li>{{ object[3] }}</li>
      <li>{{ object[4] }}</li>
    </ul>
   </div>
</template>

<script>
// import firebase from 'firebase';
import Encoding from 'encoding-japanese';


export default {
  data: function(){
    return{
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

          const header = fileData[0]
          // const db = firebase.firestore()
          // const dbEstate = db.collection('places')
          var tmpResultArray = fileData.map(function (r) {
            var arrayInKeyAndValue = header.map(function (_, index) {
              
              var key = header[index].replace(/\s+/g, '')
              console.log(key);
              var value = r[index]
              console.log(value);
              dbEstate.add({
                code: value
              });
              //ヘッダーの空白文字を削除。keyとvalueに値をセット
              return ({ key: header[index].replace(/\s+/g, ''), value: r[index] });
            })
            
            arrayInKeyAndValue = arrayInKeyAndValue.reduce(function (previous, current) {
              //連想配列を作成
              previous[current.key] = current.value;
              return previous;
            }, {});
            return arrayInKeyAndValue;
          });
          var objects = tmpResultArray.reduce(function (previous, current, index) {
            previous[index] = current;
            return previous;
          }, {});
          return objects;
          // objects.forEach(key => 
          //   console.log(key + ':' + objects[key])
          // )


          // objects.forEach(key => 
          //   dbEstate.add({
          //     key: objects[key],
          //   }).then((docRef) => {
          //     console.log(docRef.id);
          //   }).catch((error) => {
          //     console.log(error);
          //     self.errormessages.push(error)
          //   })
          // );
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
