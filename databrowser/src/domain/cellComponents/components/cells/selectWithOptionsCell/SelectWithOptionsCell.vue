<template>
  <div v-if="isWriteable">
    <SelectCustom
      :options="options"
      :size="SelectSize.md"
      :show-no-value="showNoValue"
      @change="change"
    />
    <div v-if="unknownValue" class="text-red-400">
      Attention: current value "{{ value }}" is unknown
    </div>
  </div>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  ref,
  toRefs,
  useAttrs,
  withDefaults,
} from 'vue';
import { useMapper } from './mapper';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectSize } from '../../../../../components/select/types';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    value?: string | boolean | number;
    sortByLabel?: boolean;
    showNoValue?: boolean;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    value: undefined,
    sortByLabel: true,
    showNoValue: false,
    editable: true,
    readonly: false,
  }
);

const { value, sortByLabel, showNoValue, editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const { options, unknownValue } = useMapper(ref(attrs), value, sortByLabel);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
