<template>
  <div class="flex items-center">
    <ButtonLink
      v-for="link in links"
      :key="link.label"
      :variant="'ghost'"
      :to="link.to"
      size="xs"
      class="hidden mx-1 w-9 h-6 text-center uppercase md:flex md:justify-center md:items-center"
      :class="[
        link.selected
          ? 'bg-green-500 bg-opacity-10 border-green-500 focus:text-white'
          : '',
      ]"
      >{{ link.label }}</ButtonLink
    >

    <SelectCustom
      class="w-16 h-6 md:hidden"
      :options="links"
      :show-search-when-at-least-count-options="Infinity"
      @change="selected = $event"
    ></SelectCustom>
  </div>
</template>

<script lang="ts" setup>
import {
  defaultLanguage,
  FilterLanguage,
} from '../../domain/datasets/language';
import { computed, defineProps, withDefaults } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';
import { stringifyParameter, useApiQuery, useUrlQuery } from '../../domain/api';
import ButtonLink from '../button/ButtonLink.vue';
import SelectCustom from '../select/SelectCustom.vue';

const props = withDefaults(
  defineProps<{
    defaultLanguage?: FilterLanguage;
  }>(),
  { defaultLanguage: defaultLanguage }
);

const supportedLanguages: Array<string> = Object.values(FilterLanguage);

const apiQuery = useApiQuery();
apiQuery.updateApiParameterValidator('language', (value) =>
  supportedLanguages.includes(stringifyParameter(value))
);
const currentLanguage = apiQuery.useApiParameter('language', {
  defaultValue: props.defaultLanguage,
});

const urlQuery = useUrlQuery();
const router = useRouter();

const links = computed(() => {
  return supportedLanguages.map((language) => {
    const query = urlQuery.cleanQueryParametersExtendedWith({ language });

    const location: RouteLocationRaw = {
      query,
      hash: router.currentRoute.value.hash,
    };

    const selected = currentLanguage.value === language;

    return {
      label: language.toUpperCase(),
      value: language,
      to: location,
      selected,
    };
  });
});

const selected = computed({
  get: () => links.value.find((link) => link.selected)?.label,
  set: (value) => {
    const to = links.value.find((link) => link.value === value)?.to;
    if (to != null) {
      router.push(to);
    }
  },
});
</script>
