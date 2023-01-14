<template>
  <div v-if="isWriteable">
    <div v-if="isLoading" class="animate-pulse">Loading...</div>
    <div v-if="isError" class="text-red-500">
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
    </div>
    <div v-if="isSuccess">
      <SelectCustom
        :options="options"
        :size="SelectSize.md"
        :show-no-value="emptyAllowed"
        @change="change"
      />
      <div v-if="showUnknownError" class="text-red-400">
        Attention: current value "{{ value }}" is unknown
      </div>
    </div>
  </div>
  <span v-else>{{ selectedLabel }}</span>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import { useQuery } from 'vue-query';
import { useAxiosFetcher } from '../../../../api';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectSize } from '../../../../../components/select/types';
import { useMapper } from './mapper';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    value?: string | boolean | number;
    url: string;
    keySelector: string;
    labelSelector: string;
    sortByLabel?: boolean;
    emptyAllowed?: boolean;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    value: undefined,
    sortByLabel: true,
    emptyAllowed: true,
    editable: true,
    readonly: false,
  }
);

const {
  url,
  keySelector,
  labelSelector,
  value,
  sortByLabel,
  emptyAllowed,
  editable,
  readonly,
} = toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const queryKey = url;
const queryFn = useAxiosFetcher();
const response = useQuery({ queryKey, queryFn });

const { options, unknownValue } = useMapper(
  response.data,
  value,
  keySelector,
  labelSelector,
  sortByLabel,
  emptyAllowed
);

const isLoading = computed(() => response.isLoading.value);
const isSuccess = computed(() => response.isSuccess.value);
const isError = computed(() => response.isError.value);
const error = computed(() => response.error.value);

const selectedLabel = computed(
  () => options.value.find((option) => option.selected)?.label
);

const showUnknownError = computed(
  () => unknownValue.value && !(emptyAllowed.value && value.value === '')
);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
