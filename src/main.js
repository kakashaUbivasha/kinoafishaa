import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAnimXYZ from '@animxyz/vue3'
import StarRating from 'vue-star-rating'
import '@animxyz/core'
import VueTheMask from 'vue-the-mask'
import YmapPlugin from 'vue-yandex-maps'
import 'vue3-toastify/dist/index.css';

import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

import Paginate from "vuejs-paginate-next";
import {yandexMap} from "vue-yandex-maps";

const app = createApp(App)
const settings = {
    apiKey: '1f5a9f9f-4dc4-47aa-952e-a31cdd552634',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

app.component("Paginate", Paginate);
app.use(VueAnimXYZ);
app.use(router);
app.use(store);
app.use(VueTheMask)
app.use(StarRating);
app.use(VueTimepicker);

app.component('yandex-map', yandexMap)
app.use(YmapPlugin, settings);

app.mount('#app')
