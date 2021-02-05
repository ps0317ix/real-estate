import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import router from './router';
import axiosRefresh from './axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 明示的に空にする
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken){
            state.idToken = idToken;
        }
    },
    actions: {
        async autoLogin({ commit, dispatch }) {
            // 自動でトークンを取得
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const isExpired = now.getTime() >= expiryTimeMs;
            const refreshToken = localStorage.getItem('refreshToken');
            if(isExpired){
                await dispatch('refreshIdToken', refreshToken);
            }else{
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', refreshToken);
                }, expiresInMs)
                commit('updateIdToken', idToken);
            }
        },
        login({ dispatch }, authData){
            axios.post(
                '/accounts:signInWithPassword?key=AIzaSyBRXY5FDlCc4YJtnl8l_Avmxed4cUGe29c',{
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    dispatch('setAuthData', {
                        idToken: response.data.idToken,
                        expiresIn: response.data.expiresIn,
                        refreshToken: response.data.refreshToken,
                    });
                    if(authData.email!="exam@exam.com"){
                        router.push('/user');
                    }else{
                        localStorage.setItem('admin', true);
                        router.push('/administrator');
                    }
                });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('admin');
            router.replace('/login');
          },
        async refreshIdToken({ dispatch }, refreshToken){
            // トークンの有効期限が切れた時にリフレッシュする
            await axiosRefresh.post(
                '/token?key=AIzaSyBRXY5FDlCc4YJtnl8l_Avmxed4cUGe29c',
                {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }
            ).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.id_token,
                    expiresIn: response.data.expires_in,
                    refreshToken: response.data.refresh_token,
                });
            });
        },
        register({ dispatch }, authData){
            axios.post(
                '/accounts:signUp?key=AIzaSyBRXY5FDlCc4YJtnl8l_Avmxed4cUGe29c',{
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    dispatch('setAuthData', {
                        idToken: response.data.idToken,
                        expiresIn: response.data.expiresIn,
                        refreshToken: response.data.refreshToken,
                    });
                    router.push('/user');
                });
        },
        setAuthData({ commit , dispatch}, authData){
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);
            
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken);
            }, authData.expiresIn * 1000);
        }
    }
});