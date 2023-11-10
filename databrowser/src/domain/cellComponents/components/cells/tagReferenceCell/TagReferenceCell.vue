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
import { storeToRefs } from 'pinia';
import { computed, toRefs } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import { SelectOption } from '../../../../../components/select/types';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import { useDatasetInfoStore } from '../../../../datasetConfig/store/datasetInfoStore';
import EditListCell from '../../utils/editList/EditListCell.vue';
import TagReferenceTable from './TagReferenceTable.vue';

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

const { extractValueByPath } = storeToRefs(useDatasetInfoStore());

const { data, isLoading, isSuccess, isError, error } =
  useBaseAxiosFetch<Record<string, string>[]>(url);

const options = computed<SelectOption[]>(() => {
  if (
    data.value == null ||
    data.value == null ||
    keySelector.value == null ||
    labelSelector.value == null
  ) {
    return [];
  }

  const keySelectorValue = keySelector.value;
  const labelSelectorValue = labelSelector.value;

  const result = data.value.map<SelectOption>((item) => {
    const value = extractValueByPath.value(item, keySelectorValue) as string;
    const label =
      (extractValueByPath.value(item, labelSelectorValue) as string) ?? value;

    return { value, label };
  });

  if (sortByLabelValue.value) {
    result.sort((a, b) => a.label?.localeCompare(b.label));
  }

  return result;
});
</script>
