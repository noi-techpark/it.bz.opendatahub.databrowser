<template>
  <div ref="target" class="flex">
    <div class="relative w-full">
      <!-- Dropdown toggle button -->
      <button
        class="flex justify-between items-center w-full"
        :class="buttonClass"
        @click="show = !show"
      >
        <span>{{ text }}</span>
        <ArrowUp v-if="show" />
        <ArrowDown v-else />
      </button>

      <!-- Dropdown menu -->
      <div v-show="show" class="absolute min-w-full bg-white border shadow-xl">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ArrowDown from '../svg/ArrowDown.vue';
import ArrowUp from '../svg/ArrowUp.vue';

const props = defineProps<{
  text: string;
  buttonClass?: string;
}>();
const { text, buttonClass } = toRefs(props);

const show = ref(false);

const target = ref(null);
onClickOutside(target, () => (show.value = false));
</script>
