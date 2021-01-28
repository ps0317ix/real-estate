import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component("Header", Header);
Vue.directive("border", function(el, binding){
  el.style.border = "solid black 2px";
  el.style.borderWidth = binding.value.width;
  el.style.borderColor = binding.value.color;
  el.style.borderStyle = binding.arg;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
