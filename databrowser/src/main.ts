import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './index.css';
import { router } from './routes';
import store from './store';

const app = createApp(App);

// Add Vue router
app.use(router);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.use(store);
app.provide('axios', app.config.globalProperties.axios);

// Mount the app
app.mount('#app');
