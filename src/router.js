import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Us from './components/Us.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import User from './components/User.vue';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {path: '/', component: Home},
        {path: '/about/:id', 
         component: About,
         props: true,
         children: [
             {path: 'us', component: Us}
         ]},
         {path: '/login', component: Login},
         {path: '/register', component: Register},
         {path: '/user', component: User},
    ]
});