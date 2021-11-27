<template>
  <select @change="setLocale($event)">
    <option
      v-for="locale in availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
      :selected="locale === $i18n.locale"
    >
      {{ $t(`languageSwitch.language.${locale}`) }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { I18n, VueI18n } from 'vue-i18n';
import { useQueryProvider } from 'vue-query';
import {
  loadLocaleMessages,
  setI18nLanguage,
  SUPPORT_LOCALES,
} from '../../i18n';

export default defineComponent({
  name: 'App',
  setup() {
    useQueryProvider();
  },
  data() {
    return {
      availableLocales: SUPPORT_LOCALES,
    };
  },
  methods: {
    setLocale(event: Event) {
      const locale = (event.target as HTMLSelectElement).value;
      console.log('event', this.$i18n, event, locale);
      loadLocaleMessages(this.$i18n as VueI18n, locale);
      setI18nLanguage(this.$i18n as unknown as I18n, locale);
      console.log('locale', locale);
    },
  },
});
</script>
