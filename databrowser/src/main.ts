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
import { createViewConfigProvider } from './domain/viewConfig/viewConfigProvider';

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

// Register remote API utilities
const viewConfigProvider = createViewConfigProvider(router);
app.use(viewConfigProvider);

// Register Vue cell render components globally for dynamic rendering
app.use(registerCellComponents);

// Add i18n translation
const locale = 'en';
const i18n = setupI18n({ locale });

loadLocaleMessages(i18n, locale).then(() => {
  app.use(i18n);

  // Mount the app
  app.mount('#app');
});
