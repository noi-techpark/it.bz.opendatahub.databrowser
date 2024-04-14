<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="rounded border">
    <div
      class="flex items-center justify-between bg-gray-50 px-4 py-2 font-semibold text-dialog"
    >
      {{ title }}
      <div v-if="icons.length" class="flex items-center gap-4">
        <IconParser
          v-for="(icon, index) in icons"
          :key="index"
          :name="icon"
          class="h-4 w-4 cursor-pointer text-green-400"
          :class="[
            iconsActive.includes(icon)
              ? 'h-5 w-5 rounded-[3px] border-[1.5px] border-green-400 bg-hint-calm-secondary p-[2px]'
              : '',
          ]"
          @click="$emit('ctaClick', icon)"
        />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconParser from '../../../../../components/utils/IconParser.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    ctaIcon?: string | Array<string>;
    iconsActive?: Array<string>;
  }>(),
  {
    title: '',
    ctaIcon: '',
    iconsActive: () => [],
  }
);

defineEmits(['ctaClick']);

const icons = computed(() => {
  if (Array.isArray(props.ctaIcon)) {
    return props.ctaIcon;
  }

  return props.ctaIcon ? [props.ctaIcon] : [];
});
</script>
