<!-- This component is inspired by VueUse https://vueuse.org/core/usefullscreen/#component-usage -->

<template>
  <div ref="target">
    <slot
      :is-supported="data.isSupported"
      :is-fullscreen="data.isFullscreen"
      :enter="data.enter"
      :exit="data.exit"
      :toggle="data.toggle"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useFullscreen } from '@vueuse/core';

const target = ref();
const data = reactive(useFullscreen(target));
</script>
