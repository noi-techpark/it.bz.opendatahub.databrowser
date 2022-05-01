<template>
  <div class="flex items-center">
    <ButtonLink
      v-for="link in links"
      :key="link.label"
      :variant="link.selected ? 'solid' : 'ghost'"
      :to="link.to"
      size="xs"
      class="hidden m-1 w-9 h-6 text-center uppercase md:inline-block"
      :class="[
        link.selected
          ? 'bg-green-500 font-semibold bg-opacity-10 text-green-500 border-green-500 hover:text-white focus:text-white '
          : 'font-medium hover:bg-opacity-10 hover:text-green-500 border-[#EAEBED]',
      ]"
      >{{ link.label }}</ButtonLink
    >

    <SelectCustom
      class="w-16 h-6 md:hidden"
      :options="links"
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
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router';
import { useApiQuery } from '../../domain/api/service/apiQueryHandler';
import { stringifyParameter } from '../../domain/api/service/query';
import { useUrlQuery } from '../../domain/api/service/urlQueryHandler';
import ButtonLink from '../button/ButtonLink.vue';
import SelectCustom from '../select/SelectCustom.vue';

const props = withDefaults(
  defineProps<{
    defaultLanguage?: FilterLanguage;
  }>(),
  { defaultLanguage: defaultLanguage }
);

const route = useRoute();
const supportedLanguages: Array<string> = Object.values(FilterLanguage);

const apiQuery = useApiQuery();
apiQuery.updateApiParameterValidator('language', (value) =>
  supportedLanguages.includes(stringifyParameter(value))
);
const currentLanguage = apiQuery.useApiParameter('language', {
  defaultValue: props.defaultLanguage,
});

const urlQuery = useUrlQuery();

const links = computed(() => {
  return supportedLanguages.map((language) => {
    const query = urlQuery.cleanQueryParametersExtendedWith({ language });

    const location: RouteLocationRaw = {
      query,
      hash: route.hash,
    };

    const selected = currentLanguage.value === language;

    return {
      label: language,
      value: language,
      to: location,
      selected,
    };
  });
});

const router = useRouter();

const selected = computed({
  get: () => links.value.find((link) => link.selected)?.label,
  set: (label) => {
    const to = links.value.find((link) => link.label === label)?.to;
    if (to != null) {
      router.push(to);
    }
  },
});
</script>
