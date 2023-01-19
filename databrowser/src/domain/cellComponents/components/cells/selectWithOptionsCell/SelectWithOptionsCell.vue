<template>
  <div v-if="isWriteable">
    <SelectCustom
      :options="optionsInternal"
      :size="SelectSize.md"
      :show-no-value="showNoValue"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
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
import {
  SelectOption,
  SelectSize,
} from '../../../../../components/select/types';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    // If options is set, they will be used, otherwise the options from the attributes will be used
    options?: SelectOption[];
    value?: string | boolean | number;
    sortByLabel?: boolean;
    showNoValue?: boolean;
    showSearchWhenAtLeastCountOptions?: number;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    options: undefined,
    value: undefined,
    sortByLabel: true,
    showNoValue: false,
    showSearchWhenAtLeastCountOptions: 7,
    editable: true,
    readonly: false,
  }
);

const { options, value, sortByLabel, showNoValue, editable, readonly } =
  toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const { optionsInternal, unknownValue } = useMapper(
  options,
  ref(attrs),
  value,
  sortByLabel
);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
