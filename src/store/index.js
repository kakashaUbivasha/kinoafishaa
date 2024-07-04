import {createStore} from "vuex";
import category from './category'
import auth from './auth'
import users from './users'
import news from './news'
import catalog from './catalog'
import orders from './orders.js';
import supports from './supports.js';
import feedbacks from './feedbacks.js';
import halls from "./halls.js";
import movies from "./movies.js";
import tickets from "./tickets.js";

export default createStore({
    state() {
        return {}
    },
    getters: {
        getServerDomain() {
            return 'https://test.ai-softdev.com'
        },
    },
    mutations: {},
    actions: {},
    modules: {
        auth,
        category,
        users,
        news,
        catalog,
        orders,
        supports,
        feedbacks,
        halls,
        movies,
        tickets
    }
}) 