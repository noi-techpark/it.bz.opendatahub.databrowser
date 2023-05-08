<template>
  <PopoverGroup>
    <Popover>
      <span ref="trigger">
        <slot name="trigger"></slot>
      </span>

      <Teleport to="#popper-root">
        <div
          ref="container"
          class="absolute"
          :class="{ 'z-50': zIndex == null }"
          :style="{
            zIndex: zIndex == null ? undefined : zIndex,
          }"
        >
          <slot name="container"></slot>
        </div>
      </Teleport>
    </Popover>
  </PopoverGroup>
</template>

<script setup lang="ts">
import { Popover, PopoverGroup } from '@headlessui/vue';
import { useFloatingUi } from '../utils/useFloatingUi';

withDefaults(defineProps<{ fullScreenWidth?: boolean; zIndex?: number }>(), {
  fullScreenWidth: true,
  zIndex: undefined,
});

const [trigger, container] = useFloatingUi({
  placement: 'bottom-start',
  offset: 8,
});
</script>
