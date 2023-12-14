<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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

defineExpose({ toggleFullscreen: data.toggle });
</script>
