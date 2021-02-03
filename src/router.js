import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import userEdit from './components/userEdit.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import User from './components/User.vue';
import Administrator from './components/Administrator.vue';
import store from './store';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About},
        {path: '/login',
         component: Login,
         beforeEnter(to, from, next){
            if(store.getters.idToken){
                next('/user');
            }else{
                next();
            }
        }},
        {path: '/register',
         component: Register,
         beforeEnter(to, from, next) {
         if (store.getters.idToken) {
             next('/');
         } else {
             next();
         }
        }
        },
        {path: '/user',
         component: User,
         beforeEnter(to, from, next){
             if(store.getters.idToken){
                 next();
             }else{
                 next('/login');
             }
         }
        },
        {path: '/user/:id', 
         component: User,
         props: true,
         children: [
            {path: 'edit',
             component: userEdit,
             beforeEnter(to, from, next){
                if(store.getters.idToken){
                    next();
                }else{
                    next('/login');
                }
            }}
        ]},
        {path: '/administrator',
         component: Administrator,
         beforeEnter(to, from, next){
             if(store.getters.idToken){
                 next();
             }else{
                 next('/login');
             }
         }
        },
    ]
});