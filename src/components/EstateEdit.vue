<template>
 <transition
       name="fade"
       appear
      >
  <div class="estateedit">
    <h1>物件情報編集</h1>
    <div class="table__wrapper">
      <table class="table is-bordered pricing__table is-fullwidth">
      <tr>
        <td><h2>物件ID</h2></td>
        <td><p>{{ $route.params.id }}</p></td>
      </tr>
      <tr>
        <td><h2>物件画像</h2></td>
        <td><img :src="estate.image">
          <input
           v-if="reset"
           @change="upload"
           type="file"
           >
        </td>
      </tr>
      <tr>
        <td><h2>物件名</h2></td>
        <td><input type="text" @input="updateValue(estate.estateName)" v-model="estate.estateName" class="input"></td>
      </tr>
      <tr>
        <td><h2>紹介文</h2></td>
        <td><textarea type="text" @input="updateValue(estate.introduction)" :value="estate.introduction" class="textarea"></textarea></td>
      </tr>
      <tr>
        <td><h2>住所（都道府県）</h2></td>
        <td>
          <select placeholder="例大阪府" class="input">
            <option :value="estate.prefecture">{{estate.prefecture}}</option>
            <option v-for="(area, index) in estate.prefectures" :key="index">{{area.prefectures}}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><h2>住所（市区町村）</h2></td>
        <td><input type="text" @input="updateValue(estate.municipalities)" :value="estate.municipalities" class="input"></td>
      </tr>
      <tr>
        <td><h2>住所（町名）</h2></td>
        <td><input type="text" @input="updateValue(estate.address)" :value="estate.address" class="input"></td>
      </tr>
      <tr>
        <td><h2>住所（番地以下）</h2></td>
        <td><input type="text" @input="updateValue(estate.addressnum)" :value="estate.addressnum" class="input"></td>
      </tr>
      <tr>
        <td><h2>最寄駅</h2></td>
        <td><input type="text" @input="updateValue(estate.station)" :value="estate.station" class="input"></td>
      </tr>
      <tr>
        <td><h2>賃料</h2></td>
        <td><input type="number" @input="updateValue(estate.rent)" :value="estate.rent" class="input"></td>
      </tr>
      <tr>
        <td><h2>徒歩</h2></td>
        <td><input type="number" @input="updateValue(estate.walk)" :value="estate.walk" class="input"></td>
      </tr>
      <tr>
        <td><h2>管理費・共益費</h2></td>
        <td><input type="number" @input="updateValue(estate.manage)" :value="estate.manage" class="input"></td>
      </tr>
      <tr>
        <td><h2>敷金</h2></td>
        <td><input type="number" @input="updateValue(estate.deposit)" :value="estate.deposit" class="input"></td>
      </tr>
      <tr>
        <td><h2>礼金</h2></td>
        <td><input type="number" @input="updateValue(estate.keymoney)" :value="estate.keymoney" class="input"></td>
      </tr>
      <tr>
        <td><h2>フリーレント</h2></td>
        <td><input type="number" @input="updateValue(estate.freerent)" :value="estate.freerent" class="input"></td>
      </tr>
      <tr>
        <td><h2>保険料</h2></td>
        <td><input type="number" @input="updateValue(estate.insurance)" :value="estate.insurance" class="input"></td>
      </tr>
      <tr>
        <td><h2>保証会社</h2></td>
        <td><input type="text" @input="updateValue(estate.insurancecompany)" :value="estate.insurancecompany" class="input"></td>
      </tr>
      <tr>
        <td><h2>保証金</h2></td>
        <td><input type="text" @input="updateValue(estate.securitydeposit)" :value="estate.securitydeposit" class="input"></td>
      </tr>
      <tr>
        <td><h2>間取り</h2></td>
        <td><input type="text" @input="updateValue(estate.floor)" :value="estate.floor" class="input"></td>
      </tr>
      <tr>
        <td><h2>専有面積</h2></td>
        <td><input type="number" @input="updateValue(estate.occupiedarea)" :value="estate.occupiedarea" class="input"></td>
      </tr>
      <tr>
        <td><h2>築年</h2></td>
        <td><input type="number" @input="updateValue(estate.year)" :value="estate.year" class="input"></td>
      </tr>
      <tr>
        <td><h2>方角</h2></td>
        <td><input type="text" @input="updateValue(estate.direction)" :value="estate.direction" class="input"></td>
      </tr>
      <tr>
        <td><h2>賃借種別</h2></td>
        <td><input type="text" @input="updateValue(estate.renttype)" :value="estate.renttype" class="input"></td>
      </tr>
      <tr>
        <td><h2>物件特徴</h2></td>
        <td><input type="text" @input="updateValue(estate.features)" :value="estate.features" class="input"></td>
      </tr>
      <tr>
        <td><h2>不可事項</h2></td>
        <td><input type="text" @input="updateValue(estate.impossible)" :value="estate.impossible" class="input"></td>
      </tr>
      <tr>
        <td><h2>入居日</h2></td>
        <td><input type="text" @input="updateValue(estate.movein)" :value="estate.movein" class="input"></td>
      </tr>
      <tr>
        <td><h2>構造</h2></td>
        <td><input type="text" @input="updateValue(estate.construction)" :value="estate.construction" class="input"></td>
      </tr>
      <tr>
        <td><h2>所在階</h2></td>
        <td><input type="text" @input="updateValue(estate.floornum)" :value="estate.floornum" class="input"></td>
      </tr>
      <tr>
        <td><h2>総階数(地上)</h2></td>
        <td><input type="text" @input="updateValue(estate.floormax)" :value="estate.floormax" class="input"></td>
      </tr>
      <tr>
        <td><h2>総階数(地下)</h2></td>
        <td><input type="text" @input="updateValue(estate.floormin)" :value="estate.floormin" class="input"></td>
      </tr>
      <tr>
        <td><h2>総戸数</h2></td>
        <td><input type="text" @input="updateValue(estate.roomcnt)" :value="estate.roomcnt" class="input"></td>
      </tr>
      <tr>
        <td><h2>エレベーター有無</h2></td>
        <td><input type="text" @input="updateValue(estate.elevator)" :value="estate.elevator" class="input"></td>
      </tr>
      <tr>
        <td><h2>取引形態</h2></td>
        <td><input type="text" @input="updateValue(estate.transaction)" :value="estate.transaction" class="input"></td>
      </tr>
      <button @click="estateupdate()" class="button is-info">更新</button>
    </table>
    </div>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      props: ["id"],
      estate: {
        estateName: '',
        image: '',
        introduction: '',
        prefecture: '',
        municipalities: '',
        address: '',
        addressnum: '',
        line: '',
        station: '',
        walk: '',
        rent: '',
        manage: '',
        deposit: '',
        keymoney: '',
        freerent: '',
        insurance: '',
        insurancecompany: '',
        securitydeposit: '',
        floor: '',
        occupiedarea: '',
        year: '',
        direction: '',
        renttype: '',
        features: '',
        impossible: '',
        movein: '',
        construction: '',
        floornum: '',
        floormax: '',
        floormin: '',
        roomcnt: '',
        elevator: '',
        transaction: '',
        facilities: '',
        openclose: '',
        description: '',
        prefectures: [],
        areas: [],
      }
    }
  },
  created(){
    let self = this
    const db = firebase.firestore()
    let dbEstate = db.collection('estate').doc(this.$route.params.id)
    dbEstate.get().then(function(doc) {
      if (doc.exists){
        var data = doc.data();
        self.estate.estateName = data.estateName
        self.estate.image = data.image
        self.estate.introduction = data.introduction
        self.estate.prefecture = data.prefecture
        self.estate.municipalities = data.municipalities
        self.estate.address = data.address
        self.estate.addressnum = data.addressnum
        self.estate.line = data.line
        self.estate.station = data.station
        self.estate.walk = data.walk
        self.estate.rent = data.rent
        self.estate.manage = data.manage
        self.estate.deposit = data.deposit
        self.estate.keymoney = data.keymoney
        self.estate.freerent = data.freerent
        self.estate.insurance = data.insurance
        self.estate.insurancecompany = data.insurancecompany
        self.estate.securitydeposit = data.securitydeposit
        self.estate.floor = data.floor
        self.estate.occupiedarea = data.occupiedarea
        self.estate.year = data.year
        self.estate.direction = data.direction
        self.estate.renttype = data.renttype
        self.estate.features = data.features
        self.estate.impossible = data.impossible
        self.estate.movein = data.movein
        self.estate.construction = data.construction
        self.estate.floornum = data.floornum
        self.estate.floormax = data.floormax
        self.estate.floormin = data.floormin
        self.estate.roomcnt = data.roomcnt
        self.estate.elevator = data.elevator
        self.estate.transaction = data.transaction
        self.estate.facilities = data.facilities
        self.estate.openclose = data.openclose
        self.estate.description = data.description
      } else {
        console.log("No such document!");
      }}).catch(function(error) {
        console.log("Error getting document:", error);
      });
    let areas = self.estate.areas
    // 都道府県取得
    dbEstate = db.collection('areas').orderBy('code', 'asc')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        let area = {
          code: data.code,
          prefectures: data.prefectures,
          maniciples: data.maniciples,
          kanamani: data.kanamani,
          kanapref: data.kanapref
        }
        areas.push(area)

        if(data.maniciples==""&&data.prefectures!=self.estate.prefecture){
          let prefecture = {
            code: data.code,
            prefectures: data.prefectures,
            maniciples: data.maniciples,
            kanamani: data.kanamani,
            kanapref: data.kanapref
          }
          self.estate.prefectures.push(prefecture)
        }
      })
    })

    self.estate.prefectures = areas.filter(data => {
      console.log(data);
      return data.maniciples==''
    })
    console.log('表示準備完了');
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
    updateValue(inputValue) {
      this.$emit('input', inputValue);
    },
    estateupdate() {
      const db = firebase.firestore()
      const dbEstate = db.collection('estate')
      dbEstate.update({
        estateName: self.estate.estateName,
        image: self.estate.image,
        introduction: self.estate.introduction,
        prefecture: self.estate.prefecture,
        municipalities: self.estate.municipalities,
        address: self.estate.address,
        addressnum: self.estate.addressnum,
        line: self.estate.line,
        station: self.estate.station,
        walk: Number(self.estate.walk),
        rent: self.estate.rent,
        manage: self.estate.manage,
        deposit: self.estate.deposit,
        keymoney: self.estate.keymoney,
        freerent: self.estate.freerent,
        insurance: self.estate.insurance,
        insurancecompany: self.estate.insurancecompany,
        securitydeposit: self.estate.securitydeposit,
        floor: self.estate.floor,
        occupiedarea: Number(self.estate.occupiedarea),
        year: self.estate.year,
        direction: self.estate.direction,
        renttype: self.estate.renttype,
        features: self.estate.features,
        impossible: self.estate.impossible,
        movein: self.estate.movein,
        construction: self.estate.construction,
        floornum: Number(self.estate.floornum),
        floormax: Number(self.estate.floormax),
        floormin: Number(self.estate.floormin),
        roomcnt: Number(self.estate.roomcnt),
        elevator: self.estate.elevator,
        transaction: self.estate.transaction,
        facilities: self.estate.facilities,
        openclose: self.estate.openclose,
        description: self.estate.description,
        time: firebase.firestore.Timestamp.now()
      })
      .then((docRef) => {
        console.log(docRef.id);
        self.entryDocId = docRef.id
        self.estate.estateName = ''
        self.estate.image = ''
        self.estate.introduction = ''
        self.estate.prefecture = ''
        self.estate.municipalities = ''
        self.estate.address = ''
        self.estate.addressnum = ''
        self.estate.line = ''
        self.estate.station = ''
        self.estate.walk = 0
        self.estate.rent = ''
        self.estate.manage = ''
        self.estate.deposit = ''
        self.estate.keymoney = ''
        self.estate.freerent = ''
        self.estate.insurance = ''
        self.estate.insurancecompany = ''
        self.estate.securitydeposit = ''
        self.estate.floor = ''
        self.estate.occupiedarea = ''
        self.estate.year = ''
        self.estate.direction = ''
        self.estate.renttype = ''
        self.estate.features = ''
        self.estate.impossible = ''
        self.estate.movein = ''
        self.estate.construction = ''
        self.estate.floornum = ''
        self.estate.floormax = ''
        self.estate.floor = ''
        self.estate.roomcnt = ''
        self.estate.elevator = ''
        self.estate.transaction = ''
        self.estate.facilities = ''
        self.estate.openclose = ''
        self.estate.description = ''
        self.inputFileReset()
      })
      .catch((error) => {
        console.log(error);
        self.errormessages.push(error)
      })
    }
  },
}
</script>

<style scoped>

.estateedit{
  margin: 50px 0px;
}

h1{
  font-size: 32px;
}

.estate-tr{
  height: 100px;
}

h2, img, p{
  margin: 10px;
}

tr{
  padding: 10px;
}

td{
  padding: 0px 10px;
}

td:first-child{
  width: 200px;
}

td img{
  height: 100px;
  object-fit: cover;
}
</style>
