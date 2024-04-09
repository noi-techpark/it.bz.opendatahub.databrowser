<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <CheckboxCustom
      v-if="publishers.length > 1"
      :model-value="selected.every((item) => item === true)"
      :disabled="disabled"
      label="All"
      @click="toggleAll($event)"
    />
    <CheckboxCustom
      v-for="(item, index) in selected"
      :key="`${index}-${item}`"
      :model-value="selected[index]"
      :label="publishers[index].name"
      :disabled="disabled || publishers.length === 1"
      @click="selected[index] = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import CheckboxCustom from '../../../../../components/checkbox/CheckboxCustom.vue';
import { Publisher } from './types';

const emit = defineEmits(['selectionChange']);

const props = defineProps<{ publishers: Publisher[]; disabled: boolean }>();

// Initialize the selected array booleans with the same length as the publishers array
// When a checkbox is clicked, the corresponding index in the selected array is toggled
const selected = reactive(
  props.publishers.length === 1
    ? [true]
    : [...Array(props.publishers.length)].map(() => false)
);

const toggleAll = (event: boolean) =>
  // We need to update the selected array in the next tick to avoid reactivity issues
  // where the 'Toggle All' checkbox is not updated correctly
  setTimeout(
    () => selected.forEach((_, index) => (selected[index] = event)),
    0
  );

watch(
  () => selected,
  () => emit('selectionChange', selected),
  { deep: true }
);
</script>
