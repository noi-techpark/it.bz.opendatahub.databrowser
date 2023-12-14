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
import { toRefs } from 'vue';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import { SelectValue } from '../../../../../components/select/types';
import { useWriteable } from '../../utils/writeable/useWriteable';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import { useRemoteSelectOptions } from '../../utils/remoteSelectOptions/useRemoteSelectOptions';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    url: string;
    value?: SelectValue;
    keySelector?: string;
    labelSelector?: string;
    sortByLabel?: boolean;
    showEmptyValue?: boolean;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    value: undefined,
    keySelector: undefined,
    labelSelector: undefined,
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

const { isLoading, isSuccess, isError, error, options } =
  useRemoteSelectOptions(url, keySelector, labelSelector, sortByLabel);

const change = (value: string) => emit('update', { prop: 'value', value });
</script>
