<template>
  <div v-if="isWriteable">
    <div v-if="isLoading" class="animate-pulse">Loading...</div>
    <div v-if="isError" class="text-red-500">
      <AlertError
        title="Error while loading data"
        :content="toErrorString(error)"
      />
    </div>
    <div v-if="isSuccess">
      <SelectCustom
        :options="options"
        :value="value"
        :show-empty-value="showEmptyValue"
        @change="change"
      />
    </div>
  </div>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import { useQuery } from 'vue-query';
import { useAxiosFetcher } from '../../../../api';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectValue } from '../../../../../components/select/types';
import { useMapper } from './mapper';
import { useWriteable } from '../../utils/writeable/useWriteable';
import AlertError from '../../../../../components/alert/AlertError.vue';
import { toErrorString } from '../../../../api/service/utils';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    value?: SelectValue;
    url: string;
    keySelector: string;
    labelSelector: string;
    sortByLabel?: boolean;
    showEmptyValue?: boolean;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    value: undefined,
    sortByLabel: true,
    showEmptyValue: false,
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
  showEmptyValue,
  editable,
  readonly,
} = toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const queryKey = url;
const queryFn = useAxiosFetcher();
const response = useQuery({ queryKey, queryFn, enabled: isWriteable.value });

const { options } = useMapper(
  response.data,
  keySelector,
  labelSelector,
  sortByLabel
);

const isLoading = computed(() => response.isLoading.value);
const isSuccess = computed(() => response.isSuccess.value);
const isError = computed(() => response.isError.value);
const error = computed(() => response.error.value);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
