<template>
  <div class="inline-flex">
    <div
      v-for="(lang, index) in keys"
      :key="lang"
      :class="{
        'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
          isSelected(lang),
        'hover:bg-gray-300': !isSelected(lang),
        'rounded-l-full border-l': index == 0,
        'rounded-r-full border-r': index == keys.length - 1,
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
          'border-green-500': isSelected(lang),
          'border-l': index != 0,
          'border-r': index != keys.length - 1,
        }"
        class="border-transparent"
        role="button"
        tabindex="0"
        @click="changeLanguage(lang)"
      >
        <span class="block py-1 px-2 font-semibold">{{ lang }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';

export enum Language {
  DE = 'DE',
  IT = 'IT',
  EN = 'EN',
  NL = 'NL',
  CS = 'CS',
  PL = 'PL',
  FR = 'FR',
  RU = 'RU',
}

export default defineComponent({
  props: {
    defaultLanguage: {
      type: String as PropType<Language>,
      default: Language.EN,
    },
  },
  setup(props) {
    const keys = Object.keys(Language);
    const selected = ref<Language>(props.defaultLanguage);

    return { keys, selected };
  },
  mounted() {
    const language = this.$route.query.dataLanguage as Language;

    this.selected =
      language == null || Language[language] === undefined
        ? this.defaultLanguage
        : language;
  },
  methods: {
    isSelected(current: Language) {
      return this.selected == current;
    },
    changeLanguage(language: Language) {
      this.selected = language;
      this.$router.replace({ query: { dataLanguage: language } });
    },
  },
});
</script>

<style scoped>
button {
  border-right-color: transparent;
  border-left-color: transparent;
}
</style>
