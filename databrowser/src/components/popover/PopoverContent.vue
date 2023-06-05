<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="p-4"
    :class="{
      'hover:bg-gray-50 cursor-pointer': props.withHover && !disabled,
      'text-disabled': disabled,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{ disabled?: boolean; withHover?: boolean }>(),
  {
    disabled: false,
    withHover: false,
  }
);
</script>
