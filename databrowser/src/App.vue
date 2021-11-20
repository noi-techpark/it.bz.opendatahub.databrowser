<template>
  <div>
    <select @change="setLocale($event)">
      <option
        v-for="locale in availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        :selected="locale === $i18n.locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
  <ul>
    <li><router-link to="/">Go to Home</router-link></li>
    <li><router-link to="/about">Go to About</router-link></li>
    <li><router-link to="/axios-example">Go to Axios Example</router-link></li>
    <li><router-link to="/error">Go to Error</router-link></li>
  </ul>
  {{ $t('message.hello', { msg: 'hello' }) }}
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
  <VueQueryDevTools />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { I18n, VueI18n } from 'vue-i18n';
import { useQueryProvider } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';
import { loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES } from './i18n';

import AppLayout from './layouts/AppLayout.vue';

export default defineComponent({
  name: 'App',
  components: { AppLayout, VueQueryDevTools },
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
