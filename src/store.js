import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import router from './router';
import axiosRefresh from './axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 明示的に空にする
        idToken: null,
        areas : [
            "北海道・東北",
            "関東",
            "中部",
            "近畿",
            "中国・四国",
            "九州・沖縄"
          ],
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
        municipalities: [
            [
            '札幌市',
            '函館市',
            '小樽市',
            '旭川市',
            '室蘭市',
            '釧路市',
            '帯広市',
            '北見市',
            '夕張市',
            '岩見沢市',
            '網走市',
            '留萌市',
            '苫小牧市',
            '稚内市',
            '美唄市',
            '芦別市',
            '江別市',
            '赤平市',
            '紋別市',
            '士別市',
            '名寄市',
            '三笠市',
            '根室市',
            '千歳市',
            '滝川市',
            '砂川市',
            '歌志内市',
            '深川市',
            '富良野市',
            '登別市',
            '恵庭市',
            '伊達市',
            '北広島市',
            '石狩市',
            '北斗市',
            '当別町',
            '新篠津村',
            '松前町',
            '福島町',
            '知内町',
            '木古内町',
            '七飯町',
            '鹿部町',
            '森町',
            '八雲町',
            '長万部町',
            '江差町',
            '上ノ国町',
            '厚沢部町',
            '乙部町',
            '奥尻町',
            '今金町',
            'せたな町',
            '島牧村',
            '寿都町',
            '黒松内町',
            '蘭越町',
            'ニセコ町',
            '真狩村',
            '留寿都村',
            '喜茂別町',
            '京極町',
            '倶知安町',
            '共和町',
            '岩内町',
            '泊村',
            '神恵内村',
            '積丹町',
            '古平町',
            '仁木町',
            '余市町',
            '赤井川村',
            '南幌町',
            '奈井江町',
            '上砂川町',
            '由仁町',
            '長沼町',
            '栗山町',
            '月形町',
            '浦臼町',
            '新十津川町',
            '妹背牛町',
            '秩父別町',
            '雨竜町',
            '北竜町',
            '沼田町',
            '鷹栖町',
            '東神楽町',
            '当麻町',
            '比布町',
            '愛別町',
            '上川町',
            '東川町',
            '美瑛町',
            '上富良野町',
            '中富良野町',
            '南富良野町',
            '占冠村',
            '和寒町',
            '剣淵町',
            '下川町',
            '美深町',
            '音威子府村',
            '中川町',
            '幌加内町',
            '増毛町',
            '小平町',
            '苫前町',
            '羽幌町',
            '初山別村',
            '遠別町',
            '天塩町',
            '猿払村',
            '浜頓別町',
            '中頓別町',
            '枝幸町',
            '豊富町',
            '礼文町',
            '利尻町',
            '利尻富士町',
            '幌延町',
            '美幌町',
            '津別町',
            '斜里町',
            '清里町',
            '小清水町',
            '訓子府町',
            '置戸町',
            '佐呂間町',
            '遠軽町',
            '湧別町',
            '滝上町',
            '興部町',
            '西興部村',
            '雄武町',
            '大空町',
            '豊浦町',
            '壮瞥町',
            '白老町',
            '厚真町',
            '洞爺湖町',
            '安平町',
            'むかわ町',
            '日高町',
            '平取町',
            '新冠町',
            '浦河町',
            '様似町',
            'えりも町',
            '新ひだか町',
            '音更町',
            '士幌町',
            '上士幌町',
            '鹿追町',
            '新得町',
            '清水町',
            '芽室町',
            '中札内村',
            '更別村',
            '大樹町',
            '広尾町',
            '幕別町',
            '池田町',
            '豊頃町',
            '本別町',
            '足寄町',
            '陸別町',
            '浦幌町',
            '釧路町',
            '厚岸町',
            '浜中町',
            '標茶町',
            '弟子屈町',
            '鶴居村',
            '白糠町',
            '別海町',
            '中標津町',
            '標津町',
            '羅臼町',
            '色丹村',
            '泊村',
            '留夜別村',
            '留別村',
            '紗那村',
            '蘂取村',
            ]
        ]
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
        }
    }
});