<template>
  <div class="relative z-30 flex items-center">
    <ButtonLink
      v-for="link in links"
      :key="link.label"
      :variant="'ghost'"
      :to="link.to"
      size="xs"
      class="mx-1 hidden h-6 w-9 text-center uppercase md:flex md:items-center md:justify-center"
      :class="[
        link.value === selected
          ? 'bg-green-500 bg-opacity-10 border-green-500 focus:text-white'
          : '',
      ]"
      :data-test="`desktop-language-picker-${link.value}`"
      >{{ link.label }}</ButtonLink
    >

    <SelectCustom
      id="mobile-language-picker"
      class="h-6 w-16 md:hidden"
      :options="links"
      :value="selected"
      :size="SelectSize.sm"
      :show-search-when-at-least-count-options="Infinity"
      @change="selected = $event"
    />
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
import { SelectSize } from '../select/types';

const props = withDefaults(
  defineProps<{
    defaultLanguage?: FilterLanguage;
  }>(),
  { defaultLanguage: defaultLanguage }
);

const supportedLanguages: Array<string> = Object.values(FilterLanguage);

const { useApiParameter, updateApiParameterValidator } = useApiQuery();

updateApiParameterValidator('language', (value) =>
  supportedLanguages.includes(stringifyParameter(value))
);
const currentLanguage = useApiParameter('language', {
  defaultValue: props.defaultLanguage,
});

const { cleanQueryParametersExtendedWith } = useUrlQuery();
const router = useRouter();

const links = computed(() => {
  return supportedLanguages.map((language) => {
    const query = cleanQueryParametersExtendedWith({ language });

    const location: RouteLocationRaw = {
      query,
      hash: router.currentRoute.value.hash,
    };

    return {
      label: language.toUpperCase(),
      value: language,
      to: location,
    };
  });
});

const selected = computed({
  get: () => stringifyParameter(currentLanguage.value ?? ''),
  set: (value) => {
    const to = links.value.find((link) => link.value === value)?.to;
    if (to != null) {
      router.push(to);
    }
  },
});
</script>
