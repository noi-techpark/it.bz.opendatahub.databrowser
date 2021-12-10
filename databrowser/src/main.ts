import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';
import store from './store';
import registerRenderComponents from './domain/renderComponents/plugins/registerRenderComponents';

const app = createApp(App);

// Add Vue router
app.use(router);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// Add vuex store
app.use(store);

// Add i18n translation
const i18n = setupI18n({ locale: 'en' });
loadLocaleMessages(i18n, i18n.global.locale);
app.use(i18n);

// Register Vue render components globally for dynamic rendering
app.use(registerRenderComponents);

// Mount the app
app.mount('#app');
