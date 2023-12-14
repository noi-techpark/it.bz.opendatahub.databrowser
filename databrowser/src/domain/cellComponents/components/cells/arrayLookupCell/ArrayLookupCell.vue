<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="items">
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <template #table="{ items }">
      <LoadingState
        :is-loading="isLoading"
        :is-error="isError"
        :error="error"
      />
      <ArrayLookupTable
        v-if="isSuccess"
        :options="options"
        :items="items"
        :unique="enableUniqueValue"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import ArrayLookupTable from './ArrayLookupTable.vue';
import { useRemoteSelectOptions } from '../../utils/remoteSelectOptions/useRemoteSelectOptions';
import { RemoteOptionsMapper } from '../../utils/remoteSelectOptions/types';
import { SelectOption } from '../../../../../components/select/types';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';
import { useDatasetBaseInfoStore } from '../../../../datasets/config/store/datasetBaseInfoStore';

const props = withDefaults(
  defineProps<{
    lookupUrl: string;
    keySelector: string;
    labelSelector: string;
    items?: { name: string }[] | null;
    unique?: boolean | string;
  }>(),
  {
    items: () => [],
    unique: false,
  }
);

const enableUniqueValue = computed(() =>
  booleanOrStringToBoolean(props.unique, false)
);

const { lookupUrl, keySelector, labelSelector } = toRefs(props);

const optionMapper: RemoteOptionsMapper<SelectOption & { url: string }> = (
  data,
  keySelector,
  labelSelector
) => {
  const { extractValueByPath } = useDatasetBaseInfoStore();

  return data.map((item: any) => {
    const value = extractValueByPath(item, keySelector) as string;
    const label = (extractValueByPath(item, labelSelector) as string) ?? value;
    const url = item.Url;
    return { value, label, url };
  });
};

const { options, error, isLoading, isSuccess, isError } =
  useRemoteSelectOptions(
    lookupUrl,
    keySelector,
    labelSelector,
    true,
    optionMapper
  );
</script>
