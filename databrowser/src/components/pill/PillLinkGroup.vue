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

<script setup lang="ts">
import { defineProps } from '@vue/runtime-core';
import PillLinkGroupItem, { PillLinkGroupData } from './PillLinkGroupItem.vue';

defineProps<{
  data: PillLinkGroupData[];
}>();
</script>
