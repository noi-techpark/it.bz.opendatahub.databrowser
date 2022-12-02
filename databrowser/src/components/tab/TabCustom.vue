<template>
  <ButtonCustom
    variant="ghost"
    size="sm"
    class="relative flex h-10 items-center border-none px-3 font-semibold uppercase focus:bg-transparent focus:text-green-500 md:px-6"
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
