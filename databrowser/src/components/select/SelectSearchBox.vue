<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="sticky top-0 z-10 bg-gray-100 p-3" :disabled="true">
    <InputCustom
      :model-value="modelValue"
      input-classes="w-full"
      placeholder="Search data"
      @update:model-value="$emit('update:modelValue', $event)"
      @pointerdown="handleInputMouseClick"
    />
  </div>
</template>

<script setup lang="ts">
import InputCustom from '../input/InputCustom.vue';
import { useOptionsContainerEventHandler } from './useOptionsContainerEventHandler';

defineProps<{ modelValue: string }>();
defineEmits(['pointerdown', 'update:modelValue']);

const { handleInputMouseClick } = useOptionsContainerEventHandler();
</script>
