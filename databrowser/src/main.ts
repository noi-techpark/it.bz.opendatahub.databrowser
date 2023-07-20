// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios from 'axios';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import { loadLocaleMessages, setupI18n } from './i18n';
import './index.css';
import { router } from './routes';
import registerCellComponents from './domain/cellComponents/plugins/registerCellComponents';
import { createUrlQueryHandler } from './domain/api';
import CookieConsent from 'vue-cookieconsent';
import './cookieconsent/cookieconsent.css';
import { consentOptions } from './cookieconsent/consentOptions';
import VueHotjar from 'vue-hotjar-next';

const app = createApp(App);

// Add Vue router
app.use(router);

// Add pinia store
app.use(createPinia());

// Register API and URL query handler for API parameter handling in combination with URL
const urlQuery = createUrlQueryHandler(router);
app.use(urlQuery);

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// Register Vue cell render components globally for dynamic rendering
app.use(registerCellComponents);

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

// Add hotjar
const isProduction = process.env.NODE_ENV !== 'development';
app.use(VueHotjar, {
  id: parseInt(import.meta.env.VITE_APP_HOTJAR_ID, 10),
  isProduction,
});
