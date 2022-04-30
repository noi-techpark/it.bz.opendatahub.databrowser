<template>
  <Menu as="div" class="inline-block relative text-left">
    <slot></slot>
  </Menu>
</template>

<script setup lang="ts">
import { Menu } from '@headlessui/vue';
</script>
