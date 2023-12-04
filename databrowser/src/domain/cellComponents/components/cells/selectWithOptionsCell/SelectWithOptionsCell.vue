<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="isWriteable">
    <SelectCustom
      v-if="isWriteable && !isAddNewValue"
      :options="optionsInternal"
      :value="value"
      :show-empty-value="showEmptyValue"
      :show-add-new-value="booleanShowAddNewValue"
      :show-value-as-label-fallback="showValueAsLabelFallback"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
      @change="change"
    />
    <StringCell
      v-else-if="isWriteable && isAddNewValue && booleanShowAddNewValue"
      v-model="newItemValue"
      focus
      :editable="editable"
      @update="onUpdate($event.value)"
    />
  </div>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { ref, toRefs, useAttrs, computed, watch } from 'vue';
import { useMapper } from './mapper';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import {
  SelectOption,
  SelectValue,
} from '../../../../../components/select/types';
import { useWriteable } from '../../utils/writeable/useWriteable';
import { useAxiosFetcher } from '../../../../api';
import { useQuery } from 'vue-query';

import StringCell from '../stringCell/StringCell.vue';
import { useEditStore } from '../../../../datasets/editView/store/editStore';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    // If options is set, they will be used, otherwise the options from the attributes will be used
    options?: SelectOption[];
    value?: SelectValue;
    url?: string;
    showEmptyValue?: boolean;
    showAddNewValue?: boolean | string;
    showValueAsLabelFallback?: boolean;
    showSearchWhenAtLeastCountOptions?: number;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    options: undefined,
    value: undefined,
    url: undefined,
    showEmptyValue: false,
    showAddNewValue: false,
    showValueAsLabelFallback: false,
    showSearchWhenAtLeastCountOptions: 7,
    editable: true,
    readonly: false,
  }
);

const {
  options,
  value,
  url,
  showEmptyValue,
  editable,
  readonly,
  showAddNewValue,
} = toRefs(props);

const booleanShowAddNewValue = booleanOrStringToBoolean(
  showAddNewValue.value,
  false
);

const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const queryKey = url.value ?? '';
const queryFn = url.value ? useAxiosFetcher() : undefined;

const queryRes = queryFn
  ? useQuery({
      queryKey,
      queryFn,
    })
  : null;

const fetchedOptions = computed<SelectOption[]>(() => {
  if (
    !queryRes ||
    queryRes.data.value == null ||
    queryRes.data.value.data == null
  ) {
    return [];
  }

  const responseValue = queryRes.data.value.data as string[];

  return responseValue.map<SelectOption>((item) => ({
    value: item,
    label: item,
  }));
});

const optionsInternal = computed<SelectOption[]>(() => {
  return fetchedOptions.value.length
    ? fetchedOptions.value
    : useMapper(options, ref(attrs)).optionsInternal.value;
});

const isAddNewValue = ref(false);
const newItemValue = ref('');

const editStore = useEditStore();

watch(
  () => editStore.isEqual,
  (v) => {
    if (v) {
      isAddNewValue.value = false;
    }
  }
);

const change = (value: string) => {
  isAddNewValue.value = !value;
  onUpdate(value);
};
const onUpdate = (value: string) => {
  emit('update', { prop: 'value', value });
};
</script>
