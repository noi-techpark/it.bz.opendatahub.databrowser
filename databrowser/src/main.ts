// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios from 'axios';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import CookieConsent from 'vue-cookieconsent';
import VueHotjar from 'vue-hotjar-next';
import App from './App.vue';
import { consentOptions } from './cookieconsent/consentOptions';
import './cookieconsent/cookieconsent.css';
import registerCellComponents from './domain/cellComponents/plugins/registerCellComponents';
import { setupI18n } from './i18n';
import './index.css';
import { router } from './routes';

const isProduction = process.env.NODE_ENV !== 'development';

const app = createApp(App);
// Enable performance measurement in development mode
app.config.performance = !isProduction;

// Add Vue router
app.use(router);

// Add pinia store
app.use(createPinia());

// Add axios and provide it as injectable property (see https://www.npmjs.com/package/vue-axios)
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// Register Vue cell render components globally for dynamic rendering
app.use(registerCellComponents);

// Add cookie-banner
app.use(CookieConsent, consentOptions);

// Add hotjar
app.use(VueHotjar, {
  id: parseInt(import.meta.env.VITE_APP_HOTJAR_ID, 10),
  isProduction,
});

// Add i18n translation
const i18n = await setupI18n({ locale: 'en', warnHtmlMessage: false });
app.use(i18n);

// Mount the app
app.mount('#app');
