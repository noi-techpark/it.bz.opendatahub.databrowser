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
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import { unwrapData } from '../../../../api/dataExtraction/dataExtraction';
import { useDatasetConfigStore } from '../../../../datasetConfig/store/datasetConfigStore';
import EditListCell from '../../utils/editList/EditListCell.vue';
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

const { getDataForField } = useDatasetConfigStore();

const { data, error, isLoading, isSuccess, isError } = useBaseAxiosFetch(
  lookupUrl,
  {
    afterFetch: (ctx) => {
      const items = unwrapData(ctx.data);
      return items.map((item: any) => ({
        label: getDataForField(item, labelSelector.value) as any,
        value: getDataForField(item, keySelector.value) as any,
        url: item.Url,
      }));
    },
  }
);

const options = computed(() => data.value ?? []);
</script>
