<template>
  <ButtonPill
    class="inline-flex md:hidden items-center uppercase"
    @click="showMobileSelect = true"
  >
    <span class="pr-2">{{ currentSelected }}</span>
    <ArrowDown />
  </ButtonPill>

  <ButtonPillGroup
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
          <ButtonPill
            v-for="language in supportedLanguages"
            :key="language"
            class="uppercase"
            :class="[
              isSelected(language)
                ? 'text-green-500 bg-opacity-10 bg-green-500 border-green-500'
                : 'border-gray-500',
            ]"
            @click="changeLanguage(language)"
            >{{ language }}
          </ButtonPill>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay } from '@headlessui/vue';
import { defineComponent } from '@vue/runtime-core';
import { FilterLanguage } from '../../domain/api/configFilter';
import IconClose from '../svg/IconClose.vue';
import ButtonPillGroup from '../button/ButtonPillGroup.vue';
import ButtonPill from '../button/ButtonPill.vue';
import ArrowDown from '../svg/ArrowDown.vue';
import { useUrlQueryParameter } from '../../lib/urlQuery/urlQueryParameter';

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    IconClose,
    ButtonPillGroup,
    ButtonPill,
    ArrowDown,
  },
  setup() {
    const languageParameter = useUrlQueryParameter('language', 'en', {
      defaultValue: 'en',
    });
    return {
      languageParameter,
    };
  },
  data() {
    return {
      supportedLanguages: Object.values(FilterLanguage),
      showMobileSelect: false,
    };
  },
  computed: {
    currentSelected() {
      return this.supportedLanguages.includes(this.languageParameter)
        ? this.languageParameter
        : FilterLanguage.EN;
    },
  },
  methods: {
    changeLanguage(language) {
      this.languageParameter = language;
      this.closeDialog();
    },
    isSelected(current) {
      return this.currentSelected == current;
    },
    closeDialog() {
      this.showMobileSelect = false;
    },
  },
});
</script>

<style scoped></style>
