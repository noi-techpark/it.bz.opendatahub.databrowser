<template>
  <TabCustom :active="active">{{ label }}</TabCustom>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import TabCustom from './TabCustom.vue';

defineProps<{ label: string; active?: boolean }>();
</script>
