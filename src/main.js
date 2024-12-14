import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { VueSpinnersPlugin } from 'vue3-spinners';
import { tr } from 'date-fns/locale';


import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import timeago from "vue-timeago3";

createApp(App).use(timeago, { locale: tr }).use(VueSpinnersPlugin).use(ToastPlugin).use(router).mount('#app')
