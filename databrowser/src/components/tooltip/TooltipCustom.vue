<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    ref="trigger"
    class="w-fit"
    @click="visible = hover ? visible : !visible"
  >
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
        class="size-4 absolute rotate-45 bg-white"
        :class="arrowClasses"
      ></div>

      <!-- Tooltip -->
      <div class="p-2.5 px-3">
        <slot name="container"></slot>
      </div>

      <!-- Close button -->
      <button v-if="showCloseButton" class="flex w-4" @click="visible = false">
        <IconClose class="text-hint-info" />
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import IconClose from '../svg/IconClose.vue';
import { useFloatingUi } from '../utils/useFloatingUi';
import { useElementHover } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    containerClasses?: string;
    showCloseButton?: boolean;
    hover?: boolean;
  }>(),
  {
    containerClasses: 'max-w-md',
    showCloseButton: true,
  }
);

const visible = ref(false);
const arrow = ref();

const [trigger, tooltip, placement] = useFloatingUi({
  placement: 'bottom-start',
  offset: 12,
  arrow,
});

const hoverTrigger = useElementHover(trigger, { delayLeave: 100 });
const hoverTooltip = useElementHover(tooltip);

watch([hoverTrigger, hoverTooltip], ([triggerNew, tooltipNew]) => {
  if (props.hover) {
    visible.value = triggerNew || tooltipNew;
  }
});

const isBottomPlacement = computed(() => placement.value.startsWith('bottom'));

const arrowClasses = computed(() =>
  isBottomPlacement.value ? 'border-t-2 border-l-2' : 'border-b-2 border-r-2'
);
</script>
