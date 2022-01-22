<template>
  <div class="divide-y">
    <div class="px-3 divide-y">
      <div v-for="option in filterOptions" :key="option.value" class="py-3">
        <Checkbox
          :label="option.label"
          :checked="isChecked(option.value)"
          @change="change(option.value)"
        />
      </div>
    </div>
    <ControlButtons @cancel="cancel" @save="save" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import Checkbox from '../../../../../components/checkbox/Checkbox.vue';
import { useAsSet } from '../../../../../lib/apiQuery/utils';
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
