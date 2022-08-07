<template>
  <TabCustom :active="active">
    <router-link :to="to">{{ label }}</router-link>
  </TabCustom>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import TabCustom from './TabCustom.vue';

defineProps<{ label: string; to: RouteLocationRaw; active?: boolean }>();
</script>
