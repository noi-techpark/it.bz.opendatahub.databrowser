<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="divide-y">
    <div class="divide-y px-3">
      <div v-for="option in filterOptions" :key="option.value" class="py-3">
        <CheckboxCustom
          :label="option.label"
          :model-value="isChecked(option.value)"
          @update:model-value="change(option.value)"
        />
      </div>
    </div>
    <ControlButtons @cancel="cancel" @save="save" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import CheckboxCustom from '../../../../../components/checkbox/CheckboxCustom.vue';
import { useAsSet } from '../../../../api';
import ControlButtons from '../ControlButtons.vue';
import { FilterValue } from '../types';

export interface FixedValueOption {
  label: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    initialValue: FilterValue;
    filterOptions?: FixedValueOption[];
    multiselect?: boolean;
  }>(),
  {
    filterOptions: () => [],
    multiselect: false,
  }
);

const { initialValue, filterOptions, multiselect } = toRefs(props);

const currentValue = useAsSet(initialValue, { twoWayBinding: false });

const change = (value: string) => {
  // Assign new set in order to satisfy reactivity constraints
  currentValue.value = new Set(currentValue.value);

  const isAlreadySelected = currentValue.value.has(value);

  if (isAlreadySelected) {
    // Unselect value if already selected
    currentValue.value.delete(value);
  } else {
    // If is single selection, clear current selection
    if (multiselect.value === false) {
      currentValue.value.clear();
    }

    // Add value to selections
    currentValue.value.add(value);
  }
};

const isChecked = (value: string) => currentValue.value.has(value);

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'cancel'): void;
  // eslint-disable-next-line no-unused-vars
  (e: 'save', v: FilterValue): void;
}>();

const cancel = () => emits('cancel');

const save = () => {
  const nextValue = Array.from(currentValue.value.values());
  emits('save', nextValue);
};
</script>
