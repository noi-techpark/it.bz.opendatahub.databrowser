<template>
  <div>
    <slot :item="(item as any)" :index="activeTab"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ item: unknown; activeTab: number }>();
</script>
