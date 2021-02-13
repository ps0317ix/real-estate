import Vue from 'vue';
import App from './App.vue';
import Header from './components/Header.vue';
import router from './router';
import store from './store';
import axios from "axios";
import firebase from 'firebase';
import { firebaseConfig } from '../plugins/firebase';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;
Vue.component("Header", Header);
Vue.directive("border", function(el, binding){
  el.style.border = "solid black 2px";
  el.style.borderWidth = binding.value.width;
  el.style.borderColor = binding.value.color;
  el.style.borderStyle = binding.arg;
});


// axiosを用いる際のbaseURL
axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/real-estate-4ff0d/databases/(default)/documents/";

// axiosでリクエストを行った際の処理
const interceptorsRequest = axios.interceptors.request.use(
  config => {
    console.log('interceptors request', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axiosからレスポンスを受け取った際の処理
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    console.log('interceptors response', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

// 取り除きたい処理
axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);



/**
 * 金額をカンマ区切りに表示します。
 * @param val 金額
 */
Vue.filter('addComma', function(val){
	return val.toLocaleString();
});

// firebaseの初期化設定
firebase.initializeApp(firebaseConfig);



store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});