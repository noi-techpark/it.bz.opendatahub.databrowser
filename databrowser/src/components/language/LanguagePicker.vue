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

  <Dialog
    :open="showMobileSelect"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div class="relative py-3 w-full bg-white rounded-t">
        <div class="flex flex-col justify-center px-3 space-y-3 w-full">
          <button class="mx-auto" @click="closeDialog">
            <IconClose />
          </button>
          <PillLink
            v-for="link in links"
            :key="link.label"
            :active="link.selected"
            :to="link.to"
            class="uppercase"
            @click="closeDialog"
            >{{ link.label }}
          </PillLink>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Dialog, DialogOverlay } from '@headlessui/vue';
import { defineComponent, PropType } from '@vue/runtime-core';
import { FilterLanguage } from '../../domain/api/configFilter';
import IconClose from '../svg/IconClose.vue';
import ArrowDown from '../svg/ArrowDown.vue';
import PillButton from '../pill/PillButton.vue';
import { computed, ref } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import PillLinkGroup from '../pill/PillLinkGroup.vue';
import PillLink from '../pill/PillLink.vue';
import { useApiQuery } from '../../domain/api/service/apiQueryHandler';
import { stringifyParameter } from '../../domain/api/service/query';
import { useUrlQuery } from '../../domain/api/service/urlQueryHandler';

export default defineComponent({
  components: {
    PillLink,
    PillLinkGroup,
    PillButton,
    Dialog,
    DialogOverlay,
    IconClose,
    ArrowDown,
  },
  props: {
    defaultLanguage: {
      type: String as PropType<FilterLanguage>,
      default: FilterLanguage.EN,
    },
  },
  setup(props) {
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

    return {
      supportedLanguages,
      showMobileSelect,
      currentLanguage,
      links,
      closeDialog,
    };
  },
});
</script>
