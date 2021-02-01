import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import router from './router';
import store from './store';
import axios from "axios";


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

const interceptorsRequest = axios.interceptors.request.use(
  config => {
    // axiosでリクエストを行った際の処理
    console.log('interceptors request', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    // axiosからレスポンスを受け取った際の処理
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

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});