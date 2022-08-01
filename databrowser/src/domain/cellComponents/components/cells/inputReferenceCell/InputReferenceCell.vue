<template>
  <div>
    <div v-if="isLoading" class="animate-pulse">Loading...</div>
    <div v-if="isError" class="text-red-500">
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
    </div>
    <div v-if="isSuccess">
      <SelectCustom :options="options" :size="SelectSize.md" @change="change" />
      <div v-if="unknownValue" class="text-red-400">
        Attention: current value "{{ value }}" is unknown
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs } from 'vue';
import { useQuery } from 'vue-query';
import { useAxiosFetcher } from '../../../../api';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectSize } from '../../../../../components/select/types';
import { buildMapper } from './mapper';

const emit = defineEmits(['update']);

const props = defineProps<{
  value?: string | boolean | number;
  url: string;
  keySelector: string;
  labelSelector: string;
  required?: boolean;
}>();

const { url, keySelector, labelSelector, value, required } = toRefs(props);

const queryKey = url;
const queryFn = useAxiosFetcher();
const select = buildMapper(keySelector, labelSelector, value, required);

const response = useQuery({ queryKey, queryFn, select });

const isLoading = computed(() => response.isLoading.value);
const isSuccess = computed(() => response.isSuccess.value);
const isError = computed(() => response.isError.value);
const error = computed(() => response.error.value);
const options = computed(() => response.data.value || []);

const unknownValue = computed(
  () =>
    value?.value != null &&
    options.value.find((o) => o.selected === true) == null
);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
