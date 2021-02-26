import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import router from './router';
import axiosRefresh from './axios-refresh';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 明示的に空にする
        idToken: null,
        areas : [],
        pref : [
              "北海道",
              "青森県",
              "岩手県",
              "宮城県",
              "秋田県",
              "山形県",
              "福島県",
              "茨城県",
              "栃木県",
              "群馬県",
              "埼玉県",
              "東京都",
              "千葉県",
              "神奈川県",
              "新潟県",
              "長野県",
              "山梨県",
              "富山県",
              "石川県",
              "福井県",
              "岐阜県",
              "静岡県",
              "愛知県",
              "滋賀県",
              "京都府",
              "大阪府",
              "奈良県",
              "兵庫県",
              "和歌山県",
              "三重県",
              "鳥取県",
              "島根県",
              "岡山県",
              "広島県",
              "山口県",
              "徳島県",
              "香川県",
              "愛媛県",
              "高知県",
              "福岡県",
              "佐賀県",
              "長崎県",
              "熊本県",
              "大分県",
              "宮崎県",
              "鹿児島県",
              "沖縄県"
          ],
        municipalities: [],
        stations: []
    },
    getters: {
        idToken: state => state.idToken,
        stations: state => state.stations,
    },
    mutations: {
        updateIdToken(state, idToken){
            state.idToken = idToken;
        },
        addStations(state, stationdata){
            console.log(stationdata);
            state.stations.push(stationdata)
        },
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
                        displayName: response.data.displayName,
                        idToken: response.data.idToken,
                        expiresIn: response.data.expiresIn,
                        refreshToken: response.data.refreshToken,
                    });
                    if(authData.email!="exam@exam.com"){
                        console.log('ログイン成功');
                        localStorage.setItem('admin', 'false');
                        router.push('/user');
                    }else{
                        localStorage.setItem('admin', 'true');
                        router.push('/administrator/adminhome');
                    }
                });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('displayName');
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
                    displayName: authData.displayName,
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
            console.log(authData);
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            localStorage.setItem('displayName', authData.displayName);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);
            
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken);
            }, authData.expiresIn * 1000);
        },
        fetchManiciples ({ commit }){
            firebase.firestore().collection("stations").get().then(snapshot => {
              snapshot.forEach(doc => 
                    commit( 'addStations', doc.data())
                )
            })
          },
    }
});