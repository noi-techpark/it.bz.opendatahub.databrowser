// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { isRef } from 'vue';
import { createI18n, I18n, Locale } from 'vue-i18n';

export const setupI18n = async (
  options = { locale: 'en', warnHtmlMessage: false }
) => {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  await loadLocaleMessages(i18n, options.locale);
  return i18n;
};

export function setI18nLanguage(i18n: I18n, locale: Locale) {
  if (isRef(i18n.global.locale)) {
    i18n.global.locale.value = locale;
  } else {
    i18n.global.locale = locale;
  }

  // Set html lang attribute
  document.querySelector('html')?.setAttribute('lang', locale);
}

export const loadLocaleMessages = async (i18n: I18n, locale: Locale) => {
  // Load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
};
