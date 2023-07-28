<!-- eslint-disable vue/multi-word-component-names -->

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="target" class="flex">
    <div class="relative w-full">
      <!-- Accordion toggle button -->
      <button
        class="flex w-full items-center justify-between"
        :class="buttonClass"
        @click="toggle"
      >
        <span :class="buttonLabelClass">{{ text }}</span>
        <ArrowDownCompact
          class="h-4 w-4 fill-current text-green-400 transition"
          :class="{
            'rotate-180': show,
          }"
        />
      </button>

      <!-- Accordion menu -->
      <div v-show="show" class="min-w-full">
        <slot :events="{ close }"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import ArrowDownCompact from '../svg/ArrowDownCompact.vue';

const props = defineProps<{
  text: string;
  buttonClass?: string;
  buttonLabelClass?: string;
}>();
const { text, buttonClass, buttonLabelClass } = toRefs(props);

const show = ref(false);

const target = ref(null);

const close = () => {
  show.value = false;
  emit('visible', show.value);
};

const toggle = () => {
  show.value = !show.value;
  emit('visible', show.value);
};

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'visible', visible: boolean): void;
}>();
</script>
