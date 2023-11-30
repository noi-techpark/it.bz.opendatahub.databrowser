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
      :deletable="true"
      @update="onUpdate($event.value)"
    />
  </div>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, useAttrs, watch } from 'vue';
import { useEventDelete } from '../../../../../components/input/utils';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import {
  SelectOption,
  SelectValue,
} from '../../../../../components/select/types';
import { useBaseAxiosFetch } from '../../../../api';
import { useEditStore } from '../../../../datasets/ui/editView/store/editStore';
import { useWriteable } from '../../utils/writeable/useWriteable';
import StringCell from '../stringCell/StringCell.vue';
import { useMapper } from './mapper';

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

const editStore = useEditStore();

const { options, value, url, showEmptyValue, editable, readonly } =
  toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const attrs = useAttrs();

const isAddNewValue = ref(false);
const newItemValue = ref('');
const originalValue = ref(value.value);

useEventDelete.on((eventValue: boolean) => {
  if (eventValue) {
    change(originalValue.value as string);
    isAddNewValue.value = false;
  }
});

const { data } = useBaseAxiosFetch<string[]>(url);

const fetchedOptions = computed<SelectOption[]>(() => {
  if (data.value == null) {
    return [];
  }

  return data.value.map<SelectOption>((item) => ({
    value: item,
    label: item,
  }));
});

const optionsInternal = computed<SelectOption[]>(() => {
  return fetchedOptions.value.length
    ? fetchedOptions.value
    : useMapper(options, ref(attrs)).optionsInternal.value;
});

watch(
  () => editStore.isEqual,
  (v) => {
    if (v) {
      isAddNewValue.value = false;
    }
  }
);

watch(
  () => editStore.initialAsJson,
  (v) => {
    if (v) {
      originalValue.value = value.value;
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
