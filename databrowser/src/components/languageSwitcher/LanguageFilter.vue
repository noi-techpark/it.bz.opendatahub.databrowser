<template>
  <button
    class="
      inline-flex
      md:hidden
      items-center
      py-1
      px-4
      rounded-full
      border border-gray-500
    "
    @click="showMobileSelect = true"
  >
    <span class="pr-2">{{ selected }}</span>
    <ArrowDown />
  </button>
  <div class="hidden md:inline-flex">
    <div
      v-for="(language, index) in languages"
      :key="language"
      :class="{
        'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
          isSelected(language),
        'hover:bg-gray-300': !isSelected(language),
        'rounded-l-full border-l': index == 0,
        'rounded-r-full border-r': index == languages.length - 1,
      }"
      class="
        overflow-hidden
        last:pr-1
        first:pl-1
        border-t border-b border-gray-500
      "
    >
      <div
        :class="{
          'border-green-500': isSelected(language),
          'border-l': index != 0,
          'border-r': index != languages.length - 1,
        }"
        class="border-transparent"
        role="button"
        tabindex="0"
        @click="changeLanguage(language)"
      >
        <span class="block py-1 px-2 font-semibold">{{ language }}</span>
      </div>
    </div>
  </div>
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
          <ButtonCustom
            v-for="language in languages"
            :key="language"
            :class="[
              isSelected(language)
                ? 'text-green-500 bg-opacity-10 bg-green-500 border-green-500'
                : 'border-gray-500',
            ]"
            size="sm"
            variant="tab"
            @click="changeLanguage(language)"
            >{{ language }}
          </ButtonCustom>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import ArrowDown from '../svg/ArrowDown.vue';
import IconClose from '../svg/IconClose.vue';
import ButtonCustom from '../button/ButtonCustom.vue';

export default defineComponent({
  components: { ButtonCustom, IconClose, ArrowDown, Dialog, DialogOverlay },
  props: {
    defaultLanguage: {
      type: String as PropType<string>,
      required: true,
    },
    languages: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    let showMobileSelect = ref<boolean>(false);

    const queryLanguage = route.query.language as string;
    const initialLanguage =
      queryLanguage == null || !props.languages.includes(queryLanguage)
        ? props.defaultLanguage
        : queryLanguage;
    let selected = ref<string>(initialLanguage);

    function isSelected(current: string) {
      return selected.value == current;
    }

    function changeLanguage(language: string) {
      selected.value = language;
      router.replace({ query: { language } });
      closeDialog();
    }

    function closeDialog() {
      showMobileSelect.value = false;
    }

    return {
      selected,
      showMobileSelect,
      isSelected,
      changeLanguage,
      closeDialog,
    };
  },
});
</script>
