<template>
  <div class="">
    <div class="fv_image">
      <h1 class="fv_image_title">Home</h1>
    </div>
    <div class="container">
      <transition
       name="fade"
       appear
      >
        <div class="our_service contents">
          <h2>人気エリア</h2>
          <ul>
            <li>中目黒</li>
            <li>恵比寿</li>
            <li>代々木上原</li>
            <li>勝どき</li>
            <li>品川</li>
            <li>大崎</li>
          </ul>
        </div>
        
      </transition>
      <transition
       name="fade"
       appear
      >
        <div class="recommend_estates contents">
          <h2>おすすめ物件</h2>
          <ul class="estate-lists" v-for="estate in estates" :key="estate.index">
          <transition
          name="fade"
          appear
          >
            <a :href="linktodetail(estate.entryDocId)">
            <li class="estate-list">
              <img :src="estate.image" v-bind:alt="estate.estateName">
              <h3>{{estate.estateName}}</h3>
              <p>賃料 ¥{{estate.rent | addComma}}<br>{{estate.line}} {{estate.station}}</p>
            </li>
            </a>
          </transition>
        </ul>
        </div>
      </transition>
      <transition
       name="fade"
       appear
      >
        <div class="recommend_estates contents">
          <h2>よくある質問</h2>
          <ul>
            <li>
              <button class="collapse_button" @click="isOpen = !isOpen">Q. ~とはなんですか？</button>
              <collapse-transition>
                <div v-show="isOpen">This div will open and close smoothly!</div>
              </collapse-transition>
            </li>
          </ul>
        </div>
      </transition>
      
      
      <div class="form">
        <h2>お問い合わせ</h2>
        <label for="name">名前：</label>
        <input 
          id="name"
          type="text"
          v-model="name"
          class="input"
        >
        <label for="contactEmail">メールアドレス：</label>
        <input 
          id="email"
          type="email"
          v-model="contactEmail"
          class="input"
        >
        <label for="detail">問い合わせ内容：</label>
        <textarea 
          id="detail" 
          v-model="detail"
          class="textarea"
        ></textarea>
        <button @click="createContacts" class="button is-info">送信</button>
        
        <div v-for="post in posts" :key="post.name">
          <h2>問い合わせ内容</h2>
          <div>
            名前：{{ post.fields.name.stringValue }}
            メールアドレス：{{ post.fields.contactEmail.stringValue }}
            問い合わせ内容：{{ post.fields.detail.stringValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import firebase from 'firebase';
import { CollapseTransition } from "vue-collapse-transition";

export default {
    name: 'Home',
    props: {
      msg: String
    },
    components:{
      CollapseTransition,
    },
    data(){
      return{
        estates: [],
        name: "",
        contactEmail: "",
        detail: "",
        posts: [],
        latitude: 35.681419474781634,
        longitude: 139.76416467496134,
        isOpen: false
      }
  },
  created() {
    const db = firebase.firestore()
    const dbEstate = db.collection('estate')
    dbEstate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
        const data = doc.data()
        const estate = {
          entryDocId: doc.id,
          estateName: data.estateName,
          image: data.image,
          line: data.line,
          station: data.station,
          rent: data.rent,
          description: data.description,
        }
        console.log(estate);
        this.estates.push(estate)
      })
    }),
      axios.get(
        '/contact',{
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      }).then(response => {
        this.posts = response.data.documents;
        console.log(response.data.documents);
      });
  },
  methods: {
    linktodetail(link){
      var detaillink = '/estate/' + link
      return detaillink
    },
    createContacts() {
      axios
        .post(
          '/contact',
          {
            fields: {
              name: {
                stringValue: this.name
              },
              contactEmail: {
                stringValue: this.contactEmail
              },
              detail: {
                stringValue: this.detail
              }
            }
          },
          {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
       )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        this.name = "";
        this.contactEmail = "";
        this.detail = "";
      }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          // 緯度経度だけ取得
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
          alert("緯度:"+ this.latitude +",経度"+ this.longitude);
        }.bind(this),
        function(error) {
          // エラー処理を書く
          switch(error.code) {
            case 1: //PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: //POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: //TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    } else {
      // エラー処理を書く
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fv_image{
  background-image: url('../assets/pixta_64405275_M.jpg');
}

.our_service{
  width: 100%;
  margin: -50px 0px 0px 0px;
  background: #fff;
  line-height: 100px;
  padding: 0px 0px 0px 10px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}

.our_service h2{
  font-size: 24px;
  text-align: center;
}

.estate-lists{
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0px;
}

.estate-list{
  width: 220px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}

.estate-list img{
  width: 200px;
  display: block;
  margin: auto;
}

.estate-list p{
  color: black;
  padding: 10px;
}

.estate-list h3{
  color: black;
  padding: 10px;
  margin: 10px 0px 0px 0px;
}

.contents{
  margin: 30px 0px;
}

.collapse_button{
  background: #fff;
  border: none;
}
</style>
