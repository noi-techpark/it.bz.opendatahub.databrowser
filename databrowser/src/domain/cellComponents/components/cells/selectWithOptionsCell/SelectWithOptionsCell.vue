<template>
  <div v-if="isWriteable">
    <SelectCustom
      v-if="isWriteable"
      :options="optionsInternal"
      :value="value"
      :show-empty-value="showEmptyValue"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
      @change="change"
    />
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
  SelectValue,
} from '../../../../../components/select/types';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    // If options is set, they will be used, otherwise the options from the attributes will be used
    options?: SelectOption[];
    value?: SelectValue;
    showEmptyValue?: boolean;
    showSearchWhenAtLeastCountOptions?: number;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    options: undefined,
    value: undefined,
    showEmptyValue: false,
    showSearchWhenAtLeastCountOptions: 7,
    editable: true,
    readonly: false,
  }
);

const { options, value, showEmptyValue, editable, readonly } = toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const { optionsInternal } = useMapper(options, ref(attrs));

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
