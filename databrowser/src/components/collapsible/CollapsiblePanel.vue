<template>
  <DisclosurePanel>
    <div class="py-4 text-lg leading-normal text-gray-600">
      <slot />
    </div>
  </DisclosurePanel>
</template>

<script lang="ts" setup>
import { DisclosurePanel } from '@headlessui/vue';
</script>
