<template>
  <MenuButton v-slot="{ open }"><slot :open="open"></slot></MenuButton>
</template>

<script setup lang="ts">
import { MenuButton } from '@headlessui/vue';
</script>
