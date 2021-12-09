<template>
  <div>
    <div
      v-for="(item, index) in data"
      :key="item"
      :class="{
        'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
          isSelected(item),
        'hover:bg-gray-300': !isSelected(item),
        'rounded-l-full border-l': index == 0,
        'rounded-r-full border-r': index == data.length - 1,
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
          'border-green-500': isSelected(item),
          'border-l': index != 0,
          'border-r': index != data.length - 1,
        }"
        class="border-transparent"
        role="button"
        tabindex="0"
        @click="changeSelectedItem(item)"
      >
        <span class="block py-1 px-2 font-semibold">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { watch } from 'vue';

export default defineComponent({
  props: {
    initialSelected: {
      type: String as PropType<string>,
      required: true,
    },
    data: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  emits: ['selectedChange'],
  setup(props, context) {
    let selected = ref<string>(props.initialSelected);

    watch(
      () => props.initialSelected,
      (newValue) => {
        selected.value = newValue;
      }
    );

    function isSelected(current: string) {
      return selected.value == current;
    }

    function changeSelectedItem(item: string) {
      selected.value = item;
      context.emit('selectedChange', selected.value);
    }

    return {
      selected,
      isSelected,
      changeSelectedItem,
    };
  },
});
</script>
