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

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/real-estate-4ff0d/databases/(default)/documents/";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
