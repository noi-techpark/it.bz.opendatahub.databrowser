import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';
import registerCellComponents from './domain/cellComponents/plugins/registerCellComponents';
import { createApiQueryHandler } from './domain/api/service/apiQueryHandler';
import { createUrlQueryHandler } from './domain/api/service/urlQueryHandler';

const app = createApp(App);

// Add Vue router
app.use(router);

// Register API and URL query handler for API parameter handling in combination with URL
const apiQuery = createApiQueryHandler();
app.use(apiQuery);
const urlQuery = createUrlQueryHandler(router, apiQuery);
app.use(urlQuery);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// Add pinia store
app.use(createPinia());

// Register Vue cell render components globally for dynamic rendering
app.use(registerCellComponents);

// Add i18n translation
const i18n = setupI18n({ locale: 'en' });
loadLocaleMessages(i18n, i18n.global.locale).then(() => {
  app.use(i18n);

  // Mount the app
  app.mount('#app');
});
