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
import { MaybeRef, computed, toRefs, toValue } from 'vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import { useDatasetBaseInfoStore } from '../../../../datasets/config/store/datasetBaseInfoStore';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useRemoteSelectOptionsWithMapper } from '../../utils/remoteSelectOptions/useRemoteSelectOptions';
import ArrayLookupTable from './ArrayLookupTable.vue';

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

const optionMapper =
  (keySelector: MaybeRef<string>, labelSelector: MaybeRef<string>) =>
  (items: unknown[]) => {
    const { extractValueByPath } = useDatasetBaseInfoStore();

    return items.map((item) => {
      const value = extractValueByPath(item, toValue(keySelector)) as string;
      const label =
        (extractValueByPath(item, toValue(labelSelector)) as string) ?? value;
      const url = extractValueByPath(item, 'Url') as string;
      return { value, label, url };
    });
  };

const { options, error, isLoading, isSuccess, isError } =
  useRemoteSelectOptionsWithMapper(
    lookupUrl,
    true,
    optionMapper(keySelector, labelSelector)
  );
</script>
