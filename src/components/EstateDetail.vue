<template>
  <transition
       name="fade"
       appear
      >
  <div class="container">
    <div class="estatedetail">
      <h1>{{ estateName }}</h1>
      <h2>物件画像：</h2>
      <div class="swiper-content">
        <swiper :options="swiperOption">
          <swiper-slide><img :src="image"></swiper-slide>
          <swiper-slide><img :src="image"></swiper-slide>
          <swiper-slide><img :src="image"></swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
          <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div>
      
      <div class="table__wrapper">
        <table class="table is-bordered pricing__table is-fullwidth">
        <tr>
          <td><h2>物件名：</h2></td>
          <td>{{estateName}}</td>
        </tr>
        <tr>
          <td><h2>物件概要：</h2></td>
          <td>{{ description }}</td>
        </tr>
      </table>
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
      props: ["id"],
      estateName: '',
      image: '',
      description: '',
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  created(){
    let self = this
    const db = firebase.firestore()
    const dbEstate = db.collection('estate').doc(this.$route.params.id)
    dbEstate.get().then(function(doc) {
      if (doc.exists){
        var data = doc.data();
        self.estateName = data.estateName
        self.image = data.image
        self.description = data.description
      } else {
        console.log("No such document!");
      }}).catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    estateupdate() {
      const db = firebase.firestore()
      const dbEstate = db.collection('estate')
      dbEstate.update()
    }
  },
}
</script>

<style scoped>

.estatedetail{
  padding: 150px 0px;
}

h1{
  font-size: 32px;
}

.swiper-content{
  width: 50%;
}

.swiper-slide img{
  width: 100%;
  height: 400px;
  object-fit: cover;
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

td img{
  height: 100px;
  object-fit: cover;
}


</style>
