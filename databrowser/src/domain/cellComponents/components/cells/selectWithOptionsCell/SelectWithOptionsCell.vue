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
      :show-add-new-value="showAddNewValue"
      :show-value-as-label-fallback="showValueAsLabelFallback"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
      @change="change"
    />
    <StringCell
      v-else-if="isWriteable && isAddNewValue && showAddNewValue"
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
import { randomId } from '../../../../../components/utils/random';
import { useQuery } from 'vue-query';

import StringCell from '../stringCell/StringCell.vue';
import { useEditStore } from '../../../../datasets/editView/store/editStore';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    // If options is set, they will be used, otherwise the options from the attributes will be used
    options?: SelectOption[];
    value?: SelectValue;
    url?: string;
    showEmptyValue?: boolean;
    showAddNewValue?: boolean;
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

const { options, value, url, showEmptyValue, editable, readonly } =
  toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const queryKey = url.value ?? randomId();
const queryFn = useAxiosFetcher();
const { data } = useQuery({
  queryKey,
  queryFn,
});

const fetchedOptions = computed<SelectOption[]>(() => {
  if (data.value == null || data.value.data == null) {
    return [];
  }

  const responseValue = data.value.data as string[];

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
