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
    <CancelSaveButtons @cancel="cancel" @save="save" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, toRefs } from 'vue';
import Checkbox from '../../../../../components/checkbox/Checkbox.vue';
import CancelSaveButtons from '../CancelSaveButtons.vue';
import { ParameterValue } from '../../../../../lib/apiQuery/types';

export interface FixedValue {
  label: string;
  value: string;
}

const props = defineProps<{
  currentValue: ParameterValue | undefined;
  filterOptions?: FixedValue[];
}>();

const { currentValue, filterOptions } = toRefs(props);

const updatedValue = ref(currentValue.value);

const change = (value: string) =>
  (updatedValue.value = value === updatedValue.value ? undefined : value);

const isChecked = (value: string) => updatedValue.value === value;

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'cancel'): void;
  // eslint-disable-next-line no-unused-vars
  (e: 'save', v: ParameterValue | undefined): void;
}>();

const cancel = () => {
  updatedValue.value = currentValue.value;
  emits('cancel');
};

const save = () => {
  currentValue.value = updatedValue.value;
  emits('save', updatedValue.value);
};
</script>
