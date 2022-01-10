<template>
  <div
    :class="{
      'text-green-500 bg-opacity-10 bg-green-500 border-green-500': isSelected,
      'hover:bg-gray-300': !isSelected,
      'rounded-l-full border-l': isFirst,
      'rounded-r-full border-r': isLast,
    }"
    class="
      overflow-hidden
      last:pr-1
      first:pl-1
      border-t border-b border-gray-500
    "
  >
    <router-link
      :class="{
        'border-green-500': isSelected,
        'border-l': !isFirst,
        'border-r': !isLast,
      }"
      :to="item.url"
      class="block border-transparent"
      role="button"
      tabindex="0"
    >
      <span class="block py-1 px-2 font-semibold">{{ item.label }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export type PillLinkGroupType = {
  label: string | number;
  url: string;
};

export default defineComponent({
  props: {
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object as PropType<PillLinkGroupType>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();

    console.log(props.item);
    console.log(route.fullPath);
    const isSelected = computed(() => {
      return props.item.url == route.fullPath;
    });

    return {
      isSelected,
    };
  },
});
</script>
