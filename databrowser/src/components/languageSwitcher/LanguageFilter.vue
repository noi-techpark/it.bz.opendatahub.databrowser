<template>
  <div class="inline-flex">
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
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default defineComponent({
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

    const queryLanguage = route.query.language as string;
    const initialLanguage =
      queryLanguage == null || !props.languages.includes(queryLanguage)
        ? props.defaultLanguage
        : queryLanguage;
    const selected = ref<string>(initialLanguage);

    return { selected };
  },
  methods: {
    isSelected(current: string) {
      return this.selected == current;
    },
    changeLanguage(language: string) {
      this.selected = language;
      this.$router.replace({ query: { language } });
    },
  },
});
</script>
