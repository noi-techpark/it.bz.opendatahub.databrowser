<template>
  <Popover>
    <span ref="trigger">
      <slot name="trigger"></slot>
    </span>

    <Teleport to="#popper-root">
      <div ref="container" class="absolute z-20 w-screen max-w-sm">
        <slot name="container"></slot>
      </div>
    </Teleport>
  </Popover>
</template>

<script setup lang="ts">
import { Popover } from '@headlessui/vue';
import { useFloatingUi } from '../utils/useFloatingUi';

const [trigger, container] = useFloatingUi({
  placement: 'bottom-start',
  offset: 8,
});
</script>
