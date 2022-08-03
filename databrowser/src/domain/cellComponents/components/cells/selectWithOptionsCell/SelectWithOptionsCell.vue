<template>
  <div>
    <SelectCustom :options="options" :size="SelectSize.md" @change="change" />
    <div v-if="unknownValue" class="text-red-400">
      Attention: current value "{{ value }}" is unknown
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, useAttrs, withDefaults } from 'vue';
import { useMapper } from './mapper';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectSize } from '../../../../../components/select/types';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    value?: string | boolean | number;
  }>(),
  {
    value: undefined,
  }
);

const attrs = useAttrs();

const { options, unknownValue } = useMapper(ref(attrs), ref(props.value));

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
