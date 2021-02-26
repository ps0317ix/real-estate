<template>
<transition
       name="fade"
       appear
      >
  <div>
    <div class="form">
    <h2>情報がない場合は「-」にしてください</h2>
      <label for="estatename">物件名：<span style="color:red;">*必須</span></label>
    <div class="form_content">
     <input
        type="text"
        v-model="estate.estateName"
        placeholder="例：セイワパレス新梅田"
        class="input"
      >
    </div>
    <label for="image">画像：</label>
    <input
           v-if="reset"
           @change="upload"
           type="file"
           >
    <label for="introduction">紹介文：</label>
    <div class="form_content">
    <textarea
        type="text"
        v-model="estate.introduction"
        placeholder="例：このマンションは高級感溢れる物件です。"        
        class="textarea"
      ></textarea>
    </div>
    <label for="prefecture">住所（都道府県）：<span style="color:red;">*必須</span></label>
    <div class="form_content">
      <select v-model="estate.prefecture" placeholder="例：大阪府" class="input" v-on:change="_set_pref">
        <option value="">選択してください</option>
        <option v-for="(area, index) in prefectures" :key="index">{{area.prefectures}}</option>
      </select>
    </div>
    <label for="municipalities">住所（市区町村）：<span style="color:red;">*必須</span></label>
    <div class="form_content">
      <select v-model="estate.municipalities" placeholder="例：大阪市北区" class="input" v-if="estate.prefecture.length>0">
        <option value="">選択してください</option>
        <option v-for="(area, index) in municipalities" :key="index">{{area.maniciples}}</option>
      </select>
    </div>
    <label for="address">住所（町名）：<span style="color:red;">*必須</span></label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.address"
           placeholder="例：大淀中"
           class="input"
           >
    </div>
    <label for="addressnum">住所（番地以下）：</label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.addressnum"
           placeholder="例：1-13-4 (半角)"
           class="input"
           >
    </div>
    <label for="line">最寄路線1：<span style="color:red;">*必須</span></label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.line"
           placeholder="例：東海道本線"
           class="input"
           >
    </div>
    <label for="station">最寄駅1：<span style="color:red;">*必須</span></label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.station"
           placeholder="例：大阪駅"
           class="input"
           >
    </div>
    <label for="rent">賃料：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.rent"
           placeholder="例：115000"
           class="input"
           ><p>円</p>
    </div>
    <label for="walk">徒歩：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.walk"
           placeholder="例：5"
           class="input"
           ><p>分</p>
    </div>
    <label for="manage">管理費・共益費：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.manage"
           placeholder="例：10000"
           class="input"
           ><p>円</p>
    </div>
    <label for="deposit">敷金：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.deposit"
           placeholder="例：1"
           class="input"
           ><p>ヶ月</p>
    </div>
    <label for="keymoney">礼金：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.keymoney"
           placeholder="例：1"
           class="input"
           ><p>ヶ月</p>
    </div>
    <label for="freerent">フリーレント：</label>
    <div class="form_content">
    <input
           type="number"
           v-model="estate.freerent"
           placeholder="例：1"
           class="input"
           ><p>ヶ月</p>
    </div>
    <label for="insurance">保険料：</label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.insurance"
           placeholder="例：要加入"
           class="input"
           >
    </div>
    <label for="insurancecompany">保証会社：</label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.insurancecompany"
           placeholder="例：要加入"
           class="input"
           >
    </div>
    <label for="securitydeposit">保証金：</label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.securitydeposit"
           placeholder=""
           class="input"
           value="-"
           >
    </div>
    <label for="floor">間取り：</label>
    <div class="form_content">
    <input
           type="text"
           v-model="estate.floor"
           placeholder="例：1LDK"
           class="input"
           >
    </div>
    <label for="occupiedarea">専有面積：</label>
    <div class="form_content">
      <input
           type="number"
           v-model="estate.occupiedarea"
           placeholder="例：41.45"
           class="input"
           ><p>
             ㎡
           </p>
    </div>
    <label for="year">築年：</label>
    <div class="form_content">
      <input
           type="number"
           v-model="estate.year"
           placeholder="例：2021"
           class="input"
           ><p>
             年
           </p>
    </div>
    <label for="direction">方角：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.direction"
           placeholder="例：南東"
           class="input"
           >
    </div>
    <label for="renttype">賃借種別：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.renttype"
           placeholder="例：普通賃貸借"
           class="input"
           >
    </div>
    <label for="features">物件特徴：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.features"
           placeholder="例：ハイクラス"
           class="input"
           >
    </div>
    <label for="impossible">不可事項：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.impossible"
           placeholder="例：ペット不可"
           class="input"
           >
    </div>
    <label for="movein">入居日：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.movein"
           placeholder="例：3月上旬"
           class="input"
           >
    </div>
    <label for="construction">構造：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.construction"
           placeholder="例：RC造(鉄筋コンクリート)"
           class="input"
           >
    </div>
    <label for="floornum">所在階：</label>
    <div class="form_content">
      <input
           type="number"
           v-model="estate.floornum"
           placeholder="例：9"
           class="input"
           ><p>
           階
           </p>
    </div>
    <label for="floormax">総階数(地上)：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.floormax"
           placeholder="例：9"
           class="input"
           >
    </div>
    <label for="floormin">総階数(地下)：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.floormin"
           placeholder="例：2"
           class="input"
           >
    </div>
    <label for="roomcnt">総戸数：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.roomcnt"
           placeholder="例：50"
           class="input"
           >
    </div>
    <label for="elevator">エレベーター有無：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.elevator"
           placeholder="例：有・無"
           class="input"
           >
    </div>
    <label for="transaction">取引形態：</label>
    <div class="form_content">
      <input
           type="text"
           v-model="estate.transaction"
           placeholder="例：仲介"
           class="input"
           >
    </div>
    
    <label for="facilities">物件設備：</label>
    <div class="form_facilities_content">
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="ペット可">
      <label for="ペット可">ペット可</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="楽器可">
      <label for="楽器可">楽器可</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="スポーツジム">
      <label for="スポーツジム">スポーツジム</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="駐車場">
      <label for="駐車場">駐車場</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="オートロック">
      <label for="オートロック">オートロック</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="宅配ボックス">
      <label for="宅配ボックス">宅配ボックス</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="24時間管理">
      <label for="24時間管理">24時間管理</label>
      <input type="checkbox" v-model="estate.facilities" class="checkbox" value="ラウンジ">
      <label for="ラウンジ">ラウンジ</label>
    </div>

    <label>公開設定：</label>
    <div class="form_facilities_content">
      <input type="radio" v-model="estate.openclose" class="checkbox" value="open" checked/>
      <label for="open">公開</label>
      <input type="radio" v-model="estate.openclose" class="checkbox" value="close">
      <label for="close">非公開</label>
    </div>

    <label for="description">備考：</label>
    <div class="form_content">
    <textarea
        type="text"
        v-model="estate.description"
        placeholder="例：仲介"        
        class="textarea"
      ></textarea>
    </div>
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
</transition>
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
      entryDocId: "",
      errormessages: [],
      selected_area: "",
      selectPref: '',
      selectCity: '',
      reset: true,
      areas: [],
      prefectures: [],
      municipalities: [],
      stations: this.stations,
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
        walk: 0,
        rent: 0,
        manage: 0,
        deposit: 0,
        keymoney: 0,
        freerent: 0,
        insurance: '',
        insurancecompany: '',
        securitydeposit: '',
        floor: '',
        occupiedarea: 0,
        year: 0,
        direction: '',
        renttype: '',
        features: '',
        impossible: '',
        movein: '',
        construction: '',
        floornum: 0,
        floormax: 0,
        floormin: 0,
        roomcnt: '',
        elevator: '',
        transaction: '',
        facilities: [],
        openclose: '',
        description: '',
      },
      errors: []
    }
  },
  computed: {
  },
  created() {
    let self = this
    let db = firebase.firestore()
    var dbEstate = db.collection('areas').orderBy('pref_code', 'asc')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data()
        if(data.maniciples==''){
          var area = {
            code: data.code,
            prefectures: data.prefectures,
            maniciples: data.maniciples,
            kanamani: data.kanamani,
            kanapref: data.kanapref
          }
          self.prefectures.push(area)
        }
        
      })
    })
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
    _set_pref : function(){
      let self = this
      let db = firebase.firestore()
      var prefecture = self.estate.prefecture
      console.log(prefecture);
      
      self.estate.maniciples = "";
      self.municipalities.length = 0;
      // this.estate.maniciples = this.maniciples[this.estate.prefecture];
      var dbEstate = db.collection('areas').orderBy('pref_code', 'asc')
      dbEstate.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data()
          if(data.prefectures==prefecture&&data.maniciples!=""){
            var area = {
              code: data.code,
              prefectures: data.prefectures,
              maniciples: data.maniciples,
              kanamani: data.kanamani,
              kanapref: data.kanapref
            }
            self.municipalities.push(area)
          }
        })
      })
    },
    entryEstate() {
      let self = this
      if (!self.estate.estateName){
        this.errormessages.push('物件名は必須です')
        console.log(this.errormessages);
        return this.errormessages
      }else if (!self.estate.prefecture||!self.estate.municipalities||!self.estate.address){
        this.errormessages.push('住所は必須です')
        console.log(this.errormessages);
        return this.errormessages
      }
      const db = firebase.firestore()
      const dbEstate = db.collection('estate')
      dbEstate
        .add({
          estateName: self.estate.estateName,
          image: self.estate.image,
          introduction: self.estate.introduction,
          prefecture: self.estate.prefecture,
          municipalities: self.estate.municipalities,
          address: self.estate.address,
          addressnum: self.estate.addressnum,
          line: self.estate.line,
          station: self.estate.station,
          walk: self.estate.walk,
          rent: self.estate.rent,
          manage: self.estate.manage,
          deposit: self.estate.deposit,
          keymoney: self.estate.keymoney,
          freerent: self.estate.freerent,
          insurance: self.estate.insurance,
          insurancecompany: self.estate.insurancecompany,
          securitydeposit: self.estate.securitydeposit,
          floor: self.estate.floor,
          occupiedarea: self.estate.occupiedarea,
          year: self.estate.year,
          direction: self.estate.direction,
          renttype: self.estate.renttype,
          features: self.estate.features,
          impossible: self.estate.impossible,
          movein: self.estate.movein,
          construction: self.estate.construction,
          floornum: self.estate.floornum,
          floormax: self.estate.floormax,
          floormin: self.estate.floormin,
          roomcnt: self.estate.roomcnt,
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
    },
    
  },
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
</style>
