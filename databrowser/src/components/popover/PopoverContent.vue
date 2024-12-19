<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverContentFrame
    :class="{
      'cursor-pointer hover:bg-gray-50': withHover && !disabled,
      'text-disabled': disabled,
    }"
  >
    <slot></slot>
  </PopoverContentFrame>
</template>

<script setup lang="ts">
import PopoverContentFrame from './PopoverContentFrame.vue';

withDefaults(defineProps<{ disabled?: boolean; withHover?: boolean }>(), {
  disabled: false,
  withHover: false,
});
</script>
