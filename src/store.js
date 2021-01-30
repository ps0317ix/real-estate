import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../src/axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null
    },
    mutations: {
        updateIDToken(state, idToken){
            state.idToken = idToken;
        }
    },
    actions: {
        login({ commit }, authData){
            axios.post(
                '/accounts:signInWithPassword?key=AIzaSyBRXY5FDlCc4YJtnl8l_Avmxed4cUGe29c',{
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    commit('updateIDToken', response.data.idToken);
                });
        },
        register({ commit }, authData){
            axios.post(
                '/accounts:signUp?key=AIzaSyBRXY5FDlCc4YJtnl8l_Avmxed4cUGe29c',{
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    commit('updateIDToken', response.data.idToken);
                });
        }
    }
});