import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';

const app = createApp(App);

// Add Vue router
app.use(router);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

const i18n = setupI18n({ locale: 'en' });
loadLocaleMessages(i18n, i18n.global.locale);
app.use(i18n);

// Mount the app
app.mount('#app');
