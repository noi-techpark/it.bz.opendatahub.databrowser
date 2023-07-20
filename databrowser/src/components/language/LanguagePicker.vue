<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
        link.value === selected ? 'border-green-500 bg-green-500/10' : '',
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
  defaultLanguage as dl,
  FilterLanguage,
} from '../../domain/datasets/language';
import { computed } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';
import {
  stringifyParameter,
  useApiParameterHandler,
  useUrlQuery,
} from '../../domain/api';
import ButtonLink from '../button/ButtonLink.vue';
import SelectCustom from '../select/SelectCustom.vue';
import { SelectSize } from '../select/types';

const props = withDefaults(
  defineProps<{
    defaultLanguage?: FilterLanguage;
  }>(),
  { defaultLanguage: dl }
);

const supportedLanguages: Array<string> = Object.values(FilterLanguage);

const { useApiParameter, updateApiParameterValidator } =
  useApiParameterHandler();

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
