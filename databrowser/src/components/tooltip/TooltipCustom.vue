<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="trigger" class="w-fit" @click="visible = !visible">
    <slot></slot>
  </div>
  <Teleport to="#popper-root">
    <div
      ref="tooltip"
      class="absolute z-20 flex rounded border border-gray-250 bg-white p-1.5 shadow-xl"
      :class="[{ hidden: !visible }, containerClasses]"
    >
      <!-- Tooltip arrow -->
      <div
        ref="arrow"
        class="absolute h-4 w-4 rotate-45 bg-white"
        :class="arrowClasses"
      ></div>

      <!-- Tooltip -->
      <div class="p-2.5 px-3">
        <slot name="container"></slot>
      </div>

      <!-- Close button -->
      <button class="flex w-4" @click="visible = false">
        <IconClose class="text-hint-info" />
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from 'vue';
import IconClose from '../svg/IconClose.vue';
import { useFloatingUi } from '../utils/useFloatingUi';

withDefaults(defineProps<{ containerClasses?: string }>(), {
  containerClasses: 'max-w-md',
});

const visible = ref(false);
const arrow = ref();

const [trigger, tooltip, placement] = useFloatingUi({
  placement: 'bottom-start',
  offset: 12,
  arrow,
});

const isBottomPlacement = computed(() => placement.value.startsWith('bottom'));

const arrowClasses = computed(() =>
  isBottomPlacement.value ? 'border-t-2 border-l-2' : 'border-b-2 border-r-2'
);
</script>
