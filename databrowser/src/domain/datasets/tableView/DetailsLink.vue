<template>
  <router-link
    :to="to"
    class="flex justify-center items-center m-1 w-8 h-8 hover:bg-gray-300 rounded border"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{ to: RouteLocationRaw }>();

const { to } = toRefs(props);
</script>
