<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <SubCategoryItem title="Main Type" :required="requiredValue">
      <LoadingState
        :is-loading="isLoading"
        :is-error="isError"
        :error="error"
      />
      <SelectWithOptionsCell
        v-if="isSuccess || !editable"
        :options="typeSelectOptions"
        :value="currentTypeValue"
        :show-empty-value="showEmptyValueForType"
        :editable="editable"
        :readonly="readonly"
        @update="changeType($event.value)"
      />
    </SubCategoryItem>
    <SubCategoryItem
      v-if="!isLoading && !isError && (currentSubTypeValue != null || editable)"
      title="Sub Type"
    >
      <SelectWithOptionsCell
        :options="subTypeSelectOptions"
        :value="currentSubTypeValue"
        :show-empty-value="true"
        :editable="editable"
        :readonly="readonly"
        @update="changeSubType($event.value)"
      />
    </SubCategoryItem>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { useArticleTypeSelection } from './useArticleTypeSelection';
import { useFetchArticleTypes } from './useFetchArticleTypes';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    type?: string;
    subType?: string;
    lookupUrl?: string;
    editable?: boolean;
    readonly?: string | boolean;
    required?: string | boolean;
  }>(),
  {
    type: undefined,
    subType: undefined,
    lookupUrl: undefined,
    editable: true,
    readonly: false,
    required: false,
  }
);

const { type, subType, lookupUrl, editable, readonly, required } =
  toRefs(props);

// Show empty value options for type select if type and sub type
// are undefined / null, which is the case for new articles.
const showEmptyValueForType = computed(
  () => type.value == null && subType.value == null
);

const isWritable = useWriteable({ editable, readonly });

const requiredValue = booleanOrStringToBoolean(required.value, false);

const { articleTypesHierarchy, isLoading, isSuccess, isError, error } =
  useFetchArticleTypes(lookupUrl, isWritable);

const {
  typeSelectOptions,
  subTypeSelectOptions,
  currentTypeValue,
  currentSubTypeValue,
  onUpdate,
  getLastSubTypeForType,
} = useArticleTypeSelection(type, subType, articleTypesHierarchy);

onUpdate(({ nextType, nextSubType }) =>
  changeTypeAndSubType(nextType, nextSubType)
);

const changeType = (nextType?: string) => {
  const nextSubType = getLastSubTypeForType(nextType);
  changeTypeAndSubType(nextType, nextSubType);
};

const changeSubType = (subType?: string) =>
  changeTypeAndSubType(currentTypeValue.value, subType);

const changeTypeAndSubType = (
  nextType: string | undefined,
  nextSubType: string | undefined
) => {
  // Emit update only if type or sub type changed
  if (
    currentTypeValue.value != nextType ||
    currentSubTypeValue.value != nextSubType
  ) {
    emit('update', [
      { prop: 'type', value: nextType },
      { prop: 'subType', value: nextSubType },
    ]);
  }
};
</script>
