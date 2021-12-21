<template>
  <PillButton
    class="inline-flex md:hidden items-center"
    @click="showMobileSelect = true"
  >
    <span class="pr-2">{{ currentSelected.toUpperCase() }}</span>
    <span class="sr-only">Selected language {{ currentSelected }}</span>
    <ArrowDown />
  </PillButton>

  <PillGroup
    :data="supportedLanguages"
    :initial-selected="currentSelected"
    class="hidden md:inline-flex uppercase"
    @selected-change="changeLanguage"
  />

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
          <PillButton
            v-for="language in supportedLanguages"
            :key="language"
            :active="isSelected(language)"
            class="uppercase"
            @click="changeLanguage(language)"
            >{{ language }}
          </PillButton>
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
import PillGroup from '../pill/PillGroup.vue';
import ArrowDown from '../svg/ArrowDown.vue';
import { useUrlQueryParameter } from '../../lib/urlQuery/urlQueryParameter';
import PillButton from '../pill/PillButton.vue';
import { computed, ref } from 'vue';

export default defineComponent({
  components: {
    PillButton,
    Dialog,
    DialogOverlay,
    IconClose,
    PillGroup,
    ArrowDown,
  },
  props: {
    defaultLanguage: {
      type: String as PropType<FilterLanguage>,
      default: FilterLanguage.EN,
    },
  },
  setup(props) {
    const supportedLanguages: Array<string> = Object.values(FilterLanguage);
    const showMobileSelect = ref<boolean>(false);
    const languageParameter = useUrlQueryParameter(
      'language',
      props.defaultLanguage,
      {
        defaultValue: props.defaultLanguage,
      }
    );

    const currentSelected = computed(() => {
      if (!languageParameter.value) {
        return props.defaultLanguage;
      }

      return supportedLanguages.includes(languageParameter.value)
        ? languageParameter.value
        : props.defaultLanguage;
    });

    function closeDialog() {
      showMobileSelect.value = false;
    }

    function changeLanguage(language: string) {
      languageParameter.value = language;
      closeDialog();
    }

    function isSelected(current: string) {
      return currentSelected.value == current;
    }

    return {
      languageParameter,
      supportedLanguages,
      showMobileSelect,
      currentSelected,
      changeLanguage,
      isSelected,
      closeDialog,
    };
  },
});
</script>
