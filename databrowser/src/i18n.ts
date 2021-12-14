import { nextTick } from 'vue';
import { createI18n, I18n, Locale, VueI18n } from 'vue-i18n';

const isI18n = (i18n: I18n | VueI18n): i18n is I18n =>
  (i18n as I18n).global != null;

export const SUPPORT_LOCALES = ['en', 'de', 'it'];

export const setupI18n = (options = { locale: 'en' }) => {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
};

export function setI18nLanguage(i18n: I18n | VueI18n, locale: Locale) {
  if (isI18n(i18n)) {
    if (i18n.mode === 'composition') {
      // Current bug in vue-i18n types, need to add cast in order to be able to
      // assign locale. See https://github.com/intlify/vue-i18n-next/issues/785
      (i18n.global.locale as { value: string }).value = locale;
    } else {
      i18n.global.locale = locale;
    }
  } else {
    i18n.locale = locale;
  }

  // Set html lang attribute
  document.querySelector('html')?.setAttribute('lang', locale);
}

export const loadLocaleMessages = async (
  i18n: I18n | VueI18n,
  locale: string
) => {
  // Load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`);

  if (isI18n(i18n)) {
    // Set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default);
  } else {
    i18n.setLocaleMessage(locale, messages.default);
  }

  return nextTick();
};
