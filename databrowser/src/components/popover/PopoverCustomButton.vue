<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverButton
    ref="popoverButtonRef"
    v-slot="{ open, close }"
    :disabled="disabled"
    :class="{
      relative: triggerOnHover,
    }"
    @click="onPopoverButtonClick"
  >
    <slot :open="open" :close="close"></slot>
    <span
      v-if="triggerOnHover"
      ref="triggerHoverRef"
      class="absolute left-0 top-0 h-full w-full"
      @click="onTriggerHoverClick()"
      @mouseover="onTriggerMouseHover(open)"
      @mouseleave="onTriggerMouseLeave(close)"
    >
    </span>
  </PopoverButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PopoverButton } from '@headlessui/vue';
import { useTimeoutFn } from '@vueuse/core';

const props = defineProps<{ disabled?: boolean; triggerOnHover?: boolean }>();

const emit = defineEmits(['triggerClick']);

const popoverButtonRef = ref();
const triggerHoverRef = ref();

const onTriggerMouseHover = (isOpen: boolean) => {
  if (isOpen || isPopoverButtonClickPending.value) return;

  startPopoverButtonClick();
};

const onTriggerMouseLeave = (isClose: boolean) => {
  if (isClose) return;

  stopPopoverButtonClick();
  startPopoverButtonClick();
};

const onTriggerHoverClick = () => {
  emit('triggerClick');
};

const onPopoverButtonClick = (e: PointerEvent) => {
  if (!e.pointerType || !props.triggerOnHover) {
    return;
  }

  e.preventDefault();
};

const {
  isPending: isPopoverButtonClickPending,
  start: startPopoverButtonClick,
  stop: stopPopoverButtonClick,
} = useTimeoutFn(
  () => {
    popoverButtonRef.value.$el.click();
  },
  100,
  { immediate: false }
);
</script>
