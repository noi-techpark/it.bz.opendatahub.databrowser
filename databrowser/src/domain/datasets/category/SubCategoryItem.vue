<template>
  <div class="pb-2">
    <div
      v-if="title != null || tooltip != null"
      class="flex justify-between items-center py-1"
    >
      <div class="font-semibold">{{ title }}</div>
      <div
        v-if="tooltip != null"
        class="w-4 h-4 text-green-400"
        :title="tooltip"
      >
        <IconInfo />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import IconInfo from '../../../components/svg/IconInfo.vue';

defineProps<{
  title?: string;
  tooltip?: string;
}>();
</script>
