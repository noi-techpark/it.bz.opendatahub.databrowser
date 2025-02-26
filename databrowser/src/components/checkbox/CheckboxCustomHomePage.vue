<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CheckboxCustom v-model="checked"
                  class="mr-2"
                  :filter-key="filterKey"
                  :label="label"
  />
</template>

<script setup lang="ts">
import {computed} from 'vue';
import CheckboxCustom from "./CheckboxCustom.vue";

const emit = defineEmits(['click', 'update:modelValue']);

const props = withDefaults(
    defineProps<{
      filterKey: string;
      filterLabel:string;
      modelValue: boolean;
      label?: string;
      tabbable?: boolean;
      disabled?: boolean;
      filterSelected?: { key: string; value: string }[];
    }>(),
    {
      label: undefined,
      tabbable: true,
      disabled: false,
      filterSelected: () => [],
    }
);
const checked = computed({
  get: () =>
      props.filterSelected.some(
          ({key, value}) =>
              props.filterLabel?.toLowerCase() === value?.toLowerCase() &&
              props.filterKey?.toLowerCase() === key?.toLowerCase()
      ) || props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
