<template>
  <div>
    <div class="csv-container">
      <h1>CSVインポート</h1>
      <input @change="fileChange" type="file" id="file_input_expense" name="file_input_expense">
      <ul v-for="object in objects" v-bind:key='object.id'>
        <li>{{object.code}}</li>
        <li>{{object.prefecture}}</li>
        <li>{{object.municipality}}</li>
        <li>{{object.kanapref}}</li>
        <li>{{object.kanamuni}}</li>
      </ul>
    </div>
    <div>
      <button @click="csvimport" class="button is-info">登録</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import encoding from 'encoding-japanese';

export default {
  data: function(){
    return{
      codeArray: undefined,
      objects: []
    };
  },
  created: {},
  methods: {
    onerrorHandler(e) {
      const err = e.target.error
      if (err.code && err.code === err.NOT_FOUND_ERR) {
        console.log('ファイルが見つかりませんでした。')
      } else if (err.code && err.code === err.SECURITY_ERR) {
        console.log('セキュリティのためファイルにアクセス出来ませんでした。')
      } else if (err.code && err.code === err.NOT_READABLE_ERR) {
        console.log('ファイルが読み込めませんでした。')
      } else if (err.code && err.code === err.ABORT_ERR) {
        console.log('ファイルの読み込みがキャンセルされました。')
      } else {
        console.log('ファイルの読み取りエラーが発生しました。')
      }
      console.log('csv読み込み完了');
      return
    },
    onloadHandler(file){
      // 8ビット符号なし整数値の配列に変換
      const uint8Array = new Uint8Array(file)
      // 文字コードを判定
      const detected = encoding.detect(uint8Array)
      // 判定した文字コードからSJISへ変換
      this.codeArray = encoding.convert(uint8Array, {
        from: detected,
        to: 'SJIS'
      })
      // codeToStringで文字列にすることも可能
      // const str = encoding.codeToString(codeArray);
      return
    },
    fileChange(e) {
      let self = this
      var file = e.target.files[0];
      let objects = [];
      // let data = fs.readFileSync(file) //csvファイルの読み込み
      let reader = new FileReader();
      console.log('csv読み込み開始');
      // reader.readAsBinaryString(file);
      reader.onload = function() {
        let lines = reader.result.split("\n");
        lines.forEach(element => {
          let objectData = element.split(",");
          let object = {
            code: objectData[0],
            prefecture: objectData[1],
            municipality: objectData[2],
            kanapref: objectData[3],
            kanamuni: objectData[4],
          };
          // object = encoding.convert( object, 'SJIS');
          objects.push(object);
        });
        objects.shift();// objects.shift();//ヘッダもインポートされてしまうから、配列の一番最初のelementは削除します。
        console.log(encoding.detect(objects));
        console.log('csvをSJIS変換');
        // objects = new encoding.stringToCode(objects)
        // objects = encoding.convert( objects, 'SJIS');
        // objects = new Uint8Array( objects );
        console.log(encoding.detect(objects));
        console.log('csv読み込み完了');
        console.log(objects);
        self.objects = objects;
      };
        reader.onerror = function() {
        console.log('ファイルが読み込めませんでした。 ' + file.fileName);
      };

      reader.readAsBinaryString(file);
      console.log(objects);
    },
    csvimport() {
      let self = this
      let objects = self.objects
      const db = firebase.firestore()
      const dbcollection = db.collection('places')
      console.log('import開始');
      objects.forEach(function(object){
        dbcollection.add({
          code: object["code"],
          prefecture: object["prefecture"],
          municipality: object["municipality"],
          kanapref: object["kanapref"],
          kanamuni: object["kanamuni"],
        }).then((docRef) => {
          console.log(docRef);
          console.log("success")
        }).catch(function(error){
          console.log('Failed', error)
        })
      })
    }
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
