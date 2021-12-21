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
    <div
      :class="{
        'border-green-500': isSelected,
        'border-l': !isFirst,
        'border-r': !isLast,
      }"
      class="border-transparent"
      role="button"
      tabindex="0"
      @click="$emit('changeSelectedItem', item)"
    >
      <span class="block py-1 px-2 font-semibold">{{ item }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { computed } from 'vue';

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
      type: String,
      required: true,
    },
    currentItem: {
      type: String,
      default: '',
    },
  },
  emits: ['changeSelectedItem'],
  setup(props) {
    const isSelected = computed(() => {
      return props.item == props.currentItem;
    });

    return {
      isSelected,
    };
  },
});
</script>
