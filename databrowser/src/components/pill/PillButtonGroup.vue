<template>
  <div>
    <PillButtonGroupItem
      v-for="(item, index) in data"
      :key="index"
      :is-first="index == 0"
      :is-last="index == data.length - 1"
      :is-selected="selected == index"
      :item="item"
      @change-selected-item="changeSelectedItem(item, index)"
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
    let selected = ref<number>(props.data.indexOf(props.initialSelected));

    watch(
      () => props.initialSelected,
      (newValue) => {
        selected.value = props.data.indexOf(newValue);
      }
    );

    function changeSelectedItem(item: string, index: number) {
      selected.value = index;
      context.emit('selectedChange', item);
    }

    return {
      selected,
      changeSelectedItem,
    };
  },
});
</script>
