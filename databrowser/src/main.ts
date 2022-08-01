import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';
import registerCellComponents from './domain/cellComponents/plugins/registerCellComponents';
import { createApiQueryHandler, createUrlQueryHandler } from './domain/api';
import CookieConsent from 'vue-cookieconsent';
import './cookieconsent/cookieconsent.css';
import { consentOptions } from './cookieconsent/consentOptions';
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';

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

// Register Vue Diff in order to show JSON diffs (TODO: should this be removed later on?)
app.use(VueDiff, { componentName: 'VueDiff' });

// Add i18n translation
const locale = 'en';
const i18n = setupI18n({ locale, warnHtmlMessage: false });

loadLocaleMessages(i18n, locale).then(() => {
  app.use(i18n);

  // Mount the app
  app.mount('#app');
});

// Add cookie-banner
app.use(CookieConsent, consentOptions);
