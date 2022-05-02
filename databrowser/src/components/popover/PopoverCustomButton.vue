<template>
  <PopoverButton v-slot="{ open }"><slot :open="open"></slot></PopoverButton>
</template>

<script setup lang="ts">
import { PopoverButton } from '@headlessui/vue';
</script>
