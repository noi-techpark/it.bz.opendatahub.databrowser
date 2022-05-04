<template>
  <ButtonLink
    :to="to"
    variant="ghost"
    size="sm"
    class="flex relative items-center px-3 h-10 font-semibold focus:text-green-500 uppercase focus:bg-transparent border-none md:px-6"
    :class="{
      'border-b-2 border-b-green-500 ': active,
      'text-gray-500': !active,
    }"
  >
    <span :class="{ 'link-underlined': active }">{{ label }}</span>
  </ButtonLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import ButtonLink from '../../../components/button/ButtonLink.vue';

defineProps<{
  label: string;
  to: RouteLocationRaw;
  active?: boolean;
}>();
</script>

<style scoped>
a:focus-visible {
  @apply bg-green-500 text-white outline-offset-[-1px];
}
.link-underlined::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 70%;
  left: 15%;
  @apply bg-green-500;
}
</style>
