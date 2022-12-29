import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/tr-TR'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css'
import VueXlsx from 'vue-js-xlsx'
import VueChatScroll from 'vue-chat-scroll';

import VueSocketIOExt from 'vue-socket.io-extended';
import {io} from 'socket.io-client';

//Vue.prototype.$api_url = 'http://localhost:8000';
Vue.prototype.$api_url = 'http://89.252.177.26:8000';
//Vue.prototype.$api_url = 'http://185.83.144.5:8000';
//Vue.prototype.$api_url = 'https://facit-mestav.herokuapp.com';
//Vue.prototype.$api_url = 'https://api.facitbot.com';
//Vue.prototype.$api_url = 'http://ec2-18-118-6-2.us-east-2.compute.amazonaws.com:8000';


const Token = localStorage.getItem('W_Token');
const socket = io(Vue.prototype.$api_url, {
    autoConnect: false,
    reconnection: true,
    query: {token: Token},
});
if (Token) socket.open();

Vue.use(VueSocketIOExt, socket, {store});


Vue.use(VueXlsx);
Vue.config.productionTip = false
Vue.use(ElementUI, {locale});


Vue.use(VueChatScroll);

import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)


new Vue({
    sockets: {
        connect: function () {
            console.log('socket connected')
            this.$socket.client.emit('user', {User_id: "1"})
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)' + data)
        },
        sendLog: function (data) {
            console.log(data)
        }
    },
    router,
    store,
    render: h => h(App),
}).$mount('#app')
