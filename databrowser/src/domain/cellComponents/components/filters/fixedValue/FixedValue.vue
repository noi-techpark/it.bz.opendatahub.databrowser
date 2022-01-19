<template>
  <div>
    <div v-for="option in filterOptions" :key="option.value">
      <input
        type="checkbox"
        :checked="isChecked(option.value)"
        @click="update(option.value)"
      /><span>{{ option.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { useApiQuery } from '../../../../../lib/apiQuery/apiQueryHandler';

export interface FixedValue {
  label: string;
  value: string;
}

const props = defineProps<{
  name: string;
  filterOptions?: FixedValue[];
}>();

const { name, filterOptions } = toRefs(props);

const currentValue = useApiQuery().useApiParameter(name.value);

const update = (value: string) =>
  (currentValue.value = value === currentValue.value ? undefined : value);

const isChecked = (value: string) => currentValue.value === value;
</script>
