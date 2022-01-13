<template>
  <PillButton
    class="inline-flex md:hidden items-center"
    @click="showMobileSelect = true"
  >
    <span class="sr-only">Selected language</span>
    <span class="pr-2 uppercase">{{ languageParameter }}</span>
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
            :active="isSelected(link.url)"
            :to="link.url"
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PillLinkGroup from '../pill/PillLinkGroup.vue';
import PillLink from '../pill/PillLink.vue';
import { useUrlQueryParameter } from '../../lib/urlQuery/urlQueryParameter';

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
    const languageParameter = useUrlQueryParameter(
      'language',
      props.defaultLanguage
    );

    const currentPath = route.path;
    const currentQueries = Object.entries(route.query)
      .filter((obj) => obj[0] != 'language')
      .map((query) => `${query[0]}=${query[1]}`);
    const links = supportedLanguages.map((lang) => {
      const query = [...currentQueries, `language=${lang}`];

      return {
        label: lang.toUpperCase(),
        url: `${currentPath}?${query.join('&')}`,
      };
    });

    function closeDialog() {
      showMobileSelect.value = false;
    }

    function isSelected(url: string) {
      return url == route.fullPath;
    }

    return {
      supportedLanguages,
      showMobileSelect,
      languageParameter,
      links,
      isSelected,
      closeDialog,
    };
  },
});
</script>
