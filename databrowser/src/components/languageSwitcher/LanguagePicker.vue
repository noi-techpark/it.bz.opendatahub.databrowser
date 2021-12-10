<template>
  <ButtonPill
    class="inline-flex md:hidden items-center"
    @click="showMobileSelect = true"
  >
    <span class="pr-2">{{ currentSelected }}</span>
    <ArrowDown />
  </ButtonPill>

  <ButtonPillGroup
    :data="suportedLanguages"
    :initial-selected="currentSelected"
    class="hidden md:inline-flex"
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
            v-for="language in suportedLanguages"
            :key="language"
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

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    IconClose,
    ButtonPillGroup,
    ButtonPill,
    ArrowDown,
  },
  data() {
    return {
      suportedLanguages: Object.values(FilterLanguage),
      showMobileSelect: false,
    };
  },
  computed: {
    currentSelected() {
      const query = this.$route.query.language;

      return query != null && this.suportedLanguages.includes(query)
        ? query
        : FilterLanguage.EN;
    },
  },
  methods: {
    changeLanguage(language) {
      this.$router.replace({ query: { language } });
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
