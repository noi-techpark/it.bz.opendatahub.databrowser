<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <img
    v-if="src != null && !hasLoadingError"
    :src="imgSrc"
    :alt="alt"
    :style="style"
    @error="hasLoadingError = true"
  />
  <PlaceholderImage v-else />
</template>

<script setup lang="ts">
import { defineProps, ref, watch, withDefaults } from 'vue';
import PlaceholderImage from '../../../../../components/image/PlaceholderImage.vue';
import { resizeImageWidth } from '../../../../image';

const props = withDefaults(
  defineProps<{
    width?: string;
    alt?: string;
    src?: string;
  }>(),
  {
    width: '100%',
    alt: undefined,
    src: undefined,
  }
);

const hasLoadingError = ref(false);

const imgSrc = ref<string>();
const style = ref<Record<string, string>>();

watch(
  props,
  ({ src, width }) => {
    // Apply default settings
    imgSrc.value = src;
    style.value = undefined;

    // If no width is given, default settings are correct
    if (width == null) {
      return;
    }

    const isPercentageWidth = width.trim().endsWith('%');

    if (isPercentageWidth) {
      style.value = { width };
    } else {
      const widthAsNumber = Number(width);

      // If width is a number, than adapt URL
      if (!isNaN(widthAsNumber)) {
        imgSrc.value = resizeImageWidth(widthAsNumber, src);
      }
    }
  },
  { immediate: true }
);
</script>
