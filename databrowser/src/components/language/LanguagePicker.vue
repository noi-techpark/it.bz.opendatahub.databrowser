<template>
  <PillButton
    class="inline-flex md:hidden items-center"
    @click="showMobileSelect = true"
  >
    <span class="sr-only">Selected language</span>
    <span class="pr-2 uppercase">{{ currentLanguage }}</span>
    <ArrowDown />
  </PillButton>

  <PillLinkGroup :data="links" class="hidden md:inline-flex uppercase" />

  <BottomSheet :show-sheet="showMobileSelect" @close="closeDialog">
    <PillLink
      v-for="link in links"
      :key="link.label"
      :active="link.selected"
      :to="link.to"
      class="uppercase"
      @click="closeDialog"
      >{{ link.label }}
    </PillLink>
  </BottomSheet>
</template>

<script lang="ts" setup>
import { FilterLanguage } from '../../domain/api/configFilter';
import ArrowDown from '../svg/ArrowDown.vue';
import PillButton from '../pill/PillButton.vue';
import { computed, defineProps, ref, withDefaults } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import PillLinkGroup from '../pill/PillLinkGroup.vue';
import PillLink from '../pill/PillLink.vue';
import { useApiQuery } from '../../lib/apiQuery/apiQueryHandler';
import { useUrlQuery } from '../../lib/apiQuery/urlQueryHandler';
import { stringifyParameter } from '../../lib/apiQuery/query';
import BottomSheet from '../sheet/BottomSheet.vue';

const props = withDefaults(
  defineProps<{
    defaultLanguage: FilterLanguage;
  }>(),
  {
    defaultLanguage: FilterLanguage.EN,
  }
);

const route = useRoute();
const supportedLanguages: Array<string> = Object.values(FilterLanguage);
const showMobileSelect = ref<boolean>(false);

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
      to: location,
      selected,
    };
  });
});

function closeDialog() {
  showMobileSelect.value = false;
}
</script>
