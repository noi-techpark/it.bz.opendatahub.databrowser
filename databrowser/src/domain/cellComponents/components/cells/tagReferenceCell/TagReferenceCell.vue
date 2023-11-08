<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="tags" :editable="editable">
    <template #table="{ items }">
      <AlertError
        v-if="url == null"
        title="Can not display tags, no URL defined"
        content="This seems to be a configuration problem. Please contact support@opendatahub.com"
      />
      <AlertError
        v-else-if="keySelector == null"
        title="Can not display tags, no key selector defined"
        content="This seems to be a configuration problem. Please contact support@opendatahub.com"
      />
      <AlertError
        v-else-if="labelSelector == null"
        title="Can not display tags, no label selector defined"
        content="This seems to be a configuration problem. Please contact support@opendatahub.com"
      />

      <LoadingState
        :is-loading="isLoading"
        :is-error="isError"
        :error="error"
      />
      <TagReferenceTable
        v-if="isSuccess || !editable"
        :tags="items"
        :options="options"
        :unique="uniqueValue"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import { SelectOption } from '../../../../../components/select/types';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';
import EditListCell from '../../utils/editList/EditListCell.vue';
import TagReferenceTable from './TagReferenceTable.vue';
import * as R from 'ramda';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import { storeToRefs } from 'pinia';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import { useDatasetInfoStore } from '../../../../datasetConfig/store/datasetInfoStore';

const props = withDefaults(
  defineProps<{
    tags?: string[] | null;
    url?: string;
    keySelector?: string;
    labelSelector?: string;
    unique?: boolean | string;
    sortByLabel?: boolean | string;
    editable?: boolean;
  }>(),
  {
    tags: () => [],
    url: undefined,
    keySelector: undefined,
    labelSelector: undefined,
    unique: true,
    sortByLabel: true,
    editable: true,
  }
);

const { tags, url, keySelector, labelSelector, unique, sortByLabel, editable } =
  toRefs(props);

const uniqueValue = computed(() =>
  booleanOrStringToBoolean(unique.value, true)
);

const sortByLabelValue = computed(() =>
  booleanOrStringToBoolean(sortByLabel.value, true)
);

const { paramsReplacer } = storeToRefs(useDatasetInfoStore());

const keySelectorWithReplacements = computed(() =>
  paramsReplacer.value(keySelector.value ?? '')
);
const labelSelectorWithReplacements = computed(() =>
  paramsReplacer.value(labelSelector.value ?? '')
);

const { data, isLoading, isSuccess, isError, error } = useBaseAxiosFetch(
  url.value
);

const options = computed<SelectOption[]>(() => {
  if (data.value == null || data.value == null) {
    return [];
  }

  const responseValue = data.value as Record<string, string>[];

  const result = responseValue.map<SelectOption>((item) => {
    const value = getPropertyValue(item, keySelectorWithReplacements.value);
    const label = getPropertyValue(item, labelSelectorWithReplacements.value);

    return {
      value,
      label: label ?? value,
    };
  });

  if (sortByLabelValue.value) {
    result.sort((a, b) => a.label?.localeCompare(b.label));
  }

  return result;
});

const getPropertyValue = (item: unknown, jsonPath: string) => {
  const path = jsonPath.split('.');
  const lensePath = R.lensPath(path);
  return R.view(lensePath, item);
};
</script>
