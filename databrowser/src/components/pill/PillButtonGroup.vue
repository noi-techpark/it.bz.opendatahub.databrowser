<template>
  <div>
    <PillButtonGroupItem
      v-for="(item, index) in data"
      :key="item"
      :current-item="selected"
      :is-first="index == 0"
      :is-last="index == data.length - 1"
      :item="item"
      @change-selected-item="changeSelectedItem(item)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { watch } from 'vue';
import PillButtonGroupItem from './PillButtonGroupItem.vue';

export default defineComponent({
  components: { PillButtonGroupItem },
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

    function changeSelectedItem(item: string) {
      selected.value = item;
      context.emit('selectedChange', selected.value);
    }

    return {
      selected,
      changeSelectedItem,
    };
  },
});
</script>
