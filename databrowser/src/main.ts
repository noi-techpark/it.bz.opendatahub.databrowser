import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';
import store from './store';
import registerCellComponents from './domain/cellComponents/plugins/registerCellComponents';

const app = createApp(App);

// Add Vue router
app.use(router);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// Add vuex store
app.use(store);

// Register Vue cell render components globally for dynamic rendering
app.use(registerCellComponents);

// Add i18n translation
const i18n = setupI18n({ locale: 'en' });
loadLocaleMessages(i18n, i18n.global.locale).then(() => {
  app.use(i18n);

  // Mount the app
  app.mount('#app');
});
