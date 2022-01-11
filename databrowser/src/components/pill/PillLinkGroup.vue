<template>
  <div class="block">
    <PillLinkGroupItem
      v-for="(item, index) in data"
      :key="item.label"
      :is-first="index == 0"
      :is-last="index == data.length - 1"
      :item="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import PillLinkGroupItem, { PillLinkGroupType } from './PillLinkGroupItem.vue';

export default defineComponent({
  components: { PillLinkGroupItem },
  props: {
    data: {
      type: Array as PropType<Array<PillLinkGroupType>>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
