<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <LoadingState :is-loading="isLoading" :is-error="isError" :error="error" />
    <SelectCustom
      v-if="isWriteable && isSuccess"
      :options="options"
      :value="value"
      :show-empty-value="showEmptyValue"
      @change="change"
    />
    <span v-if="!isWriteable && !isLoading">
      {{ options.find((option) => option.value === value)?.label ?? value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useQuery } from 'vue-query';
import { useAxiosFetcher } from '../../../../api';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectValue } from '../../../../../components/select/types';
import { useMapper } from './mapper';
import { useWriteable } from '../../utils/writeable/useWriteable';
import LoadingState from '../../../../../components/loading/LoadingState.vue';

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
const response = useQuery({ queryKey, queryFn });

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
