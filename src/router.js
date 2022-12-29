import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Login from './Module/auth/login'
import Register from './Module/auth/register'
import Verification from './Module/auth/verification'
import verify from './Module/auth/verify'
import Panel from './Module/panel'
import Error from './Module/404'
import Device from './Module/device'
import botIndex from './Module/bot/index'
import botList from './Module/bot/bot'
import botDetail from './Module/bot/botDetail'
import Directory from './Module/directory'
import Message from './Module/message'
import Settings from './Module/settings'
import Chat from './Module/chat'


Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: Login,
            beforeEnter(to, from, next) {
                if (store.getters.Session) {
                    next("/panel");
                } else {
                    next();

                }
            }
        },
        {
            path: "/register",
            component: Register,
            beforeEnter(to, from, next) {
                if (store.getters.Session) {
                    next("/panel");
                } else {
                    next();
                }
            }
        },
        {
            path: "/verification",
            component: Verification,
            beforeEnter(to, from, next) {
                if (store.getters.Session) {
                    next("/panel");
                } else {
                    next();
                }
            }
        },
        {
            path: "/verify/:id",
            component: verify,
            beforeEnter(to, from, next) {
                if (store.getters.Session) {
                    next("/panel");
                } else {
                    next();
                }
            }
        },

        {
            path: "/",
            component: Panel,
        },
        {
            path: "/panel",
            component: Panel,
        },
        {
            path: "/device",
            component: Device,
        },
        {
            path: "/bot",
            component: botIndex,
            children: [
                {
                    path: '',
                    component: botList,
                },
                {
                    path: ':id',
                    component: botDetail,
                }
            ]
        },
        {
            path: "/directory",
            component: Directory,
        },
        {
            path: "/chat",
            component: Chat,
        },
        {
            path: "/message",
            component: Message,
        },
        {
            path: "/settings",
            component: Settings,
        },
        {
            path: "*",
            component: Error,
        }

    ],
    mode: "history",
    linkActiveClass: "is-active",
    linkExactActiveClass: "is-active"
});
