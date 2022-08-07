<template>
  <ButtonCustom
    variant="ghost"
    size="sm"
    class="flex relative items-center px-3 h-10 font-semibold focus:text-green-500 uppercase focus:bg-transparent border-none md:px-6"
    :class="{
      'border-b-2 border-b-green-500 ': active,
      'text-gray-500': !active,
      'link-underlined': active,
    }"
  >
    <slot></slot>
  </ButtonCustom>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';

defineProps<{ active?: boolean }>();
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
