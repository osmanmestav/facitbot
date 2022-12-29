import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {router} from "./router";

Vue.use(VueAxios, axios)
Vue.use(Vuex)
//let ApiUrl = "http://localhost:8000/"
let ApiUrl = "http://89.252.177.26:8000/"
//let ApiUrl = "https://facit-mestav.herokuapp.com/"
//let ApiUrl = "https://api.facitbot.com/"
//let ApiUrl = "http://ec2-18-118-6-2.us-east-2.compute.amazonaws.com:8000/"
//let ApiUrl = "http://185.83.144.5:8000/"

//let diagramUrl = "http://diagram.facitbot.com/"
let diagramUrl = "http://localhost:8081/"

const store = new Vuex.Store({
    namespaced: true,
    state: {
        Account_id: localStorage.getItem('Account_id'),
        Personal: localStorage.getItem('_Personal'),
        Token: localStorage.getItem('W_Token'),
        email: localStorage.getItem('email'),
    },
    mutations: {
        setToken(state, data) {
            if (data.Token) state.Token = data.Token
            if (data.Account_id) state.Account_id = data.Account_id
            if (data.Email) state.Email = data.Email
        },
        clearSession(state) {
            state.Token = ''
            state.Account_id = ''
            state.Email = ''
        },
    },
    actions: {
        initAuth({commit}) {
            let Token = localStorage.getItem("W_Token");
            let Personal = localStorage.getItem("_Personal");
            let Account_id = localStorage.getItem("Account_id");
            let Email = localStorage.getItem('email');
            if (!Token) {
                if (location.pathname[1] + location.pathname[2] + location.pathname[3] + location.pathname[4] + location.pathname[5] != 'giris') {
                    router.push("/giris");
                    return false
                }
            } else {
                commit("setToken", {
                    Token: Token,
                    Personal: Personal,
                    Account_id: Account_id,
                    Email: Email,
                })
            }
        },
        Query({state, commit}, params) {
            var BaseUrl = null;
            if (state.Account_id) BaseUrl = ApiUrl + params.url; else BaseUrl = ApiUrl + params.url;
            return axios({
                method: params.method,
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'no-cache',
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                    'Authorization': state.Token ? 'Bearer ' + state.Token : ''
                },
                url: BaseUrl,
                data: params.data,
            }).then(response => {
                return response.data;
            }).catch(function (error) {
                console.log(error.message)
                if (error.response.status == 401) {
                    router.push("/login");
                    localStorage.clear();
                    location.reload();
                    commit('clearSession');
                }
            })
        },
        logout({commit}) {
            localStorage.clear();
            commit('clearSession');
        },
        sessions({commit}, data) {
            commit('setToken', data)
        }
    },

    getters: {
        ApiUrl() {
            return ApiUrl;
        },
        Session(state) {
            return !!state.Token;
        },
        Token(state) {
            return state.Token;
        },
        Account_id(state) {
            return state.Account_id;
        },
        Email(state) {
            return state.Email;
        },
        Diagram() {
            return diagramUrl;
        },
    },
})

export default store
