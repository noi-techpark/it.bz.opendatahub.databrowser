<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="relative z-30 flex items-center">
    <ButtonLink
      v-for="link in links"
      :key="link.value"
      :to="link.to"
      size="xs"
      variant="ghost"
      class="size-9 mx-1 hidden text-center text-base uppercase md:flex md:items-center md:justify-center"
      :class="[
        link.value === selected ? 'border-green-500 bg-green-500/10' : '',
      ]"
      :data-test="`desktop-language-picker-${link.value}`"
    >
      {{ link.label }}
    </ButtonLink>

    <SelectCustom
      id="mobile-language-picker"
      class="h-9 w-16 md:hidden"
      :options="links"
      :value="selected"
      :size="SelectSize.sm"
      :show-search-when-at-least-count-options="Infinity"
      extra-height
      @change="selected = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  defaultLanguage,
  FilterLanguage,
} from '../../domain/datasets/language';
import ButtonLink from '../button/ButtonLink.vue';
import SelectCustom from '../select/SelectCustom.vue';
import { SelectSize } from '../select/types';

const props = withDefaults(
  defineProps<{ currentLanguage: string | null | undefined }>(),
  {
    currentLanguage: defaultLanguage,
  }
);

const supportedLanguages = Object.values(FilterLanguage);

const router = useRouter();

const links = computed(() => {
  return supportedLanguages.map((language) => {
    const query = {
      ...router.currentRoute.value.query,
      language: language == 'en' ? undefined : language,
    };

    return {
      label: language.toLocaleUpperCase(),
      value: language,
      to: {
        query,
        hash: router.currentRoute.value.hash,
      },
    };
  });
});

const selected = computed({
  get: () => props.currentLanguage ?? defaultLanguage,
  set: (value) => {
    const to = links.value.find((link) => link.value === value)?.to;
    if (to != null) {
      router.push(to);
    }
  },
});
</script>
